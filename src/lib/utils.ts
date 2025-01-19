import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

// 合并Tailwind类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化日期
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'yyyy年MM月dd日 HH:mm', { locale: zhCN });
}

// 生成随机ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// 敏感词过滤（简单实现）
const sensitiveWords = ['敏感词1', '敏感词2', '敏感词3'];
export function filterContent(content: string): string {
  let filtered = content;
  sensitiveWords.forEach(word => {
    filtered = filtered.replace(new RegExp(word, 'g'), '*'.repeat(word.length));
  });
  return filtered;
}

// 防XSS
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
} 