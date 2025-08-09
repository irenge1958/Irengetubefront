import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Card2 from "../components/Card2";
import apiClient from "../apiclient";
import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useLocation } from "react-router-dom";
import Allvideos from "./Allvideos"
import Userpage from "./userpage";
import { useMediaQuery } from 'react-responsive';
import {CircularProgress} from '@mui/material'
const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [randomvideos,setRandomvideos]=useState([])
  const {currentuser} = useSelector((state) => state.user)
  const location = useLocation();
  console.log(currentuser)
   // Function to retrieve query parameters
   const queryParams = new URLSearchParams(location.search);
   const id = queryParams.get('id');
  useEffect(()=>{
    const fectvideor=async()=>{
      const myrandomvideos=await apiClient.get('/videos/random/')
      setRandomvideos(myrandomvideos.data)
    }
    const fectvideoy=async()=>{
      const myrandomvideos=await apiClient.get('/videos/random/')
      const followingv=myrandomvideos.data.filter((x)=>{return currentuser._id===x.userID})
      setRandomvideos(followingv)
    }
    const fectvideof=async()=>{
      const myrandomvideos=await apiClient.get('/videos/random/')
      const myuser=await apiClient.get(`/user/myuser/${currentuser._id}`)
      const followingv=myrandomvideos.data.filter((x)=>{return myuser.data.subscribings.includes(x.userID)})
      console.log(followingv)
      
      setRandomvideos(followingv)
    }
    const fectvideoL=async()=>{
      const myrandomvideos=await apiClient.get('/videos/random/')
      const followingv=myrandomvideos.data.filter((x)=>{return x.likes.includes(currentuser._id)})
      console.log(followingv)
      
      setRandomvideos(followingv)
    }
    const fectvideohi=async()=>{
      const myuser=await apiClient.get(`/user/myuser/${currentuser._id}`)
      console.log(myuser.data.history)
      const followingv = await Promise.all(
        myuser.data?.history.map((x) => apiClient.get(`/videos/getoneV/${x}`))
      );
      const followingb= followingv.map((x)=>x.data)
      
      setRandomvideos(followingb)
    }
    const fectvideop=async()=>{
      const myuser=await apiClient.get(`/user/myuser/${currentuser._id}`)
      console.log(myuser.data.playlist)
      const followingv = await Promise.all(
        myuser.data?.playlist.map((x) => apiClient.get(`/videos/getoneV/${x}`))
      );
      const followingb= followingv.map((x)=>x.data)
      const f=[...new Map(followingb.map(obj => [obj._id, obj])).values()];
      setRandomvideos(f)
    }
    if(!id){fectvideor()}
    if(id==='sub'){fectvideof()}
    if(id==='history'){fectvideohi()}
    if(id==='yourv'){fectvideoy()}
    if(id==='Likedv'){fectvideoL()}
    if(id==='playlist'){fectvideop()}
  },[id]) 
  console.log(id)
  return (

     id==='Mee'?(<Userpage />):id==='Me'?(<Allvideos  />):(<Container>
{randomvideos.length>0 ? randomvideos.map((x) => {
  return !isMobile?(<Card currentvideo={x} key={x._id} />):(<Card2 currentvideo={x} key={x._id} />);
}) : <div style={{margin:'auto',
  
  left:0,
  marginTop:'20%'
 
  }}><CircularProgress size="60px" style={{ color: '#4db8ff', strokeWidth: '2px' }} /></div>}
    </Container>)
  );
};

export default Home;
