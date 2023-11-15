"use client";

import { useState, useCallback } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/modals/LoginModal";
import { useAppSelector } from "@/redux/hooks";

const Login = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { loginModal } = useAppSelector((state) => state.modal);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email || !password) {
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          updateProfile(auth.user, { displayName: name });
          router.push("/");
          alert("Kayıt Başarılı");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [name, email, password]
  );

  return (
    <>
      {loginModal && <LoginModal />}
      <div className="bg-gray-500 w-3/4 md:w-1/2 lg:w-[500px] mx-auto flex flex-col mt-5 md:mt-10 p-3 rounded-lg">
        <p className="text-center text-xl md:text-2xl lg:text-3xl font-bold mt-5">
          Kayıt Ol
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 mt-10"
        >
          <div className="flex flex-col gap-1">
            <label className="cursor-pointer" htmlFor="name">
              Kullanıcı Adı
            </label>
            <input
              className="rounded-md px-1 py-2 outline-none text-lg"
              type="text"
              name="name"
              id="name"
              placeholder="Kullanıcı Adı"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="cursor-pointer" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-1 py-2 outline-none text-lg"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="cursor-pointer" htmlFor="password">
              Şifre
            </label>
            <input
              className="rounded-md px-1 py-2 outline-none text-lg"
              type="password"
              name="password"
              id="password"
              placeholder="Şifreniz"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-center">
              Şifreniz en az 8 karakterli olmalıdır.
            </span>
          </div>
          <input
            className="flex items-center justify-center border py-3 px-3 text-base md:text-xl rounded-lg bg-black text-white cursor-pointer hover:scale-75"
            type="submit"
            value={"Kayıt Ol"}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
