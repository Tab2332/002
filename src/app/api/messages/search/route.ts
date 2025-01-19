import { NextResponse } from 'next/server';
import { searchFormSchema } from '@/lib/validations';
import { getMessagesByRecipient } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const recipient = searchParams.get('recipient');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    if (!recipient) {
      return NextResponse.json(
        { error: '收信人姓名不能为空' },
        { status: 400 }
      );
    }

    // 验证收信人姓名
    const validatedData = searchFormSchema.parse({ recipient });

    // 获取消息列表
    const { messages, total } = await getMessagesByRecipient(
      validatedData.recipient,
      page,
      pageSize
    );

    return NextResponse.json({
      messages,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('搜索消息时出错:', error);
    return NextResponse.json(
      { error: '搜索消息失败' },
      { status: 400 }
    );
  }
} 