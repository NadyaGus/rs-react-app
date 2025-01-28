async function showData(): Promise<void> {
  await fetch('https://api.jikan.moe/v4/anime?q=naruto&limit=10&page=1')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

export { showData };
