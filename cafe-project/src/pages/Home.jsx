import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import LoadingSpinner from '../components/LoadingSpinner'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`

const LeftSection = styled.div`
  flex: 3;
  margin-right: 30px;
`

const RightSection = styled.div`
  flex: 1;
  min-width: 250px;
`

const ProfileCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  text-align: center;
`

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
`

const Info = styled.div`
  p {
    margin: 5px 0;
  }
`

const PostCard = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #fff;
`

const Home = () => {
  const { user } = useAuthStore()
  const [topPosts, setTopPosts] = useState([])
  const [loading, setLoading] = useState(true); // 🔹 로딩 상태 추가

  useEffect(() => {
    axios.get("http://localhost:4000/posts")
      .then((res) => {
        const sorted = [...res.data].sort((a, b) => (b.views || 0) - (a.views || 0));
        setTopPosts(sorted.slice(0, 5));
      })
      .catch(err => {
        console.error("게시글 로딩 오류:", err);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false); // 🔹 최소 2.5초 후에 로딩 종료
        }, 2000);
      });
  }, []);

  const getGenderText = (gender) => {
    if (gender === 'male') return '남자'
    if (gender === 'female') return '여자'
    return '미입력'
  }

   // 🔹 로딩 화면
   if (loading) {
    return <LoadingSpinner />;
  }

  return (
    
    <Container>
      
      <LeftSection>
        <h2>🔥 인기 게시글 TOP 5</h2>
        {topPosts.map(post => (
          <Link key={post.id} to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <PostCard>
              <h3>{post.title}</h3>
              <p>조회수: {post.views}</p>
              <p>작성자: {post.author}</p>
            </PostCard>
          </Link>
        ))}
      </LeftSection>

      {user && (
        <RightSection>
          <ProfileCard>
            <Avatar src={user.profileUrl || 'https://via.placeholder.com/80'} alt="프로필" />
            <h3>{user.name}님</h3>
            <Info>
              <p>나이: {user.age}</p>
              <p>성별: {getGenderText(user.gender)}</p>
            </Info>
          </ProfileCard>
        </RightSection>
      )}
    </Container>
  )
}

export default Home
