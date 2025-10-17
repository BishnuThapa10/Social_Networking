import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./appUrl.js";




export const mainApi = createApi({
  reducerPath : 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: 'include'}),
  endpoints: (builder) =>({})
});