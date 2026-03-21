export async function GET() {
  try {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = process.env.LASTFM_USERNAME ?? 'harison_rioos';

    if (!apiKey) {
      return Response.json(
        { albums: [], error: 'LASTFM_API_KEY not configured' },
        { status: 200 }
      );
    }

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${apiKey}&format=json&period=1month&limit=6`;

    const response = await fetch(url, {
      next: { revalidate: 300 }, // 5 min — aligned with SpotifyCard refresh interval
    });

    if (!response.ok) {
      throw new Error(`Last.fm API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`Last.fm error ${data.error}: ${data.message}`);
    }

    const rawAlbums = data?.topalbums?.album ?? [];

    const albums = rawAlbums.slice(0, 6).map((album: {
      name: string;
      artist: { name: string };
      image?: { '#text': string; size: string }[];
      playcount: string;
      url: string;
    }) => {
      const images = album.image ?? [];
      const large =
        images.find((img) => img.size === 'extralarge') ??
        images.find((img) => img.size === 'large') ??
        images[images.length - 1];

      const imageUrl = large?.['#text'] ?? '';

      return {
        name: album.name,
        artist: album.artist.name,
        imageUrl: imageUrl.includes('2a96cbd8b46e442fc41c2b86b821562f') ? '' : imageUrl,
        playcount: parseInt(album.playcount, 10),
        url: album.url,
      };
    });

    return Response.json({ albums });
  } catch (error) {
    console.error('Error fetching Last.fm top albums:', error);
    return Response.json(
      { albums: [], error: 'Failed to fetch Last.fm data' },
      { status: 200 }
    );
  }
}
