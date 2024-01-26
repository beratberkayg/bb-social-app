"use client";
import LoginPage from "@/components/login/LoginPage";
import PreLoader from "@/components/PreLoader/PreLoader";
import { useAppSelector } from "@/redux/hooks";

const Page = () => {
  const { isLoading } = useAppSelector((state) => state.auth);
  return (
    <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center ">
      <PreLoader />
      <LoginPage />
      {isLoading && <PreLoader />}
    </div>
  );
};

export default Page;
