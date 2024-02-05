"use client";
import { useEffect, useState } from "react";

import Nav from "../leftbar/Nav";
import Post from "../post/Post";

import { auth, db } from "@/utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { POST } from "@/app/type";
import Header from "../header/Header";
import { FaCode } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import Tweet from "../tweet/Tweet";
import TweetSkeleton from "../skeleton/TweetSkeleton";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<POST[]>([]);
  const [user, loading] = useAuthState(auth);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const ref = collection(db, "posts");
      const q = query(ref, orderBy("time", "desc"));
      const unsub = onSnapshot(q, (snap) => {
        setPosts(
          snap.docs.map((doc) => ({ ...(doc.data() as POST), id: doc.id }))
        );
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="">
      <div className="w-full min-h-screen flex lg:hidden ">
        <div className=" hidden md:block md:w-[25%] min-h-screen "></div>
        <div className="flex-1 min-h-screen ">
          <Header />
          <div className="min-h-screen flex flex-col gap-5 mt-[90px]">
            {posts?.length === 0 ? (
              <div className="flex flex-col gap-5">
                <TweetSkeleton />
                <TweetSkeleton />
                <TweetSkeleton />
                <TweetSkeleton />
              </div>
            ) : (
              posts?.map((item, i) => <Tweet key={i} item={item} />)
            )}
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

      <div className="w-full min-h-screen pad hidden lg:flex ">
        <div className="fixed flex justify-end w-[28%]  ">
          <Nav />
        </div>
        <div className="w-[30%] min-h-screen "></div>
        <div className="w-[40%] min-h-screen flex flex-col">
          <Post />

          <div className="mt-6 flex flex-col gap-5">
            {posts.length === 0 ? (
              <div className="flex flex-col gap-5">
                <TweetSkeleton />
                <TweetSkeleton />
                <TweetSkeleton />
                <TweetSkeleton />
                <TweetSkeleton />
              </div>
            ) : (
              posts.map((item, i) => <Tweet key={i} item={item} />)
            )}
          </div>
        </div>
        <div className="w-[30%] min-h-screen "></div>
      </div>
    </div>
  );
};

export default Home;
