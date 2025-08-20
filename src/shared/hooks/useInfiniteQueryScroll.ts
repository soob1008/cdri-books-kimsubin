import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { BooksParams } from '@features/books/types/book';

type UseQueryInfiniteScrollOptions<T> = {
  queryKey: QueryKey;
  queryFn: (ctx: { pageParam: BooksParams }) => Promise<T>;
  getNextPageParam: (lastPage: T, allPages: T[]) => BooksParams | undefined;
  enabled?: boolean;
  initialPageParam: BooksParams;
};

export function useInfiniteQueryScroll<T>({
  queryKey,
  queryFn,
  getNextPageParam,
  enabled = true,
  initialPageParam,
}: UseQueryInfiniteScrollOptions<T>) {
  const { ref, inView } = useInView({
    rootMargin: '200px 0px',
    threshold: 0.1,
  });

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ pageParam }),
    initialPageParam,
    getNextPageParam,
    enabled,
  });

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  useEffect(() => {
    if (!enabled) return;
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, enabled, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    query,
    ref,
  };
}
