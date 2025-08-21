import { useState } from 'react';
import Button from '@shared/ui/Button';
import SearchFilterPanel from '@features/books/components/SearchFilterPanel';
import type { BooksParams, BookTarget } from '@features/books/types/book';
import { useFormContext } from 'react-hook-form';

interface SearchFilterProps {
  onSubmit: (data: BooksParams) => void;
}

export default function SearchFilter({ onSubmit }: SearchFilterProps) {
  const { watch } = useFormContext<BooksParams>();
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="relative flex items-center w-auto md:w-[200px] ">
      <Button
        label="상세 검색"
        variant="secondary-outline"
        typography="body2"
        className="p-2.5"
        onClick={() => setOpenFilter((prev) => !prev)}
      />
      <span className="text-sm font-medium ml-3">
        검색 조건: {getTargetLabel(watch('target') || 'title')}
      </span>
      <SearchFilterPanel
        open={openFilter}
        setOpen={setOpenFilter}
        onSubmit={onSubmit}
      />
    </div>
  );
}

const getTargetLabel = (target: BookTarget) => {
  switch (target) {
    case 'title':
      return '제목';
    case 'person':
      return '저자명';
    case 'publisher':
      return '출판사';
    case 'isbn':
      return 'ISBN';
    default:
      return '';
  }
};
