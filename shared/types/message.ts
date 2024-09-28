import { Sentiment } from '@/shared/constants/3dModel';

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
  messageID: number;
  sendAt: string;
};
