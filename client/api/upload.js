import urls from "../utils/urls";

const upload_avatar = async (image) => {
    const formData = new FormData();
    formData.append("file",image)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(urls.cloudinary_url, {
        method: "post",
        body: formData
    })

    return response.json();
}

const upload_post_media_files = async (media_url) => {
    const formData = new FormData();
    formData.append("file", media_url);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(urls.cloudinary_url, {
        method: "post",
        body: formData
    })

    return await response.json();
}

export default {
    upload_avatar,
    upload_post_media_files
}