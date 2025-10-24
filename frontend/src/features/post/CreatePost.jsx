// import { Dialog, DialogBody, DialogHeader, Textarea, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Input } from '../../components/ui/input.jsx'
import { FaceSmileIcon, MapPinIcon, PaperClipIcon, PhotoIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/button.jsx';
import { Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useCreatePostMutation } from './postApi.js';
import { Card, CardHeader } from '../../components/ui/card.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog.jsx';
import { Textarea } from '../../components/ui/textarea.jsx';
import { Loader2Icon } from 'lucide-react';

const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', ''];

const valSchema = Yup.object({
  content: Yup.string().required().max(280, "Post cannot exceed 280 characters"),
  image: Yup.mixed().nullable().test('fileType', 'Invalid input type', (val) => {
    if (!val) return true;
    return val && supportedFormats.includes(val.type);
  }).test('fileSize', 'File size is too large', (val) => {
    if (!val) return true;
    return val && val.size <= 5 * 1024 * 1024;
  }),
});

export default function CreatePost({profile}) {
  const [open, setOpen] = useState(false);
  const handelopen = () => setOpen(true);
  const [preview, setPreview] = useState(null);
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handelRemoveImage = (setFieldValue) => {
    setFieldValue("image", null);
    setPreview(null);
  };
  return (
    <div>
      <Card className="w-full mx-auto max-w-4xl bg-white rounded-2xl shadow-lg p-3 transition-all duration-300 hover:shadow-xl cursor-pointer border border-gray-200"
        onClick={() => handelopen()}>
        <CardHeader className="mx-0 flex flex-row items-center gap-4 p-0 mt-0 justify-center space-y-0">
          <Avatar key={profile.id} className="h-9 w-9 ">
            <AvatarImage src={profile.profilePicture.url} alt={profile.username} />
            <AvatarFallback>{profile.username ? profile.username[0].toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
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
          <Button variant="outline" size="sm" className="rounded-lg bg-[#5285F2] text-white pointer-events-none">
            Post
          </Button>
        </div>
      </Card>

      {/* Create post from */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-2  gap-2">
        <DialogHeader className='flex items-center space-y-0 justify-center'>
          <DialogTitle className=' text-md text-blue-gray-500 font-semibold pointer-events-none'>
            Create Post
          </DialogTitle>
          {/* <XMarkIcon size="sm" className="h-4 w-4 stroke-2 !absolute right-3.5 top-3.5  text-gray-600 hover:text-gray-700 hover:bg-gray-200 cursor-pointer"
            onClick={() => setOpen(false)} /> */}

        </DialogHeader>
          <Formik
            initialValues={{
              content: "",
              image: null
            }}

            onSubmit={async (val, { resetForm }) => {
              try {
                const formData = new FormData();
                formData.append("content", val.content);
                formData.append("image", val.image);

                const result = await createPost({ formData }).unwrap();
                if (result.error) {
                  const message = error?.data?.message || error?.error || "Something went wrong";
                  toast.error(message)
                }
                resetForm();
                setPreview(null);
                setOpen(false);
                toast.success("Post Created");
              } catch (err) {
                const message = err?.data?.message || err?.error || "Something went wrong";
                toast.error(message)
              }
            }}

            validationSchema={valSchema}

          >
            {({ handleChange, handleSubmit, setFieldValue, touched, errors }) => (
              <form onSubmit={handleSubmit} className='space-y-1'>
                <div>
                  <Textarea
                    rows={5}
                    name="content"
                    onChange={handleChange}
                    placeholder="What's happening?"
                    className="resize-none border-gray-300 focus:border-primary focus-visible:ring-0"
                  />
                  {touched.content && errors.content && <p className='text-red-500'>{errors.content}</p>}
                </div>

                {preview && (
                  <div className="relative py-1">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-40 w-full object-contain rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => handelRemoveImage(setFieldValue)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-gray-500 dark:text-gray-300">
                    <label className="cursor-pointer hover:text-blue-500 transition">
                      <PhotoIcon className="h-6 w-6" />
                      <input
                        type="file"
                        accept="image/*"
                        name='image'
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFieldValue('image', file);
                          if (file) {
                            setPreview(URL.createObjectURL(file));
                          } else {
                            setPreview(null);
                          }

                        }}
                      />
                    </label>
                    {touched.image && errors.image && <p className='text-red-500'>{errors.image}</p>}
                  </div>

                  {isLoading ? <Button size='sm' className="bg-blue-500 text-white px-4 py-1 rounded-lg" disabled>
                  <Loader2Icon className="animate-spin" />
                  Please wait
                </Button> : <Button
                    type="submit"
                    size='sm'
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                  >
                    Post
                  </Button>}
                  
                </div>
              </form>
            )}
          </Formik>

        </DialogContent>
      </Dialog>
    </div>
  )
}
