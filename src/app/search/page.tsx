'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SearchForm } from '@/components/forms/search-form';
import { MessageList } from '@/components/message-list';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import type { Message } from '@/types';
import type { SearchFormValues } from '@/lib/validations';

const PAGE_SIZE = 10;

export default function SearchPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchedRecipient, setSearchedRecipient] = useState('');

  const handleSearch = async (data: SearchFormValues) => {
    try {
      setIsLoading(true);
      setSearchedRecipient(data.recipient);
      
      const response = await fetch(
        `/api/messages/search?recipient=${encodeURIComponent(data.recipient)}&page=${currentPage}&pageSize=${PAGE_SIZE}`
      );

      if (!response.ok) {
        throw new Error('搜索失败');
      }

      const result = await response.json();
      setMessages(result.messages);
      setTotalPages(Math.ceil(result.total / PAGE_SIZE));
    } catch (error) {
      console.error('搜索留言时出错:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (searchedRecipient) {
      handleSearch({ recipient: searchedRecipient });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">
            查看留言
          </h1>
          <p className="text-sm text-gray-500">
            输入你的姓名，查看别人给你的留言
          </p>
        </div>

        <SearchForm
          onSubmit={handleSearch}
          isLoading={isLoading}
        />

        <MessageList
          messages={messages}
          isLoading={isLoading}
        />

        {messages.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

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