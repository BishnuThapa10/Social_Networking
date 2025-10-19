import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/16/solid'
import { Avatar, Button, Card, CardBody, CardHeader, Dialog, DialogBody, DialogHeader, Typography } from '@material-tailwind/react'
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function PostList({ posts }) {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const handelOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };
  return (
    <div className='grid grid-cols-1 gap-4 p-4' >
      {posts.map((post) => {
        return <Card key={post._id} className="w-full mx-auto max-w-4xl bg-gray-100 rounded-2xl shadow-md p-3 transition-shadow hover:shadow-lg">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-2 mt-0">
            <Avatar
              size="sm"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />

            {/* User Info */}
            <div className="flex flex-col flex-1 gap-0.5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 select-none">
                    Tania Andrew
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 select-none">
                    {/* using date-fns libary to show time */}
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    {/* {new Date(post.createdAt).toLocaleDateString()} */}
                  </span>
                </div>

                {/* Action Button */}
                <button
                  // onClick={() => alert('Clicked!')}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition">
                  <EllipsisHorizontalIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

          </CardHeader>
          <CardBody className=" p-0">
            <div onClick={() => handelOpen(post)} className='cursor-pointer'>
              <Typography className="text-sm text-slate-800 dark:text-slate-200 mb-3 select-none text-justify">
                {post.content.length > 150 ? (<>
                  {post.content.slice(0, 150)}...
                  <span className=" inline-block bg-gray-100 text-gray-500 hover:text-gray-700 px-2 py-0.5 rounded-full text-sm font-medium cursor-pointer transition-colors">
                    See more
                  </span>
                </>) : (post.content)}
              </Typography>
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Post image"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            <div className="mt-2 gap-4 flex items-center justify-end">
              <div className='space-x-1'>
                <i className={`fa-regular fa-heart fa-md text-blue-gray-500`} />
                <span className='text-sm text-blue-gray-500 select-none'>1</span>
              </div>
              <div className='space-x-1'>
                <i className={`fa-regular fa-comment fa-md text-blue-gray-500`} />
                <span className='text-sm text-blue-gray-500 select-none'>2</span>
              </div>

            </div>
          </CardBody>
        </Card>
      })}

      {/* Post Detail Dialog */}
      {selectedPost && (
        <Dialog open={open} handler={() => setOpen(false)} size='md'>
          <DialogHeader className="mx-0 flex items-center gap-4 pt-2 pb-2 mt-0">
            <Avatar
              size="sm"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />
            <div className="flex flex-col flex-1 gap-0.5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 select-none">
                    Tania Andrew
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 select-none">
                    {formatDistanceToNow(new Date(selectedPost.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-gray-700 hover:bg-gray-200 cursor-pointer"
                  onClick={() => setOpen(false)} />
              </div>

            </div>

          </DialogHeader>

          <DialogBody>
            <Typography className="text-sm text-slate-800 dark:text-slate-200 mb-3 select-none text-justify">
              {selectedPost.content}
            </Typography>
            <div className="overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                alt="Post image"
                className="w-full h-64 object-cover"
              />
            </div>
          </DialogBody>
        </Dialog>
      )}

    </div >
  )
}
