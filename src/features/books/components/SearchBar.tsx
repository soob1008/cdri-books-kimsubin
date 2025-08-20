import { useEffect, useRef, useState } from 'react';
import SearchIcon from '@assets/icons/icon_search.svg?react';
import CloseIcon from '@assets/icons/icon_close_24.svg?react';

interface SearchBarProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  searchInput,
  setSearchInput,
}: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="relative flex-1">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-[10px] top-1/2 -translate-y-1/2" />
        <input
          ref={inputRef}
          type="text"
          value={searchInput}
          placeholder="검색어를 입력하세요"
          aria-expanded={open}
          aria-controls="search-suggestion-list"
          onFocus={() => setOpen(true)}
          onBlur={(e) => {
            const next = e.relatedTarget as HTMLElement | null;
            if (next && listRef.current?.contains(next)) return;
            setOpen(false);
          }}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            const isEnter = e.key === 'Enter';
            const isComposing = e.nativeEvent.isComposing;
            if (isEnter && !isComposing) {
              e.preventDefault();

              e.currentTarget.form?.requestSubmit();
            }
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
          className="absolute z-10 w-full rounded-b-3xl bg-lightgray py-4 pl-13 pr-6"
        >
          <li className="flex items-center justify-between py-2" role="option">
            <button
              type="button"
              className="t-caption text-text-subtitle text-left w-full"
              onClick={() => {}}
            >
              노르웨이 숲
            </button>
            <button
              type="button"
              aria-label="검색어 삭제"
              className="p-1"
              onClick={() => {}}
            >
              <CloseIcon />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
