import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";

const PostContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
  margin-bottom: 1.5rem;

  :last-of-type {
    margin-bottom: 0;
  }

  .container {
    background-color: ${(props) =>
      props.isMine ? "var(--color-lightblue--02)" : "var(--color-lightgray)"};
    border: 1px solid
      ${(props) => (props.isMine ? "var(--color-mainblue)" : "var(--color-midgray)")};
  }
`;

const ProfileImage = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 3rem;
  background-image: url(${(props) => props.url});
`;

const ProfileText = styled.div`
  display: flex;
  align-items: baseline;
  font-family: Interop-SemiBold;
  margin-bottom: 0.75rem;
`;

const Nickname = styled.div`
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const CreatedAt = styled.div`
  font-size: 0.875rem;
  color: var(--color-gray);
`;

const Content = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ContentContainer = styled.div`
  margin: 0 1.5rem;
  width: calc(100% - 12rem);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const InputForm = styled.form`
  margin: 0 1.5rem;
  width: calc(100% - 12rem);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  #photo {
    display: none;
  }
`;

const Input = styled.input`
  font-size: 1rem;
  background-color: transparent;
  margin-bottom: 0.5rem;

  #text::placeholder {
    color: var(--color-gray);
  }
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 0;
  padding-top: ${(props) => (props.url ? "60%" : 0)};
  /* border: 1px solid var(--color-midgray); */
  border-radius: 10px;
  background-image: url(${(props) => props.url});
  background-size: cover;
`;

const PostButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  > * {
    border-radius: 6px;
  }
`;

const AddImage = styled.label`
  font-size: 1.125rem;
  width: 2rem;
  height: 2rem;
  /* border: 1px solid var(--color-lightblue); */
  color: var(--color-mainblue);
  margin-right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ::before {
    width: 100%;
    top: calc(1rem - 1.125rem / 2);
    left: calc(1rem - 1.575rem / 2);
  }

  :hover {
    background-color: var(--color-lightblue--04);
  }
`;

const UploadPost = styled.button`
  padding: 0.5rem 0.8rem;
  background-color: var(--color-mainblue);
  font-family: Interop-SemiBold;
  font-size: 0.875rem;
  color: var(--color-white);

  :hover {
    background-color: var(--color-mainblue);
    opacity: 0.9;
  }

  :disabled {
    color: var(--color-lightgray);
    background-color: var(--color-darkblue);
    opacity: 0.8;
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 0;
  padding-top: 60%;
  /* border: 1px solid var(--color-midgray); */
  border-radius: 10px;
  background-image: url(${(props) => props.url});
  background-size: cover;
`;

const Post = ({ info, isInput }) => {
  const { usersId, nickname, image } = useSelector(({ authReducer }) => authReducer);
  const [inputText, setInputText] = useState("");
  const [inputFile, setInputFile] = useState("");
  const [imgBase64, setImgBase64] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    switch (event.target.name) {
      case "text":
        setInputText(event.target.value);
        break;
      case "photo":
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            setImgBase64(base64.toString());
          }
        };
        if (event.target.files[0]) {
          reader.readAsDataURL(event.target.files[0]);
          setInputFile(event.target.files[0]);
        }
        break;
      default:
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("text", inputText);
    formData.append("photo", inputFile);

    axios({
      method: "post",
      url: "http://localhost:8080/test",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      setInputText("");
      setInputFile("");
      setImgBase64("");
    });
  };

  return (
    <PostContainer isMine={info.usersId === usersId}>
      <ProfileImage url={image} />
      {isInput ? (
        <InputForm
          className="container"
          name="inputFile"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <Input
            id="text"
            type="text"
            name="text"
            placeholder="오늘 달성하신 습관에 대해 공유해보세요."
            value={inputText}
            onChange={handleInputChange}
            required
          />
          <Input
            id="photo"
            type="file"
            name="photo"
            accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf"
            onChange={handleInputChange}
          />
          <PreviewImage url={imgBase64} />
          <PostButtonContainer>
            <AddImage className="icon-picture" htmlFor="photo" />
            <UploadPost type="submit">공유하기</UploadPost>
          </PostButtonContainer>
        </InputForm>
      ) : (
        <ContentContainer
          className="container"
          key={info.postsId}
          isMine={usersId === info.usersId}
        >
          <ProfileText>
            <Nickname>{nickname}</Nickname>
            <CreatedAt>{info.createdAt}</CreatedAt>
          </ProfileText>
          <Content>{info.content}</Content>
          <PostImage url={info.image} />
        </ContentContainer>
      )}
    </PostContainer>
  );
};

Post.defaultProps = {
  isInput: true,
  info: {
    postsId: null,
    usersId: "",
    habitsId: null,
    userhabitsId: null,
    createdAt: "",
    image: "",
    content: "",
  },
};

Post.propTypes = {
  info: PropTypes.shape({
    postsId: PropTypes.number,
    usersId: PropTypes.string,
    habitsId: PropTypes.number,
    userhabitsId: PropTypes.number,
    createdAt: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string,
  }),
  isInput: PropTypes.bool,
};

export default Post;
