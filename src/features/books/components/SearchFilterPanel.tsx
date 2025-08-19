import CloseIcon from '@assets/icons/icon_close_20.svg?react';
import SelectBox from '@shared/ui/select';
import Button from '@shared/ui/button';
import Input from '@shared/ui/input';

interface SearchFilterPanelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SearchFilterPanel({
  open,
  setOpen,
}: SearchFilterPanelProps) {
  return (
    <aside
      aria-label="검색 필터"
      hidden={!open}
      className="absolute top-13 left-1/2 transform -translate-x-1/2 w-[360px] py-9 px-6 rounded-lg bg-white shadow-[0_4px_14px_6px_rgba(151,151,151,0.15)]"
    >
      <button
        type="button"
        aria-label="상세 검색 닫기"
        className="absolute top-2 right-2"
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </button>
      <div className="flex gap-1 mb-4">
        <SelectBox
          className="w-25"
          options={[
            { label: '제목', value: 'title' },
            { label: '저자', value: 'author' },
            { label: '출판사', value: 'publisher' },
            { label: 'ISBN', value: 'isbn' },
          ]}
        />
        <Input className="flex-1" />
      </div>
      <Button
        label="검색하기"
        typography="body2"
        className="w-full py-[7px] h-9"
      />
    </aside>
  );
}
