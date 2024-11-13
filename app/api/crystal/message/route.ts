import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import Crystal from '@/shared/database/mongodb/models/crystalModel';

import Message from '@/shared/database/mongodb/models/messageModel';
import { REVALIDATE_PATHS } from '@/shared/constants/routes';

export const DELETE = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { messageId, date } = await req.json();

    // MongoDB에 연결
    await connectToMongoDB();

    // Message 삭제
    const message = await Message.findOneAndUpdate(
      { _id: messageId },
      {
        is_deleted: date,
      },
      { new: true }
    );
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // crystal_id 배열에서 message_id 삭제
    const crystal = await Crystal.findOneAndUpdate(
      { message_id: messageId },
      {
        $pull: {
          message_id: messageId,
        },
      },
      { new: true }
    );

    if (!crystal) {
      await Message.findOneAndUpdate(
        { _id: messageId },
        {
          is_deleted: null,
        },
        { new: true }
      );
      return NextResponse.json({ error: 'Crystal not found' }, { status: 404 });
    }

    // 캐시 업데이트
    revalidatePath(REVALIDATE_PATHS.MAIN, 'page');
    revalidatePath(REVALIDATE_PATHS.VISIT, 'page');
    return NextResponse.json({
      message: 'Message deleted',
      ok: true,
    });
  } catch (error) {
    console.error('Error deleting message : ', error);
    return NextResponse.json(
      { error: 'Failed to delete message ' + error },
      { status: 500 }
    );
  }
};

type MessageReq = {
  user_id: string;
  crystal_id: string;
  decoration_id: number;
  decoration_color: string;
  content: string;
  sender: string;
  letter_color: string;
  is_deleted: Date | null;
  is_opend: Date | null;
};

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {
    user_id,
    crystal_id,
    decoration_id,
    decoration_color,
    content,
    sender,
    letter_color,
    is_deleted,
    is_opend,
  } = (await req.json()) as MessageReq;

  try {
    // MongoDB에 연결
    await connectToMongoDB();

    // Message 생성
    const message = await Message.create({
      user_id,
      crystal_id,
      decoration_id,
      decoration_color,
      content,
      sender,
      letter_color,
      is_deleted,
      is_opend,
    });
    if (!message) {
      return NextResponse.json(
        { error: 'Failed to create message' },
        { status: 500 }
      );
    }

    const message_id = message._id;

    await Crystal.findOneAndUpdate(
      { _id: crystal_id },
      {
        $push: {
          message_id: {
            $each: [message_id],
            $slice: -30,
          },
        },
      },
      { new: true }
    );

    if (!message) {
      await Message.findOneAndDelete({ _id: message_id });
      return NextResponse.json(
        { error: 'Failed to update crystal' },
        { status: 500 }
      );
    }

    // 캐시 업데이트
    revalidatePath(REVALIDATE_PATHS.MAIN, 'page');
    revalidatePath(REVALIDATE_PATHS.MAKE, 'page');
    revalidatePath(REVALIDATE_PATHS.VISIT, 'page');
    return NextResponse.json({
      message: 'Message created',
      message_id,
      ok: true,
    });
  } catch (error) {
    console.error('Error creating message : ', error);
    return NextResponse.json(
      { error: 'Failed to create message ' + error },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { messageId, date } = await req.json();

  try {
    // MongoDB에 연결
    await connectToMongoDB();

    // Message 수정
    await Message.findOneAndUpdate(
      { _id: messageId },
      {
        is_opend: date,
      },
      { new: true }
    );

    // 캐시 업데이트
    revalidatePath(REVALIDATE_PATHS.MAIN, 'page');
    revalidatePath(REVALIDATE_PATHS.VISIT, 'page');
    return NextResponse.json({
      message: 'Message updated',
      ok: true,
    });
  } catch (error) {
    console.error('Error updating message : ', error);
    return NextResponse.json(
      { error: 'Failed to update message ' + error },
      { status: 500 }
    );
  }
};
