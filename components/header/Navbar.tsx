"use client";

import { useAppDispatch } from "@/redux/hooks";
import { modalFunch } from "@/redux/modalSlice";
import Link from "next/link";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <nav className="flex justify-center items-center pt-10 pb-7 border-b border-black">
        <h2 className="text-2xl">Kullanıcı Bekleniyor...</h2>
      </nav>
    );
  }

  return (
    <nav className="flex justify-between items-center pt-10 pb-7 border-b border-black">
      <Link href="/" className="text-2xl active:scale-50 ">
        <span className="text-3xl font-bold">BB</span> Sosyal App
      </Link>
      <div
        onClick={() => dispatch(modalFunch())}
        className="text-xl font-semibold  bg-orange-500 py-2 px-5 rounded-xl hover:bg-black hover:text-orange-500 hover:transition-all active:scale-50 cursor-pointer shadow-lg shadow-black hover:shadow-orange-500"
      >
        Giriş Yap
      </div>
    </nav>
  );
};

export default Navbar;
