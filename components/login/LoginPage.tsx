"use client";
import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(login({ email, password }));

    router.push("/home");
    toast.success("Giriş Yapıldı", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
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
          <form
            id="login"
            name="form"
            onSubmit={handleLogin}
            className="flex flex-col gap-7"
          >
            <div>
              <label
                htmlFor="emaill"
                className="block mb-2 text-xl font-medium "
              >
                Email
              </label>
              <input
                onChange={handleEmailChange}
                type="email"
                name="email"
                id="emaill"
                className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg block w-full p-2.5 bg-transparent outline-none focus:border focus:border-[#008cff] "
                placeholder="berat@berkay.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="passwordl"
                className="block mb-2 text-xl font-medium "
              >
                Şifre
              </label>
              <input
                onChange={handlePasswordChange}
                type="password"
                name="password"
                id="passwordl"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg bg-transparent  block w-full p-2.5 outline-none focus:border focus:border-[#008cff] "
                required
              />
            </div>
            <button
              id="btn"
              type="submit"
              className="w-full font-medium rounded-lg text-xl px-5 py-2 text-center  bg-white  transition-all "
            >
              Giriş Yap
            </button>
          </form>
          <div className="font-light text-gray-500 dark:text-gray-400 flex items-center justify-center gap-5 text-lg">
            Henüz bir hesabın yok mu?
            <div
              onClick={changeShow}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 inline-block cursor-pointer hover:text-[#008cff]"
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
          <form
            id="register"
            name="form"
            onSubmit={handleRegister}
            className="flex flex-col gap-7"
          >
            <div>
              <label htmlFor="name" className="block mb-2 text-xl font-medium ">
                Kullanıcı Adı
              </label>
              <input
                onChange={handleNameChange}
                type="name"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg block w-full p-2.5 bg-transparent outline-none focus:border focus:border-[#008cff]  "
                placeholder="beratberkay"
                required
              />
            </div>
            <div>
              <label
                htmlFor="emailr"
                className="block mb-2 text-xl font-medium "
              >
                Email
              </label>
              <input
                onChange={handleEmailChange}
                type="email"
                name="email"
                id="emailr"
                className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg block w-full p-2.5 bg-transparent outline-none focus:border focus:border-[#008cff]  "
                placeholder="berat@berkay.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="passwordr"
                className="block mb-2 text-xl font-medium "
              >
                Şifre
              </label>
              <input
                onChange={handlePasswordChange}
                type="password"
                name="password"
                id="passwordr"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-white sm:text-sm rounded-lg bg-transparent  block w-full p-2.5 outline-none focus:border focus:border-[#008cff] "
                required
              />
            </div>
            <button
              id="btn"
              type="submit"
              className="w-full font-medium rounded-lg text-xl px-5 py-2 text-center  bg-white  transition-all "
            >
              Kayıt Ol
            </button>
          </form>
          <div className="font-light text-gray-500 dark:text-gray-400 flex items-center justify-center gap-5 text-lg">
            Hesabın var mı ?
            <div
              onClick={changeShow}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 inline-block cursor-pointer hover:text-[#008cff]"
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
