import { mainApi } from "../../app/mainApi.js";


const postApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    getPosts: builder.query({
      query: () => ({
        url:'/posts',
        method:'GET'
      }),
      providesTags: ['Posts']
    }),

    createPost: builder.mutation({
      query: ({formData}) => ({
        url: '/posts',
        body: formData,
        // headers: {
        //   Authorization: token
        // },
        method:'POST'
      }),
      invalidatesTags: ['Posts','ID']
    }),

    OwnerPosts: builder.query({
      query: () => ({
        url:'/posts',
        params:{
          mine: true
        },
        method:'GET'
      }),
      providesTags: ['Posts']
    }),

  })
})

export const {useGetPostsQuery, useCreatePostMutation, useOwnerPostsQuery} = postApi;