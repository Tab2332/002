import * as z from 'zod';

// 留言表单验证schema
export const messageFormSchema = z.object({
  recipient: z
    .string()
    .min(2, '收信人姓名至少需要2个字符')
    .max(50, '收信人姓名不能超过50个字符')
    .regex(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/, '姓名只能包含字母、数字和汉字'),
  content: z
    .string()
    .min(1, '留言内容不能为空')
    .max(1000, '留言内容不能超过1000个字符')
    .transform((str) => str.trim()),
});

// 搜索表单验证schema
export const searchFormSchema = z.object({
  recipient: z
    .string()
    .min(2, '收信人姓名至少需要2个字符')
    .max(50, '收信人姓名不能超过50个字符')
    .regex(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/, '姓名只能包含字母、数字和汉字'),
});

export type MessageFormValues = z.infer<typeof messageFormSchema>;
export type SearchFormValues = z.infer<typeof searchFormSchema>; 