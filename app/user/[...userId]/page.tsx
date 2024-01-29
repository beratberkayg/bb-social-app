"use client";

import { useAppDispatch } from "@/redux/hooks";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { POST } from "@/app/type";
import { auth, db } from "@/utils/firebase";
import { logOut } from "@/redux/authSlice";
import Tweet from "@/components/tweet/Tweet";
import Header from "@/components/header/Header";
import { CiUser } from "react-icons/ci";
import Post from "@/components/post/Post";
import TweetSkeleton from "@/components/skeleton/TweetSkeleton";

interface userProps {
  email: string;
  name: string;
  password: string;
  id: string;
  photo?: string;
}

const User = ({ params }: { params: { userId: string } }) => {
  const id = params.userId[0];
  const [posts, setPosts] = useState<POST[]>([]);
  const [users, setUsers] = useState<userProps[]>([]);
  const [user, loading] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!user) {
    return router.push("/");
  }

  const handleLogOut = () => {
    dispatch(logOut());
    toast.success("Çıkış Yapıldı", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
    router.push("/");
  };

  const getData = async () => {
    if (loading) return;

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("userId", "==", id));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(
        snap.docs?.map((doc) => ({
          ...(doc.data() as POST),
          id: doc.id,
        }))
      );
    });
  };

  const getUser = async () => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("id", "==", id));
    const unsub = onSnapshot(q, (snap) => {
      setUsers(
        snap.docs?.map((doc) => ({
          ...(doc.data() as userProps),
          id: doc.id,
        }))
      );
    });
  };

  const deleteComment = async (id: string) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
    toast.success("Comment deleted successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  useEffect(() => {
    getData();
    getUser();
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Header />

      <div className="w-full md:w-[60%] lg:w-[50%] min-h-screen pad flex flex-col items-center justify-center ">
        <div className="w-full h-[70px]"></div>
        <div className="w-full   rounded-[8px] flex flex-col gap-5   ">
          <div className="flex flex-col items-center pad gap-3 border border-[#ffffff80] rounded-[8px] cam">
            <div
              id="btn"
              className="w-36 h-36 rounded-full flex items-center justify-center border-4 border-[#008cff]  "
            >
              <CiUser size={120} />
            </div>
            <div className="text-3xl">{users[0]?.name}</div>
          </div>
          {user?.uid === id && (
            <div>
              <Post />
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div>
              {posts.length === 0 && (
                <div className="text-center text-2xl cam rounded-[8px]">
                  Paylaşımlar Bekleniyor..
                </div>
              )}
            </div>
            {posts.length === 0 ? (
              <div className="flex flex-col gap-5">
                <TweetSkeleton />
                <TweetSkeleton />
                <TweetSkeleton />
              </div>
            ) : (
              posts.map((item, i) => <Tweet key={i} item={item} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
