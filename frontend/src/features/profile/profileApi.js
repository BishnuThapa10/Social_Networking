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

    // createPost: builder.mutation({
    //   query: ({formData}) => ({
    //     url: '/posts',
    //     body: formData,
    //     method:'POST'
    //   }),
    //   invalidatesTags: ['Posts','ID']
    // }),

  })
})

export const {useGetProfileQuery} = profileApi;