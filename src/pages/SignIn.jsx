import React from "react";
import styled from "styled-components";
import { useRef } from 'react';
import {useDispatch } from 'react-redux'
import apiClient from "../apiclient";
import {startfecth, successfecth} from '../redux/userReducer'
import {auth,provider} from '../firebase'
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn =  () => {
  const navigateto=useNavigate()
  const dispatch=useDispatch()
  const username=useRef()
  const password=useRef()
  const usernamex=useRef()
  const passwordx=useRef()
  const emailx=useRef()
  const handlesignin = async (e) => {
    e.preventDefault();
    dispatch(startfecth())
    try {
      const response = await apiClient.post('/auth/signin', {
        email: username.current.value,
        password: password.current.value
      });
      console.log(response.data.user);
      dispatch(successfecth(response.data.user))
      navigateto('/')
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  
const handlesignup = async (e) => {
  e.preventDefault();
  try {
    const response = await apiClient.post('/auth/signup', {
      email: emailx.current.value,
      password: passwordx.current.value,
      username: usernamex.current.value
    });
    console.log('Response:', response.data);
    dispatch(successfecth(response.data.user))
    navigateto('/')
  } catch (error) {
    if (apiClient.isapiClientError(error)) {
      console.error('apiClient error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
const handlesigninwithgoogle=()=>{
  signInWithPopup(auth,provider)
  .then(async(result)=>{
    try{
      const response = await apiClient.post('/auth/signinwithgoogle', {
        email: result.user.email,
        img: result.user.photoURL,
        username: result.user.displayName,
      })
      dispatch(successfecth(response.data.user))
      navigateto('/')
    }catch(err){
console.log(err)
    }})
  .catch((err)=>{console.log(err)})
} 
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>continue to IrengeTube</SubTitle>
        <Input placeholder="email" ref={username} required/>
        <Input type="password" ref={password} placeholder="password" required/>
        <Button onClick={handlesignin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={handlesigninwithgoogle}>Sign in with google</Button>
        <Title>or</Title>
        <Input placeholder="username" ref={usernamex} />
        <Input placeholder="email" ref={emailx} />
        <Input type="password" ref={passwordx} placeholder="password" />
        <Button onClick={handlesignup}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
