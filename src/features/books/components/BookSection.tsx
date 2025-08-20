import EmptyState from '@shared/ui/EmptyState';
import ResultSummary from '@shared/ui/ResultSummary';
import BookList from '@features/books/components/BookList';
import type { Book } from '@features/books/types/book';

interface BookSectionProps {
  books: Book[];
  total: number;
}

export default function BookSection({ books = [], total }: BookSectionProps) {
  return (
    <section className="mt-6">
      <ResultSummary total={total} label="도서 검색 결과" />
      <div className="mt-9">
        {books && books.length > 0 ? (
          <BookList books={books} />
        ) : (
          <EmptyState message="검색 결과가 없습니다." />
        )}
      </div>
    </section>
  );
}
