import { mainApi } from "../../app/mainApi.js";


const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    searchUser: builder.query({
      query: (term) => ({
        url:`/users`,
        params:{
          q: term
        },
        method:'GET'
      }),
      providesTags: ['Users']
    }),

  })
})

export const {useLazySearchUserQuery} = searchApi;