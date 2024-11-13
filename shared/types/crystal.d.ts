import { ICrystal } from '@/shared/database/mongodb/models/crystalModel';

export type Crystal = {
  createdAt: string;
  updatedAt: string;
  _id: string;
} & ICrystal;
