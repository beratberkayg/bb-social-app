"use client";
import { CiUser } from "react-icons/ci";

import { POST } from "@/app/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils/firebase";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Tweet = ({ item }: { item: POST }) => {
  const [user, loading] = useAuthState(auth);

  const deletePost = async (id: string | any) => {
    try {
      const docRef = doc(db, "posts", id);

      await deleteDoc(docRef);
      toast.success("Başarıyla Silindi", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="cam w-[99%] rounded-[8px] mx-auto min-h-[100px] flex  py-2 px-2 gap-3 border border-[#ffffff80]">
      <Link
        href={`/user/${item.userId}`}
        id="btn"
        className="w-[70px] h-[70px]  flex justify-center items-center  border border-white rounded-full !px-0 !py-0"
      >
        <CiUser size={50} />
      </Link>
      <div className="flex-1 min-h-[100px] flex flex-col justify-between py-1 ">
        <div className="border-b border-white h-[25px] flex items-center">
          <div className="text-2xl">{item.userName}</div>
          <div className="text-[12px] text-gray-300">@{item.userMail}</div>
        </div>
        <div className=" flex-1">{item.post}</div>
        <div className=" h-[25px] flex justify-end ">
          {user && user?.uid === item.userId && (
            <button
              onClick={() => deletePost(item.id)}
              className="w-[50px] hover:text-red-500"
            >
              <FaTrash size={30} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
