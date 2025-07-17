import { AuthNav, Btn } from "@/components";
import { Link } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function Login() {
	const navigation = useNavigate();
	const [form] = Form.useForm();

	const { mutate: loginUser, isPending: isLoggingIn } = useMutation({
		mutationFn: async (loginData: { email: string; password: string }) => {
			const res = await fetch("http://localhost:5000/api/v1/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginData),
				credentials: "include",
			});

			let data;

			try {
				data = await res.json();
			} catch (e) {
				throw new Error("Invalid JSON response from server");
			}

			if (!res.ok) {
				throw new Error(data.message || `HTTP Error ${res.status}`);
			}

			return data;
		},

		onSuccess: (data) => {
			form.resetFields();

			if (data.role === "owner") {
				navigation(`/owner/dashboard/${data._id}`);
			} else {
				navigation("/");
			}
		},

		onError: (error: any) => {
			console.log("Error is:", error);
			toast.error(
				<div className="ml-2.5">
					<p className="font-semibold">Login failed</p>
					<p className="text-sm text-gray-600">{error.message}</p>
				</div>
			);
		},
	});

	const handleSubmit = (values: any) => {
		loginUser(values);
	};

	const handleGoogleSignIn = () => {
		alert("Logged in with Google");
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			{isLoggingIn && (
				<div className="absolute top-0 left-0 h-full w-full z-10" />
			)}
			<AuthNav />
			<div className="py-5 flex-1 h-full px-[20px] md:px-[50px] xl:px-[100px] overflow-x-hidden flex-col items-center justify-center flex overflow-y-auto">
				<div className="md:my-10 md:bg-white md:shadow-[0px_0px_12px_rgba(250,250,250,0.3)] flex flex-col gap-4 md:rounded-md w-full md:w-[400px] h-fit md:p-5">
					<h1 className="text-xl text-center font-extrabold text-black">
						Log into your account
					</h1>

					<p className="text-center text-neutral-600 mb-2.5 -mt-2">
						Hey! Welcome back to kgabs.
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
								placeholder="Enter a password"
								className="rounded-md"
								iconRender={(visible) =>
									visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
								}
							/>
						</Form.Item>

						<p className="text-gray-600 text-end -mt-3">
							<Link
								to={"/forgot-password"}
								className="text-blue-600 hover:text-blue-800 font-medium"
							>
								Forgot password?
							</Link>
						</p>

						<Btn
							loading={isLoggingIn}
							isAnimation
							type="submit"
							text={isLoggingIn ? "Loading..." : "Login"}
							className="text-white w-full"
						/>
					</Form>

					<div className="flex flex-row items-center gap-2.5">
						<span className="flex-1 h-[1px] bg-zinc-400" />
						<p className="text-gray-400 text-sm">OR</p>
						<span className="flex-1 h-[1px] bg-zinc-400" />
					</div>

					<button
						onClick={handleGoogleSignIn}
						className="flex cursor-pointer flex-row items-center justify-center gap-2.5 border-2 border-neutral-400 p-2.5 rounded-md text-neutral-400 hover:text-indigo-400 hover:border-indigo-400 group"
					>
						<FaGoogle
							size={24}
							className="text-red-400 group-hover:text-indigo-400"
						/>{" "}
						Continue With Google
					</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
