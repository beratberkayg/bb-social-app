"use client";

import LoginModal from "@/components/modals/LoginModal";
import PostModal from "@/components/modals/PostModal";
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
import { db } from "@/utils/firebase";

export interface Post {
  avatar: string;
  idea: string;
  kullaniciAd: string;
  kullaniciId: string;
  tarih: string;
}

const Home: React.FC = () => {
  const { loginModal } = useAppSelector((state) => state.modal);
  const { postModal } = useAppSelector((state) => state.modal);
  const [postlar, setPostlar] = useState<Post[]>([]);

  const postlarıGetir = async () => {
    const collectionRef = collection(db, "postlar");
    const q = query(collectionRef, orderBy("tarih", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPostlar(
        snap.docs.map((doc) => ({ ...(doc.data() as Post), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    postlarıGetir();
  }, []);

  return (
    <main className="flex flex-col items-center mt-5 gap-5">
      {loginModal && <LoginModal />}
      {postModal && <PostModal />}
      <h2 className="text-2xl font-bold md:text-3xl">DÜŞÜNCELER</h2>
      <p>Bu Sayfada Tüm Kullanıcıların Düşünceleri Gösterilir.</p>
      {postlar &&
        postlar.map((post) => <Post key={post.kullaniciId} post={post} />)}
    </main>
  );
};

export default Home;
