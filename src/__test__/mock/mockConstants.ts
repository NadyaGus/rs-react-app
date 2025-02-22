import animeData from './animeData.json';

export const mockConstants = {
  mockAnimeWithData: 'naruto',
  mockAnimeNoData: 'naruto12345',
  mockAnimeId: 20,
  mockAnimeDetailsError: animeData.data[1],
} as const;
