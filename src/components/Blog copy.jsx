import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./Blog.css";
import { getBlogs } from "../services/Blogs";
import { deleteBlog } from "../services/Blogs";
function Blog() {
  const x = useQuery({
    queryKey: ["blog"],
    queryFn: getBlogs,
  });

  const queryClient = useQueryClient();
  console.log(x);
  const { data } = x;
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
  return (
    <>
      <ul>
        {x.data?.map((item) => (
          <article key={item.id}>
            <li>
              <header>
                <h1>{item.title}</h1>
                <h5>Author: {item.author}</h5>
              </header>
              <section>{item.post}</section>
              <button onClick={() => mutate(item.id)}>Delete</button>
            </li>
          </article>
        ))}
      </ul>
    </>
  );
}

export default Blog;
