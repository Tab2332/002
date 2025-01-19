import { sql } from '@vercel/postgres';
import { Message } from '@/types';
import type { QueryResultRow } from '@vercel/postgres';

// 将数据库行转换为Message类型
function toMessage(row: QueryResultRow): Message {
  return {
    id: row.id,
    recipient: row.recipient,
    content: row.content,
    created_at: new Date(row.created_at),
  };
}

// 创建消息
export async function createMessage(recipient: string, content: string): Promise<Message> {
  try {
    const result = await sql`
      INSERT INTO messages (recipient, content)
      VALUES (${recipient}, ${content})
      RETURNING *
    `;
    return toMessage(result.rows[0]);
  } catch (error) {
    console.error('Error creating message:', error);
    throw new Error('Failed to create message');
  }
}

// 获取给定收件人的所有消息
export async function getMessagesByRecipient(
  recipient: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ messages: Message[]; total: number }> {
  const offset = (page - 1) * pageSize;
  
  try {
    const messagesResult = await sql`
      SELECT * FROM messages 
      WHERE recipient = ${recipient}
      ORDER BY created_at DESC
      LIMIT ${pageSize} 
      OFFSET ${offset}
    `;

    const totalResult = await sql`
      SELECT COUNT(*) FROM messages 
      WHERE recipient = ${recipient}
    `;

    return {
      messages: messagesResult.rows.map(toMessage),
      total: parseInt(totalResult.rows[0].count)
    };
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
}

// 通过ID获取单个消息
export async function getMessageById(id: string): Promise<Message | null> {
  try {
    const result = await sql`
      SELECT * FROM messages 
      WHERE id = ${id}
    `;
    return result.rows[0] ? toMessage(result.rows[0]) : null;
  } catch (error) {
    console.error('Error fetching message:', error);
    throw new Error('Failed to fetch message');
  }
} 