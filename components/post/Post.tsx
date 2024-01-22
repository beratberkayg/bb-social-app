"use client";

import { postType } from "@/app/type";
import { auth, db } from "@/utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const Post = () => {
  const [user, loading] = useAuthState(auth);
  const [post, setPost] = useState<postType>({
    post: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.info("Lütfen giriş yapın...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
      return;
    }
    if (post.post.length < 1) {
      toast.error("Lütfen bir şeyler yazın...", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
      return;
    }
    const collectionRef = collection(db, "posts");
    await addDoc(collectionRef, {
      ...post,
      userId: user.uid,
      userName: user.displayName,
      userMail: user.email,
      time: serverTimestamp(),
      post: post.post,
    });

    toast.success("Başarıyla Eklendi", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 500,
    });
    setPost({ post: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <textarea
        value={post.post}
        onChange={(e) =>
          setPost({
            ...post,
            post: e.currentTarget.value,
          })
        }
        name=""
        id=""
        className="w-full h-28 outline-none border border-[#ffffff80] bg-transparent rounded-t-[8px] px-2 py-2 cam text-lg hover:border hover:border-[#008cff]"
      ></textarea>
      <button
        type="submit"
        id="btn"
        className="w-full cam !rounded-b-[8px] !border-t-0"
      >
        Post Ekle
      </button>
    </form>
  );
};

export default Post;
