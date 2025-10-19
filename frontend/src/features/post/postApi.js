import { mainApi } from "../../app/mainApi.js";


const postApi = mainApi.injectEndpoints({
  endpoints: (builders) => ({

    getPosts: builders.query({
      query: () => ({
        url:'/posts',
        method:'GET'
      }),
      providesTags: ['Posts']
    }),

  })
})

export const {useGetPostsQuery} = postApi;