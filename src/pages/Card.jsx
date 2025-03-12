import apiClient from "../apiclient";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";

import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "380px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await apiClient.get(`/user/myuser/${video.userId}`);
      setChannel(res.data);

    };
    fetchChannel();
  }, [video.userId]);

  const [mycpy,setmycpy]=useState('Copy link')
  const [Op,setOp]=useState(false)
  const couper=()=>{
      setTimeout(
          () => setOp(false), 
          3000
        );
  }
  const copyf=(lien)=>{
  navigator.clipboard.writeText(lien)
  setmycpy('Copied')
  couper()
  } 
  if (Op) {
    window.onclick = couper; // Assign function reference correctly
}

  return (
    <Link to={`/video/test?id=${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.pic}
        />
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <Details type={type}>
          <ChannelImage
            type={type}
            src={'https://lh3.googleusercontent.com/a/ACg8ocKiNkvc9jC4mY4y1Af3ieT-F91AwDZ9djhoXT6eYsJ_i_hduU8=s96-c'}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.view} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
        <div className='myb32'><MoreVertSharpIcon  className='myb321' style={{color:'white'}} onClick={()=>setOp(true)}/>{Op && <div style={{position:'absolute',marginLeft:'-59px',marginTop:'-7px'}}><div className='op' onClick={()=>copyf(`https://irengetubefront.vercel.app/video/test?id=${video.link}`)} style={{border:'2px solid black',padding:'3px',textAlign: 'center',alignItems:'center' }}>{mycpy}</div></div>}</div>
      </div>
      </Container>
    </Link>
  );
};

export default Card;