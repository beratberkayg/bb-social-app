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

export type PostProps = {
  key: string;
  avatar: string;
  idea: string;
  kullaniciAd: string;
  kullaniciId: string;
  tarih: Timestamp;
  id: string;
};

const Home: React.FC = () => {
  const { loginModal } = useAppSelector((state) => state.modal);
  const { postModal } = useAppSelector((state) => state.modal);
  const [postlar, setPostlar] = useState<PostProps[]>([]);

  const postlarıGetir = async () => {
    const collectionRef = collection(db, "postlar");
    const q = query(collectionRef, orderBy("tarih", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPostlar(
        snap.docs.map((doc) => ({ ...(doc.data() as PostProps), id: doc.id }))
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
      <p className="text-center">
        Bu Sayfada Tüm Kullanıcıların Düşünceleri Gösterilir.
      </p>
      <div className="flex items-center justify-center flex-wrap gap-3">
        {postlar &&
          postlar.map((post) => (
            <Post key={post.kullaniciId} post={post}>
              {}
            </Post>
          ))}
      </div>
    </main>
  );
};

export default Home;
