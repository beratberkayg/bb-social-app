"use client";
import { useEffect, useState } from "react";

import Nav from "../leftbar/Nav";
import Post from "../post/Post";
import Tweet from "../tweet/Tweet";

import { db } from "@/utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { POST } from "@/app/type";

const Home = () => {
  const [posts, setPosts] = useState<POST[]>([]);
  const getPosts = async () => {
    const ref = collection(db, "posts");
    const q = query(ref, orderBy("time", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((doc) => ({ ...(doc.data() as POST) })));
    });
  };

  useEffect(() => {
    getPosts();
  }, [db]);
  return (
    <div className="bg pad !bg-contain flex items-center justify-center">
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
