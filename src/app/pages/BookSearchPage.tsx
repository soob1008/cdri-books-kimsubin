import { useState } from 'react';
import SearchSection from '@features/books/components/SearchSection';
import BookSection from '@features/books/components/BookSection';
import { useInfiniteBooks } from '@features/books/hooks/useInfiniteBooks';
import { FormProvider, useForm } from 'react-hook-form';
import type { BooksParams } from '@features/books/types/book';
import { useSearchHistoryStore } from '@features/books/store/searchHistory.store';
import Loading from '@shared/ui/Loading';

export default function BookSearchPage() {
  const method = useForm<BooksParams>({
    defaultValues: {
      query: '',
      page: 1,
      sort: 'accuracy',
      target: 'title',
    },
  });
  const {
    formState: { defaultValues },
  } = method;
  const addSearchHistory = useSearchHistoryStore((state) => state.addHistory);
  const setOpenHistory = useSearchHistoryStore((state) => state.setOpen);

  const [searchQuerys, setSearchQuerys] = useState(
    defaultValues as BooksParams
  );

  const { query, ref } = useInfiniteBooks(searchQuerys);

  const books = query.data?.pages.flatMap((p) => p.documents ?? []) ?? [];
  const meta = query.data?.pages[0]?.meta;
  const { isLoading, isFetchingNextPage, hasNextPage } = query;

  const handleSubmit = (data: BooksParams) => {
    setSearchQuerys({ ...data, page: 1 });
    addSearchHistory(data.query);
    setOpenHistory(false);
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <SearchSection onSubmit={handleSubmit} />
      </form>
      {isLoading ? (
        <Loading />
      ) : (
        <BookSection books={books} total={meta?.total_count ?? 0} />
      )}

      {isFetchingNextPage && <Loading />}

      {books.length > 0 && hasNextPage && (
        <div ref={ref} className="w-full h-px" />
      )}
    </FormProvider>
  );
}
