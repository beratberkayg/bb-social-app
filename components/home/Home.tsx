import React from "react";

import Nav from "../leftbar/Nav";
import Post from "../post/Post";

const Home = () => {
  return (
    <div className="relative top-0 left-0 w-full min-h-screen bg pad !bg-contain flex">
      <div className="fixed left-[300px] w-[200px] ">
        <Nav />
      </div>
      <div className="w-[500px] h-full"></div>
      <div className="flex flex-col w-[500px] h-full  ">
        <div className="fixed w-[500px] z-20 ">
          <Post />
        </div>
        <div className="h-[185px]"></div>
        <div className="min-h-[3000px] cam z-10 border border-[#ffffff80] rounded-[8px]">
          asdasdsa
        </div>
      </div>
    </div>

    // {<div className="bg !bg-contain w-full min-h-[3000px] relative top-0 left-0 pad flex  ">
    //   <Nav />
    //   <div className="w-[410px] h-full"></div>
    //   <div className="border border-[#ffffff80] flex-1 w-full  min-h-screen cam rounded-[8px]  "></div>
    //   <div className="w-[410px] h-full"></div>
    //   <Post />
    // </div>}
  );
};

export default Home;
