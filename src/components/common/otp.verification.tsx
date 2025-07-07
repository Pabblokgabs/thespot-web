import React, { useEffect, useState } from "react";

interface OTPVerifyProps {
	email?: string;
	code: string;
	setCode: (value: string) => void;
	handleCodeSubmit?: () => void;
}

const OTPVerify: React.FC<OTPVerifyProps> = ({
	email,
	code,
	setCode,
	handleCodeSubmit,
}) => {
	const [time, setTime] = useState<number>(30);
	const isCounting = time > 0;

	const handleResend = () => {
		setTime(30);
		setCode("");
		console.log("Code resent");
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [time]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^\d{0,4}$/.test(value)) {
			setCode(value);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const allowedKeys = [
			"Backspace",
			"ArrowLeft",
			"ArrowRight",
			"Tab",
			"Delete",
		];
		if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
			e.preventDefault();
		}
	};

	return (
		<div className="text-center">
			<h1 className="text-xl font-extrabold text-neutral-200 mb-2">
				Enter the verification code we sent to:
			</h1>
			<h1 className="text-xl font-extrabold text-orange-600 mb-4">{email}</h1>

			<input
				autoFocus
				type="text"
				inputMode="numeric"
				pattern="\d*"
				value={code}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder="Enter code..."
				className="w-40 text-center text-lg py-2 px-4 rounded bg-neutral-800 text-white outline-none border border-neutral-600 focus:border-orange-500 mb-2"
				maxLength={4}
			/>

			<div className="text-xs text-gray-400 mb-4">
				Check your inbox for the code.
			</div>

			<button
				onClick={handleCodeSubmit}
				className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-500 transition-all mb-4"
			>
				Verify
			</button>

			<div className="flex justify-center items-center gap-2 text-md">
				<button
					disabled={isCounting}
					onClick={handleResend}
					className={`${
						isCounting
							? "text-neutral-500 cursor-not-allowed"
							: "text-neutral-200 cursor-pointer hover:underline"
					}`}
				>
					Resend code
				</button>
				{isCounting && <span className="text-gray-200">{time}</span>}
			</div>
		</div>
	);
};

export default OTPVerify;
