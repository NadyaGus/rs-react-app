async function showData(): Promise<void> {
  const data = await fetch(
    'https://api.jikan.moe/v4/anime?q=naruto&limit=10&page=1'
  );
  return data.json();
}

export { showData };
