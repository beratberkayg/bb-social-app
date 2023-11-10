"use client";

import PostModal from "@/components/modals/PostModal";
import { useAppSelector } from "@/redux/hooks";
import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Post from "@/components/post/Post";
import { PostProps } from "../page";

const User = () => {
  const { postModal } = useAppSelector((state) => state.modal);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const [posts, setPosts] = useState<PostProps[]>([]);

  const getData = async () => {
    if (loading) return;
    if (!user) return router.push("/");

    const collectionRef = collection(db, "postlar");
    const q = query(collectionRef, where("kullaniciId", "==", user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(
        snap.docs?.map((doc) => ({ ...(doc.data() as PostProps), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className="flex flex-col items-center justify-between mt-10">
      {postModal && <PostModal />}
      <div className="w-full h-[100px] flex flex-col"></div>
      <div className="mt-10">
        {posts.map((post) => (
          <Post key={post.kullaniciId} post={post} />
        ))}
      </div>

      <button onClick={() => auth.signOut()}>çıkış</button>
    </div>
  );
};

export default User;
