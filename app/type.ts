import { Timestamp } from "firebase/firestore";

export interface initialStateProps {
  name: string;
  email: string;
  password: string;
  isLoading?: boolean;
}

export interface postType {
  post: string;
}

export interface POST {
  userId: string;
  userName: string;
  userMail: string;
  time: Timestamp;
  post: string;
  postId: string;
}
