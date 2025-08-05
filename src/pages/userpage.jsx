import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import apiClient from "../apiclient";
import {useState,useEffect} from 'react'
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import {useSelector,useDispatch} from 'react-redux'
import {sub} from '../redux/userReducer'
const Title = styled.h1`
  font-size: 26px;
  font-weight: 1000;
  color: ${({ theme }) => theme.text};
  padding-top:20px;
  padding-bottom:20px
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
const Userpage=()=>{ 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ids = queryParams.get('ids');
    const username = queryParams.get('username');
    const profilepicture = queryParams.get('profilepicture');
    const {currentuser} = useSelector((state) => state.user)
    const dispatch=useDispatch()
   
    const handlesubscribe=async()=>{   
          
      currentuser.subscribings.includes(ids)?await apiClient.put(`/user/unsubscribe/${ids}`,{id:currentuser._id}):await apiClient.post(`/user/subscribe/${ids}`,{id:currentuser._id})

        dispatch(sub(ids))
      }
 
    const [randomvideos,setRandomvideos]=useState([])
    const fectvideor=async()=>{
        const myrandomvideoss=await apiClient.get('/videos/random/')
        const thevideos=myrandomvideoss.data.filter((x)=>x.userID===ids) 
        setRandomvideos(thevideos)
      }
      useEffect(()=>{
        fectvideor()
      },[])
  
    return(
        <div style={{marginLeft:'-21px'}}>
          <div style={{display:'flex',gap:'15px'}}>
            <img style={{ width:' 100px',
            height: '100px',
            borderRadius: '50%',
            border: '5px solid white'}} src={profilepicture?profilepicture:'/assets/user.png'} />
            <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
              <Title>{username} </Title>
              <Subscribe onClick={handlesubscribe}>{currentuser?.subscribings.includes(ids)?'UNSUBSCRIBE':'SUBSCRIBE'}</Subscribe>
            </div>
          </div>
          <br></br>
            <div >
    <div style={{ display: "flex", alignItems: "center" }}>
     

        {randomvideos.length!==0?randomvideos.map((x) => (
          <Card style={{width:'360px'}} currentvideo={x} key={x._id} />
        )):<div style={{margin:'auto',left:0,marginTop:'20%'}}>0 videos</div>}
      </div>
    </div>
   
    <div>

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
export default Userpage;