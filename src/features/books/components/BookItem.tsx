import { useState } from 'react';
import Button from '@shared/ui/button';
import { twMerge } from 'tailwind-merge';
import DropIcon from '@assets/icons/icon_arrow_14.svg?react';
// import LikeFillIcon from '@assets/icons/icon_like_fill.svg?react';
import LikeLineIcon from '@assets/icons/icon_like_line.svg?react';

export default function BookItem() {
  const [open, setOpen] = useState(false);

  const containerClass = twMerge(
    'flex justify-between gap-14 pl-12 pr-4  border-b border-border',
    open ? 'items-stretch pt-6 pb-[40px]' : 'items-center py-4'
  );

  return (
    <li className={containerClass}>
      <div
        className={twMerge(
          'flex-1 flex gap-12',
          open ? 'items-start' : 'items-center'
        )}
      >
        <BookImage open={open} />
        <Info open={open} />
      </div>
      <Actions open={open} setOpen={setOpen} />
    </li>
  );
}

function BookImage({ open }: { open: boolean }) {
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
      <img
        src="https://dummyimage.com/210x280/000/8affad"
        alt="책 표지"
        className="w-full h-full object-cover"
      />
      <button type="button" aria-label="책 찜하기">
        {/* <LikeFillIcon/> */}
        <LikeLineIcon className={likeButtonClass} />
      </button>
    </div>
  );
}

function Info({ open }: { open: boolean }) {
  const infoClass = twMerge(
    'flex-1 flex',
    open
      ? 'flex-col items-start pt-8 pl-[20px]'
      : 'flex-row items-center justify-between'
  );

  return (
    <div className={infoClass}>
      <div className="flex items-center gap-4">
        <h3 className="t-title-3">노르웨이의 숲</h3>
        <p className="t-body-2 text-text-secondary">무라카미 하루키</p>
      </div>

      {open ? (
        <div className="mt-4">
          <h4 className="text-sm font-bold">책 소개</h4>
          <p className="mt-3 text-medium t-small whitespace-pre-line leading-4">
            {`하루키 월드의 빛나는 다이아몬드 무라카미 하루키를 만나기 위해
              하루키 월드의 빛나는 다이아몬드 무라카미 하루키를 만나기 위해
              하루키 월드의 빛나는 다이아몬드 무라카미 하루키를 만나기 위해`}
          </p>
        </div>
      ) : (
        <span className="t-title-3">13,300원</span>
      )}
    </div>
  );
}

function Actions({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const actionsClass = twMerge(
    'flex',
    open ? 'flex-col justify-between items-end' : 'items-center gap-2'
  );

  return (
    <div className={actionsClass}>
      {!open && <Button label="구매하기" />}

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
              <span className="text-lg line-through font-light">16,000원</span>
            </li>
            <li className="flex items-baseline justify-end gap-2">
              <span className="text-text-subtitle t-small">할인가</span>
              <span className="text-lg font-bold">16,000원</span>
            </li>
          </ul>
          <Button label="구매하기" className="w-[240px]" />
        </div>
      )}
    </div>
  );
}
