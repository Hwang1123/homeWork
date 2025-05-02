import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useAuthStore from '../stores/useAuthStore'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const ProfileImage = styled.img`
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin: 20px 0;
`

const Input = styled.input`
  width: 278px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 5px;

`

const Select = styled.select`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 8px;
`

const Button = styled.button`
  margin: 5px;
`

const MyPage = () => {
    const navigate = useNavigate()
    const { user, logout, login } = useAuthStore()
  
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
      name: user?.name || '',
      age: user?.age || '',
      gender: user?.gender || '',
      profileUrl: user?.profileUrl || ''
    })
  
    if (!user) return <p>로그인된 유저 정보가 없습니다.</p>
  
    const genderText = user.gender === 'male' ? '남자' : user.gender === 'female' ? '여자' : '미입력'
  
    const handleDelete = () => {
      const confirmed = window.confirm(`${user.name}님, 정말 탈퇴하시겠습니까?`)
      if (confirmed) {
        logout()
        toast.success('회원 탈퇴 완료')
        setTimeout(() => navigate('/'), 1500)
      }
    }
  
    const handleUpdate = async () => {
        try {
          const updatedUser = { ...user, ...formData }
      
          await axios.put(`http://localhost:4000/users/${user.id}`, updatedUser)
      
          login(updatedUser)
          toast.success('정보가 수정되었습니다!', {
            autoClose: 3000
          })
          setIsEditing(false)
        } catch (err) {
          toast.error('정보 수정 실패!', {
            autoClose: 3000
          })
          console.error(err)
        }
      }
      
  
    const handleChange = (e) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
  
    return (
      <Container>
        <h2>{user.name}님의 마이페이지</h2>
        {formData.profileUrl && <ProfileImage src={formData.profileUrl} alt="프로필" />}
  
        {isEditing ? (
          <>
            <div>이름 : <Input name="name" value={formData.name} onChange={handleChange} /></div>
            <div>나이 : <Input name="age" value={formData.age} onChange={handleChange} /></div>
            <div>성별 : 
              <Select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">성별 선택</option>
                <option value="male">남자</option>
                <option value="female">여자</option>
              </Select>
            </div>
            <div>사진 : <Input name="profileUrl" value={formData.profileUrl} onChange={handleChange} /></div>
            <div>
              <Button onClick={handleUpdate}>저장</Button>
              <Button onClick={() => setIsEditing(false)}>취소</Button>
            </div>
          </>
        ) : (
          <>
            <p>아이디: {user.id}</p>  
            <p>이름: {user.name}</p>
            <p>나이: {user.age}</p>
            <p>성별: {genderText}</p>
            <div>
              <Button onClick={() => navigate('/')}>홈으로</Button>
              <Button onClick={() => setIsEditing(true)}>수정하기</Button>
              <Button onClick={handleDelete}>회원 탈퇴</Button>
            </div>
          </>
        )}
        <ToastContainer position="top-center" autoClose={2000} />
      </Container>
    )
  }
  

export default MyPage
