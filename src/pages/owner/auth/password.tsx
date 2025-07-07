import React, { useState } from "react";
import { Footer, NavBar, Password } from "@/components";
import { FiChevronRight } from "react-icons/fi";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { validatePassword } from "@/lib/utils/regex";

function OwnerPassword() {
	const [password, setPassword] = useState<string>("");
	const [confirmpassword, setConfirmPassword] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const isValidPassword = validatePassword(password);

		if (!isValidPassword) {
			return alert("Please enter valid password");
		}

		if (confirmpassword !== password) {
			return alert("Confirm password is not correct");
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-zinc-950">
			<NavBar isLeft={false} />

			<Breadcrumb className="text-md hidden md:flex font-medium text-gray-400  items-center px-[20px] md:px-[50px] xl:px-[100px]">
				<BreadcrumbItem>
					<BreadcrumbLink href="/" className="flex items-center">
						Home
					</BreadcrumbLink>
				</BreadcrumbItem>
				<FiChevronRight className="mx-2 text-gray-400" size={18} />
				<BreadcrumbItem>
					<BreadcrumbLink
						href="/owner/signup/personal-information"
						className="text-gray-500"
					>
						Personal Information
					</BreadcrumbLink>
				</BreadcrumbItem>
				<FiChevronRight className="mx-2 text-gray-400" size={18} />
				<BreadcrumbItem>
					<BreadcrumbLink className="text-gray-100">Set profile</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>

			<div className="py-5 flex-1 h-full px-[20px] md:px-[50px] xl:px-[100px] overflow-x-hidden flex-col items-center justify-center flex overflow-y-auto">
				<div className="my-10 bg-transparent shadow-[0px_0px_12px_rgba(250,250,250,0.3)] flex flex-col gap-4 rounded-md w-full md:w-[400px] h-fit p-5">
					<Password
						handleSubmit={handleSubmit}
						confirmPassword={confirmpassword}
						password={password}
						setPassword={setPassword}
						setConfirmPassword={setConfirmPassword}
					/>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default OwnerPassword;
