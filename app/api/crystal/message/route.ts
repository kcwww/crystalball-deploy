import mongoose from 'mongoose';

import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import Crystal from '@/shared/database/mongodb/models/crystalModel';

import Message from '@/shared/database/mongodb/models/messageModel';

export const dynamic = 'force-dynamic';

export const DELETE = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToMongoDB();

  const sessionDB = await mongoose.startSession();
  sessionDB.startTransaction();

  try {
    const { messageId, date } = await req.json();

    // MongoDB에 연결

    // Message 삭제
    const message = await Message.findOneAndUpdate(
      { _id: messageId },
      {
        is_deleted: date,
      },
      { new: true, session: sessionDB }
    );
    if (!message) throw new Error('Message not found');

    // crystal_id 배열에서 message_id 삭제
    await Crystal.findOneAndUpdate(
      { message_id: messageId },
      {
        $pull: {
          message_id: messageId,
        },
      },
      { new: true, session: sessionDB }
    );

    await sessionDB.commitTransaction();

    return NextResponse.json({
      message: 'Message deleted',
      ok: true,
    });
  } catch (error) {
    await sessionDB.abortTransaction();

    console.error('Error deleting message : ', error);
    return NextResponse.json(
      { error: 'Failed to delete message ' + error },
      { status: 500 }
    );
  } finally {
    sessionDB.endSession();
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

  await connectToMongoDB();

  const sessionDB = await mongoose.startSession();
  sessionDB.startTransaction();

  try {
    // MongoDB에 연결

    // Message 생성
    const message = await Message.create(
      [
        {
          user_id,
          crystal_id,
          decoration_id,
          decoration_color,
          content,
          sender,
          letter_color,
          is_deleted,
          is_opend,
        },
      ],
      { session: sessionDB }
    );
    if (!message) throw new Error('Failed to create message');

    const message_id = message[0]._id;
    if (!message) throw new Error('Failed to create message');

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
      { new: true, session: sessionDB }
    );

    await sessionDB.commitTransaction();

    return NextResponse.json({
      message: 'Message created',
      message_id,
      ok: true,
    });
  } catch (error) {
    await sessionDB.abortTransaction();

    console.error('Error creating message : ', error);
    return NextResponse.json(
      { error: 'Failed to create message ' + error },
      { status: 500 }
    );
  } finally {
    sessionDB.endSession();
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