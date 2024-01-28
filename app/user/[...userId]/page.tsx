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
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { POST } from "@/app/type";
import { auth, db } from "@/utils/firebase";
import { logOut } from "@/redux/authSlice";
import Tweet from "@/components/tweet/Tweet";

interface userProps {
  email: string;
  name: string;
  password: string;
  id: string;
}

const User = ({ params }: { params: { userId: string } }) => {
  const id = params.userId[0];
  console.log(id);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogOut = () => {
    dispatch(logOut());
    toast.success("Log Out successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
    router.push("/");
  };

  const [comments, setComments] = useState<POST[]>([]);
  const [users, setUsers] = useState<userProps[]>([]);
  const [user, loading] = useAuthState(auth);

  const getData = async () => {
    if (loading) return;

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("userId", "==", id));
    const unsub = onSnapshot(q, (snap) => {
      setComments(
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

  console.log(comments);

  useEffect(() => {
    getData();
    getUser();
  }, []);

  return (
    <motion.div
      className="mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <div>
        {users.map((user) => (
          <div className="text-white text-5xl z-50">{user.name}</div>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-3 bg-white/50 shadow-md rounded-md p-3">
        <h1 className="text-xl ">Comments</h1>
        <div className="flex gap-5 items-center justify-center flex-wrap">
          {comments.map((item) => (
            <Tweet key={item.id} item={item} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default User;
