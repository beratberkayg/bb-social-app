"use client";

import { POST } from "@/app/type";

const Tweet = ({ item }: { item: POST }) => {
  return (
    <div className="cam w-full h-[150px] rounded-[8px] border border-[#ffffff80] pad ">
      {item.post}
    </div>
  );
};

export default Tweet;
