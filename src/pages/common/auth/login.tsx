import { Btn } from "@/components";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function Login() {
	const navigation = useNavigate();
	const [form] = Form.useForm();

	const handleSubmit = (values: any) => {
		console.log(values);
		form.resetFields();
	};

	const handleGoogleSignIn = () => {
		alert("Logged in with Google");
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
						Log into your account
					</h1>

					<p className="text-center text-neutral-600 mb-2.5 -mt-2">
						Hey! You've been missed.
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

						<Btn isAnimation type="submit" text="Submit" width="100%" />
					</Form>

					<div className="flex flex-row items-center gap-2.5">
						<span className="flex-1 h-[1px] bg-zinc-600" />
						<p className="text-gray-500">OR</p>
						<span className="flex-1 h-[1px] bg-zinc-600" />
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
				<div className="text-center mt-4">
					<p className="text-gray-600">
						Don't have an account?{" "}
						<Link
							to={"/user/signup"}
							className="text-blue-600 hover:text-blue-800 font-medium"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
