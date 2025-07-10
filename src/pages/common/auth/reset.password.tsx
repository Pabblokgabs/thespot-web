import { Btn } from "@/components";
import logo from "../../../assets/logo.png";
import { Form, Input, Progress } from "antd";
import {
	CloseCircleFilled,
	EyeInvisibleOutlined,
	EyeTwoTone,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function ResetPassword() {
	const location = useLocation();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [password, setPassword] = useState("");
	const [passwordStrength, setPasswordStrength] = useState(0);

	const [email, setEmail] = useState<string>(location.state?.email);
	useEffect(() => {
		if (location.state?.email) {
			setEmail(location.state?.email);
		}
	}, []);

	const calculatePasswordStrength = (pass: string) => {
		let strength = 0;
		if (pass.length >= 8) strength += 25;
		if (/[A-Z]/.test(pass)) strength += 25;
		if (/[0-9]/.test(pass)) strength += 25;
		if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
		setPasswordStrength(strength);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		calculatePasswordStrength(newPassword);
	};

	const getPasswordStrengthText = () => {
		if (passwordStrength <= 25) return "Weak";
		if (passwordStrength <= 50) return "Fair";
		if (passwordStrength <= 75) return "Good";
		return "Strong";
	};

	const getPasswordStrengthColor = () => {
		if (passwordStrength <= 25) return "#ff4d4f";
		if (passwordStrength <= 50) return "#faad14";
		if (passwordStrength <= 75) return "#52c41a";
		return "#1890ff";
	};

	const { isPending, mutate } = useMutation({
		mutationFn: async ({
			email,
			new_password,
		}: {
			email: string;
			new_password: string;
		}) => {
			const res = await fetch(
				"http://localhost:5000/api/v1/auth/reset-password",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, new_password }),
					credentials: "include",
				}
			);

			const data = await res.json();

			if (!res.ok || !data.success) {
				throw new Error(data.message);
			}

			return data;
		},

		onSuccess: () => {
			navigate("/");
			form.resetFields();
		},

		onError: (error: any) => {
			toast.error(error.message);
		},
	});

	const handleSubmit = (values: any) => {
		mutate({ email, new_password: values.confirmPassword });
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<div className="py-5 flex-1 h-full px-[20px] md:px-[50px] xl:px-[100px] overflow-x-hidden flex-col items-center justify-center flex overflow-y-auto">
				<div className="text-center mb-4">
					<div className="flex items-center justify-center gap-2.5">
						<img src={logo} alt="Logo" className="w-7 h-auto object-cover" />
						<h1 className="text-3xl font-bold text-gray-800">kgabs</h1>
					</div>
					<p className="text-gray-600 mt-2">
						Discover and attend amazing local spots
					</p>
				</div>

				<div className="my-10 bg-white shadow-[0px_0px_12px_rgba(250,250,250,0.3)] flex flex-col gap-4 rounded-md w-full md:w-[400px] h-fit p-5">
					<h1 className="text-xl text-center font-extrabold text-black">
						Reset password
					</h1>

					<p className="text-center text-neutral-600 mb-2.5 -mt-2">
						Enter a strong 8 characters password
					</p>

					<Form
						form={form}
						layout="vertical"
						onFinish={handleSubmit}
						requiredMark={false}
						className="space-y-4"
					>
						<Form.Item
							name="password"
							label="Password"
							rules={[
								{ required: true, message: "Please enter a password" },
								{
									min: 8,
									message: "Password must be at least 8 characters",
								},
							]}
						>
							<Input.Password
								size="large"
								placeholder="Create a password"
								className="rounded-md"
								value={password}
								onChange={handlePasswordChange}
								iconRender={(visible) =>
									visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
								}
							/>
						</Form.Item>
						{password && (
							<div className="mb-4">
								<div className="flex justify-between items-center mb-1">
									<span className="text-sm">Password Strength:</span>
									<span
										className="text-sm"
										style={{ color: getPasswordStrengthColor() }}
									>
										{getPasswordStrengthText()}
									</span>
								</div>
								<Progress
									percent={passwordStrength}
									showInfo={false}
									strokeColor={getPasswordStrengthColor()}
									size="small"
								/>
								<div className="mt-2 text-xs text-gray-500">
									<div className="flex items-center gap-1">
										{password.length >= 8 ? (
											<FaCheck className="text-green-500" />
										) : (
											<CloseCircleFilled style={{ color: "red" }} />
										)}
										<span>At least 8 characters</span>
									</div>
									<div className="flex items-center gap-1">
										{/[A-Z]/.test(password) ? (
											<FaCheck className="text-green-500" />
										) : (
											<CloseCircleFilled style={{ color: "red" }} />
										)}
										<span>At least 1 uppercase letter</span>
									</div>
									<div className="flex items-center gap-1">
										{/[0-9]/.test(password) ? (
											<FaCheck className="text-green-500" />
										) : (
											<CloseCircleFilled style={{ color: "red" }} />
										)}
										<span>At least 1 number</span>
									</div>
									<div className="flex items-center gap-1">
										{/[^A-Za-z0-9]/.test(password) ? (
											<FaCheck className="text-green-500" />
										) : (
											<CloseCircleFilled style={{ color: "red" }} />
										)}
										<span>At least 1 special character</span>
									</div>
								</div>
							</div>
						)}
						<Form.Item
							name="confirmPassword"
							label="Confirm Password"
							dependencies={["password"]}
							rules={[
								{ required: true, message: "Please confirm your password" },
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("The two passwords do not match")
										);
									},
								}),
							]}
						>
							<Input.Password
								size="large"
								placeholder="Confirm your password"
								className="rounded-md"
								iconRender={(visible) =>
									visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
								}
							/>
						</Form.Item>

						<Btn
							loading={isPending}
							isAnimation
							type="submit"
							text={isPending ? "Loading..." : "Reset Password"}
							className="text-white w-full"
						/>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default ResetPassword;
