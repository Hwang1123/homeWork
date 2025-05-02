import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Meta = styled.div`
  color: #555;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;
`;

const StyledButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  background-color: ${props => props.delete ? "#cc3333" : "#13379c"};
  color: white;

  &:hover {
    background-color: ${props => props.delete ? "#a82626" : "#435da3"};
  }
`;

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => {
        toast.error("게시글을 불러오는 데 실패했습니다.");
        console.error(err);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:4000/posts/${id}`);
        toast.success("게시글이 삭제되었습니다.");
        setTimeout(() => navigate("/posts"), 2000);
      } catch (err) {
        toast.error("삭제 중 오류가 발생했습니다.");
        console.error(err);
      }
    }
  };

  if (!post) return <DetailContainer>게시글을 불러오는 중입니다...</DetailContainer>;

  return (
    <DetailContainer>
      <Title>{post.title}</Title>
      <Meta>
        작성자: {post.author} | 작성일: {new Date(post.createdAt).toLocaleString()}
      </Meta>
      <Content>{post.content}</Content>

      <ButtonGroup>
        <Link to={`/edit/${post.id}`}>
          <StyledButton>수정</StyledButton>
        </Link>
        <StyledButton delete onClick={handleDelete}>삭제</StyledButton>
        <StyledButton onClick={() => navigate("/posts")}>목록으로</StyledButton>
      </ButtonGroup>

      <ToastContainer position="top-center" autoClose={2000} />
    </DetailContainer>
  );
}

export default PostDetail;
