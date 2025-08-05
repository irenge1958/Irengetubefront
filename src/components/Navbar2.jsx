import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import NotificationsIcon from '@mui/icons-material/Notifications';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { useState } from "react";
import Uploadx from './uploadx'
import {logout} from '../redux/userReducer'
import apiClient from "../apiclient";
import {useRef} from "react";
import EditProfilePopup from '../pages/modify'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  position: sticky;
bottom:0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
 width:100%;
 align-items: center;
`;


const Vid=styled.div`
color: ${({ theme }) => theme.text};
flex:5
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
  gap:70px
`;

const Searchx = styled.div`
  width: 100%;
  
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
 

`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  align-items: center;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navbar2 = () => {
  const [popx,setPopx]=useState(false) 
    const displaymod=()=>{
      setPopx(true)
    }
  const mysearch=useRef()
const [param,setparam]=useState(false)
const [paramx,setparamx]=useState(false)
const [pop,setpop]=useState(false)
const [result,setResults]=useState([])
const dispatch=useDispatch()
  const {currentuser} = useSelector((state) => state.user)
   
   
  const navigate = useNavigate();
const Searcheduser = styled.div`

display: flex;
gap: 15px;
  color: ${({ theme }) => theme.text};
  
  
`;
const Searched = styled.div`
  display: flex;
  flex-direction: column;

  
  padding:10px;
  width:520px;
  &:hover {
    background-color: darkgray;
   
  }
`;

   
    const Searchbox = styled.div`
  position:absolute;
  z-index: 200000000;
  background-color: ${({ theme }) => theme.bgLighter};
  margin-top:15px;
  margin-left:-8px;
 
  border-radius: 8px;
  width:540px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.text};

`;
const givesearch=(a)=>{
 
  mysearch.current.value=a
}
const Userbadge=styled.div`
  position: absolute;
  border:1px solid;
  font-size: 15px;
  background-color: rgb(218, 4, 4);
  align-items: center;
  text-align: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  padding-top: 0px;
  margin-top: -40px;
  margin-left: 17px;
`
const Div=styled.div`
flex:5;
color: ${({ theme }) => theme.text};
`
const P=styled.p`
font-size:12px;
color: ${({ theme }) => theme.text};
padding-left:5px
`
  return (
    <Container>
        {pop && <Uploadx setpop={setpop}/>}
      <>
      
      <Wrapper>
      <Div onClick={() => navigate("/")}  className="home" style={{flex:3,display:'flex',flexDirection:'column'}}><HomeIcon style={{marginLeft:'10px'}} /><P>Home</P></Div>
      <Vid style={{flex:3,display:'flex',flexDirection:'column'}} >
    <VideoCallIcon
  
      onClick={() => setpop(true)} 
      style={{ marginTop: '4px', cursor: 'pointer', fontSize: '32px' }} 
    />
  </Vid>
       <div style={{flex:3,display:'flex',flexDirection:'column'}}> 
       {currentuser===null ? <Link to="signin" style={{ textDecoration: "none" }}>
      <Button>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </Button>   
        </Link>:
  
  <><img 
    id="modalx" 
    onClick={() => navigate("/?id=Me")} 
    src={currentuser?.profilepicture ? currentuser?.profilepicture : '/assets/user.png'} 
    style={{ 
      width: "30px", 
      height: "30px", 
      borderRadius: "50%", 
      objectFit: "cover", 
      cursor: "pointer" 
    }} 
  /><P>me</P></>
}
</div>
      </Wrapper>

{popx && <EditProfilePopup setPopx={setPopx} />}  
      </>
    </Container>
  );
};

export default Navbar2;