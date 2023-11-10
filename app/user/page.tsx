"use client";

import PostModal from "@/components/modals/PostModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Post from "@/components/post/Post";
import { PostProps } from "../page";
import Image from "next/image";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { postFunc } from "@/redux/modalSlice";

const User = () => {
  const { postModal } = useAppSelector((state) => state.modal);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const dispatch = useAppDispatch();

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

  const postSil = async (id) => {
    const docRef = doc(db, "postlar", id);
    await deleteDoc(docRef);
  };

  return (
    <div className="flex flex-col items-center justify-between mt-3">
      {postModal && <PostModal />}
      <div className="w-full flex flex-col items-center gap-1 text-xl md:text-2xl border-black border-b pb-3">
        <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] relative">
          {user?.photoURL ? (
            <Image
              alt=""
              src={user?.photoURL}
              fill
              style={{ borderRadius: "100%" }}
            />
          ) : (
            <p>Profil Fotoğrafı Bulunamadı</p>
          )}
        </div>
        <div className="text-center">
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
        </div>
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-black hover:text-orange-500 hover:transition-all"
          onClick={() => auth.signOut()}
        >
          Çıkış Yap
        </button>
      </div>
      <div className="mt-10 w-full flex flex-col items-center">
        <p className="text-2xl text-bold md:text-3xl mb-5 border-b border-black">
          Düşüncelerim
        </p>
        {posts.map((post) => (
          <Post key={post.id} post={post}>
            <div className="flex justify-end">
              <button onClick={() => postSil(post.id)}>
                <BsTrash2Fill color={"red"} cursor={"pointer"} size={30} />
              </button>
            </div>
          </Post>
        ))}
      </div>
    </div>
  );
};

export default User;
