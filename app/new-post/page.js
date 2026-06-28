import PostFrom from "@/components/post-form";
import { createPost } from "@/actions/post";

export default function NewPostPage() {
  return (
    <>
      <PostFrom action={createPost} />
    </>
  );
}
