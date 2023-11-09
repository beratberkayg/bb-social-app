"use client";

import LoginModal from "@/components/modals/LoginModal";
import PostModal from "@/components/modals/PostModal";
import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const { loginModal } = useAppSelector((state) => state.modal);
  const { postModal } = useAppSelector((state) => state.modal);

  return (
    <main className="flex min-h-screen flex-col items-center">
      anasayfa
      {loginModal && <LoginModal />}
      {postModal && <PostModal />}
    </main>
  );
}
