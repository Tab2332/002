import { Button } from './button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const renderPageButton = (page: number) => (
    <Button
      key={page}
      variant={currentPage === page ? 'default' : 'outline'}
      size="sm"
      onClick={() => onPageChange(page)}
      className={cn(
        'min-w-[32px]',
        currentPage === page && 'pointer-events-none'
      )}
    >
      {page}
    </Button>
  );

  const renderEllipsis = (key: string) => (
    <span key={key} className="px-2">
      ...
    </span>
  );

  const renderPageButtons = () => {
    const buttons: React.ReactNode[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    pages.forEach((page) => {
      if (
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - 1 && page <= currentPage + 1)
      ) {
        buttons.push(renderPageButton(page));
      } else if (page === 2 && showEllipsisStart) {
        buttons.push(renderEllipsis('start'));
      } else if (page === totalPages - 1 && showEllipsisEnd) {
        buttons.push(renderEllipsis('end'));
      }
    });

    return buttons;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        上一页
      </Button>
      
      {renderPageButtons()}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        下一页
      </Button>
    </div>
  );
} 