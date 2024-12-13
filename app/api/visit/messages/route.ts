import { NextRequest, NextResponse } from 'next/server';

import { connectToMongoDB } from '@/shared/database/mongodb/config';
import Crystal from '@/shared/database/mongodb/models/crystalModel';
import { Crystal as CrystalType } from '@/shared/types/crystal';
import Message from '@/shared/database/mongodb/models/messageModel';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  const crystalId = req.headers.get('X-Crystal-Id');

  if (!crystalId) {
    return NextResponse.json(
      { error: 'Crystal ID is required' },
      { status: 400 }
    );
  }

  try {
    // MongoDB에 연결
    await connectToMongoDB();

    const crystal = (await Crystal.findOne({ _id: crystalId }).select(
      'message_id is_private'
    )) as CrystalType;

    if (!crystal) {
      return NextResponse.json({ error: 'Crystal not found' }, { status: 404 });
    }
    const isPrivate = crystal.is_private;
    const messages = crystal.message_id;

    const messageDatas = await Promise.all(
      messages.map(async (messageId) => {
        const message = await Message.findOne({ _id: messageId });
        if (message && isPrivate !== null) {
          message.content = '비공개 메시지입니다.';
          message.sender = '익명';
        }
        return message;
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
