"use client";

import PostModal from "@/components/modals/PostModal";
import { useAppSelector } from "@/redux/hooks";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const User = () => {
  const { postModal } = useAppSelector((state) => state.modal);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const getData = async () => {
    if (loading) return;
    if (!user) return router.push("/");
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between ">
      <div>
        <h2>Postlarınız</h2>
        <div>Postlar</div>
        <button onClick={() => auth.signOut()}>çıkış</button>
      </div>

      {postModal && <PostModal />}
    </div>
  );
};

export default User;
