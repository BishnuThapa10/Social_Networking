import { Avatar, Card, CardHeader, Dialog, DialogBody,  DialogHeader, IconButton, Textarea, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Input } from '../../components/ui/input.jsx'
import { FaceSmileIcon, MapPinIcon, PaperClipIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/button.jsx';


export default function CreatePost() {
  const [open, setOpen] = useState(false);
  const handelopen = () => setOpen(true);
  return (
    <div>
      <Card className="w-full mx-auto max-w-4xl bg-white rounded-2xl shadow-lg p-3 transition-all duration-300 hover:shadow-xl cursor-pointer border border-gray-200"
        onClick={() => handelopen()}>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 p-0 mt-0">
          <Avatar
            size="sm"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="tania andrew"
          />
          <Input
            placeholder="What's on your mind?"
            name="design"
            size="md"
            className="flex-1 rounded-full bg-gray-50 border-gray-200 pointer-events-none"
          />
        </CardHeader>
        <div className="flex justify-between items-center pt-2">
          <div className='flex items-center gap-2'>
            <PhotoIcon className='w-5 h-5 text-gray-500' />
            <PaperClipIcon className='w-5 h-5 text-gray-500' />
            <MapPinIcon className='w-5 h-5 text-gray-500' />
            <FaceSmileIcon className='w-5 h-5 text-gray-500' />
          </div>
          <Button variant="outline" size="sm" className="rounded-lg pointer-events-none">
            Post
          </Button>
        </div>
      </Card>

      {/* Create post from */}
      <Dialog size="sm" open={open} handler={() => setOpen(false)} className="p-2">
        <DialogHeader className='p-2 flex items-center'>
          <Typography color="blue-gray" className='pointer-events-none'>
            Create Post
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={() => setOpen(false)}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-2 p-2 ">
          <form >
            <Textarea
              rows={5}
              placeholder="What's happening?"
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white !text-black ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              labelProps={{
                className: "hidden",
              }}
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-3 text-gray-500 dark:text-gray-300">
                <label className="cursor-pointer hover:text-blue-500 transition">
                  <PhotoIcon className="h-6 w-6" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition"
              >
                Post
              </button>
            </div>
          </form>

        </DialogBody>
      </Dialog>
    </div>
  )
}
