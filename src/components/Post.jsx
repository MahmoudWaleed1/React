import React, { useContext, useState } from 'react'
import Comment from './Comment'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostActions from './PostActions'
import { Button, useDisclosure, addToast, Input } from '@heroui/react'
import CreateComment from './CreateComment'
import { authContext } from '../contexts/AuthContext'
import { deletePost, updatePost } from '../services/PostsService'
import CardDropDown from './CardDropDown'
import ModalComponent from './ModalComponent'

export default function Post({ post, commentsLimit, getAllPosts, setPost }) {


    const [visibleComments, setVisibleComments] = useState(2)
    const [isCommentsLoading, setIsCommentsLoading] = useState(false)
    const {userData} = useContext(authContext)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isPostDeleting, setisPostDeleting] = useState(false)
    const [isUpdating, setisUpdating] = useState(false)
    const [isInUpdateMode, setIsInUpdateMode] = useState(false)
    const [newBody, setNewBody] = useState(post.body)
    const [newImage, setNewImage] = useState(null)
     const [imagePreview, setImagePreview] = useState(null)

    async function handleDeletePost(onClose) {
        setisPostDeleting(true)
        const response = await deletePost(post._id)
        if(response.message == "success"){
            await getAllPosts();
            setisPostDeleting(false)
            onClose();
            addToast({
                title: "post deleted successfully",
                color: "success",
                timeout: 2000
            }
        )
        }
    }

    function handleFileChange(e) {
        if (e.target.files.length > 0) {
            setNewImage(e.target.files[0])
            const imageURL = URL.createObjectURL(e.target.files[0])
            setImagePreview(imageURL);
        }
    }

    function handleRemoveImage() {
        setNewImage(null)
        setImagePreview(null)
        document.querySelector("#fileInput").value = "";
    }

   async function handleUpdatePost() {
            setisUpdating(true)
            const formData = new FormData()
            formData.append("body", newBody);
                if (newImage) {
                    formData.append("image", newImage);
        }

        const response = await updatePost(post._id, formData)
        if(response.message == "success"){
            await getAllPosts();
                    setIsInUpdateMode(false)
            }
            setisUpdating(false)
        }

    function loadMoreComments() {
        setIsCommentsLoading(true)
        setTimeout(() => {
            setVisibleComments(visibleComments + 2);
            setIsCommentsLoading(false);
        }, 500)
    }

    return (
        <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
            <div className="w-full h-16 flex items-center justify-between ">
                <PostHeader avatar={post.user.photo} header={post.user.name} subHeader={post.createdAt} />
                { post.user._id == userData._id && <CardDropDown setIsInUpdateMode={setIsInUpdateMode} onOpen={onOpen}/>
                  
}

            </div>
            {isInUpdateMode ? (
                     <div className="p-4">
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent resize-none"
            value={newBody}
            onChange={(e) => {setNewBody(e.target.value)}}
          />
          <label className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-200">
                <Input
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="fileInput"
                />
                <div className="flex items-center space-x-2 mt-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Photo</span>
                </div>
            </label>
                {imagePreview && <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-64 max-h-64 object-cover rounded-lg"
                        />
                        <button
                            onClick={handleRemoveImage}
                            type="button"
                            className="absolute top-2 right-100 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>}

          <div className="mt-2 flex justify-end gap-2">
            <Button onPress={() => setIsInUpdateMode(false)} color="default" variant="bordered">
              Cancel
            </Button>
            <Button isLoading={isUpdating} isDisabled={newBody.trim().length < 2 && !newImage} onPress={handleUpdatePost} color="primary">
              Update
            </Button>
          </div>
                 <PostActions postId={post._id} />
        </div>
            )
                 : (
                <>
                    <PostBody fullHeight={!commentsLimit} caption={post.body} photo={post.image} />
                    <PostFooter numOfComments={post.comments.length} />
                    
                    <CreateComment setPost={setPost} post={post} getAllPosts={getAllPosts} postId={post._id} />
                </>
            )}

            {
                post.comments.slice(0, commentsLimit ?? visibleComments).map((comment) => <Comment comment={comment} getAllPosts={getAllPosts}/>)
            }
            {visibleComments < post.comments.length && !commentsLimit && <Button variant='ghost' isLoading={isCommentsLoading} onPress={loadMoreComments} className='block mx-auto'>Load More Comments</Button>}

          <ModalComponent isLoading={isPostDeleting} isOpen={isOpen} onOpenChange={onOpenChange} title={"Delete Post"} deleteFunction={handleDeletePost} description={"Are you sure you want to delte? Action can't be reverted"}/>        
        </div>
    )
}
