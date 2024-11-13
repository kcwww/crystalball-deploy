import mongoose, { Document, Model } from 'mongoose';
import Message from '@/shared/database/mongodb/models/messageModel';

// Crystal 인터페이스 정의
export interface ICrystal {
  user_id: mongoose.Schema.Types.ObjectId | string;
  title: string;
  is_private: Date | null;
  main_decoration_color: string;
  main_decoration_id: number;
  bottom_decoration_color: string;
  bottom_decoration_id: number;
  message_id: mongoose.Schema.Types.ObjectId[] | string[] | [];
}

// ICrystal과 Document 인터페이스를 결합하여 MongoDB 문서의 타입 정의
export interface ICrystalDocument extends ICrystal, Document {
  createdAt: string;
  updatedAt: string;
}

// Crystal 스키마 정의
const crystalSchema = new mongoose.Schema<ICrystalDocument>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    is_private: { type: Date, default: null },
    main_decoration_color: { type: String, required: true },
    main_decoration_id: { type: Number, required: true },
    bottom_decoration_color: { type: String, required: true },
    bottom_decoration_id: { type: Number, required: true },
    message_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  },
  {
    timestamps: true, // 'createdAt' 및 'updatedAt' 필드 자동 추가
  }
);

// Crystal 삭제 시 관련된 Message 모두 삭제
crystalSchema.pre('findOneAndDelete', async function (next) {
  // 현재 삭제될 Crystal 문서를 찾음
  const crystal = await this.model.findOne(this.getFilter());
  if (crystal) {
    // 해당 crystal_id를 가진 모든 Message 삭제
    await Message.deleteMany({ crystal_id: crystal._id });
  }
  next();
});

const Crystal: Model<ICrystalDocument> =
  mongoose.models?.Crystal || mongoose.model('Crystal', crystalSchema);

export default Crystal;
