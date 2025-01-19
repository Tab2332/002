import { NextResponse } from 'next/server';
import { messageFormSchema } from '@/lib/validations';
import { createMessage } from '@/lib/db';
import { filterContent } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 验证请求数据
    const validatedData = messageFormSchema.parse(body);
    
    // 过滤内容
    const filteredContent = filterContent(validatedData.content);
    
    // 创建消息
    const message = await createMessage(
      validatedData.recipient,
      filteredContent
    );

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('创建消息时出错:', error);
    return NextResponse.json(
      { error: '创建消息失败' },
      { status: 400 }
    );
  }
} 