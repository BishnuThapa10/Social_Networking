import React from 'react'
import ProfileHeader from './ProfileHeader.jsx'
import { Card, CardContent, CardHeader } from '../../components/ui/card.jsx'
import PostList from '../post/PostList.jsx'
import { useGetPostsQuery } from '../post/postApi.js';

export default function MyProfile() {
   const {isLoading: loadingPosts, error: PostsError, data: posts} = useGetPostsQuery();
   console.log(posts);
  return (
    <div className='bg-gray-100 p-2 min-h-screen w-full space-y-2'>

      <ProfileHeader isOwner={true} />

      <Card className="max-w-3xl mx-auto shadow-lg rounded-2xl">
        <CardHeader className="px-4 pt-4 pb-2 shadow-none">
          <p className="text-sm text-gray-700 font-semibold">
              Posts
            </p>
        </CardHeader>
        <CardContent className="divide-y px-4">
            {loadingPosts ? (<div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <span className="ml-2 text-gray-600">Loading Posts...</span>
            </div>
            ) : PostsError ? (
              <div className="flex flex-col items-center py-6 gap-3">
                <p className="text-red-500 font-medium">
                  Failed to load posts
                </p>
              </div>
            ) : posts && posts.results && posts.results.length > 0 ? <PostList posts={posts.results}/>: (
              <p color="gray" className="text-center py-6">
                No posts found
              </p>
            )}
          </CardContent>
      </Card>
    </div>
  )
}
