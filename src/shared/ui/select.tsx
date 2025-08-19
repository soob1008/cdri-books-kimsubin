import * as Select from '@radix-ui/react-select';
import DropIcon from '@assets/icons/icon_arrow.svg?react';
import { twMerge } from 'tailwind-merge';

interface SelectBoxProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

export default function SelectBox({
  options = [],
  placeholder = '선택',
  onChange,
  value,
  defaultValue,
  className,
}: SelectBoxProps) {
  return (
    <Select.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
    >
      <Select.Trigger
        className={twMerge(
          `group flex items-center justify-between h-9 px-2 py-3 border-b border-[#D2D6DA] bg-white text-text-primary t-body-2 focus:outline-none data-[placeholder]:text-text-subtitle`,
          className
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon asChild className="">
          <DropIcon className="group-data-[state=open]:rotate-180" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="mt-[6px] bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] w-[var(--radix-select-trigger-width)] max-h-64 overflow-auto"
          position="popper"
        >
          <Select.Viewport>
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="text-sm font-medium px-3 py-1 h-[30px] cursor-pointer text-text-subtitle hover:bg-lightgray/60 data-[state=checked]:bg-lightgray data-[highlighted]:outline-none"
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
