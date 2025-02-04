import apiClient from "../apiclient";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "100%"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 450px;
  height: ${(props) => (props.type === "sm" ? "120px" : "282px")};
  background-color: #999;
 border-radius:10px;
`;

const Details = styled.div`
  display: flex;
  flex-direction:column;
  margin-top: ${(props) => props.type !== "sm" && "0px"};


`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
display:flex;
gap:6px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
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

const Card2 = ({ type, video }) => {

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await apiClient.get(`/user/myuser/${video?.userID}`);
      setChannel(res.data);

    };
    fetchChannel();
  }, [video?.userId]);

  return (
    <Link to={`/video/test?id=${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <div style={{display:'flex',gap:'30px'}}>
            <div>
        <Image
          type={type}
          src={video.pic}
        /></div>
        <div>
        <Details type={type}>
          <Title>{video.title}</Title>
          <Info>{video.view} views • {format(video.createdAt)}</Info><br></br>
          <Texts>
          
            <ChannelImage
            type={type}
            src={channel.profilepicture}
          />
            <ChannelName>{channel.username}</ChannelName>
            
          </Texts>
          <ChannelName>{video.description}</ChannelName>
        </Details>
        </div>
        </div>
      </Container>
    </Link>
  );
};

export default Card2;