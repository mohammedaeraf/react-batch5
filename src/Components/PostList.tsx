import { useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

const postsStatic: Post[] = [
  {
    id: 101,
    title: "Understanding Python in Easy Way",
    body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt nihil, quo, unde assumenda commodi deserunt vitae earum at cumque nam est laboriosam. Dolorem itaque expedita similique a porro libero ipsam.",
  },
  {
    id: 102,
    title: "Having Good Habits make you successful",
    body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt nihil, quo, unde assumenda commodi deserunt vitae earum at cumque nam est laboriosam. Dolorem itaque expedita similique a porro libero ipsam.",
  },
  {
    id: 103,
    title: "Learning helps you grow",
    body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt nihil, quo, unde assumenda commodi deserunt vitae earum at cumque nam est laboriosam. Dolorem itaque expedita similique a porro libero ipsam.",
  },
];

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await response.json();
    setPosts(data); // Javs Script Object Notation
  };

  return (
    <div className="container mb-4">
      <h2 className="text-danger my-4">Post List</h2>
      <button className="btn btn-success" onClick={fetchPosts}>
        Fetch Posts
      </button>
      <ul className="list-group">
        {postsStatic.map((post) => (
          <li key={post.id} className="list-group-item">
            <h4 className="text-primary mb-2">{post.title}</h4>
            <p className="text-secondary">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PostList;
