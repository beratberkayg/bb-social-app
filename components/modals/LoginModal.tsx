"use client";

import { FcGoogle } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch } from "@/redux/hooks";
import { auth } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { loginFunc } from "@/redux/modalSlice";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginFunc());
      router.push("/"); // Başarılı giriş sonrasında yönlendirme
    } catch (error) {
      console.log(error);
      // Hata durumunda gerekli işlemleri burada yapabilirsiniz.
    }
  };

  return (
    <div className="absolute  flex items-center justify-center w-2/3 h-2/3 rounded-3xl z-10">
      <div className="shadow-black shadow-lg rounded-2xl p-10 flex flex-col gap-7 bg-slate-600 md:w-3/4">
        <div className=" w-full flex items-center justify-between">
          <h2 className="text-2xl font-medium">Giriş Yap</h2>
          <AiOutlineClose
            onClick={() => dispatch(loginFunc())}
            size={25}
            cursor={"pointer"}
            color={"red"}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="h-52 w-full flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <label className="cursor-pointer" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-1 py-1 outline-none"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="cursor-pointer" htmlFor="password">
              Şifre
            </label>
            <input
              className="rounded-md px-1 py-1 outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="Şifreniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            className="flex items-center justify-center border py-3 px-3 text-base md:text-xl rounded-lg bg-black text-white cursor-pointer active:scale-50"
            type="submit"
            value="Giriş Yap"
          />
        </form>

        <div
          onClick={GoogleLogin}
          className="flex items-center justify-center gap-3 border py-3 px-3 text-base md:text-xl rounded-lg bg-black text-white cursor-pointer active:scale-50"
        >
          <FcGoogle />
          Google ile Giriş Yap
        </div>
        <Link
          onClick={() => dispatch(loginFunc())}
          href={"/register"}
          className="flex items-center justify-center gap-3 border py-3 px-3 text-base md:text-xl rounded-lg bg-black text-white cursor-pointer active:scale-50"
        >
          Kayıt Ol
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;
