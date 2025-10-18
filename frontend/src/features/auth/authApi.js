import { mainApi } from "../../app/mainApi.js";



export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    loginUser: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        body: data,
        method: 'POST'
      })

    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: '/users/register',
        body: data,
        method: 'POST'
      })

    })
  })
})

export const {useLoginUserMutation, useRegisterUserMutation} = authApi