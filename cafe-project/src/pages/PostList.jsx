import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";


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
  const [loading, setLoading] = useState(true); // 🔹 로딩 상태 추가

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
      } finally {
        setTimeout(() => setLoading(false), 2500); // 🔹 2.5초 로딩 유지
      }
    };

    fetchPosts();
  }, []);

  // 🔹 로딩 중이면 로딩 스피너 표시
  if (loading) {
    return <LoadingSpinner />;
  }

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
                작성자: {post.author} | 작성일: {new Date(post.createdAt).toLocaleDateString()} | 조회수: {post.views || 0}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PostList;
