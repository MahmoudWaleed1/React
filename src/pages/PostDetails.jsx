import React, { useEffect, useState } from 'react'
import { getSinglePostApi } from '../services/PostsService'
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import LoadingScreen from './LoadingScreen';

export default function PostDetails() {

    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)



    async function getPostById(id) {
        const response = await getSinglePostApi(id)
        console.log(response);
        if (response.message == "success") {
            setPost(response.post)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPostById(id)
    }, [])


    return (
        <div className='max-w-4xl mx-auto'>
            {
                isLoading ? <LoadingScreen /> : <Post post={post} setPost={setPost} />
            }
        </div>
    )
}
