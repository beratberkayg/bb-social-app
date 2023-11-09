"use client";

import { FcGoogle } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch } from "@/redux/hooks";
import { auth } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { loginFunc } from "@/redux/modalSlice";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      if (result) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(loginFunc());
  };
  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      console.log("login");
    }
  }, [user]);

  if (loading) {
    return <h1 className="text-2xl">Kontrol Ediliyor...</h1>;
  }

  return (
    <div className="absolute  flex items-center justify-center w-2/3 h-2/3 rounded-3xl">
      <div className="shadow-black shadow-lg rounded-2xl p-10 flex flex-col gap-7">
        <div className=" w-full flex items-center justify-between">
          <h2 className="text-2xl font-medium">Giriş Yap</h2>
          <AiOutlineClose
            onClick={() => dispatch(loginFunc())}
            size={25}
            cursor={"pointer"}
            color={"red"}
          />
        </div>

        <div
          onClick={GoogleLogin}
          className="flex items-center gap-3 border py-3 px-3 text-base md:text-xl rounded-lg bg-black text-white cursor-pointer active:scale-50"
        >
          <FcGoogle />
          Google ile Giriş Yap
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
