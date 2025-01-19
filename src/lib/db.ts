import { Message as MessageModel } from '@/models/message';
import connectDB from './mongodb';
import type { Message } from '@/types';
import type { MessageDocument } from '@/types/mongoose';

// 创建消息
export async function createMessage(recipient: string, content: string): Promise<Message> {
  await connectDB();
  
  const message = await MessageModel.create({
    recipient,
    content,
  });

  return {
    id: message._id.toString(),
    recipient: message.recipient,
    content: message.content,
    created_at: message.created_at,
  };
}

// 获取给定收件人的所有消息
export async function getMessagesByRecipient(
  recipient: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ messages: Message[]; total: number }> {
  await connectDB();
  
  const skip = (page - 1) * pageSize;
  
  const [messages, total] = await Promise.all([
    MessageModel.find({ recipient })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean<MessageDocument[]>(),
    MessageModel.countDocuments({ recipient }),
  ]);

  return {
    messages: messages.map(msg => ({
      id: msg._id.toString(),
      recipient: msg.recipient,
      content: msg.content,
      created_at: msg.created_at,
    })),
    total,
  };
}

// 通过ID获取单个消息
export async function getMessageById(id: string): Promise<Message | null> {
  await connectDB();
  
  const message = await MessageModel.findById(id).lean<MessageDocument>();
  
  if (!message) return null;

  return {
    id: message._id.toString(),
    recipient: message.recipient,
    content: message.content,
    created_at: message.created_at,
  };
} 