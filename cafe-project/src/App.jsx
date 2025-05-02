import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from './stores/useAuthStore';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import PostForm from "./pages/PostForm";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage"; // ✅ MyPage 추가
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute"; // ✅ PrivateRoute 추가


const Wrapper = styled.div`
  width: 100vw;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
  box-sizing: border-box;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;

function App() {
  const restore = useAuthStore((state) => state.restore);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restore();
    setLoading(false);
  }, []);

  if (loading) return <LoadingWrapper>로딩 중...</LoadingWrapper>;

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={2000} />
      <Wrapper>
        <Header />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route
              path="/write"
              element={
                <PrivateRoute>
                  <PostForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <PostForm isEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypage"
              element={
                <PrivateRoute>
                  <MyPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Wrapper>
    </Router>
  );
}


export default App;
