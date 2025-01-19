import { Document, Types } from 'mongoose';

export interface MessageDocument extends Document {
  _id: Types.ObjectId;
  recipient: string;
  content: string;
  created_at: Date;
} 