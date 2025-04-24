import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
`

const CardGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  align-items: center;
  flex-wrap: wrap; /* 💡 반응형으로 정렬 */
`

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`

const Profile = styled.div`
  width: 100px;
  height: 100px;
  background-color: #eee;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 0.9rem;
    color: #555;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`

const Info = styled.div`
  font-size: 0.95rem;
  color: #555;
`

const Status = styled.span`
  font-weight: bold;
  color: ${props => props.status === 'online' ? 'green' : 'gray'};
`

// 💡 props로 users 받기
const UserList = ({ users }) => {
  const navigate = useNavigate()

  return (
    <Container>
      <Title>User List</Title>
      <CardGrid>
        {users.map(user => (
          <Card key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
            <Profile>
                {user.profileUrl ? (
                  <img src={user.profileUrl} alt={user.name} />
                ) : (
                  <span>{user.name.charAt(0)}</span>
                )}
            </Profile>
            <InfoWrapper>
              <Name>{user.name}</Name>
              <Info>나이: {user.age}</Info>
              <Info>성별: {user.gender}</Info>
              <Info>상태: <Status status={user.status}>{user.status === 'online' ? '🟢' : '🔴'} {user.status}</Status></Info>
            </InfoWrapper>
          </Card>
        ))}
      </CardGrid>
    </Container>
  )
}

export default UserList
