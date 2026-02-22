import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MovieApiArgs } from "./movieApiSlice.types";

export const movieApiSlice = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_TMDB_API_KEY;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: () => "/movie/popular",
    }),
    getNowPlayingMovies: builder.query({
      query: () => "/movie/now_playing",
    }),
    getUpcomingMovies: builder.query({
      query: () => "/movie/upcoming",
    }),
    getTopRatedMovies: builder.query({
      query: () => "/movie/top_rated",
    }),
    getMovieByTitle: builder.query({
      query: ({ searchValue }) => `/search/movie?query=${searchValue}`,
    }),
    getMovieById: builder.query({
      query: (id) => `/movie/${id}/`,
    }),
    getMoviesByCategory: builder.query({
      query: ({ category, page }) => ({
        url: `/movie/${category}`,
        params: { page },
      }),
    }),
    getMoviesByDiscover: builder.query({
      query: (args: MovieApiArgs) => ({
        url: "/discover/movie",
        params: args,
      }),
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetMovieByTitleQuery,
  useGetMovieByIdQuery,
  useGetMoviesByCategoryQuery,
  useGetMoviesByDiscoverQuery,
} = movieApiSlice;
