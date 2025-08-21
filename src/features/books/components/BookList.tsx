import BookItem from './BookItem';
import type { Book } from '@features/books/types/book';

interface BookListProps {
  books: Book[];
}

export default function BookList({ books = [] }: BookListProps) {
  return (
    <ul>
      {books.map((book) => (
        <BookItem key={book.isbn} book={book} />
      ))}
    </ul>
  );
}
