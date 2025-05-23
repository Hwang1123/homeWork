import React, { useEffect, useState } from 'react'
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
  const [userInfo, setUserInfo] = useState(null)
  const [formData, setFormData] = useState({
    userName: '',
    age: '',
    gender: '',
    profileUrl: ''
  })

  // ✅ useEffect는 항상 최상단에서 호출
  useEffect(() => {
    if (!user) return // user가 없으면 실행 X

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/api/members/${user.userId}`)
        setUserInfo(res.data)
        setFormData({
          userName: res.data.userName,
          age: res.data.age,
          gender: res.data.gender,
          profileUrl: res.data.profileUrl
        })
      } catch (err) {
        toast.error('회원 정보를 불러오지 못했습니다.')
        console.error(err)
      }
    }

    fetchUserInfo()
  }, [user])

  const genderText =
    userInfo?.gender === 'M' ? '남자' :
    userInfo?.gender === 'F' ? '여자' : '미입력'

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUpdate = async () => {
    try {
      const updated = { ...userInfo, ...formData }

      const res = await axios.put(`http://localhost:8888/api/members/${user.userId}`, updated)

      login(res.data) // 상태 동기화
      setUserInfo(res.data)
      setIsEditing(false)
      toast.success('정보가 수정되었습니다!')
    } catch (err) {
      toast.error('정보 수정 실패!')
      console.error(err)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(`${userInfo?.userName}님, 정말 탈퇴하시겠습니까?`)
    if (!confirmed) return

    try {
      await axios.delete(`http://localhost:8888/api/members/${user.userId}`)
      logout()
      toast.success('회원 탈퇴 완료')
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      toast.error('회원 탈퇴 실패!')
      console.error(err)
    }
  }

  // 🔹 로그인 여부 체크
  if (!user) return <p>로그인된 유저 정보가 없습니다.</p>
  // 🔹 백엔드 데이터 로딩 중
  if (!userInfo) return <p>로딩 중...</p>

  return (
    <Container>
      <h2>{userInfo.userName}님의 마이페이지</h2>
      {formData.profileUrl && <ProfileImage src={formData.profileUrl} alt="프로필" />}

      {isEditing ? (
        <>
          <div>이름: <Input name="userName" value={formData.userName} onChange={handleChange} /></div>
          <div>나이: <Input name="age" value={formData.age} onChange={handleChange} /></div>
          <div>성별: 
            <Select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">성별 선택</option>
              <option value="M">남자</option>
              <option value="F">여자</option>
            </Select>
          </div>
          <div>사진: <Input name="profileUrl" value={formData.profileUrl} onChange={handleChange} /></div>
          <div>
            <Button onClick={handleUpdate}>저장</Button>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
          </div>
        </>
      ) : (
        <>
          <p>아이디: {userInfo.userId}</p>
          <p>이름: {userInfo.userName}</p>
          <p>나이: {userInfo.age}</p>
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
