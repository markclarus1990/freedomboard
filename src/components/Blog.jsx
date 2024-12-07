import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { editPost, getBlogs } from "../services/Blogs";
import { deleteBlog } from "../services/Blogs";
import { getMunicipal, getProvinces, getBrgy } from "../services/locations";

import "./Blog.css";

function Blog() {
  const { data, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: getBlogs,
  });

  const { data: Rdata } = useQuery({
    queryKey: ["province"],
    queryFn: getProvinces,
  });

  const { data: Mdata } = useQuery({
    queryKey: ["municipal"],
    queryFn: getMunicipal,
  });

  const { data: Bdata } = useQuery({
    queryKey: ["barangay"],
    queryFn: getBrgy,
  });

  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });

  // State to store the posts data
  const [posts, setPosts] = useState([]);

  // Update the state when data is fetched
  useEffect(() => {
    if (data) {
      setPosts(data);
      console.log("Region", Rdata);
      console.log("Mun", Mdata);
      console.log("BRGY", Bdata);
    }
  }, [data, Rdata, Mdata, Bdata]);

  // Handler to update post value in state
  const handlePostChange = (e, id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, post: e.target.value } : post
    );
    setPosts(updatedPosts);
  };

  // Function to handle updating the post
  function handleUpdate(newPost) {
    editMutate(newPost);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {posts.map((item) => (
        <article key={item.id}>
          <li>
            <header>
              <h1>{item.title}</h1>
              <h5>Author: {item.author}</h5>
            </header>

            <section className="bpost">
              <textarea
                type="text"
                id="post"
                name="post"
                value={item.post}
                onChange={(e) => handlePostChange(e, item.id)}
              />
            </section>
            <button onClick={() => mutateDelete(item.id)}>Delete</button>
            <button onClick={() => handleUpdate(item)}>Edit</button>
          </li>
        </article>
      ))}
    </ul>
  );
}

export default Blog;
