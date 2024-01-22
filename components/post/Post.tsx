"use client";

import { auth, db } from "@/utils/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Post = () => {
  const [user, loading] = useAuthState(auth);
  const [post, setPost] = useState<string>("");
  const userId = user?.uid; // user?.uid ifadesi artık bir string ya da undefined olacaktır.

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post.length < 1 || !userId) {
      return;
    }

    try {
      const POST = {
        id: user.uid,
        name: user.displayName,
        post: post,
      };

      // Gönderiyi Firestore koleksiyonuna ekle
      const postRef = await addDoc(collection(db, "posts"), {
        POST,
      });

      console.log("Post added with ID: ", postRef.id);

      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // Kullanıcı belgesini yeni gönderi kimliği ile güncelle
        const updatedPosts = [...(userDocSnapshot.data()?.posts || []), POST];

        await updateDoc(userDocRef, {
          posts: updatedPosts,
        });

        setPost("");
      }
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <textarea
        onChange={(e) => setPost(e.currentTarget.value)}
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
