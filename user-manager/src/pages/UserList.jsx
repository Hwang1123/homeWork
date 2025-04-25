import React from 'react'
import UserCard from '../components/UserCard'
import { Container, Title, CardGrid } from '../components/common/StyledComponents'

const UserList = ({ users }) => {
  return (
    <Container>
      <Title>User List</Title>
      <CardGrid>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </CardGrid>
    </Container>
  )
}

export default UserList
