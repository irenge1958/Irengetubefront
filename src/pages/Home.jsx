import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import apiClient from "../apiclient";
import {useState,useEffect} from 'react'

const Container = styled.div`
  display: flex;
  gap:27px;
  flex-wrap: wrap;
`;

const Home = () => {
  const [randomvideos,setRandomvideos]=useState([])
  useEffect(()=>{
    const fectvideo=async()=>{
      const myrandomvideos=await apiClient.get('/videos/random/')
       
      setRandomvideos(myrandomvideos.data)
    }
    fectvideo()
  },[]) 
  console.log(randomvideos)
  return (
    <Container>
{randomvideos.map((x)=>{
 return <Card currentvideo={x} key={x._id} />
})}
      
     
     
    </Container>
  );
};

export default Home;
