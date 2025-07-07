import React, { useRef } from "react";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

interface SelectInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	data: { label: string; value: string }[];
	hint?: string;
	bgColor?: string;
	disabled?: boolean;
	children?: React.ReactNode;
	error?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
	value,
	onChange,
	placeholder = "Select an option",
	data,
	hint,
	bgColor = "bg-zinc-100",
	disabled = false,
	children,
	error = false,
}) => {
	const triggerRef = useRef<HTMLButtonElement | null>(null);

	const handleButtonClick = () => {
		if (triggerRef.current) {
			triggerRef.current.click();
		}
	};

	return (
		<div className="flex flex-col gap-1 w-full">
			{hint && <p className="text-sm text-gray-300">{hint}</p>}

			<div
				className={`relative w-full border ${
					error ? "border-red-600" : "border-zinc-700"
				} gap-2 h-11 flex items-center text-gray-300 px-3 py-2 rounded-md text-sm bg-zinc-950 ${bgColor}`}
			>
				{children}

				<button
					type="button"
					onClick={handleButtonClick}
					disabled={disabled}
					className={`${
						value ? "text-gray-300" : "text-gray-500"
					} bg-transparent w-full h-full flex items-center mb-0.5 justify-between text-[16px]`}
				>
					<span>{value || placeholder}</span>
					<ChevronDown className="h-4 w-4 opacity-50 ml-2" />
				</button>

				<Select value={value} onValueChange={onChange} disabled={disabled}>
					<SelectTrigger
						ref={triggerRef}
						id="select"
						className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"
					>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>

					<SelectContent className="bg-zinc-900 text-gray-300 text-md">
						{data.map((item, index) => (
							<SelectItem
								key={index}
								value={item.value.toLowerCase()}
							>
								{item.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default SelectInput;
