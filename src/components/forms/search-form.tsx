import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchFormValues, searchFormSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFormProps {
  onSubmit: (data: SearchFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema)
  });

  const onSubmitForm = async (data: SearchFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error('搜索时出错:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex space-x-2">
      <div className="flex-1">
        <Input
          {...register('recipient')}
          placeholder="输入收信人姓名搜索"
          error={errors.recipient?.message}
        />
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting ? '搜索中...' : '搜索'}
      </Button>
    </form>
  );
} 