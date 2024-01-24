import React from "react";
import { FaUser } from "react-icons/fa";
import { SiAudiomack } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logOutFunc = () => {
    dispatch(logOut());
    router.push("/");
  };
  return (
    <div className="cam !rounded-b-[20px] border border-[#008cff] border-t-0 fixed top-0  w-full md:w-[50%]  text-center flex justify-between items-center px-2 lg:px-5 z-10 h-[70px]">
      <Link href={"/user"} className="">
        <FaUser size={40} color={"#008cff"} />
      </Link>
      <Link href={"/home"}>
        <SiAudiomack size={70} />
      </Link>
      <button onClick={logOutFunc}>
        <AiOutlineLogout size={40} color={"red"} />
      </button>
    </div>
  );
};

export default Header;
