import React, { useState } from "react";
import { Btn, TextInput } from "@/components";
import { LockKeyhole } from "lucide-react";
import { validatePassword } from "@/lib/utils/regex";

interface PasswordProps {
	password: string;
	setPassword: (value: string) => void;
	setConfirmPassword: (value: string) => void;
	confirmPassword: string;
	handleSubmit?: (e: React.FormEvent) => void;
}

const Password: React.FC<PasswordProps> = ({
	handleSubmit,
	password,
	confirmPassword,
	setConfirmPassword,
	setPassword,
}) => {

	const [passwordError, setPasswordError] = useState<boolean>(false);
	const [confirmPasswordError, setConfirmPasswordError] =
		useState<boolean>(false);
	const [confirmPasswordTouched, setConfirmPasswordTouched] =
		useState<boolean>(false);

	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);

		const isValidPassword = validatePassword(value);
		setPasswordError(!isValidPassword);
	};

	const handleConfirmPasswordInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		setConfirmPassword(value);

		if (confirmPasswordTouched) {
			const doPasswordsMatch = value === password;
			setConfirmPasswordError(!doPasswordsMatch);
		}
	};

	const handleConfirmPasswordBlur = () => {
		setConfirmPasswordTouched(true);

		const doPasswordsMatch = confirmPassword === password;
		setConfirmPasswordError(!doPasswordsMatch);
	};

	return (
		<>
			<h1 className="text-xl font-extrabold text-center text-white">
				Set Password And Profile Picture.
			</h1>

			<span className="font-light text-xs text-center text-neutral-500 -mt-4">
				Password must be at least 8 characters long, include an uppercase
				letter, a number, and a special character.
			</span>

			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<TextInput
					placeholder="Enter password..."
					value={password}
					onChange={handlePasswordInput}
					hint="Password"
					type="password"
					name="password"
					error={passwordError}
				>
					<LockKeyhole size={20} />
				</TextInput>

				<TextInput
					placeholder="Confirm password..."
					value={confirmPassword}
					onChange={handleConfirmPasswordInput}
					onFocus={() => setConfirmPasswordTouched(true)}
					onBlur={handleConfirmPasswordBlur}
					hint="Confirm password"
					type="password"
					name="confirm_password"
					error={confirmPasswordError}
					showPasswordToggle={false}
				>
					<LockKeyhole size={20} />
				</TextInput>

				<Btn text="Next" isAnimation type="submit" />
			</form>
		</>
	);
};

export default Password;
