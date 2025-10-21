
import multer from "multer";
import cloudinary from "../utils/cloudinaryConfig.js";
import streamifer from "streamifier";

export const upload = (
  folderName,
  option = { width: 500, height: 500, crop: "limit", maxSizeMb: 2}
) => {
  // Multer Memory Storage
  const storage = multer.memoryStorage();
  
  // Multer Upload Configuration
  const multerUpload = multer({
    storage,
    limits: { fileSize: option.maxSizeMb * 1024 * 1024 },
    fileFilter:(req, file, cb) => {
      if(!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are alllowed!"));
      }
      cb(null, true);
    },
  });

  // Cloudinary Upload Function
  const uploadToCloudinary = (fileBuffer, fileName) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `social_networking/${folderName}`,
          public_id: `${Date.now()}_${fileName}`,
          transformation: [
            {width: option.width, height:option.height, crop:option.crop},
          ],
        },
        (error, result) => {
          if(error) reject(error);
          else resolve(result);
        }
      );
      streamifer.createReadStream(fileBuffer).pipe(stream);
    });
  };

  return {
    multerUpload,
    uploadToCloudinary,
  };
};