import React from "react";
import styled from "styled-components";
import Card from "../components/cardx";
import apiClient from "../apiclient";
import {useState,useEffect} from 'react'
import { FaArrowLeft, FaArrowRight, FaCommentsDollar } from "react-icons/fa"; // Import icons
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import {useSelector} from 'react-redux'
import EditProfilePopup from './modify'
const Title = styled.h1`
  font-size: 26px;
  font-weight: 1000;
  color: ${({ theme }) => theme.text};
  padding-top:20px;
  padding-bottom:20px
`;
const Allvideos=()=>{
  const [popx,setPopx]=useState(false) 
    const displaymod=()=>{
      setPopx(true)
    }
    const {currentuser} = useSelector((state) => state.user)
    const [randomvideos,setRandomvideos]=useState([])
    const fectvideor=async()=>{
        const myrandomvideoss=await apiClient.get('/videos/random/')
        setRandomvideos(myrandomvideoss.data)
      }
    const scrollRef = useRef(null);

    // Scroll Left
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft -= 200; // Adjust the scroll distance
      }
    };
  
    // Scroll Right
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 200;
      }
    };
   
    const [videohistory,setvideohistory]=useState([])
    const [videosplaylist,setvideosplaylist]=useState([])
  
        console.log(currentuser)
        console.log(randomvideos)
        const followingvideos=randomvideos.filter((x)=>{return currentuser.subscribings?.includes(x.userID)})
        const videosLiked=randomvideos.filter((x)=>{return x.likes.includes(currentuser._id)}) 
      
        const fectvideohi=async()=>{
          const myuser=await apiClient.get(`/user/myuser/${currentuser._id}`)
          console.log(myuser.data.history)
          const followingv = await Promise.all(
            myuser.data?.history.map((x) => apiClient.get(`/videos/getoneV/${x}`))
          );
          const followingb= followingv.map((x)=>x.data)
          
         
        setvideohistory(followingb)
      }
      const fectvideop=async()=>{
        const myuser=await apiClient.get(`/user/myuser/${currentuser._id}`)
      console.log(myuser.data.playlist)
      const followingv = await Promise.all(
        myuser.data?.playlist.map((x) => apiClient.get(`/videos/getoneV/${x}`))
      );
      const followingb= followingv.map((x)=>x.data)
      const f=[...new Map(followingb.map(obj => [obj._id, obj])).values()];
     
        setvideosplaylist(f)
      }
      useEffect(()=>{
        fectvideor()
        fectvideop()
        
        fectvideohi()
      },[])
  
    return(
        <div style={{marginLeft:'-21px'}}>
        {popx && <EditProfilePopup setPopx={setPopx} />}  
          <div style={{display:'flex',gap:'15px'}}>
            <img style={{ width:' 100px',
            height: '100px',
            borderRadius: '50%',
            border: '5px solid white'}} src={currentuser.profilepicture?currentuser.profilepicture:'/assets/user.png'} />
            <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
              <Title>{currentuser?.username}</Title>
              <p style={{color:'gray'}}>{currentuser?.email}</p>
              <button style={{cursor:'pointer',border:'2px solid gray',borderRadius:'3px',height:'25px',padding:'0px'}} onClick={displaymod}>Update your account</button>
            </div>
          </div>
          
            <div >

              <Title>Historique</Title>
             <div style={{ display: "flex", alignItems: "center" }}>
      {/* Left Scroll Button */}
      <button onClick={scrollLeft} style={scrollButtonStyley}>
        <FaArrowLeft />
      </button>

      {/* Scrollable History */}
      <div
        ref={scrollRef}
        className="history"
        style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            whiteSpace: "nowrap",
            scrollBehavior: "smooth",
            maxWidth: "84vw", // Restrict width to prevent screen elongation
            scrollbarWidth: "none", // Firefox scrollbar
            marginRight:'-100px',
            
        }}
      >
        {videohistory.length!==0?videohistory.map((x) => (
          <Card style={{width:'360px'}} currentvideo={x} key={x._id} />
        )):<div style={{margin:'auto',left:0,marginTop:'20%'}}>0 videos</div>}
      </div>

      {/* Right Scroll Button */}
      <button onClick={scrollRight} style={scrollButtonStylex}>
        <FaArrowRight />
      </button>
    </div>
    <Title>Liked videos</Title>
             <div style={{ display: "flex", alignItems: "center" }}>
      {/* Left Scroll Button */}
      <button onClick={scrollLeft} style={scrollButtonStyley}>
        <FaArrowLeft />
      </button>

      {/* Scrollable History */}
      <div
        ref={scrollRef}
        className="history"
        style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            whiteSpace: "nowrap",
            scrollBehavior: "smooth",
            maxWidth: "84vw", // Restrict width to prevent screen elongation
            scrollbarWidth: "none", // Firefox scrollbar
            marginRight:'-100px',
            
        }}
      >
        {videohistory.length!==0?videosLiked.map((x) => (
          <Card style={{width:'360px'}} currentvideo={x} key={x._id} />
        )):<div style={{margin:'auto',left:0,marginTop:'20%'}}>0 videos</div>}
      </div>

      {/* Right Scroll Button */}
      <button onClick={scrollRight} style={scrollButtonStylex}>
        <FaArrowRight />
      </button>
    </div>
    <Title>See Later</Title>
             <div style={{ display: "flex", alignItems: "center" }}>
      {/* Left Scroll Button */}
      <button onClick={scrollLeft} style={scrollButtonStyley}>
        <FaArrowLeft />
      </button>

      {/* Scrollable History */}
      <div
        ref={scrollRef}
        className="history"
        style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            whiteSpace: "nowrap",
            scrollBehavior: "smooth",
            maxWidth: "84vw", // Restrict width to prevent screen elongation
            scrollbarWidth: "none", // Firefox scrollbar
            marginRight:'-100px',
            
        }}
      >
        {videohistory.length!==0?videosplaylist.map((x) => (
          <Card style={{width:'360px'}} currentvideo={x} key={x._id} />
        )):<div style={{margin:'auto',left:0,marginTop:'20%'}}>0 videos</div>}
      </div>

      {/* Right Scroll Button */}
      <button onClick={scrollRight} style={scrollButtonStylex}>
        <FaArrowRight />
      </button>
    </div>
    <Title>Subscriptions videos</Title>
             <div style={{ display: "flex", alignItems: "center" }}>
      {/* Left Scroll Button */}
      <button onClick={scrollLeft} style={scrollButtonStyley}>
        <FaArrowLeft />
      </button>

      {/* Scrollable History */}
      <div
        ref={scrollRef}
        className="history"
        style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            whiteSpace: "nowrap",
            scrollBehavior: "smooth",
            maxWidth: "84vw", // Restrict width to prevent screen elongation
            scrollbarWidth: "none", // Firefox scrollbar
            marginRight:'-100px',
            
        }}
      >
        {videohistory.length!==0?followingvideos.map((x) => (
          <Card style={{width:'360px'}} currentvideo={x} key={x._id} />
        )):<div style={{margin:'auto',left:0,marginTop:'20%'}}>0 videos</div>}
      </div>

      {/* Right Scroll Button */}
      <button onClick={scrollRight} style={scrollButtonStylex}>
        <FaArrowRight />
      </button>
    </div>
    <div>

    </div>
    </div>
        </div>
    )
}
const scrollButtonStylex = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "24px",

    position:'absolute',
    marginTop:'-60px',
    right: "15px",  // Aligns the button to the right
  };
  const scrollButtonStyley = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "24px",
    padding: "10px",
    position: "absolute",
    marginTop: "-60px",
   
  };
export default Allvideos;