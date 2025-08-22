import { useState } from 'react';
import Button from '@shared/ui/Button';
import SearchFilterPanel from '@features/books/components/SearchFilterPanel';
import type { BooksParams, BookTarget } from '@features/books/types/book';
import { useFormContext } from 'react-hook-form';
import { SEARCH_FILTER_OPTIONS } from '@features/books/constants/option';

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
  return (
    SEARCH_FILTER_OPTIONS.find((option) => option.value === target)?.label || ''
  );
};
