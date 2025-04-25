import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

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

const UserDetail = ({ users, setUsers }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = users.find(u => u.id === parseInt(id))

  if (!user) return <p>User not found</p>

  const handleDelete = () => {
    const confirmed = window.confirm(`${user.name}을(를) 정말 삭제하시겠습니까?`)
    if (confirmed) {
      const updatedUsers = users.filter(u => u.id !== user.id)
      setUsers(updatedUsers)
      alert(`${user.name} 삭제 완료!`)
      navigate('/')
    }
  }

  return (
    <Container>
      <h2>{user.name} 상세 정보</h2>
      {user.profileUrl && (
        <ProfileImage src={user.profileUrl} alt={`${user.name} 프로필`} />
      )}
      <p>이름: {user.name}</p>
      <p>나이: {user.age}</p>
      <p>성별: {user.gender}</p>
      <p>상태: {user.status}</p>
      <div>
        <button onClick={() => navigate('/')}>뒤로가기</button>
        <button onClick={handleDelete}>유저 삭제</button>
      </div>
      
    </Container>
  )
}

export default UserDetail
