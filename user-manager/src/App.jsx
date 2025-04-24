import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import UserList from './pages/UserList'
import UserDetail from './pages/UserDetail'
import UserRegistration from './pages/UserRegistration'
import NotFound from './pages/NotFound'
import { Link } from 'react-router-dom'

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', age: 25, profileUrl:'', status: 'online', gender: 'F' },
  ])

  return (
    <BrowserRouter>
      <Wrapper>
        <Nav>
          <StyledLink to="/">HOME</StyledLink>
          <StyledLink to="/user">유저 등록</StyledLink>
        </Nav>
        <Routes>
          <Route path="/" element={<UserList users={users} />} />
          <Route path="/user/:id" element={<UserDetail users={users} setUsers={setUsers} />} />
          <Route path="/user" element={<UserRegistration users={users} setUsers={setUsers} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  )
}

const Wrapper = styled.div`
  width: 100vw; /* 💡 화면 너비 100% */
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
  box-sizing: border-box; /* 패딩 포함해서 너비 계산 */
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: #007bff;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  &:hover {
    background-color: #86c0ff;
    color: #ffffff;
  }
`

export default App
