import React from "react";
// import styled from "styled-component";
import uuid from "react-uuid";
import Post from "./Post";

const PostList = () => {
  const userInfo = { usersId: 2, nickname: "leezy_kim", userImage: "../images/profile/pf_8.svg" };
  const posts = [
    {
      postsId: 1,
      usersId: 1,
      nickname: "ssumniee",
      userImage: "../images/profile/pf_6.svg",
      postImage:
        "https://static2.jetpens.com/images/a/000/131/131193.jpg?auto=format&ba=middle%2Ccenter&balph=3&blend64=aHR0cDovL3d3dy5qZXRwZW5zLmNvbS9pbWFnZXMvYXNzZXRzL3dhdGVybWFyazIucG5n&bm=difference&bs=inherit&chromasub=444&fm=jpg&h=400&mark64=aHR0cDovL3d3dy5qZXRwZW5zLmNvbS9pbWFnZXMvYXNzZXRzL3dhdGVybWFyazEucG5n&markalign=top%2Cright&markalpha=30&markscale=16&q=90&usm=20&w=600&s=7153d8812812e4ead75b8a4ace86516d",
      content: "오늘도 칭찬 일기 작성 끝~ 점점 습관이 되는게 느껴진다..!",
      createdAt: "2021-10-13 10:55:51",
    },
    {
      postsId: 2,
      usersId: 2,
      nickname: "leezy_kim",
      userImage: "../images/profile/pf_8.svg",
      postImage: "https://scienceoflove.co.kr/wp-content/uploads/2018/05/sol811_illu_02.png",
      content: "칭찬? 그게 뭔데여 ㅎㅅㅎ",
      createdAt: "2021-10-13 10:55:51",
    },
  ];

  return (
    <>
      <Post isInput info={userInfo} />
      {posts.map((post) => (
        <Post key={uuid()} info={post} />
      ))}
    </>
  );
};

export default PostList;
