"use client";
import { CiUser } from "react-icons/ci";

import { POST } from "@/app/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils/firebase";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
const Tweet = ({ item }: { item: POST }) => {
  const [user, loading] = useAuthState(auth);
  const deletePost = async () => {
    try {
      // Construct the reference to the document you want to delete
      const docRef = doc(db, "posts", item.postId);

      // Delete the document
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="cam w-[99%] rounded-[8px] mx-auto min-h-[150px] flex  py-2 px-2 gap-3 border border-[#ffffff80]">
      <Link
        href={`/user/${item.userId}`}
        id="btn"
        className="w-[70px] h-[70px]  flex justify-center items-center  border border-white rounded-full !px-0 !py-0"
      >
        <CiUser size={50} />
      </Link>
      <div className="flex-1 min-h-[150px] flex flex-col justify-between py-1 ">
        <div className="border-b border-white h-[25px] flex items-center">
          <div className="text-2xl">{item.userName}</div>
          <div className="text-[12px] text-gray-300">@{item.userMail}</div>
        </div>
        <div className=" flex-1">{item.post}</div>
        <div className=" h-[25px] flex justify-end ">
          {user?.uid != item.userId && (
            <div className="w-[50px] ">
              <FaRegHeart size={30} />
            </div>
          )}
          {user?.uid === item.userId && (
            <button
              onClick={() => deletePost(item.postId)}
              className="w-[50px] "
            >
              <FaTrash size={30} />
            </button>
          )}
        </div>
      </div>
      {item.postId}
    </div>
  );
};

export default Tweet;
