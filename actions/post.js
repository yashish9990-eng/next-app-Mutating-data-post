"use server";

import { redirect } from "next/navigation";
import { storePost } from "@/lib/posts";
import { uploadImage } from "@/lib/cloudinary";

export async function createPost(prevState, formData) {
  "use server";
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title Is Requiered.");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Conetent Is Requiered.");
  }

  if (!image || image.size === 0) {
    errors.push("Image Is Requiered.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  console.log(title, image, content);

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    return {
      errors: [
        error instanceof Error
          ? error.message
          : "Image Upload Failed, Post was not Created. Please Try Again Later.",
      ],
    };
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
}
