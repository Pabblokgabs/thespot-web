import React, { useState, useRef } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";

interface ComboBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  data: { label: string; value: string }[];
  hint?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  error?: boolean;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  value,
  onChange,
  placeholder = "Select an option",
  data,
  hint,
  disabled = false,
  children,
  error = false,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selectedLabel = data.find((item) => item.value === value)?.label;

  const handleButtonClick = () => {
    if (!disabled) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {hint && <p className="text-sm text-gray-400">{hint}</p>}

      <div
        className={`relative w-full border ${error ? 'border-red-600' :'border-zinc-700'} gap-2 h-11 flex items-center text-gray-300 px-3 py-2 rounded-md text-sm bg-zinc-950 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {children}

        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled}
          className={`w-full h-full text-left text-[16px] bg-transparent flex items-center justify-between ${
            value ? "text-gray-300" : "text-gray-500"
          }`}
        >
          <span>{selectedLabel || placeholder}</span>
          <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
        </button>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            ref={triggerRef}
            className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"
            disabled={disabled}
          >
          </PopoverTrigger>

          <PopoverContent className="w-full p-0 bg-zinc-900 text-gray-300 border border-zinc-700 z-50 dark-scrollbar">
            <Command>
              <CommandInput
                placeholder="Search..."
                className="text-gray-200"
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                    className="flex justify-between"
                  >
                    <span>{item.label}</span>
                    {value === item.value && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ComboBox;
