import { Button, Dropdown } from "antd";
import { MdOutlineLanguage } from "react-icons/md";
import logo from "@/assets/logo.png";

function AuthNav() {
	return (
		<div>
			<div className="border-b-neutral-200 border-b">
				<div className="py-2 container mx-auto flex justify-between">
					<div className="flex items-center gap-2.5 ml-[15px] md:ml-0">
						<img src={logo} alt="Logo" className="w-5 h-auto object-cover" />
						<h1 className="text-xl font-bold text-gray-800">kgabs</h1>
					</div>
					<Dropdown
						menu={{ items: [{ key: "english", label: "English" }] }}
						trigger={["click"]}
					>
						<Button
							type="text"
							className="cursor-pointer !rounded-button whitespace-nowrap"
						>
							<MdOutlineLanguage className="text-neutral-800" size={24} />{" "}
							English
						</Button>
					</Dropdown>
				</div>
			</div>
		</div>
	);
}

export default AuthNav;
