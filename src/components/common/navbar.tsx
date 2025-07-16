import React from "react";
import { Input } from "antd";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IoEllipse, IoEllipsisVerticalSharp } from "react-icons/io5";
import { MdOutlineLanguage } from "react-icons/md";
import {
	FaUser,
	FaCalendarCheck,
	FaHeart,
	FaStar,
	FaCog,
	FaSignOutAlt,
} from "react-icons/fa";
import { FiBell, FiSearch } from "react-icons/fi";
import { Dropdown, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useOverAllContext } from "@/lib/context/useContext";
import SearchModal from "./search.modal";

interface nav {
	isScrolled?: boolean;
	isSticky?: boolean;
}

const NavBar: React.FC<nav> = ({ isScrolled = false, isSticky = true }) => {
	const navigate = useNavigate();
	const isLoggedIn = false;
	const { setIsQuerying } = useOverAllContext();

	return (
		<>
			<header
				className={`${
					isSticky ? "top-0 sticky" : ""
				} z-50 opacity-100 bg-white/95 shadow-sm backdrop-blur-sm transition ease-in-out duration-500 !w-full`}
			>
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<Link to={"/"} className="flex items-center">
						<h1 className="md:text-2xl font-bold text-indigo-600">kgabs</h1>
					</Link>
					<div className="flex-1 hidden lg:block transition-all duration-300 max-w-2xl mx-8">
						{isScrolled && (
							<div className="relative">
								<Input
									readOnly
									onClick={() => setIsQuerying(true)}
									allowClear
									prefix={<FiSearch className="text-gray-400" />}
									placeholder="Search for restaurants, bars, spas and more..."
									className="w-full"
									inputMode="text"
								/>
							</div>
						)}
					</div>
					<div className="flex items-center space-x-4">
						<div className="hidden md:flex">
							<Button
								type="text"
								className="cursor-pointer !rounded-button whitespace-nowrap"
							>
								<MdOutlineLanguage className="text-neutral-800" size={24} />{" "}
								English
							</Button>
							<Link to={"/owner/signup"}>
								<Button
									type="primary"
									className="cursor-pointer !rounded-button whitespace-nowrap"
								>
									List Your Spot
								</Button>
							</Link>
						</div>
						<div className="flex items-center gap-4">
							<div className="relative block md:hidden">
								<FiBell />
								<p className="absolute -top-1 -right-1 h-2 w-2 bg-red-600" />
							</div>
							<FiSearch
								onClick={() => setIsQuerying(true)}
								className="text-black block md:hidden"
							/>
							{isLoggedIn ? (
								<Dropdown
									trigger={["click"]}
									menu={{
										items: [
											{
												key: "profile",
												icon: <FaUser className="mr-2" />,
												label: "Profile",
												onClick: () => navigate("/user/profile"),
											},
											{
												key: "bookings",
												icon: <FaCalendarCheck className="mr-2" />,
												label: "My Bookings",
											},
											{
												key: "saved-spots",
												icon: <FaHeart className="mr-2" />,
												label: "Saved Spots",
											},
											{
												key: "reviews",
												icon: <FaStar className="mr-2" />,
												label: "Reviews",
											},
											{
												type: "divider",
											},
											{
												key: "account-settings",
												icon: <FaCog className="mr-2" />,
												label: "Account Settings",
											},
											{
												type: "divider",
											},
											{
												key: "logout",
												icon: <FaSignOutAlt className="mr-2" />,
												label: "Logout",
												danger: true,
											},
										],
									}}
								>
									<div className="block md:flex rounded-full items-center whitespace-nowrap md:cursor-pointer">
										<IoEllipse
											className="text-black block md:hidden"
											size={30}
										/>
										<Avatar className="h-8 w-8 hidden md:block">
											<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20person%20smiling%20with%20neutral%20background%2C%20high%20quality%20portrait%2C%20clean%20simple%20background&width=100&height=100&seq=9&orientation=squarish" />
											<AvatarFallback className="bg-neutral-200 text-black">
												JD
											</AvatarFallback>
										</Avatar>
									</div>
								</Dropdown>
							) : (
								<Dropdown
									trigger={["click"]}
									menu={{
										items: [
											{
												key: "create-account",
												icon: <FaUser className="mr-2" />,
												label: "Create account",
												onClick: () => navigate("/user/signup"),
											},
											{
												key: "login",
												icon: <FaCalendarCheck className="mr-2" />,
												label: "Login",
												onClick: () => navigate("/signin"),
											},
											{
												key: "contact",
												icon: <FaHeart className="mr-2" />,
												label: "Contact Us",
											},
											{
												key: "what-we-do",
												icon: <FaStar className="mr-2" />,
												label: "What we do?",
											},
											{
												type: "divider",
											},
											{
												key: "report",
												icon: <FaCog className="mr-2" />,
												label: "Report a concern",
											},
										],
									}}
								>
									<div className="block md:flex rounded-full items-center whitespace-nowrap md:cursor-pointer">
										<IoEllipsisVerticalSharp className="text-black block md:hidden" />
										<Avatar className="h-8 w-8 hidden md:block">
											<AvatarFallback className="bg-neutral-200 text-black">
												<UserOutlined />
											</AvatarFallback>
										</Avatar>
									</div>
								</Dropdown>
							)}
						</div>
					</div>
				</div>
			</header>

			<SearchModal />
		</>
	);
};

export default NavBar;
