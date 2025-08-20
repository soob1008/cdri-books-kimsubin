import SearchBar from '@features/books/components/SearchBar';
import SearchFilter from '@features/books/components/SearchFilter';

interface SearchSectionProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchSection({
  searchInput,
  setSearchInput,
}: SearchSectionProps) {
  return (
    <section>
      <h2 className="t-title-2">도서 검색</h2>
      <div className="flex items-center gap-4 w-[568px] mt-4">
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
        <SearchFilter
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
    </section>
  );
}
