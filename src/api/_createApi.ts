import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CardProps, CardsResponse } from '../shared/types/cardTypes';

export const endPoints = {
  search: '/anime?q=',
  details: '/anime/',
};

export const jikanApi = createApi({
  reducerPath: 'jikanApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (builder) => ({
    getResults: builder.query<CardsResponse, { q: string[]; page: string[] }>({
      query: (params) => ({
        url: endPoints.search,
        params: { limit: 10, q: params.q.join(''), page: params.page.join('') },
      }),
    }),
    getDetails: builder.query<{ data: CardProps }, { id: string[] }>({
      query: (id) => endPoints.details + id.id.join(''),
    }),
  }),
});

export const { useGetResultsQuery, useGetDetailsQuery } = jikanApi;
