import React, { useEffect, useState } from "react";
import { Input, Form, Progress, UploadFile, Space, Tooltip } from "antd";
import {
	EyeInvisibleOutlined,
	EyeTwoTone,
	CloseCircleFilled,
	InfoCircleOutlined,
} from "@ant-design/icons";
import { FaCheck } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Btn } from "@/components";

const OwnerPersonalInfo: React.FC = () => {
	const location = useLocation();
	const [form] = Form.useForm();
	const [password, setPassword] = useState("");
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const [email, setEmail] = useState<string>("");
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

	const { mutate: registerOwner, isPending } = useMutation({
		mutationFn: async (formData: FormData) => {
			const res = await fetch(
				"http://localhost:5000/api/v1/owner/auth/sign-up",
				{
					method: "POST",
					body: formData,
				}
			);

			const data = await res.json();

			if (!res.ok || !data.success) {
				throw new Error(data.message || "Something went wrong");
			}

			return data;
		},

		onSuccess: () => {
			form.resetFields();
			setFileList([]);
		},

		onError: (error) => {
			toast.error("Registration failed", {
				description: <p>{error.message}</p>,
			});
		},
	});

	const handleSubmit = (values: any) => {
		console.log(values);

		const formData = new FormData();

		formData.append("email", email);
		formData.append("first_Name", values.first_Name);
		formData.append("last_Name", values.last_Name);
		formData.append("user_Name", values.user_Name);
		formData.append("password", values.confirmPassword);
		formData.append("phone_number", values.phone_number || "");
		formData.append("idDocument", values.idDocument);

		if (fileList.length > 0 && fileList[0].originFileObj) {
			formData.append("profileImage", fileList[0].originFileObj as File);
		}
		console.log(formData);
		registerOwner(formData);
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

	return (
		<div className="min-h-screen flex flex-col bg-gray-50 relative">
			{isPending && (
				<div  className="absolute top-0 left-0 h-full w-full z-10" />
			)}
			<div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
				<div className="w-full max-w-lg">
					<div className="text-center mb-8">
						<div className="flex items-center justify-center gap-2.5">
							<img src={logo} alt="Logo" className="w-7 h-auto object-cover" />
							<h1 className="text-3xl font-bold text-gray-800">kgabs</h1>
						</div>
						<p className="text-gray-600 mt-2">
							Discover and attend amazing local spots
						</p>
					</div>
					<div className="bg-white p-8 rounded-lg shadow-lg">
						<div className="flex justify-center mb-8 relative">
							<div className="relative group">
								<div className="w-35 h-35 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
									{fileList.length > 0 ? (
										<img
											src={URL.createObjectURL(fileList[0] as any)}
											alt="Profile"
											className="w-full h-full rounded-full object-cover"
										/>
									) : (
										<i className="fas fa-user text-4xl text-gray-400"></i>
									)}
								</div>
								<label
									htmlFor="avatar-upload"
									className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
								>
									<i className="fas fa-pencil-alt text-white text-sm"></i>
								</label>
								<input
									id="avatar-upload"
									type="file"
									className="hidden"
									accept="image/*"
									onChange={(e) => {
										if (e.target.files?.length) {
											setFileList([e.target.files[0] as any]);
										}
									}}
								/>
							</div>
						</div>
						<Form
							form={form}
							layout="vertical"
							onFinish={handleSubmit}
							requiredMark={true}
							className="space-y-4"
						>
							<Form.Item name="email" label="Email">
								<Input readOnly value={email} size="large" />
							</Form.Item>

							<Form.Item
								name="first_Name"
								label="First Name"
								rules={[
									{ required: true, message: "Please enter your first name" },
								]}
							>
								<Input size="large" placeholder="Enter your first name" />
							</Form.Item>

							<Form.Item
								name="fullName"
								label="Last Name"
								rules={[
									{ required: true, message: "Please enter your last name" },
								]}
							>
								<Input size="large" placeholder="Enter your last name" />
							</Form.Item>

							<Form.Item
								name="user_Name"
								label={
									<Space className="flex items-center">
										<span>User name</span>
										<Tooltip title="This is the name that will appear on public">
											<InfoCircleOutlined className="text-gray-400" />
										</Tooltip>
									</Space>
								}
								rules={[{ required: true, message: "Please enter a username" }]}
							>
								<Input size="large" placeholder="Choose a username" />
							</Form.Item>

							<Form.Item name="phone_number" label="Phone number">
								<Input
									inputMode="numeric"
									size="large"
									placeholder="Enter phone number"
									className="rounded-md"
								/>
							</Form.Item>

							<Form.Item
								required
								rules={[
									{
										required: true,
										message: "Please attact your id document",
									},
								]}
								name="idDocument"
								label="ID Document"
							>
								<Input
									type="file"
									accept=".pdf"
									size="large"
									placeholder="Enter phone number"
								/>
							</Form.Item>

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

							<Form.Item>
								<Btn
									isAnimation
									loading={isPending}
									type="submit"
									className="w-full text-white"
									text={isPending ? "Loading..." : "Create Account"}
								/>
							</Form.Item>
						</Form>

						<p className="text-center text-neutral-600 text-sm">
							By creating an account you agree to the{" "}
							<Link to={""} className="text-blue-600 hover:text-blue-800">
								Terms & Conditions
							</Link>
							,{" "}
							<Link to={""} className="text-blue-600 hover:text-blue-800">
								Cookie Policy
							</Link>{" "}
							and{" "}
							<Link to={""} className="text-blue-600 hover:text-blue-800">
								Privacy Policy
							</Link>{" "}
							of DeSpot
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default OwnerPersonalInfo;
