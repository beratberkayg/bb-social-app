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
import Home from "@/components/home/Home";

export type PostProps = {
  key: string;
  avatar?: string | null;
  idea: string;
  kullaniciAd?: string | null;
  kullaniciId: string;
  tarih: Timestamp;
  id: string;
};

const HomePage: React.FC = () => {
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

  return <Home />;
};

export default HomePage;
