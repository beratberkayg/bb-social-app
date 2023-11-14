"use client";

import { useAppDispatch } from "@/redux/hooks";
import { loginFunc, postFunc } from "@/redux/modalSlice";
import Link from "next/link";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
      <Link href="/" className=" text-xl md:text-2xl  ">
        <span className="text-2xl md:text-3xl font-bold text-orange-500">
          BB
        </span>{" "}
        Sosyal App
      </Link>
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer text-orange-500"
      >
        <AiFillHome size={35} />
      </div>

      {!user && (
        <div
          onClick={() => dispatch(loginFunc())}
          className="text-xl font-semibold  bg-orange-500 py-1 px-3 md:py-2 md:px-5 rounded-xl hover:bg-black hover:text-orange-500 hover:transition-all active:scale-50 cursor-pointer shadow-lg shadow-black hover:shadow-orange-500"
        >
          Giriş Yap
        </div>
      )}
      {user && (
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              dispatch(postFunc());
            }}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg text-xl"
          >
            Post
          </button>

          <Link
            href={`user/${user.uid}`}
            className="w-[50px] h-[50px] relative "
          >
            {user?.photoURL ? (
              <Image
                alt=""
                src={user.photoURL}
                height={50}
                width={50}
                style={{ borderRadius: "100%" }}
              />
            ) : (
              <div className="border border-black w-[50px] h-[50px] rounded-full flex justify-center items-center text-3xl hover:text-orange-500 hover:bg-black hover:transition-all">
                <FaUser />
              </div>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
