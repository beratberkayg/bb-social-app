"use client";
import { PostProps } from "@/app/page";
import Image from "next/image";
import React, { useState } from "react";
import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import "moment/locale/tr";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

type PostProps2 = {
  post: PostProps;
  children: React.ReactNode;
};

const Post: React.FC<PostProps2> = ({ children, post }) => {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  const tarih = post.tarih ? post.tarih.toDate() : null;

  const [showText, setShowText] = useState<boolean>(false);

  return (
    <div
      className={`bg-slate-300 rounded-lg w-full md:w-[310px] lg:w-[350px] h-26 md:h-32 lg:h-36 p-2 md:p-3 lg:p-5 flex gap-3 ${
        showText ? " h-40 md:h-44 lg:h-48" : ""
      }`}
    >
      <div className="relative w-[30px] h-[30px]  ">
        {post?.avatar ? (
          <Image
            alt=""
            src={post?.avatar ? post?.avatar : ""}
            fill
            style={{ borderRadius: "100%" }}
          />
        ) : (
          <div className="flex justify-center items-center border border-black text-xl rounded-full w-[30px] h-[30px] text-orange-500">
            <FaUser />
          </div>
        )}
      </div>
      <div className=" w-full flex flex-col gap-1">
        <div className="flex items-center  lg:text-xl">
          <p>{post?.kullaniciAd}</p>
          <span className="text-slate-400 text-[10px]">
            @{post?.kullaniciAd}
          </span>
        </div>
        <div
          onClick={() => (post?.idea.length > 70 ? setShowText(!showText) : "")}
          className={` first-letter:uppercase ${
            post?.idea.length > 70 ? " line-clamp-2 cursor-pointer  " : ""
          } ${showText ? "line-clamp-none" : ""} `}
        >
          {post?.idea}
        </div>
        <div>{moment(tarih).calendar()}</div>
      </div>
      {children}
    </div>
  );
};

export default Post;
