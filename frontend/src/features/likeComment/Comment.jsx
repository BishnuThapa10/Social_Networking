import React, { useState } from 'react'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { useCommentPostMutation, useGetcommentsQuery } from './likeCommentApi.js';
import * as Yup from "yup";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog.jsx';
import { ScrollArea } from '../../components/ui/scroll-area.jsx';
import { Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar.jsx';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../../components/ui/button.jsx';
import { Formik } from 'formik';
import { Input } from '../../components/ui/input.jsx';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  text: Yup.string().trim().required("Comment cannot be empty"),
})

export default function Comment({ id }) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, isFetching } = useGetcommentsQuery(id);
  const [addComment, { isLoading: isAdding }] = useCommentPostMutation();
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="transition disabled:opacity-50 hover:bg-transparent cursor-pointer"
        onClick={() => setOpen(true)}
      // disabled={isLiking}
      >

        <ChatBubbleLeftIcon className="w-6 h-6 text-blue-gray-400" />

      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
          <DialogHeader className="border-b px-2 py-2 ">
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          {/* Scrollable comment list */}
          <ScrollArea className="h-[60vh] px-2 py-2 relative">
            {isLoading || isFetching ? (
              <div className='flex items-center justify-center py-10 text-muted-foreground'>
                <Loader2 className='mr-2 h-5 w-5 animate-spin'>Loading comments...</Loader2>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-10 text-red-500">
                <p>Failed to load comments.</p>
              </div>
            ) : data.comments.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                No comments yet.
              </p>
            ) : (
              <div className="space-y-2">
                {data.comments
                  .slice() // copy array to avoid mutating original
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((comment) => (

                    <div key={comment._id} className="rounded-lg border p-2 py-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={comment.author.profilePicture.url} alt={comment.author.username} />
                          <AvatarFallback>{comment.author.username ? comment.author.username[0].toUpperCase() : "U"}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-1 gap-2 items-center justify-between">
                          <p className="text-[10px] text-slate-900 select-none">
                            {comment.author.username}
                          </p>
                          <span className="text-[8px] text-gray-500 select-none">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{comment.text}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </ScrollArea>

          {/* Fixed input area */}
          <div className="sticky bottom-0 border-t bg-background p-3">
            <Formik
              initialValues={{ text: "" }}
              onSubmit={async (val, { resetForm }) => {
                try {
                  const formData = new FormData();
                  formData.append("text", val.text);
                  const res = await addComment({ postId: id, formData }).unwrap();
                  resetForm();
                  toast.success(res?.message || "Action successful");
                } catch (err) {
                  const message = err?.data?.message || err?.error || "Something went wrong";
                  toast.error(message)
                }
              }}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleSubmit, errors, touched, values }) => (
                <form onSubmit={handleSubmit} className="flex items-start gap-2">
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <Input
                      type="text"
                      name="text"
                      value={values.text}
                      onChange={handleChange}
                      placeholder="Write a comment..."
                      className="flex-1 rounded-full bg-gray-50 border-gray-200"
                    />

                    {/* Reserve space for error to prevent layout shift */}
                    <div className="h-4">
                      {touched.text && errors.text && (
                        <p className="text-xs text-red-500 mt-0.5">
                          {errors.text}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="sm"
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                    disabled={isAdding}
                  >
                    {isAdding && <Loader2 className="animate-spin h-4 w-4" />}
                    Send
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
