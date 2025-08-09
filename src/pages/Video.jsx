import React from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "./Card";
import {successfecth,likevideo,dislikevideo,addview} from '../redux/videoreducer'
import {sub} from '../redux/userReducer'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect,useState} from 'react'
import apiClient from "../apiclient";
import {format} from 'timeago.js'
import { useLocation } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import {CircularProgress} from '@mui/material'
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 3.8;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
 
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const {currentvideo} = useSelector((state) => state.video)
  const {currentuser} = useSelector((state) => state.user)
  const [ns,setns]=useState()
  const dispatch=useDispatch()
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [channel,setChannel]=useState({})
 const [suggestedvideos,setsuggestedvideos]=useState([])
  // Function to retrieve query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  console.log(id)
  useEffect(()=>{
    const fectchv=async()=>{    
const getvideo=await apiClient.get(`/videos/getoneV/${id}`)
const channelinfo=await apiClient.get(`/user/myuser/${getvideo.data.userID}`)

const getsuggestedvideo=await apiClient.get(`/videos/tags?tagg=${getvideo.data.tagg}`)
setsuggestedvideos(getsuggestedvideo.data)
setChannel(channelinfo.data)
setns(channelinfo.data?.subscribers)
dispatch(successfecth(getvideo.data))
await apiClient.post(`/videos/addview/${id}`)
dispatch(addview())
    }
    fectchv()
  },[id])
  
const handlelike=async()=>{
  if (currentuser===null) alert('sign in or sign up to be able to like videos')
  try {
    const myvideo = await apiClient.post(`/videos/likevideo/${currentuser._id}/${currentvideo._id}`);
    console.log('Response:', myvideo.data);
    dispatch(likevideo(currentuser._id))
  } catch (error) {
    console.error('Error response:', error.response ? error.response.data : error.message);
  }
  

}
const handledislike=async()=>{
  if (currentuser===null) alert('sign in or sign up to be able to dislike videos')
  try {
    const myvideo = await apiClient.put(`/videos/unlikevideo/${currentuser._id}/${currentvideo._id}`);
    console.log('Response:', myvideo.data);
    dispatch(dislikevideo(currentuser._id))
  } catch (error) {
    console.error('Error response:', error.response ? error.response.data : error.message);
  }
  }
 
  console.log(ns)
  const handlesubscribe=async()=>{
   
    const getvideo=await apiClient.get(`/videos/getoneV/${id}`)
const channelinfo=await apiClient.get(`/user/myuser/${getvideo.data.userID}`)
    if (currentuser?.subscribings.includes(channel?._id)) {
      console.log('User is subscribed, decreasing by 1');
      setns(channelinfo.data?.subscribers - 1);
    } else {
      console.log('User is not subscribed, increasing by 1');
      setns(channelinfo.data?.subscribers + 1);
    }
    
    currentuser?.subscribings.includes(channel?._id)?await apiClient.put(`/user/unsubscribe/${channel?._id}`):await apiClient.post(`/user/subscribe/${channel?._id}`)
    dispatch(sub(channel?._id))

  }
  console.log(suggestedvideos?.length)
  return (
    <Container>
      <Content>
        <VideoWrapper>
        <iframe
            width="100%"
            height={isMobile?"250":"400"}
            src={currentvideo?.videourl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentvideo?.title}</Title>
        <Details>
          <Info>{currentvideo?.view}views • {format(currentvideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handlelike}>
             {currentvideo?.likes.includes(currentuser?._id)?<ThumbUpIcon />:<ThumbUpOutlinedIcon />}  {currentvideo?.likes.length}
            </Button>
            <Button onClick={handledislike}>
            {currentvideo?.dislikes.includes(currentuser?._id)?<ThumbDownIcon />:<ThumbDownOffAltOutlinedIcon /> }
            </Button>
            {/* <Button>
              <ReplyOutlinedIcon /> Share
            </Button> */}
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.profilepicture?channel?.profilepicture:'/assets/user.png'} />
            <ChannelDetail>
              <ChannelName>{channel?.username}</ChannelName>
              <ChannelCounter>{ns}. subscribers</ChannelCounter>
              <Description>
                {currentvideo?.description}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handlesubscribe}>{currentuser?.subscribings?.includes(channel?._id)?'UNSUBSCRIBE':'SUBSCRIBE'}</Subscribe>
        </Channel>
        <Hr />
        <Comments/>
      </Content>
      {!isMobile && <Recommendation>
      {suggestedvideos.length>0?suggestedvideos.map((x)=>{return <Card type="sm" video={x} />}):<div   style={{
    display: 'flex',
    justifyContent: 'center', // horizontal centering
    alignItems: 'center',     // vertical centering
    width: '100%',            // take up full horizontal space
    height: '50vh'           // optional, for full screen vertical centering
  }}
>
  <CircularProgress size="60px" style={{ color: '#4db8ff', strokeWidth: '2px' }} />
</div>}
      </Recommendation>}
    </Container>
  );
};

export default Video;
