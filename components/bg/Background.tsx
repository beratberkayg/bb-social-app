import React from "react";

const Background = () => {
  return (
    <div className="fixed left-0 top-0 w-full min-h-screen -z-50  ">
      <div className="w-[500px] h-[500px] bg-[#008cff] rounded-full absolute top-0 left-0"></div>
      <div className="w-[500px] h-[500px] bg-[#008cff] rounded-full absolute bottom-0 right-0"></div>
    </div>
  );
};

export default Background;
