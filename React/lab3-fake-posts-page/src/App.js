import React, { useState, useEffect } from "react";
import axios from "axios";
import posed, { PoseGroup } from "react-pose";

import "./App.css";

const Post = posed.div({
  enter: {
    opacity: 1,
    
  },
  exit: {
    opacity: 0,
  }
});

const Posts = () => {
  // Our post state
  const [posts, setPosts] = useState([]);
  // Our search input state
  const [search, setSearch] = useState("");

  // When our component mounts
  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");

      setPosts(data);
    }

    getPosts();
  }, []);

  // Filter over our posts and display only the ones that match our search value
  const filteredPosts = posts.filter((post) => post.title.includes(search) || post.body.includes(search))
  
  return (
    <div className="Posts">
      <h1>Posts</h1>
      <div className="Posts__input">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search for posts..."
        />
      </div>
      {/* Iterate over our posts and render divs */}
      <div className="Posts__container">
        <PoseGroup flipMove={false}>
          {filteredPosts.map((post) => (
            <Post key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </Post>
          ))}
        </PoseGroup>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <Posts />
    </div>
  );
}

export default App;
