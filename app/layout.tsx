import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import PreLoader from "@/components/PreLoader/PreLoader";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BB Sosyal App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className}  bg-gray-200 min-h-screen flex flex-col `}
      >
        <ReduxProvider>
          <ToastContainer limit={1} />
          <PreLoader />
          <Navbar />
          <main className="flex-grow">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
