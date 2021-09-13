import { v2 } from 'cloudinary';

export const uploader = async (file) => {
    const upload = await v2.uploader.upload(file);
    return upload.secure_url;
}