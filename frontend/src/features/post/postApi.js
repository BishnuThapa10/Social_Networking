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

     getPost: builder.query({
      query: (id) => ({
        url:`/posts/${id}`,
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

    updatePost: builder.mutation({
      query: ({id, formData}) => ({
        url: `/posts/${id}`,
        body: formData,
        method:'PATCH'
      }),
      invalidatesTags: ['Posts','ID']
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method:'DELETE'
      }),
      invalidatesTags: ['Posts','ID']
    }),

  })
})

export const {useGetPostsQuery, useCreatePostMutation, useOwnerPostsQuery, useGetPostQuery, useLazyGetPostQuery, useUpdatePostMutation, useDeletePostMutation} = postApi;