export async function GET() {
  try {
    const username = 'harisonrios';
    const galleryUrl = `https://vsco.co/${username}/gallery`;
    
    const response = await fetch(galleryUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://vsco.co/',
        'Cache-Control': 'no-cache',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`VSCO page error: ${response.status}`);
    }

    const html = await response.text();
    
    // Extract image URLs from the HTML using regex
    const imageMatches = html.match(/https:\/\/image\.vsco\.co\/[^"<>]+/g) || [];
    const uniqueImages = [...new Set(imageMatches)].slice(0, 30);
    
    const photos = uniqueImages.map((imageUrl, idx) => ({
      id: idx.toString(),
      imageUrl: imageUrl,
      link: `https://vsco.co/${username}/gallery`,
    }));

    return Response.json({ photos });
  } catch (error) {
    console.error('Error fetching VSCO:', error);
    return Response.json({ photos: [] }, { status: 200 });
  }
}
