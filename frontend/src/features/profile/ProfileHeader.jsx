import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar.jsx'
import { Button } from '../../components/ui/button.jsx';
import { useNavigate } from 'react-router';

export default function ProfileHeader({profile, isOwner }) {
  const nav = useNavigate();
  const user = {
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
              <AvatarImage src={profile.profilePicture.url} alt={profile.username} />
              <AvatarFallback>
                {profile.username ? profile.username[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>

            <p className="text-sm text-gray-900">
              @{profile.username}
            </p>
          </div>
          {isOwner ? (
            <Button
            onClick={() => nav(`/profile-update/${profile._id}`)}
            variant="default"
            size='sm'
            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition">Edit Profile</Button>
          ) : (
            <Button
             size='sm' 
             className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition">Follow</Button>
          )}
        </div>
        {/* Bio */}
        {profile.bio && (
          <p className="mt-3 text-gray-700 text-justify text-sm ">
            {profile.bio}
          </p>
        )}
        <div className="flex space-x-6 mt-4 text-sm text-gray-600">
          <span>
            <strong className="text-gray-800">
              {profile.postCount}
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
