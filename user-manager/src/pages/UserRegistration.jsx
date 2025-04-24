import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 500px;

  h2{
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

const Select = styled.select`
  padding: 10px;
  height: 40px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const UserRegistration = ({ users, setUsers }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [profileUrl, setProfileUrl] = useState('')
  const [status, setStatus] = useState('')
  const [gender, setGender] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !age || isNaN(age) || !status || !status) {
      alert('이름,나이,상태를 올바르게 입력하세요')
      return
    }

    const newUser = {
      id: Date.now(), // 고유한 ID 생성
      name,
      age: parseInt(age),
      status,
      gender,
      profileUrl: profileUrl || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhIUBw8QFRUVEBAPFRUQGBEVEA8VFh0WFxUVFxYYHiggHxonHRUVIjEiJSkrLi4uFyAzODUtNygtLisBCgoKDg0OGBAQGi0lHx0xLS0tLS0wKy0tLi0tMCstLS0tLS03LS0tLS03LSstLS0tKy0tLSstNzctLSstLTc3N//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QAMxABAAECAwQHBwQDAAAAAAAAAAECAwQRcQUhMTJBUXKBkaHREyIjNGGxwRIzQvGS4fD/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAgMBBAX/xAAbEQEBAAIDAQAAAAAAAAAAAAAAAQIRAzFBEv/aAAwDAQACEQMRAD8A6wB73zQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAerHC7PjLO//AI+rlunZLUC3aruT8OJnRIp2fiJ4xEazH4W1MRTGVMeD1H20nHFRVs/ERwiJ0n1aLlm5a/cpmPt4r4mImN590vHHOi0xWz6aozsbp6uidOpWTE0zvXLtnZY8AdcAAAAAAAAAAAAAAAAAAAbLNv2t2IjpnL1BO2bhso/XX3eqwIiIjdoMrdt5NQAcdAAELaOG/XR+qjjHH6wmhLos250bsVa9jfmI7tJaWzzgAAAAAAAAAAAAAAAAACZsunPE6UzP2j8oabsqcsTPZn8OXp3HtagMm4AAAAACs2tTldpnrpy8P7QE/a0/Ep0n/vJAa49Mc+wB1IAAAAAAAAAAAAAAAA3YS57LEUzPXlOk7mkB0Qi4DEe2tZVcY3T9Y6JSmNmnol2AAAAA0Yy/Fizu4zuj1C3Stx9z2mKnLo93w4+eaM9eNo89uwAAAAAAAAAAAAAAAAAAAGdq5VariaJ3rjC4qjERu3T1eikexunc5Zt3HLToRUWtoXqObKrXj4pNO06P5Uz3ZSj5rWZxOEGdp2/401d+UI93aN6vkyp03z4nzT7iwxOJt4en3uPREcZU967XeuZ1/wCo+jCZmqfe83i5jpnllsAdSAAAAAAAAAAAAAAAAAAAAAADKmmqrliZ0Zxh708KKvCQahtnD3o40VeEsKqaqeaJjUGIAAAAAAAAAAAAAAAAAAAAztWq7tWVuM/wsrGzqKd97fPVHBy2R2Y2q2i3Xcn3ImdEq3s67VzzEecrSmmKYypiIj6PUXNpOOeolvZ1mnmznyjyb6LFmjlpp8N7YObqpJABx0ABhXZtV89NM90NFez7FXCJjSfVKDbmorLmza4/bqidd0ol2zctT8SmY+3iviYiY3qmdTcI50W1/Z9uv9v3Z8ldesXLNXxI7+iVyys7jY1AOuAAAAAAAAAADdhcPViLmUcOmeppXmEsxYsRHTxnVzK6Vjjus7NqizRlbj1nVmDJsAAAAAAAAAAAAPK6Ka6cq4zh6ApsZhZw9Xu8s8Pp9JRl/etxdtTFXT5dUqGYmJ36NMbtjnjp4ApIAAAAAAAD2nmjV0LnqeaNXQozacfoAhoAAAAAAAAAAAAAAKPFbsTV2pXijxfzNXaleCOTppAWyAAAAAAAAZU80aw6Bz9PNGsOgRm04/QBDQAAAAAAAAAAAAAAUeL+Zq7UrxR4v5mrtSvBHJ00gLZAAAAAAAAMqeaNYdA5+jnjWHQIzacfoAhoAAAAAAAAAAAAAAKPF/M1dqV4o8X8zV2pXgjk6aQFsgAAAAAAAGVHPGsOgBGbTj9AENAAAAAAAAAAAAAABR4v5mrtSC8EcnTSAtkAAAA//9k='
    }

    setUsers([...users, newUser]) // 기존 목록에 새 유저 추가
    alert(`${name} 등록 완료!`)
    navigate('/')
  }

  return (
    <Container>
      <h2>유저 등록</h2>
      <form onSubmit={handleSubmit}>
        <Input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="나이" value={age} onChange={(e) => setAge(e.target.value)} />
        <Input placeholder="프로필 이미지 URL" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)}/>

        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">상태 선택</option>
          <option value="online">온라인</option>
          <option value="offline">오프라인</option>
        </Select>

        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">성별 선택</option>
          <option value="FEMALE">FEMALE</option>
          <option value="MALE">MALE</option>
        </Select>

        <button type="submit">저장</button>
        <button type="button" onClick={() => navigate('/')}>취소</button>
      </form>
    </Container>
  )
}

export default UserRegistration
