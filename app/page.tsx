"use client";

import LoginModal from "@/components/modals/LoginModal";
import PostModal from "@/components/modals/PostModal";
import Post from "@/components/post/Post";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import {} from "firebase/firestore";

export default function Home() {
  const { loginModal } = useAppSelector((state) => state.modal);
  const { postModal } = useAppSelector((state) => state.modal);
  const [postlar, setPostlar] = useState();

  return (
    <main className="flex flex-col items-center mt-5 gap-5">
      {loginModal && <LoginModal />}
      {postModal && <PostModal />}
      <h2 className="text-2xl font-bold md:text-3xl">DÜŞÜNCELER</h2>
      <p>Bu Sayfada Tüm Kullanıcıların Düşünceleri Gösterilir.</p>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </main>
  );
}
