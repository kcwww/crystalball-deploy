import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User from '@/shared/database/mongodb/models/userModel';
import { User as UserType } from '@/shared/types/user';

type NicknameReq = {
  email: string;
  provider: string;
  username: string;
};

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest) => {
  // 세션 확인
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 요청에서 데이터 추출
  const { email, provider, username } = (await req.json()) as NicknameReq;

  if (!email || !provider) {
    return NextResponse.json(
      { error: 'Username and userId are required' },
      { status: 400 }
    );
  }

  // MongoDB에 연결
  await connectToMongoDB();

  try {
    const updateUser = (await User.findOneAndUpdate(
      { email, provider },
      { username },
      { new: true }
    )) as UserType;

    // 사용자 정보가 없을 경우 처리
    if (!updateUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 성공적으로 업데이트된 경우 응답 반환
    return NextResponse.json({
      message: 'Username updated',
      username: updateUser.username,
      ok: true,
    });
  } catch (error) {
    console.error('Error updating username:', error);
    return NextResponse.json(
      { error: 'Failed to update username' + error },
      { status: 500 }
    );
  }
};
