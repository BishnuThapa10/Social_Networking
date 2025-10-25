import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '../../components/ui/card.jsx'
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { Textarea } from '../../components/ui/textarea.jsx';
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useGetUserQuery, useUpdateProfileMutation } from './profileApi.js';
import { Button } from '../../components/ui/button.jsx';
import { Loader2Icon } from 'lucide-react';
import { Label } from '../../components/ui/label.jsx';
import { Input } from '../../components/ui/input.jsx';
import { useNavigate, useParams } from 'react-router';
import * as Yup from 'yup';

const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', ''];

const valSchema = Yup.object({
  username: Yup.string().required().max(50).min(5),
  bio: Yup.string().required().max(300, "Post cannot exceed 300 characters"),
  profilePicture: Yup.mixed().nullable().test('fileType', 'Invalid input type', (val) => {
    if (!val) return true;
    return val && supportedFormats.includes(val.type);
  }).test('fileSize', 'File size is too large', (val) => {
    if (!val) return true;
    return val && val.size <= 2 * 1024 * 1024;
  }),
});

export default function UpdateProfile() {
  const {id} = useParams();
  const {isLoading : loadingProfile, data: profile, error: profileError} = useGetUserQuery(id);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const nav = useNavigate();
  const [preview, setPreview] = useState(null);
  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handelRemoveImage = (setFieldValue) => {
    setFieldValue("profilePicture", null);
    setPreview(null);
  };

   if(loadingProfile) return <h1>Loading...</h1>
   if(profileError) return <h1 className='text-red-500'>{profileError.data.message}</h1>

  return (
    <div className='bg-gray-100 p-2 min-h-screen w-full'>
      <Card className="max-w-3xl mx-auto shadow-lg rounded-2xl">
        <CardHeader className="px-4 pt-4 pb-2 shadow-none">
          <p className="text-sm text-gray-700 font-semibold">
            Edit Profile
          </p>
        </CardHeader>
        <CardContent className="divide-y px-4">
          <Formik
            initialValues={{
              username: profile.username || "",
              profilePicture: null,
              bio: profile.bio || ""

            }}

            onSubmit={async (val, { resetForm }) => {
              try {
                const formData = new FormData();
                formData.append("username", val.username);
                formData.append("bio", val.bio)
                if (val.profilePicture) {
                  formData.append("profilePicture", val.profilePicture);
                }

                const result = await updateProfile({ id, formData }).unwrap();
                if (result.error) {
                  const message = error?.data?.message || error?.error || "Something went wrong";
                  toast.error(message)
                }
                resetForm();
                toast.success("Post Update Successfully");
                nav(-1);
              } catch (err) {
                const message = err?.data?.message || err?.error || "Something went wrong";
                toast.error(message)
              }
            }}

          validationSchema={valSchema}

          >
            {({ handleChange, handleSubmit, setFieldValue, touched, errors, values }) => (
              <form onSubmit={handleSubmit} className='space-y-1'>
                <div className="grid gap-2">
                  <Label>Username</Label>
                  <Input
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                  />
                  {touched.username && errors.username && <p className='text-red-500'>{errors.username}</p>}
                </div>
                <div>
                  <Label>Bio</Label>
                  <Textarea
                    rows={5}
                    name="bio"
                    onChange={handleChange}
                    value={values.bio}
                    placeholder="Write about yourself (optional)"
                    className="resize-none border-gray-300 focus:border-primary focus-visible:ring-0"
                  />
                  {touched.bio && errors.bio && <p className='text-red-500'>{errors.bio}</p>}
                </div>

                {(preview || profile.profilePicture?.url) && (
                  <div className="relative py-1">
                    <img
                      src={preview || profile.profilePicture?.url}
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
                  <div className="flex gap-3 items-center">
                    <Label>ProfilePicture</Label>
                    <label className="cursor-pointer  text-gray-500 hover:text-blue-500 transition">
                      <PhotoIcon className="h-6 w-6" />
                      <input
                        type="file"
                        accept="image/*"
                        name='profilePicture'
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFieldValue('profilePicture', file);
                          if (file) {
                            setPreview(URL.createObjectURL(file));
                          }
                          else {
                            setPreview(profile.profilePicture?.url || null);
                          }

                        }}
                      />
                    </label>
                    {touched.profilePicture && errors.profilePicture && <p className='text-red-500'>{errors.profilePicture}</p>}
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
        </CardContent>
      </Card>
    </div>
  )
}
