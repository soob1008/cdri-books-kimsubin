import type { BooksParams } from '@features/books/types/book';

export default async function getBooks({
  query = '',
  page = 1,
  size = 10,
  target = 'title',
  sort = 'accuracy',
}: BooksParams) {
  const params = new URLSearchParams({
    query,
    page: String(page),
    size: String(size),
    target,
    sort,
  });

  const res = await fetch(
    `${import.meta.env.VITE_KAKAO_API_URL}/search/book?${params.toString()}`,
    {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
      },
    }
  );

  return await res.json();
}
