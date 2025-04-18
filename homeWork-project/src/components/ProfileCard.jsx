import React from 'react'
import styled from 'styled-components'


const Table = styled.table`
  width: 800px;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  font-size: 18px;
  background-color: #fff;
`

const Th = styled.th`
  background-color: #adf7bd;
  color: #10521e;
  padding: 16px;
  border-bottom: 2px solid #10521e;
  font-size: 20px;
  text-align: center;
`

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 18px;
`

const Tr = styled.tr`
  &:hover {
    background: #f9f9f9;
    cursor: pointer;
  }
`

const StatusText = styled.span`
  color: ${(props) => (props.isOnline ? 'green' : 'gray')};
  font-weight: bold;
  font-size: 16px;
`

const user = [
  {
    user_name: "황윤창",
    age: 25,
    isOnline: true
  },
  {
    user_name: "황맹구",
    age: 27,
    isOnline: false
  },
  {
    user_name: "황짱구",
    age: 23,
    isOnline: true
  }
]

const ProfileCard = () => {
  return (
      <Table>
        <thead>
          <tr>
            <Th>이름</Th>
            <Th>나이</Th>
            <Th>상태</Th>
          </tr>
        </thead>
        <tbody>
          {user.map((u, idx) => (
            <Tr key={idx}>
              <Td>{u.user_name}</Td>
              <Td>{u.age}</Td>
              <Td>
                <StatusText isOnline={u.isOnline}>
                  {u.isOnline ? "🟢 온라인" : "🔴 오프라인"}
                </StatusText>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
  )
}

export default ProfileCard
