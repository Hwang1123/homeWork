import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;

  &:hover {
    color: #007bff;
  }
`

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>📋 게시글 목록</h1>
        <StyledLink to="/write" >
          ➕ 새 글 작성
        </StyledLink>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <li key={post.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
              <Link to={`/posts/${post.id}`} style={{ fontSize: "18px", fontWeight: "bold", textDecoration: "none", color: "black" }}>
                {post.title}
              </Link>
              <div style={{ fontSize: "14px", color: "#666" }}>
                작성자: {post.author} | 작성일: {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PostList;
