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

  })
})

export const { useLikePostMutation } = likeCommentApi;