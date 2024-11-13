import { Crystal } from './crystal';
import { Message } from './message';
import { User } from './user';

export type UserCrystal = {
  messages: Message[];
} & Crystal;

export type UserData = {
  user: User;
  crystals: UserCrystal[];
};
