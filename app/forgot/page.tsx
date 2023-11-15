"use client";

import { useState, useCallback } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import LoginModal from "@/components/modals/LoginModal";

const Forgot = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const { loginModal } = useAppSelector((state) => state.modal);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email) {
        return;
      }

      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Şifre Sıfırlama Emaile Gönderildi.");
          router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [email]
  );

  return (
    <>
      {loginModal && <LoginModal />}
      <div className="bg-gray-500 w-3/4 md:w-1/2 lg:w-[500px] mx-auto flex flex-col mt-5 md:mt-10 p-3 rounded-lg">
        <p className="text-center text-xl md:text-2xl lg:text-3xl font-bold mt-5">
          Şifremi Unuttum
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 mt-10"
        >
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
            <span>
              Emailinize Gelen Link ile Şifrenizi Sıfırlayabilirsiniz.
            </span>
          </div>
          <input
            className="flex items-center justify-center border py-3 px-3 text-base md:text-xl rounded-lg bg-black text-white cursor-pointer hover:scale-75"
            type="submit"
            value={"Şifremi Sıfırla"}
          />
        </form>
      </div>
    </>
  );
};

export default Forgot;
