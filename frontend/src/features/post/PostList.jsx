import { EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon } from '@heroicons/react/16/solid'
import { Avatar, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'

export default function PostList() {
  return (
    <div >
      <Card className="w-full mx-auto max-w-4xl bg-gray-100 rounded-2xl shadow-md p-3 transition-shadow hover:shadow-lg">
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
          {/* <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 select-none">
                Tania Andrew
              </div>
              <button
                // onClick={() => alert('Clicked!')}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition">
                <EllipsisHorizontalIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 select-none">@tania_dev · 2h</div>

          </div> */}
          
          {/* User Info */}
          <div className="flex flex-col flex-1 gap-0.5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 select-none">
                  Tania Andrew
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 select-none">
                  @tania_dev · 2h
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
          <Typography className="text-sm text-slate-800 dark:text-slate-200 mb-3 select-none">
            &quot;I found solution to all my design needs from Creative Tim. I use
            them as a freelancer in my hobby projects for fun! And its really
            affordable, very humble guys !!!&quot;
          </Typography>
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Post image"
              className="w-full h-64 object-cover"
            />
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
    </div >
  )
}
