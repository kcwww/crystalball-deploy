import { NextRequest, NextResponse } from 'next/server';

import { connectToMongoDB } from '@/shared/database/mongodb/config';
import Crystal from '@/shared/database/mongodb/models/crystalModel';
import User from '@/shared/database/mongodb/models/userModel';
import { UserType } from '@/shared/types/user';
import { CURRENT_SEASON } from '@/shared/constants/Date';
import { CURRENT_YEAR } from '@/shared/constants/Date';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get('X-User-Id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  // MongoDB에 연결
  await connectToMongoDB();

  try {
    // user_id에 해당하는 유저의 crystal_id 조회
    const crystal = (
      (await User.findOne({ _id: userId }).select('crystal_id')) as UserType
    ).crystal_id?.get(CURRENT_YEAR)?.[CURRENT_SEASON];

    if (!crystal) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const crystalDatas = await Promise.all(
      crystal.map(async (crystalId) => {
        return await Crystal.findOne({ _id: crystalId });
      })
    );

    return NextResponse.json({ data: crystalDatas, ok: true });
  } catch (error) {
    console.error('Error fetching crystal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crystal' + error },
      { status: 500 }
    );
  }
};
