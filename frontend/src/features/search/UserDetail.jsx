import React from 'react'
import { useGetUserQuery } from '../profile/profileApi.js'
import { getAuthUser } from '../../lib/auth.js'
import ProfileHeader from '../profile/ProfileHeader.jsx';
import { useGetPostQuery, useGetPostsQuery } from '../post/postApi.js';
import { Card, CardContent, CardHeader } from '../../components/ui/card.jsx';
import PostList from '../post/PostList.jsx';

export default function UserDetail({ userId }) {
  const auth = getAuthUser();
  const { data: user, isLoading, isError } = useGetUserQuery(userId, {
    skip: !userId, // don’t fetch unless we have an ID
  })
  // Fetch posts unconditionally too, skip if no user._id yet
  const { isLoading: loadingPosts, error: postsError, data: posts } = useGetPostsQuery(
    { authorId: user?._id },
    { skip: !user?._id } // skip until we have user._id
  );
  if (!userId) return <p className="mt-4 text-gray-500">No user selected</p>
  if (isLoading) return <p className="mt-4 text-gray-500">Loading user details...</p>
  if (isError) return <p className="mt-4 text-red-500">Error loading user details</p>
  const postCount = posts?.results?.length || 0;
  const userProfile = { ...user, postCount }
  console.log(postsError);
  return (
    <div className='p-2 min-h-screen w-full space-y-2'>
      <ProfileHeader profile={userProfile} isOwner={auth.id == user._id ? true : false} />

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
                  ) : postsError ? (
                    <div className="flex flex-col items-center py-6 gap-3">
                      <p className="text-red-500 font-medium">
                        Failed to load posts
                      </p>
                    </div>
                  ) : posts && posts.results && posts.results.length > 0 ? <PostList posts={posts.results} isOwner={auth.id == user._id ? true : false}/>: (
                    <p color="gray" className="text-center py-6">
                      No posts found
                    </p>
                  )}
                </CardContent>
            </Card>
    </div>
  )
}
