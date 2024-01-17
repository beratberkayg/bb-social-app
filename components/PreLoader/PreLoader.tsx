"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SiAudiomack } from "react-icons/si";

const PreLoader = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [pageLoading]);
  return (
    <div
      className={`absolute w-full h-full bg-black text-white flex items-center justify-center  ${
        pageLoading ? "opacity-100 z-50" : "opacity-0 -z-50"
      }`}
    >
      <SiAudiomack size={100} />
    </div>
  );
};

export default PreLoader;
