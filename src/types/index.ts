export interface Message {
  id: string;
  recipient: string;
  content: string;
  created_at: Date;
}

export type MessageCreateInput = Pick<Message, 'recipient' | 'content'>;

export interface PaginatedMessages {
  messages: Message[];
  total: number;
  currentPage: number;
  totalPages: number;
} 