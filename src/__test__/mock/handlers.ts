import { http, HttpResponse } from 'msw';
import animeData from './animeData.json';

export const handlers = [
  http.get('https://api.jikan.moe/v4/anime', ({ request }) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('q');

    if (searchQuery === 'naruto') {
      return HttpResponse.json(animeData);
    }
    if (searchQuery === 'naruto12345') {
      return HttpResponse.json({
        pagination: {
          last_visible_page: 1,
          has_next_page: false,
          current_page: 1,
          items: {
            count: 0,
            total: 0,
            per_page: 10,
          },
        },
        data: [],
      });
    }
  }),
  http.get(`https://api.jikan.moe/v4/anime/20`, () => {
    return HttpResponse.json(animeData.data[0]);
  }),
];
