import BookItem from './BookItem';
import type { Book } from '@features/books/types/book';
import { useWishListStore } from '@features/wishlist/store/wishList.store';

interface BookListProps {
  books: Book[];
}

export default function BookList({ books = [] }: BookListProps) {
  const wishlist = useWishListStore((state) => state.wishlist);

  return (
    <ul>
      {books.map((book) => {
        const isWishlisted = wishlist.some((item) => item.isbn === book.isbn);

        return (
          <BookItem key={book.isbn} book={book} isWishlisted={isWishlisted} />
        );
      })}
    </ul>
  );
}
