import apiClient from "../apiclient";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";

const Container = styled.div`
  width: 100%;
  margin-bottom:10px;
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
width:150px;
  width: 200px;
  height: ${(props) => (props.type === "sm" ? "120px" : "140px")};
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
const history=async()=>{
const myhistory=await apiClient.post(``)
}
  return (
    <Link to={`/video/test?id=${video._id}`} onClick={history} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          
          src={video.pic}
      
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel?.profilepicture?channel?.profilepicture:'/assets/user.png'}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.view} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;