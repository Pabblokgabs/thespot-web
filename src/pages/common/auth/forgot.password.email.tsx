import React, { useEffect, useRef, useState } from "react";
import { AuthNav, Btn } from "@/components";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { Button, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function ForgotPasswordEmail() {
	const navigation = useNavigate();

	const [form] = Form.useForm();
	const [showVerification, setShowVerification] = useState(false);
	const [email, setEmail] = useState("");
	const [countdown, setCountdown] = useState(30);
	const [isCountingDown, setIsCountingDown] = useState(false);
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const otpRefs = useRef<any[]>([]);
	const [token, setToken] = useState<string>("");

	// Initialize refs array
	useEffect(() => {
		otpRefs.current = otpRefs.current.slice(0, 6);
	}, []);

	// Handle countdown timer
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isCountingDown && countdown > 0) {
			timer = setTimeout(() => {
				setCountdown(countdown - 1);
			}, 1000);
		} else if (countdown === 0) {
			setIsCountingDown(false);
		}
		return () => clearTimeout(timer);
	}, [countdown, isCountingDown]);

	const handleResendOTP = () => {
		setCountdown(60);
		setIsCountingDown(true);
	};

	// Handle change in code and Auto focus next input
	const handleOtpChange = (index: number, value: string) => {
		if (value.length <= 1) {
			const newOtpValues = [...code];
			newOtpValues[index] = value;
			setCode(newOtpValues);

			if (value && index < 5) {
				otpRefs.current[index + 1]?.focus();
			}
		}
	};
	const handleOtpKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			otpRefs.current[index - 1]?.focus();
		}
	};

	const { isPending: isEmailPending, mutate: emailMutate } = useMutation({
		mutationFn: async (email) => {
			const res = await fetch("http://localhost:5000/api/v1/auth/fp/email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await res.json();
			if (!res.ok || !data.success) {
				throw new Error(data.message || "Something went wrong");
			}

			return data;
		},

		onSuccess: (data) => {
			setToken(data.token);
			setShowVerification(true);
			setIsCountingDown(true);
		},

		onError: (error: any) => {
			toast.error(error.message);
		},
	});

	const handleSubmit = (values: any) => {
		setEmail(values.email);
		emailMutate(values.email);
	};

	const {
		isPending: isVerifyPending,
		mutate: verifyMutate,
		data: verifyingData,
	} = useMutation({
		mutationFn: async ({
			email,
			code,
			token,
		}: {
			email: string;
			code: string;
			token: string;
		}) => {
			const res = await fetch("http://localhost:5000/api/v1/auth/fp/verify", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, code, token }),
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				throw new Error(data.message || "Verification failed");
			}

			return data;
		},

		onSuccess: () => {
			navigation("/reset-password", { state: { email } });
		},

		onError: (error: any) => {
			toast.error(error.message);
		},
	});

	const handleVerifyEmail = () => {
		const fullCode = code.join("");

		verifyMutate({
			email,
			token,
			code: fullCode,
		});
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<AuthNav />
			<div className="py-5 flex-1 h-full px-[20px] md:px-[50px] xl:px-[100px] overflow-x-hidden flex-col items-center justify-center flex overflow-y-auto">
				<div className="my-10 bg-white shadow-[0px_0px_12px_rgba(250,250,250,0.3)] flex flex-col gap-4 rounded-md w-full md:w-[400px] h-fit p-5">
					{!showVerification ? (
						<>
							<h1 className="text-xl text-center font-extrabold text-black">
								Reset password
							</h1>

							<p className="text-center text-neutral-600 mb-2.5 -mt-2">
								Enter the email address you registered with.
							</p>

							<Form
								form={form}
								layout="vertical"
								onFinish={handleSubmit}
								requiredMark={false}
								className="space-y-4"
							>
								<Form.Item
									name="email"
									label="Email Address"
									rules={[
										{ required: true, message: "Please enter your email" },
										{ type: "email", message: "Please enter a valid email" },
									]}
								>
									<Input
										size="large"
										placeholder="Enter your email address"
										className="rounded-md"
									/>
								</Form.Item>

								<Btn
									isAnimation
									loading={isEmailPending}
									type="submit"
									text={isEmailPending ? "Loading..." : "Next"}
									className="text-white w-full"
								/>
							</Form>
						</>
					) : (
						<div className=" text-center">
							<div className="flex justify-center mb-4">
								<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
									<FaEnvelope className="text-blue-500 text-2xl" />
								</div>
							</div>
							<h2 className="text-2xl font-bold mb-2">Check your email</h2>
							<p className="text-gray-600 mb-6">
								We've sent a 6-digit code to{" "}
								<span className="font-medium line-clamp-1 truncate">
									{email}
								</span>
								<Button
									type="link"
									icon={<EditOutlined />}
									onClick={() => {
										setShowVerification(false);
										setIsCountingDown(false);
										setCountdown(30);
									}}
									className="ml-1 p-0 h-auto whitespace-nowrap cursor-pointer"
								/>
							</p>
							<p
								className={`text-sm my-2.5 ${
									verifyingData?.success ? "text-green-400" : "text-red-400"
								}`}
							>
								{verifyingData?.message}
							</p>
							<div className="flex justify-center gap-2 mb-6">
								{code.map((value, index) => (
									<Input
										key={index}
										ref={(el) => {
											otpRefs.current[index] = el;
										}}
										className="w-12 h-12 text-center text-lg rounded-md"
										value={value}
										onChange={(e) => handleOtpChange(index, e.target.value)}
										onKeyDown={(e) => handleOtpKeyDown(index, e)}
										maxLength={1}
									/>
								))}
							</div>
							<Btn
								loading={isVerifyPending}
								onClick={handleVerifyEmail}
								className="w-full text-white"
								text={isVerifyPending ? "Verifying..." : "Verify"}
							/>
							<div className="text-sm text-gray-600">
								Didn't receive the code?{" "}
								{isCountingDown ? (
									<span>Resend in {countdown}s</span>
								) : (
									<Button
										type="link"
										onClick={handleResendOTP}
										className="p-0 h-auto whitespace-nowrap cursor-pointer"
									>
										Resend Code
									</Button>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ForgotPasswordEmail;
