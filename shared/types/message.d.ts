import { Sentiment } from '@/shared/constants/3dModel';
import { IMessage } from '@/shared/database/mongodb/models/messageModel';

export type MessageResponse = {
  content: string;
  sendAt: string; // Changed from created to sendAt
  decoration_color: string;
  decoration_id: number;
  id: number;
  is_deleted: boolean;
  letter_id: number;
  location: number;
  opened: string | null;
  sender: string;
  snowball_id: number;
  user_id: number;
  sentiment: Sentiment;
  confidence: number;
};

export type MessageType = {
  message: string;
  sender: string;
  letterColor: string;
  messageID: string;
  sendAt: string;
};

export type Message = {
  createdAt: string;
  updatedAt: string;
  _id: string;
} & IMessage;
