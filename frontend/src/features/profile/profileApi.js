import { mainApi } from "../../app/mainApi.js";


const profileApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    getProfile: builder.query({
      query: () => ({
        url:'/profile',
        method:'GET'
      }),
      providesTags: ['Users']
    }),

    getUser: builder.query({
      query: (id) => ({
        url:`/users/${id}`,
        method:'GET'
      }),
      providesTags: ['Users']
    }),

    updateProfile: builder.mutation({
      query: ({id, formData}) => ({
        url: `/users/${id}`,
        body: formData,
        method:'PATCH'
      }),
      invalidatesTags: ['Users','ID']
    }),

  })
})

export const {useGetProfileQuery, useGetUserQuery, useUpdateProfileMutation} = profileApi;