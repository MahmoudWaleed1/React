import React, {useContext, useState} from 'react'
import PostHeader from './PostHeader'
import {useDisclosure, addToast, Input, Button} from '@heroui/react'
import { authContext } from '../contexts/AuthContext'
import { deleteComment, updateComment } from '../services/CommentsService'
import CardDropDown from './CardDropDown'
import ModalComponent from './ModalComponent'

export default function Comment({ comment, getAllPosts }) {

    const {userData} = useContext(authContext)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isCommentDeleting, setisCommentDeleting] = useState(false)
    const [isUpdating, setisUpdating] = useState(false)
    const [isInUpdateMode, setIsInUpdateMode] = useState(false)
    const [newCommentContent, setnewCommentContent] = useState(comment.content)

    async function handleDeleteComment(onClose) {
            setisCommentDeleting(true)
            const response = await deleteComment(comment._id)
            if(response.message == "success"){
                await getAllPosts();
                setisCommentDeleting(false)
                onClose();
                addToast({
                    title: "comment deleted successfully",
                    color: "success",
                    timeout: 2000
                }
            )
            }
        }

    async   function handleUpdateComment(){
                setisUpdating(true)
                const response = await updateComment(comment._id, newCommentContent)
                if(response.message == "success"){
                    await getAllPosts();
                    setIsInUpdateMode(false)
            }
            setisUpdating(false)
        }

    return (
        <div className="flex justify-around w-full px-5 my-3 border-t pt-4 border-divider ">
            <div className="w-full">
                <div className='flex items-center justify-between'>
                    <PostHeader avatar={comment.commentCreator.photo} header={comment.commentCreator.name} subHeader={comment.createdAt} />{
                        comment.commentCreator._id == userData?._id && <CardDropDown setIsInUpdateMode={setIsInUpdateMode} onOpen={onOpen}/>
                        }
                </div>
                { isInUpdateMode
                ?
                <div className="ps-12 pt-4">
                    <Input isDisabled={isUpdating} value={newCommentContent} onChange={(e)=>setnewCommentContent(e.target.value)} variant = "bordered"/>
                    <div className='mt-2 flex justify-end gap-2'>
                        <Button onPress={()=>setIsInUpdateMode(false)} color="default" variant="bordered">Cancel</Button>
                        <Button isLoading={isUpdating} isDisabled={newCommentContent.trim().length < 2} onPress={handleUpdateComment} color="primary">Update</Button>
                    </div>

                </div>
                    :
                <div className="ps-12 pt-4">
                    <p>{comment.content}</p>
                </div>

}
            </div>
                    <ModalComponent isLoading={isCommentDeleting} isOpen={isOpen} onOpenChange={onOpenChange} title={"Delete Comment"} deleteFunction={handleDeleteComment} description={"Are you sure you want to delte? Action can't be reverted"}/>        
        </div>
    )
}
