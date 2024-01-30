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
  id?: string | any;
}

export interface userProps {
  email: string;
  name: string;
  password: string;
  id: string;
  photo?: string;
}
