"use client";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/authSlice";
import { SiAudiomack } from "react-icons/si";
const Nav = () => {
  const [user, loading] = useAuthState(auth);
  const links = [
    {
      name: "Anasayfa",
      url: "/home",
    },
    {
      name: "Profil",
      url: `/user/${user?.uid}`,
    },
  ];
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const logOutFunc = () => {
    dispatch(logOut());
    router.push("/");
  };

  return (
    <div className="cam h-fit w-[210px] flex flex-col items-center justify-between border border-[#ffffff80] py-7 rounded-[8px]">
      <Link
        href={links[1].url}
        id="btn"
        className="w-36 h-36 rounded-full flex items-center justify-center border-4 border-[#008cff]  "
      >
        <CiUser size={120} />
      </Link>
      <div className="w-full flex flex-col items-center py-16  rounded-[32px] gap-12 px-3">
        {links.map((link, i) => (
          <Link
            id="btn"
            className={`w-full py-3 px-2 text-center rounded-[8px] border-2 border-blue-500 text-2xl font-medium hover:bg-blue-500 hover:text-white ${
              pathname === link.url
                ? "text-blue-500 border border-[#008cff] "
                : "text-white border border-[#ffffff80]"
            }`}
            key={i}
            href={`${link.url}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <button
        id="btn"
        onClick={logOutFunc}
        className="rounded-[8px] border border-[#ffffff80] "
      >
        Çıkış Yap
      </button>
    </div>
    // <div className="w-full h-full pad flex items-center justify-between border border-t-0 border-[#008cff] rounded-b-[8px] ">
    //   <Link className="w-[40%]" href={"/home"}>
    //     <SiAudiomack size={70} />
    //   </Link>
    //   <div className="flex-1 flex justify-between text-2xl font-light">
    //     <Link className="hover:text-[#008cff]" href={"/home"}>
    //       Ana Sayfa
    //     </Link>
    //     <Link className="hover:text-[#008cff]" href={`/user/${user?.uid}`}>
    //       Profil
    //     </Link>
    //     <button className="hover:text-[#008cff]" onClick={logOutFunc}>
    //       Çıkış Yap
    //     </button>
    //   </div>
    // </div>
  );
};

export default Nav;
