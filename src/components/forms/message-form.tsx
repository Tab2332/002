import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageFormValues, messageFormSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface MessageFormProps {
  onSubmit: (data: MessageFormValues) => Promise<void>;
}

export function MessageForm({ onSubmit }: MessageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema)
  });

  const onSubmitForm = async (data: MessageFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('提交表单时出错:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <Input
          {...register('recipient')}
          placeholder="收信人姓名"
          error={errors.recipient?.message}
        />
      </div>
      
      <div>
        <Textarea
          {...register('content')}
          placeholder="写下你想说的话..."
          error={errors.content?.message}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? '正在提交...' : '发送留言'}
      </Button>
    </form>
  );
} 