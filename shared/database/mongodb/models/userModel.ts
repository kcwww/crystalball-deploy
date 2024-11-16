import mongoose, { Document, Model } from 'mongoose';
import Crystal from '@/shared/database/mongodb/models/crystalModel';

export interface IUser {
  email: string;
  uuid: string;
  uid: string;
  crystal_id: mongoose.Schema.Types.ObjectId[] | string[] | [];
  username: string | null;
  provider: string;
}

// IUser와 Document 인터페이스를 결합하여 MongoDB 문서의 타입 정의
export interface IUserDocument extends IUser, Document {
  createdAt: string;
  updatedAt: string;
}

// User 스키마 정의
const userSchema = new mongoose.Schema<IUserDocument>(
  {
    email: { type: String, required: true },
    uid: { type: String, required: true },
    uuid: { type: String, required: true },
    crystal_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crystal' }],
    username: { type: String, default: null },
    provider: { type: String, required: true },
  },
  {
    timestamps: true, // 자동으로 'createdAt' 및 'updatedAt' 필드 추가
  }
);

// 복합 인덱스 생성
userSchema.index({ email: 1, provider: 1, uid: 1 }, { unique: true });

// User 모델의 프리 훅을 사용하여 관련 Crystal 및 Message 모두 삭제
userSchema.pre('findOneAndDelete', async function (next) {
  // 현재 삭제될 User 문서를 찾음
  const user = await this.model.findOne(this.getFilter());
  if (user) {
    // 해당 user_id를 가진 모든 Crystal 삭제
    await Crystal.deleteMany({ user_id: user._id });
  }
  next();
});

// User 모델 생성
const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
