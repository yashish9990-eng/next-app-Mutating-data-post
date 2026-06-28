import PostFrom from "@/components/post-form";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function createPost(prevState, formData) {
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

    await storePost({
      imageUrl: "",
      title,
      content,
      userId: 1,
    });

    redirect("/feed");
  }
  return (
    <>
      <PostFrom action={createPost} />
    </>
  );
}
