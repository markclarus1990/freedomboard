import { useState } from "react";
import "./Post.css";
import { useForm } from "react-hook-form";
import { createPost } from "../services/Blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
function Post() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      console.log("Inserted Successfully");
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
    onError: (error) => {
      console.error(error);
      throw new Error("Error Inserting");
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  const { register, handleSubmit, reset } = useForm();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Directly handle form submission */}
        <section>
          <input
            name="author"
            type="text"
            placeholder="Enter Author"
            id="author"
            // value={author}

            {...register("author")}
            required
          />
          <input
            name="title"
            id="title"
            type="text"
            placeholder="Enter Title"
            // value={title}

            {...register("title")}
            required
          />
          <textarea
            name="post"
            id="post"
            // value={content}
            placeholder="Enter post"
            {...register("post")}
            required
          ></textarea>
          <button type="submit">Post</button> {/* This will trigger onSubmit */}
        </section>
      </form>
    </>
  );
}

export default Post;
