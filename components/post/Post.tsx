"use client";
import { PostProps } from "@/app/page";
import Image from "next/image";
import React, { useState } from "react";
import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import "moment/locale/tr";
import { useRouter } from "next/navigation";

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
      className={`bg-slate-300 rounded-lg w-full md:w-[310px] lg:w-[400px] h-26 md:h-32 lg:h-36 p-2 md:p-3 lg:p-5 flex gap-3 ${
        showText ? "h-36 md:h-44 lg:h-48" : ""
      }`}
    >
      <div className="relative w-[30px] h-[30px]  ">
        <Image
          alt=""
          src={post?.avatar}
          fill
          style={{ borderRadius: "100%" }}
        />
      </div>
      <div className=" w-full flex flex-col gap-1">
        <div className="flex items-center  lg:text-xl">
          <p>{post?.kullaniciAd}</p>
          <span className="text-[13px] text-slate-400 ">
            @{post?.kullaniciAd}
          </span>
        </div>
        <div
          onClick={() => (post?.idea.length > 62 ? setShowText(!showText) : "")}
          className={` first-letter:uppercase ${
            post?.idea.length > 80 ? " line-clamp-2 cursor-pointer " : ""
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
