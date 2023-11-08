"use client";

import LoginModal from "@/components/modals/LoginModal";
import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const { modal } = useAppSelector((state) => state.modal);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      merhaba
      {modal && <LoginModal />}
    </main>
  );
}
