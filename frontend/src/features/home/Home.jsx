import React from 'react'
import PostList from '../post/PostList.jsx'
import { useGetPostsQuery } from '../post/postApi.js'
import CreatePost from '../post/CreatePost.jsx';
import { useGetProfileQuery } from '../profile/profileApi.js';


export default function Home() {
  const {isLoading, data, error} = useGetPostsQuery();
  const {isLoading : loadingProfile, data: profile, error: profileError} = useGetProfileQuery();

  if(isLoading || loadingProfile) return <h1>Loading...</h1>
  if(profileError) return <h1 className='text-red-500'>{profileError.data.message}</h1>
  if(error ) return <h1 className='text-red-500'>{error.data.message}</h1>
  return (
    <div className='p-4 bg-gray-100'>
      <CreatePost profile={profile} isOwner={false} />
      {data && <PostList posts={data.results}/>}
    </div>
  )
}
