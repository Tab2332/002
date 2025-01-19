'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageForm } from '@/components/forms/message-form';
import { Button } from '@/components/ui/button';
import type { MessageFormValues } from '@/lib/validations';

export default function WritePage() {
  const [messageId, setMessageId] = useState<string | null>(null);

  const handleSubmit = async (data: MessageFormValues) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('提交失败');
      }

      const result = await response.json();
      setMessageId(result.id);
    } catch (error) {
      console.error('提交留言时出错:', error);
      throw error;
    }
  };

  if (messageId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-green-600">
              留言提交成功！
            </h1>
            <p className="text-gray-500">
              你的留言ID是：
              <span className="font-mono font-semibold">
                {messageId}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link href="/write">
              <Button
                variant="outline"
                className="w-full"
              >
                继续写留言
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full"
              >
                返回首页
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">
            写留言
          </h1>
          <p className="text-sm text-gray-500">
            写下你想说的话，对方可以通过姓名查看留言
          </p>
        </div>

        <MessageForm onSubmit={handleSubmit} />

        <div className="text-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full"
            >
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 