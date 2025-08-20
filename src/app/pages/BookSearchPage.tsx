import { useState } from 'react';
import SearchSection from '@features/books/components/SearchSection';
import BookSection from '@features/books/components/BookSection';
import { useBooksInfinite } from '@features/books/hooks/useBooksInfinite';

export default function BookSearchPage() {
  // TODO: 디바운싱 적용
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');

  // TODO: 검색 필터 연동
  const [target, setTarget] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState(false);

  const { query, ref } = useBooksInfinite({
    query: keyword,
    size: 10,
    page: 1,
  });

  const books = query.data?.pages.flatMap((p) => p.documents ?? []) ?? [];
  const meta = query.data?.pages[0]?.meta;
  const hasNextPage = query.hasNextPage;

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(searchInput.trim());
  };

  // TODO: 로딩 상태 처리

  return (
    <>
      <form onSubmit={handleSubmitSearch}>
        <SearchSection
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </form>
      <BookSection books={books} total={meta?.total_count ?? 0} />
      {books.length > 0 && hasNextPage && (
        <div ref={ref} className="w-full h-px" />
      )}
    </>
  );
}
