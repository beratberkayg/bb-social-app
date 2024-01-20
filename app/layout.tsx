import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";

import Footer from "@/components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

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
      <body className={`${roboto.className} min-h-screen  `}>
        <ReduxProvider>
          <ToastContainer limit={1} />
          <main className="flex-grow">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
