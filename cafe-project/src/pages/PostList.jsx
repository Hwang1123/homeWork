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
`;

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPage: 0,
    totalCount: 0,
    hasNext: false,
    hasPrevious: false,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8888/api/boards");
        setPosts(res.data.content); // ✅ 게시글 리스트는 content
        setPageInfo({
          currentPage: res.data.currentPage,
          totalPage: res.data.totalPage,
          totalCount: res.data.totalCount,
          hasNext: res.data.hasNext,
          hasPrevious: res.data.hasPrevious,
        });
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>📋 게시글 목록</h1>
        <StyledLink to="/write">➕ 새 글 작성</StyledLink>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts
          .sort(
            (a, b) => new Date(b.createDate) - new Date(a.createDate)
          )
          .map((post) => (
            <li
              key={post.boardNo}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <Link
                to={`/posts/${post.boardNo}`}
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {post.boardTitle}
              </Link>
              <div style={{ fontSize: "14px", color: "#666" }}>
                작성자: {post.userId || "알 수 없음"} | 작성일:{" "}
                {new Date(post.createDate).toLocaleDateString()} | 조회수:{" "}
                {post.count || 0}
              </div>
            </li>
          ))}
      </ul>

      {/* 페이지 정보 출력 (옵션) */}
      <div style={{ marginTop: "20px", fontSize: "14px", color: "#999" }}>
        총 게시글 수: {pageInfo.totalCount} | 페이지: {pageInfo.currentPage + 1} / {pageInfo.totalPage}
      </div>
    </div>
  );
}

export default PostList;
