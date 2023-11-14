"use client";

import { useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/utils/firebase";

const Login = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email || !password) {
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert("kullanıcı oluştu");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [email, password]
  );

  return (
    <div className="bg-gray-500 w-3/4 md:w-1/2 lg:w-[500px] mx-auto flex flex-col h-[430px] mt-5 md:mt-10 p-3 rounded-lg">
      <p className="text-center text-xl mt-5">Kayıt Ol</p>
      <form
        onSubmit={handleSubmit}
        className="h-52 w-full flex flex-col gap-5 mt-10"
      >
        {/* <div className="flex flex-col gap-1">
          <label className="cursor-pointer" htmlFor="name">
            İsim
          </label>
          <input
            className="rounded-md px-1 py-1 outline-none"
            type="text"
            name="name"
            id="name"
            placeholder="İsminiz"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div> */}
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
            className="rounded-md px-1 py-1 outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="Şifreniz"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          className="flex items-center justify-center border py-3 px-3 text-base md:text-xl rounded-lg bg-black text-white cursor-pointer active:scale-50"
          type="submit"
          value={"Kayıt Ol"}
        />
      </form>
    </div>
  );
};

export default Login;
