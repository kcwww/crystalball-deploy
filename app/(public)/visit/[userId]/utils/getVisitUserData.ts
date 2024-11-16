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
    user._id = user._id.toString();
    user.crystal_id = user.crystal_id.map((crystalId) => crystalId.toString());

    const crystals = await Promise.all(
      user.crystal_id.map(async (crystalId) => {
        const crystalData = (
          await Crystal.findOne({ _id: crystalId })
        )?.toObject() as CrystalType;
        crystalData._id = crystalData._id.toString();
        crystalData.user_id = crystalData.user_id.toString();
        crystalData.message_id = crystalData.message_id.map((messageId) =>
          messageId.toString()
        );
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
            messages._id = messages._id.toString();
            messages.crystal_id = messages.crystal_id.toString();
            messages.user_id = messages.user_id.toString();
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
