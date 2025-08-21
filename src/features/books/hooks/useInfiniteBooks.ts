import { useMemo } from 'react';
import getBooks from '@features/books/api/getBooks';
import type { BookResponse, BooksParams } from '@features/books/types/book';
import { useInfiniteQueryScroll } from '@shared/hooks/useInfiniteQueryScroll';

export function useInfiniteBooks({
  query = '',
  page = 1,
  sort = 'accuracy',
  target,
}: BooksParams) {
  const initial = useMemo<BooksParams>(
    () => ({ query, page, sort, target }),
    [query, page, sort, target]
  );

  return useInfiniteQueryScroll<BookResponse>({
    queryKey: ['books', query, sort, target],
    initialPageParam: initial,
    enabled: true,
    queryFn: ({ pageParam }) => getBooks(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.meta?.is_end) return undefined;
      return { ...initial, page: allPages.length + 1 };
    },
  });
}
