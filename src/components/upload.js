import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState, useRef } from "react";
import app from '../firebase';
import apiClient from "../apiclient";
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Upload = ({ setpop }) => {
    const [video, setVideo] = useState(undefined);
    const [images, setImages] = useState(undefined);
    const [imagesPerc, setImagesPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [input, setInput] = useState({
        title: '',
        description: '',
        tagg: '',
        MyUrlvideo: '',
        MyUrlimg: ''
    });

 const {currentuser} = useSelector((state) => state.user)
const navigateto=useNavigate();
    const uploadFile = (file, MyUrl) => {
        
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                MyUrl === 'MyUrlvideo' ? setVideoPerc(progress) : setImagesPerc(progress);
            },
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInput((prev) => ({ ...prev, [MyUrl]: downloadURL }));
                });
            }
        );
    };

    useEffect(() => {
        if (video) uploadFile(video, 'MyUrlvideo');
    }, [video]);

    useEffect(() => {
        if (images) uploadFile(images, 'MyUrlimg');
    }, [images]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddVideo = async (e) => {
        e.preventDefault();
        const addvideo=await apiClient.post(`/videos/createvideo/${currentuser._id}`,{pic:input.MyUrlimg,videourl:input.MyUrlvideo,title:input.title,tagg:input.tagg,description:input.description})
        console.log(addvideo.data);
        navigateto(`/video/test?id=${addvideo.data._id}`)
        setpop(false)
    };

    return (
        <div style={{ position: 'fixed', zIndex: '100000000', left: '0', top: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <ModalContent>
                <span>
                    <p style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setpop(false)}>x</p>
                    <h1 style={{ color: 'white' }}>Upload your video</h1>
                </span>
                <form style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <p>Video:</p>
                    <div>
                        {videoPerc > 0 ? (
                            <Mypperc>Uploading: {Math.ceil(videoPerc)}%</Mypperc>
                        ) : (
                            <InputContent name="video" type='file' onChange={(e) => setVideo(e.target.files[0])} required />
                        )}
                    </div>
                    <br />
                    <InputContent name='title' type='text' value={input.title} onChange={handleInputChange} placeholder="Title" required />
                    <br /><br></br><br></br>
                    <InputContent name='description' type='text' value={input.description} onChange={handleInputChange} placeholder="Description" required />
                    <br /><br></br><br></br>
                    <InputContent name='tagg' type='text' value={input.tagg} onChange={handleInputChange} placeholder="Tags (separate with commas)" required />
                    <br /><br></br><br></br>
                    <p>Image:</p>
                    {imagesPerc > 0 ? (
                        <Mypperc>Uploading: {Math.ceil(imagesPerc)}%</Mypperc>
                    ) : (
                        <InputContent name="image" type='file' onChange={(e) => setImages(e.target.files[0])} required />
                    )}
                    <br /><br />
                    <InputContent type='button' onClick={handleAddVideo} value='Upload' style={{ width: '95%', cursor: 'pointer' }} />
                </form>
            </ModalContent>
        </div>
    );
};

const ModalContent = styled.div`
  z-index: 200000000;
  background-color: ${({ theme }) => theme.bgLighter};
  margin: 10% auto;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
`;

const InputContent = styled.input`
  background-color: ${({ theme }) => theme.bgLighter};
  width: 90%;
  border: 2px solid #ccc;
  padding: 10px;
  color: white;
`;

const Mypperc = styled.div`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.bgLighter};
  width: 90%;
  border: 2px solid #ccc;
  padding: 10px;
  color: white;
`;

export default Upload;
