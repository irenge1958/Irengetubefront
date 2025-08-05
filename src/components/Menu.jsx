import React from "react";
import styled from "styled-components";
import LamaTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';
import {useState,useEffect} from 'react';

import apiClient from "../apiclient";
const Container = styled.div`
  flex: 1.2;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  margin-left:-15px;
  overflow-y: auto;   
  overflow-x: hidden;
 



 
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const {currentuser} = useSelector((state) => state.user)
  const [sub,setsub]=useState([])
 
  useEffect(()=>{
    const fectuserf=async()=>{
 
      const followingv = await Promise.all(
        currentuser.subscribings.map((x) => apiClient.get(`user/myuser/${x}`))
      );
      const followingb= followingv.map((x)=>x.data)
      setsub(followingb)
    }
    fectuserf()
  },[])
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={LamaTube} />
            IrengeTube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}><Item>
        
          <HomeIcon />
          Home
          
        </Item></Link>
        {/* <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item> */}
      <Link to="/?id=sub" style={{ textDecoration: "none", color: "inherit" }}><Item>
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
        </Link>
        <Link to="/?id=history" style={{ textDecoration: "none", color: "inherit" }}><Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        </Link>
        <Hr />
      
       {!currentuser && <Login>
          Sign in to like videos, comment, and subscribe.
         <Link to="signin" style={{textDecoration:"none"}}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>  
        </Login>}
        {!currentuser && <Hr />}
        <Link to="?id=Me" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            You &gt;          </Item>
          
         </Link> 
          <Link to="/?id=yourv" style={{ textDecoration: "none", color: "inherit" }}><Item>
          <LiveTvOutlinedIcon />
          Your videos
        </Item>
        </Link>
        <Link to="/?id=playlist" style={{ textDecoration: "none", color: "inherit" }}><Item>
          <VideoLibraryOutlinedIcon />
          See later
        </Item>
        </Link>
        <Link to="/?id=Likedv" style={{ textDecoration: "none", color: "inherit" }}><Item>
          <ThumbUpIcon/>
          Videos liked
        </Item>
        </Link>
       
      <Hr />
        <Title>Subscriptions</Title>
        {sub.length>0?sub.map((x)=>{
          return (
          <div><Link to={`/?id=Mee&ids=${x._id}&username=${x.username}&profilepicture=${x.profilepicture}`} style={{ textDecoration: "none", color: "inherit" ,display:'flex',paddingTop:'10px'}}><img  style={{width: "40px", height: "40px",cursor:'pointer', borderRadius: "50%",objectFit: "cover",cursor: "pointer",marginRight: "10px"}} src={x.profilepicture?x.profilepicture:'/assets/user.png'} /><Title>{x?.username}</Title></Link></div>)}
       ):<div> 0 subscription</div>}
       
        <Hr />
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
