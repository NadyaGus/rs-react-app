import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CardProps, CardsResponse } from '../types/cardTypes';

export const endPoints = {
  search: '/anime?q=',
  details: '/anime/',
};
// Define a service using a base URL and expected endpoints
export const jikanApi = createApi({
  reducerPath: 'jikanApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (builder) => ({
    getResults: builder.query<CardsResponse, string>({
      query: (search) => ({
        url: endPoints.search,
        params: { limit: 10, q: search, page: 1 },
      }),
    }),
    getPageBySearch: builder.query<CardsResponse, string>({
      query: (page) => ({
        url: endPoints.search,
        params: { limit: 10, page },
      }),
    }),
    getDetails: builder.query<{ data: CardProps }, string>({
      query: (id) => endPoints.details + id,
    }),
  }),
});

export const {
  useGetPageBySearchQuery,
  useGetResultsQuery,
  useGetDetailsQuery,
} = jikanApi;
