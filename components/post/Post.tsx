import Image from "next/image";
import React from "react";

const Post = () => {
  return (
    <div className="bg-slate-500 p-8 border-b-2 rounded-lg text-white w-full">
      <div className="flex items-center gap-2">
        <div className="w-[50px] h-[50px] relative">
          <Image
            alt=""
            src={""}
            height={50}
            width={50}
            style={{ borderRadius: "100%" }}
          />
        </div>
        <h2>Kullanıcı Ad</h2>
      </div>
      <div className="py-4">
        <p>Düşünce</p>
      </div>
    </div>
  );
};

export default Post;
