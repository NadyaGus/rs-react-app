import { CardsResponse } from '../types/cardTypes';

async function fetchData(str: string): Promise<CardsResponse> {
  const data = await fetch(
    `https://api.jikan.moe/v4/anime?q=${str}&limit=10&page=1`
  );
  return data.json();
}

export { fetchData };
