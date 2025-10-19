import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./appUrl.js";
import { getUserFromLocal } from "../features/local/local.js";



export const mainApi = createApi({
  reducerPath : 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',
    prepareHeaders : (headers) => {
      const user = getUserFromLocal();
      if (user?.token) {
        headers.set('Authorization',user.token);
      }
      return headers;
    },
  }),
  endpoints: (builder) =>({})
});