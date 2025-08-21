import CloseIcon from '@assets/icons/icon_close_20.svg?react';
import SelectBox from '@shared/ui/Select';
import Button from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import { Controller, useFormContext } from 'react-hook-form';
import type { BooksParams } from '@features/books/types/book';

interface SearchFilterPanelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: BooksParams) => void;
}

export default function SearchFilterPanel({
  open,
  setOpen,
  onSubmit,
}: SearchFilterPanelProps) {
  const { control, watch, handleSubmit, setValue } =
    useFormContext<BooksParams>();
  const query = watch('query');

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
        onClick={() => {
          setOpen(false);
        }}
      >
        <CloseIcon />
      </button>
      <div className="flex gap-1 mb-4">
        <Controller
          name="target"
          control={control}
          render={({ field }) => (
            <SelectBox
              className="w-25"
              options={[
                { label: '제목', value: 'title' },
                { label: '저자명', value: 'person' },
                { label: '출판사', value: 'publisher' },
                { label: 'ISBN', value: 'isbn' },
              ]}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            />
          )}
        />
        <Input
          value={query}
          className="flex-1"
          onChange={(e) => setValue('query', e.target.value)}
        />
      </div>
      <Button
        type="submit"
        label="검색하기"
        typography="body2"
        className="w-full py-[7px] h-9"
        onClick={() => {
          handleSubmit(onSubmit)();
          setOpen(false);
        }}
      />
    </aside>
  );
}
