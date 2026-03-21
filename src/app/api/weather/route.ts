export async function GET() {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-23.5505&longitude=-46.6333&current=temperature_2m,weather_code&timezone=America/Sao_Paulo',
      { next: { revalidate: 1800 } } // 30 min cache
    );

    if (!response.ok) throw new Error('Failed to fetch weather');

    const data = await response.json();
    const current = data.current;

    return Response.json({
      temperature: Math.round(current.temperature_2m),
      weatherCode: current.weather_code,
      city: 'Sao Paulo',
    });
  } catch (error) {
    console.error('Weather fetch error:', error);
    return Response.json({ error: 'Failed to fetch weather' }, { status: 200 });
  }
}
