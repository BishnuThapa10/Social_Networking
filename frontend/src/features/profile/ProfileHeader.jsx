import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar.jsx'
import { Button } from '../../components/ui/button.jsx';

export default function ProfileHeader({ isOwner }) {
  const user = {
    username: "bishnu_thapa",
    displayName: "Bishnu Thapa",
    profilePic: "https://avatars.githubusercontent.com/u/1?v=4",
    coverPhoto: "https://images.unsplash.com/photo-1503264116251-35a269479413",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel ligula scelerisque, finibus odio a, dignissim libero. Aenean nec velit vitae sem faucibus aliquet. Suspendisse potenti. Integer vitae purus ut magna commodo.",
    posts: 120,
    followers: 840,
    following: 305,
  };
  return (
    <div className="max-w-3xl mx-auto rounded-2xl shadow-md overflow-hidden bg-white">
      {/* Profile Info Section */}
      <div className="pt-6 pb-6 px-6">
        {/* Username + Button Row */}
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className='flex items-center gap-3'>
            <Avatar size='lg'>
              <AvatarImage src={user.profilePic} alt={user.username} />
              <AvatarFallback>
                {user.username ? user.username[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>

            <p className="text-sm text-gray-900">
              @{user.username}
            </p>
          </div>
          {isOwner ? (
            <Button variant="default" size='sm' className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition">Edit Profile</Button>
          ) : (
            <Button size='sm' className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition">Follow</Button>
          )}
        </div>
        {/* Bio */}
        {user.bio && (
          <p className="mt-3 text-gray-700 text-justify text-sm ">
            {user.bio}
          </p>
        )}
        <div className="flex space-x-6 mt-4 text-sm text-gray-600">
          <span>
            <strong className="text-gray-800">
              {user.posts}
            </strong>{" "}
            Posts
          </span>
          <span>
            <strong className="text-gray-800">
              {user.followers}
            </strong>{" "}
            Followers
          </span>
          <span>
            <strong className="text-gray-800">
              {user.following}
            </strong>{" "}
            Following
          </span>
        </div>
      </div>

    </div>
  )
}
