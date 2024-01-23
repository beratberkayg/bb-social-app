"use client";
import { CiUser } from "react-icons/ci";

import { POST } from "@/app/type";

const Tweet = ({ item }: { item: POST }) => {
  return (
    <div className="cam w-full min-h-[150px] rounded-[8px] border border-[#ffffff80] py-2 px-2 flex ">
      <div className="">
        <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white">
          <CiUser size={35} />
        </div>
      </div>
      <div className=" flex-1 flex flex-col justify-between py-1 px-1">
        <div className="text-2xl flex border-b border-white">
          {item.userName}
          <div className="text-[10px] text-gray-300">@{item.userMail}</div>
        </div>
        <div className="">{item.post}</div>
        <div className="w-full border border-white py-1 px-2 mt-1">sadsad</div>
      </div>
    </div>
  );
};

export default Tweet;
