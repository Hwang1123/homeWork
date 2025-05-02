import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify' // ✅ 추가
import 'react-toastify/dist/ReactToastify.css' // ✅ 추가

const schema = yup.object().shape({
  id: yup.string().required('아이디는 필수입니다.'),
  pw: yup.string().required('비밀번호는 필수입니다.'),
  name: yup.string().required('이름은 필수입니다.'),
  age: yup.number().typeError('숫자를 입력해주세요.').required('나이는 필수입니다.'),
  gender: yup.string().required('성별을 선택해주세요.'),
  // profileUrl: yup.string().url('URL 형식이 올바르지 않습니다.').nullable()
})

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 500px;

  h2 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .error {
    color: red;
    font-size: 13px;
    height: 16px;
    margin: 0;
  }
`

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = async (data) => {
    try {
      const res = await axios.get(`http://localhost:4000/users?id=${data.id}`)
      if (res.data.length > 0) {
        toast.error('이미 존재하는 ID입니다.') // ✅ 변경
        return
      }

      const newUser = {
        ...data,
        age: parseInt(data.age),
        profileUrl: data.profileUrl || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhIUBw8QFRUVEBAPFRUQGBEVEA8VFh0WFxUVFxYYHiggHxonHRUVIjEiJSkrLi4uFyAzODUtNygtLisBCgoKDg0OGBAQGi0lHx0xLS0tLS0wKy0tLi0tMCstLS0tLS03LS0tLS03LSstLS0tKy0tLSstNzctLSstLTc3N//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QAMxABAAECAwQHBwQDAAAAAAAAAAECAwQRcQUhMTJBUXKBkaHREyIjNGGxwRIzQvGS4fD/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAgMBBAX/xAAbEQEBAAIDAQAAAAAAAAAAAAAAAQIRAzFBEv/aAAwDAQACEQMRAD8A6wB73zQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAerHC7PjLO//AI+rlunZLUC3aruT8OJnRIp2fiJ4xEazH4W1MRTGVMeD1H20nHFRVs/ERwiJ0n1aLlm5a/cpmPt4r4mImN590vHHOi0xWz6aozsbp6uidOpWTE0zvXLtnZY8AdcAAAAAAAAAAAAAAAAAAAbLNv2t2IjpnL1BO2bhso/XX3eqwIiIjdoMrdt5NQAcdAAELaOG/XR+qjjHH6wmhLos250bsVa9jfmI7tJaWzzgAAAAAAAAAAAAAAAAACZsunPE6UzP2j8oabsqcsTPZn8OXp3HtagMm4AAAAACs2tTldpnrpy8P7QE/a0/Ep0n/vJAa49Mc+wB1IAAAAAAAAAAAAAAAA3YS57LEUzPXlOk7mkB0Qi4DEe2tZVcY3T9Y6JSmNmnol2AAAAA0Yy/Fizu4zuj1C3Stx9z2mKnLo93w4+eaM9eNo89uwAAAAAAAAAAAAAAAAAAAGdq5VariaJ3rjC4qjERu3T1eikexunc5Zt3HLToRUWtoXqObKrXj4pNO06P5Uz3ZSj5rWZxOEGdp2/401d+UI93aN6vkyp03z4nzT7iwxOJt4en3uPREcZU967XeuZ1/wCo+jCZmqfe83i5jpnllsAdSAAAAAAAAAAAAAAAAAAAAAADKmmqrliZ0Zxh708KKvCQahtnD3o40VeEsKqaqeaJjUGIAAAAAAAAAAAAAAAAAAAAztWq7tWVuM/wsrGzqKd97fPVHBy2R2Y2q2i3Xcn3ImdEq3s67VzzEecrSmmKYypiIj6PUXNpOOeolvZ1mnmznyjyb6LFmjlpp8N7YObqpJABx0ABhXZtV89NM90NFez7FXCJjSfVKDbmorLmza4/bqidd0ol2zctT8SmY+3iviYiY3qmdTcI50W1/Z9uv9v3Z8ldesXLNXxI7+iVyys7jY1AOuAAAAAAAAAADdhcPViLmUcOmeppXmEsxYsRHTxnVzK6Vjjus7NqizRlbj1nVmDJsAAAAAAAAAAAAPK6Ka6cq4zh6ApsZhZw9Xu8s8Pp9JRl/etxdtTFXT5dUqGYmJ36NMbtjnjp4ApIAAAAAAAD2nmjV0LnqeaNXQozacfoAhoAAAAAAAAAAAAAAKPFbsTV2pXijxfzNXaleCOTppAWyAAAAAAAAZU80aw6Bz9PNGsOgRm04/QBDQAAAAAAAAAAAAAAUeL+Zq7UrxR4v5mrtSvBHJ00gLZAAAAAAAAMqeaNYdA5+jnjWHQIzacfoAhoAAAAAAAAAAAAAAKPF/M1dqV4o8X8zV2pXgjk6aQFsgAAAAAAAGVHPGsOgBGbTj9AENAAAAAAAAAAAAAABR4v5mrtSC8EcnTSAtkAAAA//9k='
      }

      await axios.post('http://localhost:4000/users', newUser)
      toast.success(`${data.name}님 회원가입 완료!`) // ✅ 변경
      reset()
      setTimeout(() => navigate('/'), 2500) // ✅ 약간의 시간 후 이동
    } catch (error) {
      console.error('회원가입 실패:', error)
      toast.error('서버 오류로 인해 회원가입에 실패했습니다.') // ✅ 변경
    }
  }

  return (
    <Container>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="아이디" {...register('id')} />
        <p className="error">{errors.id?.message || ''}</p>

        <Input type="password" placeholder="비밀번호" {...register('pw')} />
        <p className="error">{errors.pw?.message || ''}</p>

        <Input placeholder="이름" {...register('name')} />
        <p className="error">{errors.name?.message || ''}</p>

        <Input placeholder="나이" {...register('age')} />
        <p className="error">{errors.age?.message || ''}</p>

        <Select {...register('gender')}>
          <option value="">성별 선택</option>
          <option value="FEMALE">여자</option>
          <option value="MALE">남자</option>
        </Select>
        <p className="error">{errors.gender?.message || ''}</p>

        <Input placeholder="프로필 이미지 URL" {...register('profileUrl')} />
        <p className="error">{errors.profileUrl?.message || ''}</p>

        <button type="submit">회원가입</button>
        <button type="button" onClick={() => navigate('/')}>취소</button>
      </form>

      <ToastContainer position="top-center" autoClose={2500} /> {/* ✅ 추가 */}
    </Container>
  )
}

export default Register
