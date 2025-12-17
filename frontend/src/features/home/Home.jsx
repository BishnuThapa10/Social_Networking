import React from 'react'
import PostList from '../post/PostList.jsx'
import { useGetPostsQuery } from '../post/postApi.js'
import CreatePost from '../post/CreatePost.jsx';
import { useGetProfileQuery } from '../profile/profileApi.js';


export default function Home() {
  const { isLoading, data, error } = useGetPostsQuery();
  const { isLoading: loadingProfile, data: profile, error: profileError } = useGetProfileQuery();

  if (isLoading || loadingProfile) {
    return (
      <main className='p-4'>
        <p role="status">Loading...</p>
      </main>
    )
  }
  if (profileError) {
    return (
      <main className='p-4'>
        <p role='alert' className='text-red-500'>
          {profileError?.data?.message || 'Something went wrong'}
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className='p-4'>
        <p role='alert' className='text-red-500'>
          {error?.data?.message || 'Something went wrong'}
        </p>
      </main>
    )
  }
  return (
    // <div className='p-4 bg-gray-100'>
    //   <CreatePost profile={profile} isOwner={false} />
    //   {data && <PostList posts={data.results} />}
    // </div>
    <main className='p-4 bg-gray-100 min-h-screen'>
      <section aria-label='Create Post'>
        <CreatePost profile={profile} isOwner={false} />
      </section>

      <section aria-label='Post List'>
        {data?.results?.length > 0 && (
          <PostList posts={data.results} />
        )}
      </section>
    </main>
  )
}
