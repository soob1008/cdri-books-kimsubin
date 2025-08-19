import EmptyState from '@shared/ui/EmptyState';
import ResultSummary from '@shared/ui/ResultSummary';
import BookList from '@features/books/components/BookList';

export default function BookSection() {
  return (
    <section className="mt-6">
      <ResultSummary total={0} />
      <div className="mt-9">
        <BookList />
        <EmptyState />
      </div>
    </section>
  );
}
