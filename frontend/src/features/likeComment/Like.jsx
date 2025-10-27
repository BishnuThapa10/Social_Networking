import React from 'react'
import { Button } from '../../components/ui/button.jsx'
import { HeartIcon as OutlineHeart } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeart } from '@heroicons/react/24/solid';
import { useLikePostMutation } from './likeCommentApi.js'
import toast from 'react-hot-toast';

export default function Like({ id, liked }) {
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();

  const handelLike = async () => {
    try {
      const res = await likePost(id).unwrap();
      toast.success(res?.message || "Action successful");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to perform action");
    }
  }
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="transition disabled:opacity-50 hover:bg-transparent"
        onClick={handelLike}
        disabled={isLiking}
      >
        {liked ? (
          <SolidHeart className="w-6 h-6 text-red-500" />
        ) : (
          <OutlineHeart className="w-6 h-6 text-red-500" />
        )}
      </Button>
      {/* <i className="fa-regular fa-heart fa-md text-blue-gray-500" /> */}
    </div>
  )
}
