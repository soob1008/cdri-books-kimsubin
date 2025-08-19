import { useEffect, useRef, useState } from 'react';
import SearchIcon from '@assets/icons/icon_search.svg?react';
import CloseIcon from '@assets/icons/icon_close_24.svg?react';

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // ESC 키를 누르면 닫히도록 처리
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
          placeholder="검색어를 입력하세요"
          aria-expanded={open}
          aria-controls="search-suggestion-list"
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
          role="searchList"
          onMouseDown={(e) => e.preventDefault()}
          className="absolute z-10 w-full rounded-b-3xl bg-lightgray py-4 pl-13 pr-6"
        >
          <li
            className="flex items-center justify-between py-2"
            role="searchOption"
          >
            <span className="t-caption text-text-subtitle">노르웨이 숲</span>
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
