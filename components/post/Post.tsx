import React from "react";
import { IoAdd } from "react-icons/io5";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
const Post = () => {
  return (
    <div className="flex  gap-2">
      <textarea
        name=""
        id=""
        className="w-full h-28 outline-none border border-[#008cff]  bg-transparent !rounded-[8px] px-2 py-2 cam"
      ></textarea>
      <div className="flex flex-col justify-between gap-3">
        <button className="cam !rounded-full w-12 h-12 a text-4xl border-2 border-[#008cff] flex items-center justify-center">
          <MdOutlineAddPhotoAlternate />
        </button>

        <button className="cam !rounded-full w-12 h-12 a text-4xl border-2 border-[#008cff] flex items-center justify-center">
          <IoAdd size={50} />
        </button>
      </div>
    </div>
  );
};

export default Post;
