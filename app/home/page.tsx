"use client";

import Post from "@/components/post/Post";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Nav from "@/components/leftbar/Nav";

export type PostProps = {
  key: string;
  avatar?: string | null;
  idea: string;
  kullaniciAd?: string | null;
  kullaniciId: string;
  tarih: Timestamp;
  id: string;
};

const Home: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  //   {
  //  const postlarıGetir = async () => {
  //     const collectionRef = collection(db, "postlar");
  //     const q = query(collectionRef, orderBy("tarih", "desc"));
  //     const unsub = onSnapshot(q, (snap) => {
  //       setPostlar(
  //         snap.docs.map((doc) => ({ ...(doc.data() as PostProps), id: doc.id }))
  //       );
  //     });
  //   };}

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
