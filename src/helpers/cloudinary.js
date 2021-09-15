import { v2 } from 'cloudinary';

export const uploader = async (file) => {
    console.log(file);
    const upload = await v2.uploader.upload(file);
    console.log(upload);
    return upload.secure_url;
}