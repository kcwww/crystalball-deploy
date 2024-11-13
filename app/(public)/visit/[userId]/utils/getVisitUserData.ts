import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User from '@/shared/database/mongodb/models/userModel';
import Crystal from '@/shared/database/mongodb/models/crystalModel';
import Message from '@/shared/database/mongodb/models/messageModel';

import type { User as UserType } from '@/shared/types/user';
import { Crystal as CrystalType } from '@/shared/types/crystal';
import { Message as MessageType } from '@/shared/types/message';

const getVisitUserData = async (userId: string) => {
  try {
    await connectToMongoDB();

    const user = (await User.findOne({ uuid: userId }))?.toObject() as UserType;
    if (!user) return null;
    if ((user && user.crystal_id.length === 0) || user.username === null)
      return null;

    const crystals = await Promise.all(
      user.crystal_id.map(async (crystalId) => {
        const crystalData = (
          await Crystal.findOne({ _id: crystalId })
        )?.toObject() as CrystalType;
        if (!crystalData) throw new Error('No crystal data');
        return crystalData;
      })
    );

    const crystalWithMessages = await Promise.all(
      crystals.map(async (crystal) => {
        const messages = await Promise.all(
          crystal.message_id.map(async (messageId) => {
            const messages = (
              await Message.findOne({ _id: messageId })
            )?.toObject() as MessageType;

            if (crystal.is_private) {
              return {
                ...messages,
                content: '비공개 메세지입니다.',
                sender: '익명',
              };
            } else {
              return messages;
            }
          })
        );

        return { ...crystal, messages };
      })
    );

    return { user, crystals: crystalWithMessages };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getVisitUserData;
