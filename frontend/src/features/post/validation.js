import * as Yup from 'yup';

const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', ''];

export const valSchema = Yup.object({
  content: Yup.string().required().max(280, "Post cannot exceed 280 characters"),
  image: Yup.mixed().nullable().test('fileType', 'Invalid input type', (val) => {
    if (!val) return true;
    return val && supportedFormats.includes(val.type);
  }).test('fileSize', 'File size is too large', (val) => {
    if (!val) return true;
    return val && val.size <= 5 * 1024 * 1024;
  }),
});