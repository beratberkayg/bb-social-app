"use client";
import React, { useState } from "react";
import "./module.style.css";
import { motion } from "framer-motion";

import {
  changeEmail,
  changeName,
  changePassword,
  register,
  login,
} from "@/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [show, setShow] = useState<boolean>(true);

  const changeShow = () => {
    setShow(!show);
  };

  const { name, email, password, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeName(e.currentTarget.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEmail(e.currentTarget.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changePassword(e.currentTarget.value));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    router.push("/home");
  };
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    router.push("/home");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className="glass flex flex-col px-5 py-3"
    >
      {show ? (
        <div className="flex flex-col gap-10">
          <div className="text-4xl mt-7 text-center">Giriş Yap</div>
          <form onSubmit={handleLogin} className="flex flex-col gap-7">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-xl font-medium "
              >
                Email
              </label>
              <input
                onChange={handleEmailChange}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg block w-full p-2.5 bg-transparent outline-none "
                placeholder="berat@berkay.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-xl font-medium "
              >
                Şifre
              </label>
              <input
                onChange={handlePasswordChange}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg bg-transparent  block w-full p-2.5 outline-none "
                required
              />
            </div>
            <button
              type="submit"
              className="w-full font-medium rounded-lg text-xl px-5 py-2 text-center hover:scale-95 bg-white text-black transition-all "
            >
              Giriş Yap
            </button>
          </form>
          <div className="font-light text-gray-500 dark:text-gray-400 flex items-center justify-center gap-5 text-lg">
            Henüz bir hesabın yok mu?
            <div
              onClick={changeShow}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 inline-block cursor-pointer"
            >
              Aramıza Katıl!
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: 2 }}
          className="flex flex-col gap-7"
        >
          <div className="text-4xl mt-2 text-center">Kayıt Ol</div>
          <form onSubmit={handleRegister} className="flex flex-col gap-7">
            <div>
              <label htmlFor="name" className="block mb-2 text-xl font-medium ">
                Kullanıcı Adı
              </label>
              <input
                onChange={handleNameChange}
                type="name"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg block w-full p-2.5 bg-transparent outline-none "
                placeholder="beratberkay"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-xl font-medium "
              >
                Email
              </label>
              <input
                onChange={handleEmailChange}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg block w-full p-2.5 bg-transparent outline-none "
                placeholder="berat@berkay.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-xl font-medium "
              >
                Şifre
              </label>
              <input
                onChange={handlePasswordChange}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg bg-transparent  block w-full p-2.5 outline-none "
                required
              />
            </div>
            <button
              type="submit"
              className="w-full font-medium rounded-lg text-xl px-5 py-2 text-center hover:scale-95 bg-white text-black transition-all "
            >
              Kayıt Ol
            </button>
          </form>
          <div className="font-light text-gray-500 dark:text-gray-400 flex items-center justify-center gap-5 text-lg">
            Hesabın var mı ?
            <div
              onClick={changeShow}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 inline-block cursor-pointer"
            >
              Giriş Yap!
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoginPage;
