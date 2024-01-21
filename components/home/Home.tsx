import React from "react";
import Post from "../post/Post";
import Nav from "../leftbar/Nav";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full mx-auto pad bg">
      <div className="w-[20%]"></div>
      <div className="w-full h-full  rounded-[32px] pad flex gap-5 ">
        <Nav />
        <div className="flex-1 flex flex-col gap-5">
          <Post />
          <div className="flex-1 !rounded-[8px] cam border border-[#ffffff80] min-h-[2000px]">
            sad
          </div>
        </div>
      </div>
      <div className="w-[20%]"></div>
    </div>
  );
};

export default Home;
