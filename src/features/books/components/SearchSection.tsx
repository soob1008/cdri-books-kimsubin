import SearchBar from '@features/books/components/SearchBar';
import SearchFilter from '@features/books/components/SearchFilter';

export default function SearchSection() {
  return (
    <section>
      <h2 className="t-title-2">도서 검색</h2>
      <div className="flex items-center gap-4 w-[568px] mt-4">
        <SearchBar />
        <SearchFilter />
      </div>
    </section>
  );
}
