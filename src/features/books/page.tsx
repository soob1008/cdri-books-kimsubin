import EmptyState from '@shared/ui/EmptyState';
import SearchSection from '@features/books/components/SearchSection';
import ResultSummary from '@shared/ui/ResultSummary';
import BookList from '@features/books/components/BookList';

export default function BookSearchPage() {
  return (
    <div>
      <h1>책 검색</h1>
      <SearchSection />
      <EmptyState />
      <ResultSummary total={0} />
      <BookList />
    </div>
  );
}
