import React, { useState } from 'react';
import axios from 'axios';
import { URL } from 'config';
import styled from 'styled-components';

interface Props {
  imgStore: (img: String) => void;
}

const FileUpload: React.FC<Props> = (props: Props) => {
  const [img, setImg] = useState<any>();
  const [imgUpload, setImgUpload] = useState<any>();

  const isSelectedImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('files', event.target.files);
    if (event.target.files !== null) {
      setImg(event.target.files[0]);
    }
  };

  const isUploadedImg = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const fd = new FormData();
    fd.append('filename', img);
    // console.log(fd);
    axios
      .post(`${URL}/user/profile-upload`, fd)
      .then(res => {
        // console.log(res);
        console.log(res.data.image_url);
        setImgUpload(res.data.image_url);
        props.imgStore(res.data.image_url);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  return (
    <Wrapper>
      <ImgBox>
        <Img src={imgUpload} alt="" />
        {/* http://localhost:3001/images/gopizza.png */}
      </ImgBox>
      <InputBox>
        <ImgInput
          type="file"
          accept="image/jpeg, image/jpg"
          onChange={isSelectedImg}
        />
        <ImgBtn type="submit" onClick={isUploadedImg}>
          Upload
        </ImgBtn>
      </InputBox>
    </Wrapper>
  );
};

export default FileUpload;

const Wrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImgBox = styled.div`
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: lightgray;
  /* background-image: url('https://www.nelson-chambers.co.uk/front/images/default-user.jpg'); */
  background-size: 100%;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const InputBox = styled.div``;
const ImgInput = styled.input`
  width: 140px;
  cursor: pointer;
`;
const ImgBtn = styled.button`
  width: 50px;
  color: white;
  border-radius: 5px;
  background-color: rgba(252, 109, 2);
  cursor: pointer;
  &:hover {
    background-color: orangered;
  }
`;
