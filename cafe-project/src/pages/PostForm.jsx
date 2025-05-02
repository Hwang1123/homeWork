import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from '../stores/useAuthStore' // ✅ 로그인 정보 가져오기

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
  const { user } = useAuthStore(); // ✅ 로그인된 유저 정보

  useEffect(() => {
    if (isEdit && id) {
      axios.get(`http://localhost:4000/posts/${id}`).then((res) => reset(res.data));
    } else if (user) {
      setValue("author", user.name);     // ✅ 작성자 이름 자동 입력
      setValue("authorId", user.id);     // ✅ 작성자 ID 자동 입력
    }
  }, [isEdit, id, reset, user, setValue]);

  const onSubmit = async (data) => {
    const now = new Date().toISOString();
    const postData = isEdit ? data : { ...data, createdAt: now };

    try {
      if (isEdit) {
        await axios.put(`http://localhost:4000/posts/${id}`, postData);
        toast.success("게시글이 수정되었습니다!");
      } else {
        await axios.post("http://localhost:4000/posts", postData);
        toast.success("게시글이 등록되었습니다!");
      }
      setTimeout(() => navigate("/posts"), 2500);
    } catch (err) {
      toast.error("오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <FormContainer>
      <h2>{isEdit ? "게시글 수정" : "새 글 작성"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput {...register("title", { required: true })} placeholder="제목" />
        <StyledInput {...register("author", { required: true })} placeholder="작성자" readOnly />
        <StyledInput type="hidden" {...register("authorId")} /> {/* ✅ 숨겨진 작성자 ID 필드 */}
        <StyledTextArea {...register("content", { required: true })} placeholder="내용" />
        <StyledButton type="submit">{isEdit ? "수정" : "등록"}</StyledButton>
        <StyledButton type="button" onClick={() => navigate("/posts")}>취소</StyledButton>
      </form>
      <ToastContainer position="top-center" autoClose={2500} />
    </FormContainer>
  );
}

export default PostForm;
