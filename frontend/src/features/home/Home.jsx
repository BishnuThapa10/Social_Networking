import React from 'react'
import PostList from '../post/PostList.jsx'
import { useGetPostsQuery } from '../post/postApi.js'
import CreatePost from '../post/CreatePost.jsx';


export default function Home() {
  const {isLoading, data, error} = useGetPostsQuery();

  if(isLoading) return <h1>Loading...</h1>
  if(error) return <h1 className='text-red-500'>{error.data.message}</h1>
  return (
    <div className='p-4 bg-gray-100'>
      <CreatePost/>
      {data && <PostList posts={data.results}/>}
    </div>
  )
}
