import { useState, useEffect } from 'react';
import { useWishListStore } from '@features/wishlist/store/wishList.store';
import { useInView } from 'react-intersection-observer';
import EmptyState from '@shared/ui/EmptyState';
import ResultSummary from '@shared/ui/ResultSummary';
import BookList from '@features/books/components/BookList';

export default function WishListSection() {
  const wishlist = useWishListStore((state) => state.wishlist);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ rootMargin: '200px', threshold: 1 });

  const size = 10;
  const visible = wishlist.slice(0, page * size);

  useEffect(() => {
    if (!inView) return;
    if (visible.length < wishlist.length) {
      setPage((p) => p + 1);
    }
  }, [inView, visible.length, wishlist.length]);

  return (
    <section className="mt-6">
      <ResultSummary total={wishlist.length} label="찜한 책" />
      <div className="mt-9">
        {wishlist.length === 0 ? (
          <EmptyState message="찜한 책이 없습니다." />
        ) : (
          <>
            <BookList books={visible} />
            {visible.length < wishlist.length && (
              <div ref={ref} className="h-10 flex justify-center items-center">
                로딩 중
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
