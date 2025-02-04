import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import {useState,useEffect} from "react"
import { useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import apiClient from "../apiclient";
import {addnew,setmycom} from '../redux/commentreducer'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = () => {
  const mycontent=useRef()
  const {currentvideo} = useSelector((state) => state.video)
 
  const {currentuser} = useSelector((state) => state.user)
  const {currentcomment} = useSelector((state) => state.comment)
 
  const reversedComments = [...(currentcomment ?? [])].reverse();
  console.log(reversedComments)
  const [mybutton,setmybutton]=useState(false)
 const dispatch=useDispatch()
  const handlecomment=async()=>{
    try{
      const comments=await apiClient.post(`/videos/commentvideo/${currentuser._id}`,{videoId:currentvideo,content:mycontent.current.value})
    mycontent.current.value=''
    console.log(comments.data)
 dispatch(addnew(comments.data))
    }catch(err){
      console.log(err)
    }
   
}
 
  useEffect(()=>{
 const fetchcomment=async()=>{

  const mycomments=await apiClient.get(`/videos/getcommentV/${currentvideo._id}`)
  dispatch(setmycom(mycomments.data))
 }
fetchcomment()
  },[currentvideo?._id,dispatch])
  const Button = styled.button`
  width:283px;
  height:40px;
  border: none;
  border-radius:25px;
  color:${({ theme }) => theme.text};
  background-color:${({ theme }) => theme.bgLighter};
  cursor: pointer;
 
`;
const Downcomment = styled.div`
  display:flex;
  justify-content:space-between;
  color:${({ theme }) => theme.text};
`;

const Buttons=styled.button`
width:150px;
height:40px;
border: none;
border-radius:22px;
color:${({ theme }) => theme.text};
background-color: transparent;
cursor: pointer;
&:hover {
  background-color: darkgray;
 
}
`;
  return (
    <Container>
      <NewComment>
        <Avatar src={currentuser.profilepicture?currentuser.profilepicture:'/assets/user.png'} />
        <Input ref={mycontent} placeholder="Add a comment..." onFocus={()=>setmybutton(true)}/>
       
      </NewComment>
      {mybutton && <Downcomment><p style={{marginTop:'1px',marginLeft:'70px',cursor:'pointer'}}><EmojiEmotionsIcon/></p><span style={{display:'flex',gap:'10px'}}><Buttons  onClick={()=>setmybutton(false)}>cancel</Buttons> <Button onClick={handlecomment}>Add new message</Button> </span></Downcomment> }  
      {reversedComments?.map((x)=><Comment key={reversedComments._id} mycomment={x}/>)}
    </Container>
  );
};

export default Comments;
