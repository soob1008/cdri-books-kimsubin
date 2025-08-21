import { useState } from 'react';

import Button from '@shared/ui/Button'
import SearchFilterPanel from '@features/books/components/SearchFilterPanel';
import type { BooksParams } from '@features/books/types/book';

interface SearchFilterProps {
  onSubmit: (data: BooksParams) => void;
}

export default function SearchFilter({ onSubmit }: SearchFilterProps) {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="relative">
      <Button
        label="상세 검색"
        variant="secondary-outline"
        typography="body2"
        className="p-2.5"
        onClick={() => setOpenFilter((prev) => !prev)}
      />
      <SearchFilterPanel
        open={openFilter}
        setOpen={setOpenFilter}
        onSubmit={onSubmit}
      />
    </div>
  );
}
