"use client";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch } from "@/redux/hooks";
import { postFunc } from "@/redux/modalSlice";
import { useState } from "react";
import { auth, db } from "@/utils/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

interface PostState {
  idea: string;
}

const PostModal = () => {
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<PostState>({ idea: "" });
  const [user, loading] = useAuthState(auth);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!post.idea) {
      toast.error("Düşünce Alanı Boş Bırakılamaz", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      return;
    }

    const collectionRef = collection(db, "postlar");

    await addDoc(collectionRef, {
      ...post,
      tarih: serverTimestamp(),
      kullaniciAd: user?.displayName,
      avatar: user?.photoURL,
      kullaniciId: user?.uid,
    });
    setPost({ idea: "" });
    dispatch(postFunc());
  };

  return (
    <div className="absolute w-[300px] md:w-[500px] my-5 p-10 shadow-lg rounded-lg  mx-auto bg-slate-400">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Yeni Post Ekle</h1>
          <AiOutlineClose
            onClick={() => dispatch(postFunc())}
            size={30}
            cursor={"pointer"}
            color={"red"}
          />
        </div>
        <div className="py-2">
          <h3 className="text-lg font-medium">Düşüncelerin:</h3>
          <textarea
            value={post.idea}
            onChange={(e) => setPost({ idea: e.target.value })}
            className="bg-gray-800 h-[200px] w-full text-white rounded-lg p-2 text-xl outline-none overflow-y-auto"
          ></textarea>
          <p
            className={`font-medium text-sm ${
              post.idea.length > 111 ? "text-red-500" : ""
            } `}
          >
            {post.idea.length}/111
          </p>
        </div>
        <button
          disabled={post.idea.length > 111 ? true : false}
          className={`w-full bg-orange-500 text-white font-bold p-2 my-2 rounded-3xl text-xl md:text-2xl  ${
            post.idea.length > 111
              ? " bg-red-600 text-black"
              : "hover:bg-white hover:text-orange-500"
          }`}
        >
          {post.idea.length > 111 ? "Karakter sınırı aşıldı" : "Gönder"}
        </button>
      </form>
    </div>
  );
};

export default PostModal;
