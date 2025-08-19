import BookIcon from '@assets/icons/icon_book.svg?react';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = '검색된 결과가 없습니다.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-21">
      <BookIcon />
      <p className="mt-6 t-caption text-text-secondary">{message}</p>
    </div>
  );
}
