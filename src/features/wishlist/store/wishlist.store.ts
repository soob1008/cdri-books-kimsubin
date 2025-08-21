import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book } from '@features/books/types/book';

export interface WishlistState {
  wishlist: Book[];
  updateWishList: (book: Book) => void;
}

export const useWishListStore = create<WishlistState>()(
  persist<WishlistState>(
    (set) => ({
      wishlist: [],
      updateWishList: (book) =>
        set((state) => {
          const exist = state.wishlist.some((it) => it.isbn === book.isbn);
          return exist
            ? { wishlist: state.wishlist.filter((it) => it.isbn !== book.isbn) }
            : { wishlist: [...state.wishlist, book] };
        }),
    }),
    {
      name: 'wishlist',
    }
  )
);
