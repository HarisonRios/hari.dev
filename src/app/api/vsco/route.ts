export async function GET() {
  try {
    const username = process.env.VSCO_USERNAME;
    if (!username) {
      throw new Error('VSCO_USERNAME not configured');
    }
    const profileUrl = `https://vsco.co/${username}`;
    const proxyUrl = `https://r.jina.ai/http://https://vsco.co/${username}`;

    const response = await fetch(proxyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`VSCO proxy error: ${response.status}`);
    }

    const text = await response.text();

    const imageMatches = text.match(/https:\/\/(?:im|image)\.vsco\.co\/[^\s)\]]+/g) || [];
    const mediaMatches =
      text.match(new RegExp(`https://vsco\\.co/${username}/media/[A-Za-z0-9]+`, 'g')) || [];

    const photos: { id: string; imageUrl: string; link: string }[] = [];
    const seen = new Set<string>();

    for (let i = 0; i < imageMatches.length && photos.length < 30; i += 1) {
      const imageUrl = imageMatches[i];
      if (seen.has(imageUrl)) {
        continue;
      }
      seen.add(imageUrl);
      const link = mediaMatches[i] ?? `${profileUrl}/gallery`;
      photos.push({
        id: photos.length.toString(),
        imageUrl,
        link,
      });
    }

    return Response.json({ photos });
  } catch (error) {
    console.error('Error fetching VSCO:', error);
    return Response.json({ photos: [] }, { status: 200 });
  }
}
