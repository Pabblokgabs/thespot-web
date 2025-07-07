import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface TextInputProps {
	children?: React.ReactNode;
	hint?: string;
	bgColor?: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	disabled?: boolean;
	type?: "text" | "password" | "email" | "number" | "date";
	name?: string;
	error?: boolean;
	showPasswordToggle?: boolean;
	isShowPassword?: boolean;
	onFocus?: () => void;
	onBlur?: () => void;
	inputMode?: "none" | "numeric";
}

const TextInput: React.FC<TextInputProps> = ({
	children,
	onChange,
	placeholder,
	hint,
	bgColor = "transparent",
	value,
	disabled,
	type = "text",
	name,
	error = false,
	showPasswordToggle = true,
	isShowPassword = true,
	onFocus,
	onBlur,
	inputMode = "none",
}) => {
	const [showPassword, setShowPassword] = useState(
		isShowPassword && showPasswordToggle
	);
	const isPassword = type === "password";
	const isNumber = type === "number";

	const handleTogglePassword = () => setShowPassword((prev) => !prev);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			!/[0-9]/.test(e.key) &&
			e.key !== "Backspace" &&
			e.key !== "Delete" &&
			e.key !== "ArrowLeft" &&
			e.key !== "ArrowRight"
		) {
			e.preventDefault();
		}
	};

	return (
		<div className="flex flex-col gap-1">
			{hint && <p className="text-sm text-gray-300">{hint}</p>}
			<div
				className={`flex flex-row items-center relative gap-2 p-2 rounded-md ${bgColor} border h-11 ${
					error ? "border-red-600" : "border-zinc-700"
				}`}
			>
				{children}
				<input
					inputMode={inputMode}
					name={name}
					type={isPassword && showPassword ? "text" : type}
					disabled={disabled}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					className="!bg-transparent flex-1 outline-none text-gray-300 placeholder-gray-500"
					onFocus={onFocus}
					onBlur={onBlur}
					onKeyDown={inputMode === "numeric" ? handleKeyPress : () => {}}
				/>
				{isPassword && showPasswordToggle && (
					<button
						type="button"
						onClick={handleTogglePassword}
						className="text-gray-400 z-10 absolute right-2.5 hover:text-white focus:outline-none"
					>
						{showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
					</button>
				)}

				{(isPassword || isNumber) && (
					<div className="absolute right-0 bg-zinc-950 h-7 w-7" />
				)}
			</div>
		</div>
	);
};

export default TextInput;
