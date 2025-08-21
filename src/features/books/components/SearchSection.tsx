import SearchBar from '@features/books/components/SearchBar';
import SearchFilter from '@features/books/components/SearchFilter';
import type { BooksParams } from '../types/book';

interface SearchSectionProps {
  onSubmit: (data: BooksParams) => void;
}

export default function SearchSection({ onSubmit }: SearchSectionProps) {
  return (
    <section>
      <h2 className="t-title-2">도서 검색</h2>
      <div className="flex items-center gap-4 w-[568px] mt-4">
        <SearchBar onSubmit={onSubmit} />
        <SearchFilter onSubmit={onSubmit} />
      </div>
    </section>
  );
}
