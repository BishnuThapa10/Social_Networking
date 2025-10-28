import { mainApi } from "../../app/mainApi.js";


const likeCommentApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    likePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}/likes`,
        method: 'POST'
      }),
      invalidatesTags: (result, error, postId) => [
        { type: 'Posts', id: postId },
        { type: 'Posts', id: 'LIST' },
      ],
    }),

    commentPost: builder.mutation({
      query: ({postId, formData}) => ({
        url: `/posts/${postId}/comments`,
        body: formData,
        method: 'POST'
      }),
      invalidatesTags: (result, error,{postId}) => [
        { type: 'Posts', id: postId },
        { type: 'Posts', id: 'LIST' },
        { type: "Comments", id: postId },
      ],
    }),

    getcomments: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}/comments`,
        method: 'GET'
      }),
      providesTags: (result, error, postId) => [
        { type: "Comments", id: postId },
        { type: "Posts", id: postId },
      ],
    }),

  })
})

export const { useLikePostMutation, useCommentPostMutation, useGetcommentsQuery } = likeCommentApi;