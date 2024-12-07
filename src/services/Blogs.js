import supabase from "./supabase";

export async function createPost(newPost) {
  const { data, error } = await supabase.from("blog").insert([newPost]);

  if (error) {
    console.error(error);
    throw new Error("Blog cannot be added");
  }

  return data;
}

export async function editPost(newPost) {
  const { data, error } = await supabase
    .from("blog")
    .update([newPost])
    .eq("id", newPost.id);

  if (error) {
    console.error(error);
    throw new Error("Blog cannot be edited");
  }

  return data;
}

export async function getBlogs() {
  const { data, error } = await supabase.from("blog").select("*");

  if (error) {
    console.error(error);
    throw new Error("Blog could not be loaded");
  }
  return data;
}

export async function deleteBlog(id) {
  const { data, error } = await supabase.from("blog").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Blog could not be deleted");
  }
  return data;
}
