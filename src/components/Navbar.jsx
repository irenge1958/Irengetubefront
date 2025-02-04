import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import NotificationsIcon from '@mui/icons-material/Notifications';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { useState } from "react";
import Upload from './upload'
import {logout} from '../redux/userReducer'
import apiClient from "../apiclient";
import {useRef} from "react";
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
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
const Navbar = () => {
  const mysearch=useRef()
const [param,setparam]=useState(false)
const [pop,setpop]=useState(false)
const [result,setResults]=useState([])
const dispatch=useDispatch()
  const {currentuser} = useSelector((state) => state.user)
    const handleClickOutside = (event) => {
   
        if (param && event.target.id!=='modal') {
            setparam(false);
        }
       
    };
    
    const handleClickOutsides = (event) => {
   
      if (result.length!==0 && event.target.id!=='modal1') {
        setResults([]);
      }
     
  };
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

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('click', handleClickOutsides);
    const handlesearch=async(q)=>{
     const myvideos=await apiClient.get(`/videos/search/${q}`)
     console.log(myvideos)
 setResults(myvideos.data)
 
    }
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
  return (
    <Container>
      <>
      <Wrapper>
        <Search>
          <Searchx>
          <Input placeholder="Search" id="modal1" ref={mysearch} onChange={(e)=>handlesearch(e.target.value)}/>
          <SearchOutlinedIcon /></Searchx>
          <Searchbox>
       {result && result.map((a)=>{
return <><Link style={{ textDecoration: 'none' }} onClick={()=>{givesearch(a.title)}} to={`/videor/test?id=${a._id}`} >
                <Searched>
                  <Searcheduser color="gray">
                <div style={{position:'relative'}}>
                <p style={{fontWeight:'bold'}} >{a.title}</p>
                </div>
                </Searcheduser>
                </Searched>
                </Link> 
          
                </>
       }) }</Searchbox>
        </Search>
        
        {currentuser===null ? <Link to="signin" style={{ textDecoration: "none" }}>
       <Button>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </Button>   
        </Link>:<span><div style={{color:"white",display:'flex',gap:'10px'}}><div  ><VideoCallIcon id="modal" onClick={()=>setparam(true)} style={{marginTop:'4px',cursor:'pointer',fontSize:'32px'}} /></div><div><NotificationsIcon style={{cursor:'pointer',marginTop:'4px',fontSize:'32px'}} /><Userbadge ><p>1</p></Userbadge></div><img onClick={()=>dispatch(logout())} src={currentuser?.profilepicture?currentuser?.fromgoogle===true?currentuser?.profilepicture:`/assets/${currentuser?.profilepicture}`:'/assets/user.png'} style={{width: "40px", height: "40px",cursor:'pointer', borderRadius: "50%",objectFit: "cover",cursor: "pointer",marginRight: "13px"}} /></div>{param && <div style={{backgroundColor:'white',zIndex:'100000',marginLeft:'-190px',marginTop:'-10px',padding:'10px',borderRadius:'10px',position:'absolute'}}><p style={{cursor:'pointer',display:'flex'}} onClick={()=>setpop(true)}><SlideshowIcon /><span style={{fontSize:'20px'}}>Upload video online</span></p></div>}</span>} 
      </Wrapper>
{pop && <Upload setpop={setpop}/>}
      </>
    </Container>
  );
};

export default Navbar;
