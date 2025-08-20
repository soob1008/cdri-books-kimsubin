import { useMemo } from 'react';
import getBooks from '@features/books/api/getBooks';
import type { BookResponse, BooksParams } from '@features/books/types/book';
import { useInfiniteQueryScroll } from '@shared/hooks/useInfiniteQueryScroll';

export function useBooksInfinite({
  query = '',
  size = 10,
  page = 1,
  sort = 'accuracy',
  target,
}: BooksParams) {
  const initial = useMemo<BooksParams>(
    () => ({ query, page, size, sort, target }),
    [query, page, size, sort, target]
  );

  return useInfiniteQueryScroll<BookResponse>({
    queryKey: ['books', query, size, sort, target],
    initialPageParam: initial,
    enabled: true,
    queryFn: ({ pageParam }) => getBooks(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.meta?.is_end) return undefined;
      return { ...initial, page: allPages.length + 1 };
    },
  });
}
