
import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
  Card,
  CardHeader,
  CardContent
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Ellipsis, X } from 'lucide-react'
import EditAndDeletePost from './EditAndDeletePost.jsx'
import Like from '../likeComment/Like.jsx'

export default function PostList({ posts, isOwner}) {
  const [open, setOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const handleOpen = (post) => {
    setSelectedPost(post)
    setOpen(true)
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {posts.map((post) => (
        <Card
          key={post._id}
          className="w-full mx-auto max-w-4xl rounded-2xl shadow-md p-4 transition-shadow hover:shadow-lg space-y-2"
        >
          <CardHeader className="flex flex-row items-center justify-center gap-2 p-0 space-y-0 ">
            <Avatar className="h-9 w-9">
              <AvatarImage src={post.author.profilePicture.url} alt={post.author.username} />
              <AvatarFallback>{post.author.username ? post.author.username[0].toUpperCase() : "U"}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col flex-1 gap-0.5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 select-none">
                    {post.author.username}
                  </span>
                  <span className="text-xs  text-gray-500 select-none">
                    {/* using date-fns libary to show time */}
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </span>
                </div>

                {/* Action Button */}
                {isOwner ? <EditAndDeletePost id={post._id}/> :(<Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Ellipsis className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </Button>)}
                
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-2">
            <div onClick={() => handleOpen(post)} className="cursor-pointer space-y-2">
              <p className="text-sm text-slate-800 dark:text-slate-200 select-none text-justify">
                {post.content.length > 150 ? (
                  <>
                    {post.content.slice(0, 150)}...
                    <span className="inline-block bg-gray-100 text-gray-500 hover:text-gray-700 px-2 py-0.5 rounded-full text-sm font-medium cursor-pointer transition-colors">
                      See more
                    </span>
                  </>
                ) : (
                  post.content
                )}
              </p>

              {post.image.url && (<div className="overflow-hidden rounded-xl w-full">
                <img
                  src={post.image.url}
                  alt="Post image"
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                />
              </div>)}

            </div>

            <div className="gap-4 flex items-center justify-end">
              <div className="space-x-1 flex items-center">
                <Like id={post._id} liked={post.liked}/>
                <span className="text-sm text-blue-gray-500 select-none">{post.likesCount}</span>
              </div>
              <div className="space-x-1 flex items-center">
                <i className="fa-regular fa-comment fa-md text-blue-gray-500" />
                <span className="text-sm text-blue-gray-500 select-none">{post.commentsCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Post Detail Dialog */}
      {selectedPost && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader className="flex flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={selectedPost.author.profilePicture.url} alt={selectedPost.author.username} />
                  <AvatarFallback>{selectedPost.author.username ? selectedPost.author.username[0].toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <DialogTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100 select-none">
                    {selectedPost.author.username}
                  </DialogTitle>
                  <span className="text-xs text-gray-500 dark:text-gray-400 select-none">
                    {formatDistanceToNow(new Date(selectedPost.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>

              {/* <DialogClose asChild>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="w-5 h-5 text-gray-600" />
                </Button>
              </DialogClose> */}
            </DialogHeader>

            <div>
              <p className="text-sm text-slate-800 dark:text-slate-200 mb-3 select-none text-justify">
                {selectedPost.content}
              </p>
               {selectedPost.image.url && (<div className="overflow-hidden rounded-xl w-full">
                <img
                  src={selectedPost.image.url}
                  alt="Post image"
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                />
              </div>)}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
