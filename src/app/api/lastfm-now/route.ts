export async function GET() {
  try {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = process.env.LASTFM_USERNAME ?? 'harison_rioos';

    if (!apiKey) {
      return Response.json(
        { nowPlaying: null, error: 'LASTFM_API_KEY not configured' },
        { status: 200 }
      );
    }

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

    const response = await fetch(url, {
      next: { revalidate: 1 },
    });

    if (!response.ok) {
      throw new Error(`Last.fm API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`Last.fm error ${data.error}: ${data.message}`);
    }

    const tracks = data?.recenttracks?.track ?? [];
    const latest = Array.isArray(tracks) ? tracks[0] : tracks;

    if (!latest) {
      return Response.json({ nowPlaying: null });
    }

    const isNowPlaying = latest['@attr']?.nowplaying === 'true';

    if (!isNowPlaying) {
      return Response.json({ nowPlaying: null });
    }

    const images = latest.image ?? [];
    const large =
      images.find((img: { size: string }) => img.size === 'extralarge') ??
      images.find((img: { size: string }) => img.size === 'large') ??
      images[images.length - 1];

    const imageUrl = large?.['#text'] ?? '';

    return Response.json({
      nowPlaying: {
        song: latest.name,
        artist: latest.artist['#text'],
        album: latest.album['#text'],
        imageUrl,
        url: latest.url,
      },
    });
  } catch (error) {
    console.error('Error fetching Last.fm now playing:', error);
    return Response.json({ nowPlaying: null, error: 'Failed to fetch' }, { status: 200 });
  }
}
