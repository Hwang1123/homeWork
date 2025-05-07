import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components'
import useAuthStore from '../stores/useAuthStore' // zustand store import
import { GiThrownKnife } from "react-icons/gi";

const Nav = styled.nav`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 10px 40px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;

  &:hover {
    color: #007bff;
  }
`


const Header = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Nav>
      <h2><GiThrownKnife />귀살대</h2>

      <div>
        <StyledLink to="/">🏠Home</StyledLink>
        <StyledLink to="/posts">📋Posts</StyledLink>

        {user ? (
          <>
            <StyledLink to="/MyPage">✅MyPage</StyledLink>
            <StyledLink onClick={handleLogout}> 🔓Logout</StyledLink>
          </>
        ) : (
          <StyledLink to="/login">🔐Login/Register</StyledLink>
        )}
      </div>
    </Nav>
  )
}

export default Header
