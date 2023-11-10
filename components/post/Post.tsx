"use client";
import { PostProps } from "@/app/page";
import Image from "next/image";
import React from "react";

type PostProps2 = {
  post: PostProps;
};

const Post: React.FC<PostProps2> = ({ post }) => {
  return (
    <div className="bg-slate-500 p-5 border-b-2 rounded-lg text-white w-full flex">
      <div className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] relative">
        <Image alt="" src={post.avatar} fill style={{ borderRadius: "100%" }} />
      </div>
      <div className="flex flex-col gap-2 mx-3 w-full">
        <div className="flex items-center ">
          <h2 className="text-2xl md:text-3xl">{post.kullaniciAd}</h2>
          <span className="text-sm text-slate-300">@{post.kullaniciAd}</span>
        </div>
        <div className="md:mt-2 md:py-4 w-full first-letter:uppercase overscroll-contain md:text-lg">
          <p>{post.idea}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
