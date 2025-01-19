import { Message } from '@/types';
import { formatDate } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border p-4 space-y-2"
          >
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">还没有留言...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <article
          key={message.id}
          className="rounded-lg border p-4 space-y-2 transition-colors hover:bg-gray-50"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              To: {message.recipient}
            </p>
            <time className="text-sm text-gray-500">
              {formatDate(message.created_at)}
            </time>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">
            {message.content}
          </p>
        </article>
      ))}
    </div>
  );
} 