'use server';

import Crystal, {
  ICrystal,
} from '@/shared/database/mongodb/models/crystalModel';
import { connectToMongoDB } from '@/shared/database/mongodb/config';

export const createCrystal = async (crystalData: ICrystal) => {
  await connectToMongoDB();

  try {
    const newCrystal = await Crystal.create(crystalData);
    return newCrystal.toObject();
  } catch (error) {
    console.error(error);
    throw { message: 'error creating crystal' };
  }
};

export const deleteCrystal = async (id: string) => {
  try {
    await Crystal.deleteOne({ _id: id });
    return { message: 'crystal deleted' };
  } catch (error) {
    throw { message: 'error deleting crystal' };
  }
};
