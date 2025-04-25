import styled from 'styled-components'

export const Container = styled.div`
text-align: center;
  padding: 20px;
`

export const Title = styled.h2`
  margin-bottom: 20px;
`

export const CardGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
`

export const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  width: 250px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  gap: 16px;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background-color: #f8f8f8;
  }
`

export const Profile = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 24px;
    color: #555;
  }
`

export const InfoWrapper = styled.div`
  flex: 1;
`

export const Name = styled.h3`
  margin: 0;
  font-size: 18px;
`

export const Info = styled.p`
  margin: 4px 0;
  font-size: 16px;
  color: #333;
`

export const Status = styled.span`
  font-weight: bold;
  color: ${props => (props.status === 'online' ? 'green' : 'red')};
`

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const Select = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`
