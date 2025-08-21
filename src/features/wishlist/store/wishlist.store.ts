import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book } from '@features/books/types/book';

interface WishlistState {
  wishlist: Book[];
  updateWishlist: (book: Book) => void;
}

export const useWishListStore = create<WishlistState>()(
  persist(
    (set) => ({
      wishlist: [],
      updateWishlist: (book: Book) => {
        set((state) => {
          const exist = state.wishlist.some((it) => it.isbn === book.isbn);

          if (exist) {
            return {
              wishlist: state.wishlist.filter((it) => it.isbn !== book.isbn),
            };
          } else {
            return { wishlist: [...state.wishlist, book] };
          }
        });
      },
    }),
    {
      name: 'wishlist',
    }
  )
);
