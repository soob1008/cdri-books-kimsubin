import { useState } from 'react';

import Button from '@shared/ui/button';
import SearchFilterPanel from '@features/books/components/SearchFilterPanel';

export default function SearchFilter() {
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
      <SearchFilterPanel open={openFilter} setOpen={setOpenFilter} />
    </div>
  );
}
