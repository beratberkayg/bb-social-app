"use client";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUser } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [user, loading] = useAuthState(auth);
  const links = [
    {
      name: "Anasayfa",
      url: "/home",
    },
    {
      name: "Profil",
      url: "/user",
    },
  ];
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="cam h-full w-[210px] flex flex-col items-center justify-between border border-white py-10">
      <div
        id="btn"
        className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-[#008cff]  "
      >
        <CiUser size={90} />
      </div>

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
      <button id="btn" className="rounded-[8px] border border-[#ffffff80]">
        Çıkış Yap
      </button>
    </div>
  );
};

export default Nav;
