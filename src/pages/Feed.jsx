import React, { useEffect, useState } from 'react'
import { getAllPostsApi } from '../services/PostsService';
import { useNavigate } from 'react-router-dom';
import { addToast, Button } from '@heroui/react';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import LoadingScreen from './LoadingScreen';

export default function Feed() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  async function getAllPosts() {
    const data = await getAllPostsApi(1)
    console.log(data);

    if (data?.message == "success") {
      setPosts(data.posts);
    } else {
      console.log(data);
      localStorage.removeItem("token")
      addToast({
        title: data.error,
        description: "Please login again",
        timeout: 3,
        color: "danger"
      });
      navigate("/login")
    }
  }

  useEffect(() => {
    getAllPosts()
  }, [])
  
  return (
    <>
      <div className='max-w-3xl mx-auto grid gap-3'>
        <CreatePost getAllPosts={getAllPosts} />
        {
          posts.length > 0 ?
            posts.map((post) => <Post getAllPosts={getAllPosts} post={post} key={post._id} commentsLimit={1} />)
            :
            <LoadingScreen />
        }
      </div>
    </>
  )
}
