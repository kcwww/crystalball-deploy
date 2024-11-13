import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import Crystal from '@/shared/database/mongodb/models/crystalModel';
import { Crystal as CrystalType } from '@/shared/types/crystal';
import Message from '@/shared/database/mongodb/models/messageModel';

export const GET = async (req: NextRequest) => {
  const crystalId = req.headers.get('X-Crystal-Id');

  if (!crystalId) {
    return NextResponse.json(
      { error: 'Crystal ID is required' },
      { status: 400 }
    );
  }
  // 세션 확인
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // MongoDB에 연결
    await connectToMongoDB();

    const messages = (
      (await Crystal.findOne({ _id: crystalId }).select(
        'message_id'
      )) as CrystalType
    ).message_id;

    if (!messages) {
      return NextResponse.json({ error: 'Crystal not found' }, { status: 404 });
    }

    const messageDatas = await Promise.all(
      messages.map(async (messageId) => {
        return await Message.findOne({ _id: messageId });
      })
    );

    return NextResponse.json({ data: messageDatas, ok: true });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' + error },
      { status: 500 }
    );
  }
};
