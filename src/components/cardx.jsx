import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apiClient from "../apiclient";
import {useState,useEffect} from 'react'
import {format} from 'timeago.js'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import {useSelector} from 'react-redux'
import {successfecth} from '../redux/userReducer'
import {useDispatch } from 'react-redux'
const Container = styled.div`
flex: 0 0 230px;  /* Prevent shrinking, set fixed width */
min-width: 200px; /* Ensure minimum width */
margin: 2px;
  
  
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "150px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;


const Card = (currentvideo) => {
  console.log(currentvideo)
  const dispatch=useDispatch()
  const {currentuser} = useSelector((state) => state.user)
  const [channel,setchannel]=useState({})
  useEffect(()=>{
    const fectvideo=async()=>{
      
      const myrandomvideos=await apiClient.get(`/user/myuser/${currentvideo.currentvideo.userID}`)
     
      setchannel(myrandomvideos.data)
    }
    fectvideo()
  },[]) 
  const deletepost=async(theid)=>{
    const valeur=window.confirm('are you sure yo want to delete this post')
    if(valeur){
       await apiClient.delete(`videos/deletevideo/${theid}`) 
       window.location.reload()
    }
    
}
const [mycpy,setmycpy]=useState('Copy link')
const [Op,setOp]=useState(false)
const couper=()=>{
    setTimeout(
        () => setOp(false), 
        2000
      );
}
const copyf=(lien)=>{
navigator.clipboard.writeText(lien)
setmycpy('Copied')
couper()
} 
const handleClick = (event) => {
  if (Op && event.target.id!=='modal') {
  
      setOp(false);
  }
};


window.addEventListener("click", handleClick);
const history=async()=>{

  const myhistory=await apiClient.post(`/user/history/${currentvideo.currentvideo._id}`,{id:currentuser._id})
  }
  return (
    
      <Container >
        <Link to={`/video/test?id=${currentvideo.currentvideo._id}`} onClick={history} style={{ textDecoration: "none" }}>
        <Image
       
          src={currentvideo.currentvideo.pic?currentvideo.currentvideo.pic:'/assets/user.png'}
        />
        </Link>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Link to={`/video/test?id=${currentvideo.currentvideo._id}`} style={{ textDecoration: "none" }}>
        <Details >
          <ChannelImage
            
            src={channel?.profilepicture?channel?.profilepicture:'/assets/user.png'}
          />
          <Texts>
            <Title>{currentvideo.currentvideo.title}</Title>
            <ChannelName>{channel?.username}</ChannelName>
            <Info>{currentvideo.currentvideo.view} views • {format(currentvideo.currentvideo.createdAt)}</Info>
          </Texts>
        </Details>
        </Link>
        <div className='myb32' ><MoreVertSharpIcon style={{color: "inherit",marginTop:'10px'}} id='modal'  onClick={()=>setOp(true)}/>{Op && <div style={{position:'absolute',marginLeft:'-59px',marginTop:'-6px',color:'white'}}><div className='op' id='modal' onClick={()=>copyf(`https://irengetubefront.vercel.app/video/test?id=${currentvideo.currentvideo._id}`)} style={{border:'2px solid black',padding:'3px',textAlign: 'center',alignItems:'center' }}>{mycpy}</div>{currentvideo.currentvideo?.userID===currentuser._id?<div className='op' onClick={()=>deletepost(currentvideo.currentvideo._id)} style={{border:'2px solid black',padding:'3px'}}>Delete</div>:''}</div>}</div>
</div>
      </Container>
    
  );
};

export default Card;