import { useState } from 'react';
import Button from '@shared/ui/Button';
import { twMerge } from 'tailwind-merge';
import DropIcon from '@assets/icons/icon_arrow_14.svg?react';
// import LikeFillIcon from '@assets/icons/icon_like_fill.svg?react';
import LikeLineIcon from '@assets/icons/icon_like_line.svg?react';
import type { Book } from '@features/books/types/book';

interface BookItemProps {
  book: Book;
}

export default function BookItem({ book }: BookItemProps) {
  const [open, setOpen] = useState(false);

  const containerClass = twMerge(
    'flex justify-between gap-14 pl-12 pr-4  border-b border-border',
    open ? 'items-stretch pt-6 pb-[40px]' : 'items-center py-4'
  );

  const { thumbnail, title, price, sale_price, url } = book;

  return (
    <li className={containerClass}>
      <div
        className={twMerge(
          'flex-1 flex gap-12',
          open ? 'items-start' : 'items-center'
        )}
      >
        <BookImage open={open} title={title} thumbnail={thumbnail} />
        <BookInfo open={open} book={book} />
      </div>
      <Actions
        open={open}
        setOpen={setOpen}
        price={price}
        salePrice={sale_price}
        url={url}
      />
    </li>
  );
}

function BookImage({
  open,
  title,
  thumbnail,
}: {
  open: boolean;
  title: string;
  thumbnail: string;
}) {
  const imageClass = twMerge(
    'overflow-hidden relative',
    open ? 'w-[210px] h-[280px]' : 'w-[48px] h-[68px]'
  );

  const likeButtonClass = twMerge(
    'absolute top-2 right-2',
    open ? 'w-6 h-6 top-2 right-2' : 'w-4 h-4 top-0 right-0'
  );

  return (
    <div className={imageClass}>
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      <button type="button" aria-label="책 찜하기">
        {/* <LikeFillIcon/> */}
        <LikeLineIcon className={likeButtonClass} />
      </button>
    </div>
  );
}

function BookInfo({ open, book }: { open: boolean; book: Book }) {
  const { title, authors, contents, price, sale_price } = book;
  const infoClass = twMerge(
    'flex-1 flex',
    open
      ? 'flex-col items-start pt-8 pl-[20px]'
      : 'flex-row items-center justify-between gap-6'
  );

  return (
    <div className={infoClass}>
      <div className="flex items-center gap-4">
        <h3 className="t-title-3">{title}</h3>
        <p className="t-body-2 text-text-secondary whitespace-nowrap">
          {authors.join(', ')}
        </p>
      </div>

      {open ? (
        <div className="mt-4">
          <h4 className="text-sm font-bold">책 소개</h4>
          <p className="mt-3 text-medium t-small whitespace-pre-line leading-4">
            {contents || '책 소개가 없습니다.'}
          </p>
        </div>
      ) : (
        <span className="t-title-3 whitespace-nowrap">
          {sale_price > 0
            ? `${sale_price.toLocaleString()}원`
            : `${price.toLocaleString()}원`}
        </span>
      )}
    </div>
  );
}

function Actions({
  open,
  setOpen,
  price,
  salePrice,
  url,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
  salePrice: number;
  url: string;
}) {
  const actionsClass = twMerge(
    'flex',
    open ? 'flex-col justify-between items-end' : 'items-center gap-2'
  );

  const priceClass = twMerge(
    'text-lg ',
    salePrice > 0 ? 'font-light line-through' : 'font-bold'
  );

  return (
    <div className={actionsClass}>
      {!open && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-primary py-4 px-7 t-caption text-white"
        >
          구매하기
        </a>
      )}
      <Button
        label={
          <span className="flex items-center gap-2">
            상세보기 <DropIcon className={open ? 'rotate-180' : ''} />
          </span>
        }
        variant="secondary"
        className="w-[115px] p-4"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="flex flex-col items-end gap-8 w-[240px]">
          <ul className="space-y-2">
            <li className="flex items-baseline justify-end gap-2">
              <span className="text-text-subtitle t-small">원가</span>
              <span className={priceClass}>{price.toLocaleString()}원</span>
            </li>
            {salePrice > 0 && (
              <li className="flex items-baseline justify-end gap-2">
                <span className="text-text-subtitle t-small">할인가</span>
                <span className="text-lg font-bold">
                  {salePrice.toLocaleString()}원
                </span>
              </li>
            )}
          </ul>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-primary py-4 px-7 w-[240px] t-caption text-white"
          >
            구매하기
          </a>
        </div>
      )}
    </div>
  );
}
