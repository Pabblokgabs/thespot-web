import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
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
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import { useOverAllContext } from "@/lib/context/useContext";
import SearchModal from "./search.modal";
import Btn from "./btn";
import { recommended } from "@/lib/options";

interface nav {
	isSticky?: boolean;
	isSearchBar?: boolean;
}

const NavBar: React.FC<nav> = ({ isSticky = true, isSearchBar = true }) => {
	const navigate = useNavigate();
	const isLoggedIn = false;
	const {
		setIsQuerying,
		isQuerying,
		setWhat,
		what,
		destination,
		setDestination,
	} = useOverAllContext();

	const [maxW, setMaxW] = useState<number>(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setMaxW(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const [scroll, setScroll] = useState<number>(window.innerWidth);
	const [showSearch, setShowSearch] = useState<boolean>(isQuerying);

	const controlShowSearch = () => {
		if (typeof window !== "undefined") {
			if (window.scrollY > scroll) {
				setShowSearch(false);
			} else {
				setShowSearch(true);
			}

			setScroll(window.scrollY);
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlShowSearch);

			return () => {
				window.removeEventListener("scroll", controlShowSearch);
			};
		}
	}, [scroll]);

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
					<div className="flex items-center space-x-4">
						{isSearchBar && (
							<div className="hidden md:block">
								<Input
									readOnly
									onClick={() => setIsQuerying(!isQuerying)}
									allowClear
									prefix={<FiSearch className="text-gray-400" />}
									placeholder={
										isQuerying ? "Stop the search" : "Start the search"
									}
								/>
							</div>
						)}

						<div className="hidden md:flex">
							<Button
								type="text"
								className="cursor-pointer !rounded-button whitespace-nowrap"
							>
								<MdOutlineLanguage className="text-neutral-800" size={24} />{" "}
								English
							</Button>
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
										className: `${maxW >= 768 && "w-[300px]"} `,
										items: [
											{
												key: "create_account",
												icon: <FaUser className="mr-2" />,
												label: "Create an account",
												onClick: () => navigate("/user/signup"),
											},
											{
												key: "login",
												icon: <FaUser className="mr-2" />,
												label: "Log in",
												onClick: () => navigate("/signin"),
											},
											{
												type: "divider",
											},
											{
												key: "list_spot",
												icon: <FaStar className="mr-2" />,
												label: (
													<div>
														<h4 className="font-bold text-lg">
															List Your Spot
														</h4>
														<p className="text-neutral-600">
															List your spot with us and see magic happenig
														</p>
													</div>
												),
												onClick: () => navigate("/owner/signup"),
											},
											{
												type: "divider",
											},
											{
												key: "help_center",
												icon: <FaUser className="mr-2" />,
												label: "Help Center",
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

				{isQuerying && isSearchBar && (
					<div
						className={`bg-gradient-to-r hidden md:block from-blue-600 to-indigo-700 transition-all duration-1000 ${
							showSearch ? "opacity-100 py-6" : "opacity-0 !max-h-0 py-0"
						}`}
					>
						<div className="container mx-auto px-4">
							<div className="flex flex-col md:flex-row items-center gap-4">
								<div className="w-full md:w-1/3 lg:w-2/4 flex items-center">
									<Select
										value={what}
										onChange={(value) => setWhat(value)}
										size="large"
										placeholder="Select the type?"
										className="w-full"
									>
										{recommended.map((item, index) => (
											<Select.Option
												key={index + item.value}
												value={item.value}
											>
												{item.label}
											</Select.Option>
										))}
									</Select>
								</div>

								<Input
									size="large"
									placeholder="Enter the location..."
									prefix={<EnvironmentOutlined className="text-gray-400" />}
									value={destination}
									onChange={(e) => setDestination(e.target.value)}
									className="pl-4 pr-4"
								/>

								<div className="w-full md:w-1/5 lg:w-1/4">
									<Btn
										text={"Search"}
										isAnimation
										className="bg-neutral-50 text-black"
										animationColor="oklch(45.7% 0.24 277.023)"
									/>
								</div>
							</div>
						</div>
					</div>
				)}
			</header>

			<SearchModal />
		</>
	);
};

export default NavBar;
