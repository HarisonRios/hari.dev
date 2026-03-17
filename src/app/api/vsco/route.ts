export async function GET() {
  try {
    const username = process.env.VSCO_USERNAME;
    if (!username) {
      return Response.json(
        { photos: [], error: 'VSCO_USERNAME not configured' },
        { status: 200 }
      );
    }
    const profileUrl = `https://vsco.co/${username}`;
    const proxyProfileUrl = `https://r.jina.ai/http://${profileUrl}`;
    const proxyGalleryUrl = `https://r.jina.ai/http://${profileUrl}/gallery`;
    const imageRegex = /https:\/\/(?:im|image|i)\.vsco\.co\/[^\s)\]]+/g;
    const mediaRegex = new RegExp(
      `https://vsco\\.co/${username}/media/[A-Za-z0-9]+`,
      'g'
    );
    const pairRegex =
      /\[!\[[^\]]*\]\(\s*(https?:\/\/[^\s)]+)\s*\)\]\(\s*(https?:\/\/[^\s)]+)\s*\)/g;
    const allowlistRaw = process.env.VSCO_MEDIA_ALLOWLIST ?? '';

    const getMediaId = (link: string) => {
      const marker = '/media/';
      const index = link.indexOf(marker);
      if (index === -1) {
        return null;
      }
      const idPart = link.slice(index + marker.length);
      const cleanId = idPart.split(/[/?#]/)[0];
      return cleanId || null;
    };

    const getMediaIdFromImageUrl = (imageUrl: string) => {
      try {
        const url = new URL(imageUrl);
        const parts = url.pathname.split('/').filter(Boolean);
        if (parts.length >= 4 && /^[a-z0-9]{20,}$/i.test(parts[3])) {
          return parts[3];
        }
        const candidate = parts.find((part) => /^[a-z0-9]{20,}$/i.test(part));
        return candidate ?? null;
      } catch (error) {
        console.error('Failed to parse VSCO image URL:', error);
        return null;
      }
    };

    const normalizeImageKey = (imageUrl: string) => {
      try {
        const url = new URL(imageUrl);
        return url.pathname;
      } catch (error) {
        console.error('Failed to normalize VSCO image URL:', error);
        return imageUrl;
      }
    };

    const allowList = allowlistRaw
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => getMediaId(value) ?? value)
      .filter(Boolean);
    const allowSet = new Set(allowList);
    const hasAllowList = allowList.length > 0;

    const boostVscoImageUrl = (imageUrl: string) => {
      try {
        const url = new URL(imageUrl);
        const hasSizing =
          url.searchParams.has('w') ||
          url.searchParams.has('h') ||
          url.searchParams.has('q');

        if (!hasSizing) {
          return imageUrl;
        }

        url.searchParams.set('w', '1600');
        url.searchParams.set('h', '1600');
        url.searchParams.set('q', '90');
        return url.toString();
      } catch (error) {
        console.error('Failed to boost VSCO image URL:', error);
        return imageUrl;
      }
    };

    const extractPhotos = (text: string) => {
      const photos: { imageUrl: string; link: string; mediaId: string | null }[] = [];

      const pairedMatches = Array.from(text.matchAll(pairRegex));
      if (pairedMatches.length > 0) {
        for (const match of pairedMatches) {
          const imageUrl = boostVscoImageUrl(match[1]);
          const link = match[2];
          const mediaIdFromLink = getMediaId(link);
          const mediaIdFromImage = getMediaIdFromImageUrl(imageUrl);
          const mediaId = mediaIdFromLink ?? mediaIdFromImage;

          if (!mediaId) {
            continue;
          }

          photos.push({
            imageUrl,
            link,
            mediaId,
          });
        }

        return photos;
      }

      const imageMatches = text.match(imageRegex) || [];
      const mediaMatches = text.match(mediaRegex) || [];

      for (let i = 0; i < imageMatches.length; i += 1) {
        const imageUrl = boostVscoImageUrl(imageMatches[i]);
        const mediaIdFromImage = getMediaIdFromImageUrl(imageUrl);
        const mediaIdFromLink = mediaMatches[i] ? getMediaId(mediaMatches[i]) : null;
        const mediaId = mediaIdFromLink ?? mediaIdFromImage;

        if (!mediaId) {
          continue;
        }

        const link = `${profileUrl}/media/${mediaId}`;
        photos.push({
          imageUrl,
          link,
          mediaId,
        });
      }

      return photos;
    };

    const fetchPage = async (url: string) => {
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`VSCO proxy error: ${response.status}`);
      }

      return response.text();
    };
    const collected: { imageUrl: string; link: string; mediaId: string | null }[] = [];
    const seen = new Set<string>();
    const maxPhotos = hasAllowList ? Math.min(allowList.length, 30) : 12;

    const pages = [proxyGalleryUrl, proxyProfileUrl];

    for (const pageUrl of pages) {
      if (collected.length >= maxPhotos) {
        break;
      }

      let text = '';
      try {
        text = await fetchPage(pageUrl);
      } catch (error) {
        console.error('VSCO fetch error:', error);
        continue;
      }

      const extracted = extractPhotos(text);
      for (const photo of extracted) {
        if (collected.length >= maxPhotos) {
          break;
        }
        if (hasAllowList && (!photo.mediaId || !allowSet.has(photo.mediaId))) {
          continue;
        }
        const dedupeKey = photo.mediaId ?? normalizeImageKey(photo.imageUrl);
        if (seen.has(dedupeKey)) {
          continue;
        }
        seen.add(dedupeKey);
        collected.push(photo);
      }

      if (collected.length >= maxPhotos) {
        break;
      }
    }

    let ordered = collected;
    if (hasAllowList) {
      const byId = new Map<string, { imageUrl: string; link: string; mediaId: string | null }>();
      for (const photo of collected) {
        if (photo.mediaId) {
          byId.set(photo.mediaId, photo);
        }
      }
      ordered = allowList
        .map((id) => byId.get(id))
        .filter(Boolean) as { imageUrl: string; link: string; mediaId: string | null }[];
    }

    const photos = ordered.map((photo, index) => ({
      id: index.toString(),
      imageUrl: photo.imageUrl,
      link: photo.link,
    }));

    return Response.json({ photos });
  } catch (error) {
    console.error('Error fetching VSCO:', error);
    return Response.json(
      { photos: [], error: 'Failed to fetch VSCO photos' },
      { status: 200 }
    );
  }
}
