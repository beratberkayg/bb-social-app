"use client";
import { useEffect, useState } from "react";

import Nav from "../leftbar/Nav";
import Post from "../post/Post";
import Tweet from "../tweet/Tweet";

import { db } from "@/utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { POST } from "@/app/type";
import Header from "../header/Header";
import { FaCode } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
const Home = () => {
  const [posts, setPosts] = useState<POST[]>([]);
  const getPosts = async () => {
    const ref = collection(db, "posts");
    const q = query(ref, orderBy("time", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((doc) => ({ ...(doc.data() as POST) })));
    });
  };

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    getPosts();
  }, [db]);
  return (
    <div className="bg !bg-contain">
      <div className="w-full min-h-screen flex   lg:hidden">
        <div className=" hidden md:block md:w-[25%] min-h-screen"></div>
        <div className="flex-1 min-h-screen ">
          <Header />
          <div className="min-h-screen flex flex-col gap-5 mt-[90px]">
            {posts.map((item, i) => (
              <Tweet key={i} item={item} />
            ))}
            {show && (
              <div className="fixed left-0 top-0 w-full h-full flex items-center justify-center cam">
                <Post />
              </div>
            )}
          </div>
          <div
            onClick={() => setShow(!show)}
            className="fixed bottom-3 right-3 z-50 border bg-[#008cff] flex items-center justify-end rounded-full w-[60px] h-[60px] a cursor-pointer pr-1"
          >
            {show ? <IoClose size={50} /> : <FaCode size={50} />}
          </div>
        </div>

        <div className=" hidden md:block md:w-[25%] min-h-screen"></div>
      </div>
      {/* pc */}
      <div className=" pad items-center justify-center hidden lg:flex ">
        <div className="relative top-0 left-0 w-full min-h-screen flex">
          <div className="fixed left-[300px] w-[200px] ">
            <Nav />
          </div>
          <div className="w-[500px] h-full"></div>
          <div className="flex flex-col w-[500px] h-full  ">
            <div className="fixed w-[500px] z-20 ">
              <Post />
            </div>
            <div className="h-[185px]"></div>
            <div className="min-h-screen  flex flex-col gap-5">
              {posts.map((item, i) => (
                <Tweet key={i} item={item} />
              ))}
            </div>
          </div>
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
