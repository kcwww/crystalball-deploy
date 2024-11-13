import { IUser } from '@/shared/database/mongodb/models/userModel';

export type User = {
  createdAt: string;
  updatedAt: string;
  _id: string;
} & IUser;

export type sessionUser = {
  name: string;
  provider: string;
  email: string;
};
