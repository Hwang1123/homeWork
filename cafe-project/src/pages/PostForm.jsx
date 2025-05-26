import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from '../stores/useAuthStore';

const FormContainer = styled.div`
  max-width: 650px;
  margin: 30px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  width: 95%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const StyledTextArea = styled.textarea`
  width: 95%;
  padding: 12px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  margin-bottom: 15px;
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  background-color: #13379c;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #435da3;
  }
`;

function PostForm({ isEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();
  const { user } = useAuthStore(); // ✅ 로그인 유저 정보

  useEffect(() => {
    if (!user) {
      toast.warn("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }

    if (isEdit && id) {
      axios.get(`http://localhost:8888/api/boards/${id}`).then((res) => {
        const data = res.data;
        reset({
          boardTitle: data.boardTitle,
          boardContent: data.boardContent,
          userId: data.userId,
          userName: data.userName,
        });
      });
    } else {
      // 새 글 작성 시 기본값 설정
      setValue("userId", user.userId);
      setValue("userName", user.userName);
    }
  }, [isEdit, id, reset, setValue, user, navigate]);

  const onSubmit = async (data) => {
    const postData = {
      ...data,
      createDate: new Date().toISOString(),
      count: isEdit ? undefined : 0, // 등록 시 조회수 초기화
    };

    try {
      if (isEdit) {
        await axios.patch(`http://localhost:8888/api/boards/${id}`, postData);
        toast.success("게시글이 수정되었습니다!");
      } else {
        await axios.post("http://localhost:8888/api/boards", postData);
        toast.success("게시글이 등록되었습니다!");
      }
      setTimeout(() => navigate("/posts"), 2000);
    } catch (err) {
      toast.error("오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <FormContainer>
      <h2>{isEdit ? "게시글 수정" : "새 글 작성"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          {...register("boardTitle", { required: true })}
          placeholder="제목"
        />
        <StyledInput
          {...register("userName", { required: true })}
          placeholder="작성자"
          readOnly
        />
        <input type="hidden" {...register("userId")} />

        <StyledTextArea
          {...register("boardContent", { required: true })}
          placeholder="내용"
        />

        <StyledButton type="submit">{isEdit ? "수정" : "등록"}</StyledButton>
        <StyledButton type="button" onClick={() => navigate("/posts")}>
          취소
        </StyledButton>
      </form>
      <ToastContainer position="top-center" autoClose={2500} />
    </FormContainer>
  );
}

export default PostForm;
