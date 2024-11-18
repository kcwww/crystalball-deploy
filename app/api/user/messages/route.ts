import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { connectToMongoDB } from '@/shared/database/mongodb/config';

import Message from '@/shared/database/mongodb/models/messageModel';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get('X-User-Id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  // 세션 확인
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // MongoDB에 연결
  await connectToMongoDB();

  try {
    // user_id에 해당하는 유저의 message 조회인데 is_deleted가 null인 것만 조회
    const messages = await Message.find({
      user_id: userId,
      is_deleted: null,
    });

    return NextResponse.json({ data: messages, ok: true });
  } catch (error) {
    console.error('Error fetching messages :', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages ' + error },
      { status: 500 }
    );
  }
};
