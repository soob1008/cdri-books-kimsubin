import { useRef, useState } from 'react';
import SearchIcon from '@assets/icons/icon_search.svg?react';
import CloseIcon from '@assets/icons/icon_close_24.svg?react';
import { useFormContext } from 'react-hook-form';
import type { BooksParams } from '@features/books/types/book';

interface SearchBarProps {
  onSubmit: (data: BooksParams) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue } = useFormContext<BooksParams>();
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <div className="relative flex-1">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-[10px] top-1/2 -translate-y-1/2" />
        <input
          {...register('query')}
          type="text"
          aria-expanded={open}
          aria-controls="search-suggestion-list"
          autoComplete="off"
          placeholder="검색어를 입력하세요"
          onFocus={() => setOpen(true)}
          onBlur={(e) => {
            const next = e.relatedTarget as HTMLElement | null;
            if (next && listRef.current?.contains(next)) return;
            setOpen(false);
          }}
          className="w-full h-[50px] pl-13 py-4 pr-4 bg-lightgray t-caption placeholder:text-text-subtitle rounded-t-3xl rounded-b-[var(--rounded-b)] focus:outline-none"
          style={{ ['--rounded-b' as string]: open ? '0px' : '24px' }}
        />
      </div>
      {open && (
        <ul
          id="search-suggestion-list"
          ref={listRef}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
          className="absolute z-10 w-full rounded-b-3xl bg-lightgray py-4"
        >
          <li
            className="flex items-center justify-between pl-13 py-2 pr-6 hover:bg-gray"
            role="option"
          >
            <button
              type="button"
              className="t-caption text-text-subtitle text-left w-full"
              onClick={() => {
                // TODO: 저장된 검색어로 변경
                setValue('query', '노르웨이 숲');
                handleSubmit(onSubmit)();
                setOpen(false);
              }}
            >
              노르웨이 숲
            </button>
            <button
              type="button"
              aria-label="검색어 삭제"
              className="p-1"
              onClick={() => {}}
              // TODO: 저장된 검색어 삭제
            >
              <CloseIcon />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
