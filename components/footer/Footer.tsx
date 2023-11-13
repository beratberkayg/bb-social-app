import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center mt-3 border-t-2 py-2 border-slate-400 ">
      Made by
      <Link
        className="underline pl-1 text-orange-500 text-bold"
        target="_blank"
        href="https://github.com/beratberkayg"
      >
        Berat Berkay
      </Link>
    </footer>
  );
};

export default Footer;
