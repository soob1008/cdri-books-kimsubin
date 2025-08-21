import EmptyState from '@shared/ui/EmptyState';
import ResultSummary from '@shared/ui/ResultSummary';
import BookList from '@features/books/components/BookList';

export default function WishListSection() {
  return (
    <section className="mt-6">
      <ResultSummary total={0} label="찜한 책" />
      <div className="mt-9">
        {/* <BookList /> */}
        <EmptyState />
      </div>
    </section>
  );
}
