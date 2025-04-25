import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Profile,
  InfoWrapper,
  Name,
  Info,
  Status
} from './common/StyledComponents'

const UserCard = ({ user }) => {
  const navigate = useNavigate()

  return (
    <Card onClick={() => navigate(`/user/${user.id}`)}>
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
        <Info>
          상태: <Status status={user.status}>{user.status === 'online' ? '🟢' : '🔴'} {user.status}</Status>
        </Info>
      </InfoWrapper>
    </Card>
  )
}

export default UserCard
