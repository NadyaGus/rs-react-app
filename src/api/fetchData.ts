import { CardsResponse } from '../types/cardTypes';

async function fetchData(str: string, page = 1): Promise<CardsResponse> {
  const data = await fetch(
    `https://api.jikan.moe/v4/anime?q=${str}&limit=10&page=${page}`
  );
  return data.json();
}

export { fetchData };
