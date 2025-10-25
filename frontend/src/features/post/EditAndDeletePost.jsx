import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button.jsx'
import { Ellipsis, Loader2Icon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu.jsx'
import { useDeletePostMutation, useLazyGetPostQuery, useUpdatePostMutation } from './postApi.js';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog.jsx';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { Textarea } from '../../components/ui/textarea.jsx';
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import { valSchema } from './validation.js';

export default function EditAndDeletePost({ id }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [preview, setPreview] = useState(null);
  const [getPost, { isFetching, error, data: post }] = useLazyGetPostQuery();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePost, {isLoading: isDeleting}] = useDeletePostMutation()

  useEffect(() => {
    if (openEdit) {
      getPost(id);
    } else {
      setPreview(null);
    }
  }, [openEdit, getPost, id]);

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handelRemoveImage = (setFieldValue) => {
    setFieldValue("image", null);
    setPreview(null);
  };

  const handelDelete = async() => {
    if(!window.confirm("Are you sure you want to delete this post?")) return;

    try{
      await deletePost(id).unwrap();
      toast.success("Delete Successfully")
    } catch(err) {
      toast.error(err?.data?.message || "Failed to delete post");
    }
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Ellipsis className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handelDelete} disabled={isDeleting} className="text-red-400 focus:text-red-600">
           {isDeleting ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Post Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-md p-2  gap-2">
          <DialogHeader className='flex items-center space-y-0 justify-center'>
            <DialogTitle className=' text-md text-blue-gray-500 font-semibold pointer-events-none'>
              Edit Post
            </DialogTitle>

          </DialogHeader>

          {isFetching ? (
            <div className="py-10 text-center text-gray-500">Loading post...</div>
          ) : error ? (
            <p className="text-red-500">{error.data?.message || 'Failed to load post'}</p>
          ) : post ? (
            <Formik
              enableReinitialize
              initialValues={{
                content: post.result.content || "",
                image: null
              }}

              onSubmit={async (val, { resetForm }) => {
                try {
                  const formData = new FormData();
                  formData.append("content", val.content);
                  if (val.image) {
                    formData.append("image", val.image);
                  }

                  const result = await updatePost({ id, formData }).unwrap();
                  if (result.error) {
                    const message = error?.data?.message || error?.error || "Something went wrong";
                    toast.error(message)
                  }
                  resetForm();
                  setPreview(null);
                  setOpenEdit(false);
                  toast.success("Post Update Successfully");
                } catch (err) {
                  const message = err?.data?.message || err?.error || "Something went wrong";
                  toast.error(message)
                }
              }}

              validationSchema={valSchema}

            >
              {({ handleChange, handleSubmit, setFieldValue, touched, errors, values }) => (
                <form onSubmit={handleSubmit} className='space-y-1'>
                  <div>
                    <Textarea
                      rows={5}
                      name="content"
                      onChange={handleChange}
                      value={values.content}
                      placeholder="What's happening?"
                      className="resize-none border-gray-300 focus:border-primary focus-visible:ring-0"
                    />
                    {touched.content && errors.content && <p className='text-red-500'>{errors.content}</p>}
                  </div>

                  {(preview || post.result.image?.url) && (
                    <div className="relative py-1">
                      <img
                        src={preview || post.result.image.url}
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
                              setPreview(post.result.image.url || null);
                            }

                          }}
                        />
                      </label>
                      {touched.image && errors.image && <p className='text-red-500'>{errors.image}</p>}
                    </div>

                    <Button
                      type="submit"
                      size="sm"
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                      disabled={isUpdating}
                    >
                      {isUpdating && <Loader2Icon className="animate-spin h-4 w-4" />}
                      Edit
                    </Button>

                  </div>
                </form>
              )}
            </Formik>
          ) : (<p className="text-gray-500">No post found.</p>)}


        </DialogContent>
      </Dialog>

    </div>
  )
}
