import { useRef } from 'react';
import SearchIcon from '@assets/icons/icon_search.svg?react';
import CloseIcon from '@assets/icons/icon_close_24.svg?react';
import { useFormContext } from 'react-hook-form';
import { useSearchHistoryStore } from '@features/books/store/searchHistory.store';
import type { BooksParams } from '@features/books/types/book';

interface SearchBarProps {
  onSubmit: (data: BooksParams) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const histories = useSearchHistoryStore((state) => state.histories);
  const open = useSearchHistoryStore((state) => state.open);
  const setOpen = useSearchHistoryStore((state) => state.setOpen);
  const removeHistory = useSearchHistoryStore((state) => state.removeHistory);

  const { register, handleSubmit, setValue } = useFormContext<BooksParams>();

  const listRef = useRef<HTMLUListElement>(null);
  const visibleHistories = open && histories.length > 0;

  return (
    <div className="relative sm:w-[400px] md:w-[480px]">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-[10px] top-1/2 -translate-y-1/2" />
        <input
          {...register('query')}
          type="text"
          aria-expanded={open}
          aria-controls="search-suggestion-list"
          autoComplete="off"
          placeholder="검색어를 입력하세요"
          onMouseDown={() => setOpen(true)}
          onBlur={(e) => {
            const next = e.relatedTarget as HTMLElement | null;
            if (next && listRef.current?.contains(next)) return;
            setOpen(false);
          }}
          className="w-full h-[50px] pl-13 py-4 pr-4 bg-lightgray t-caption placeholder:text-text-subtitle rounded-t-3xl rounded-b-[var(--rounded-b)] focus:outline-none"
          style={{
            ['--rounded-b' as string]: visibleHistories ? '0px' : '24px',
          }}
        />
      </div>
      {visibleHistories && (
        <ul
          id="search-suggestion-list"
          ref={listRef}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
          className="absolute z-9 w-full rounded-b-3xl bg-lightgray py-4"
        >
          {histories.map((history) => (
            <li
              key={history}
              className="flex items-center justify-between pl-13 py-2 pr-6 hover:bg-gray"
              role="option"
            >
              <button
                type="button"
                className="t-caption text-text-subtitle text-left w-full"
                onClick={() => {
                  setValue('query', history);
                  handleSubmit(onSubmit)();
                  setOpen(false);
                }}
              >
                {history}
              </button>
              <button
                type="button"
                aria-label="검색어 삭제"
                className="p-1"
                onClick={() => {
                  removeHistory(history);
                }}
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
