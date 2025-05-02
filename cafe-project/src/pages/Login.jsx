import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import useAuthStore from '../stores/useAuthStore';


const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 400px;

  h2 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

const Input = styled.input`
  padding: 10px;
  height: 25px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`



const Login = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const navigate = useNavigate()

  const { login } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!id || !pw) {
      toast.warn('ID와 비밀번호를 모두 입력해주세요.')
      setTimeout(2500)
      return
    }

    try {
      const res = await axios.get(`http://localhost:4000/users?id=${id}&pw=${pw}`)
      if (res.data.length > 0) {
        const user = res.data[0]
        login(user) // <- Context에 로그인 정보 저장
        toast.success(`${user.name}님 환영합니다!`)
        setTimeout(() => navigate('/'), 2500) // 성공 후 1.5초 후 이동
      } else {
        toast.error('ID 또는 비밀번호가 일치하지 않습니다.')
      }
    } catch (error) {
      toast.error('서버 오류 발생')
      console.error(error)
    }
  }

  return (
    <Container>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <Input placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
        <Input type="password" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} />
        <button type="submit">로그인</button>
        <button type="button" onClick={() => navigate('/register')}>회원가입</button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </Container>
  )
}

export default Login
