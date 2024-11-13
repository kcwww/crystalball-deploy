import mongoose, { Document, Model } from 'mongoose';

// Message 인터페이스 정의
export interface IMessage {
  user_id: mongoose.Schema.Types.ObjectId | string;
  crystal_id: mongoose.Schema.Types.ObjectId | string;
  decoration_id: number;
  decoration_color: string;
  content: string;
  sender: string;
  letter_color: string;
  is_deleted: Date | null;
  is_opend: Date | null;
}

// IMessage와 Document 인터페이스를 결합하여 MongoDB 문서의 타입 정의
export interface IMessageDocument extends IMessage, Document {
  createdAt: string;
  updatedAt: string;
}

// Message 스키마 정의
const messageSchema = new mongoose.Schema<IMessageDocument>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    crystal_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crystal',
      required: true,
    },
    decoration_id: { type: Number, required: true },
    decoration_color: { type: String, required: true },
    content: { type: String, required: true },
    sender: { type: String, required: true },
    letter_color: { type: String, required: true },
    is_deleted: { type: Date, default: null },
    is_opend: { type: Date, default: null },
  },
  {
    timestamps: true, // 'createdAt' 및 'updatedAt' 필드 자동 추가
  }
);

// Message 모델 생성
const Message: Model<IMessageDocument> =
  mongoose.models?.Message || mongoose.model('Message', messageSchema);

export default Message;
