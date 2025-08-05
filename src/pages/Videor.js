import React from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card2 from "./card2";
import Card from "./Card";
import {successfecth,likevideo,dislikevideo} from '../redux/videoreducer'
import {sub} from '../redux/userReducer'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect,useState} from 'react'
import apiClient from "../apiclient";
import {format} from 'timeago.js'
import { useLocation } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
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

const Recommendation = styled.div`
  display: flex;
  flex-direction:column
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





const Videor = () => {
  
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch=useDispatch()
  const location = useLocation();
  

 const [suggestedvideos,setsuggestedvideos]=useState([])
  // Function to retrieve query parameters
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  console.log(id)
  useEffect(()=>{
    const fectchv=async()=>{    
const getvideo=await apiClient.get(`/videos/getoneV/${id}`)

const getsuggestedvideo=await apiClient.get(`/videos/tags?tagg=${getvideo.data.tagg}`)
const index=getsuggestedvideo.data.findIndex((element)=>element._id===id)

const [element]=getsuggestedvideo.data.splice(index,1)

if (index !== -1) {
getsuggestedvideo.data.unshift(element)
setsuggestedvideos(getsuggestedvideo.data)
}
dispatch(successfecth(getvideo.data))
    }
    fectchv()
  },[id])
  

   

  return (
    <Container>
      <Recommendation>
      {suggestedvideos.length>0?suggestedvideos.map((x)=>{return isMobile?<Card  video={x} />:<Card2 type="bg" video={x} />}):'no related found'}
      </Recommendation>
    </Container>
  );
};

export default Videor;
