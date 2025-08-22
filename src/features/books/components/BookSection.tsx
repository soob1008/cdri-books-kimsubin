import EmptyState from '@shared/ui/EmptyState';
import ResultSummary from '@shared/ui/ResultSummary';
import BookList from '@features/books/components/BookList';
import type { Book, BooksParams } from '@features/books/types/book';
import { Controller, useFormContext } from 'react-hook-form';
import SelectBox from '@shared/ui/Select';
import { SORT_OPTIONS } from '@features/books/constants/option';

interface BookSectionProps {
  books: Book[];
  total: number;
  onSubmit: (data: BooksParams) => void;
}

export default function BookSection({
  books = [],
  total,
  onSubmit,
}: BookSectionProps) {
  const { control, handleSubmit } = useFormContext<BooksParams>();

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <ResultSummary total={total} label="도서 검색 결과" />
        <Controller
          name="sort"
          control={control}
          render={({ field }) => (
            <SelectBox
              options={SORT_OPTIONS}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                handleSubmit(onSubmit)();
              }}
              className="w-[120px]"
            />
          )}
        />
      </div>
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
