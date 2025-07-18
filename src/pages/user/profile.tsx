import React, { useState } from "react";
import {
	Button,
	Tabs,
	Progress,
	Tag,
	Dropdown,
	Menu,
	Switch,
	Divider,
	Modal,
	Form,
	Input,
	Select,
	Rate,
	Radio,
	Upload,
} from "antd";
import {
	EditOutlined,
	EnvironmentOutlined,
	CalendarOutlined,
	StarOutlined,
	DownloadOutlined,
	CreditCardOutlined,
	LockOutlined,
	BellFilled,
	UserOutlined,
	EllipsisOutlined,
	RightOutlined,
	MailOutlined,
	PhoneOutlined,
	ArrowRightOutlined,
} from "@ant-design/icons";
const { TabPane } = Tabs;
import {
	pastEvents,
	upcomingEvents,
	followedVenues,
	pointsHistory,
	user,
} from "@/lib/mock";
import {
	FaCalendarAlt,
	FaCalendarDay,
	FaCcMastercard,
	FaCcVisa,
	FaCloudUploadAlt,
	FaEllipsisH,
	FaEye,
	FaHeartBroken,
	FaMapMarkedAlt,
	FaQrcode,
	FaStar,
	FaTicketAlt,
	FaTrash,
} from "react-icons/fa";
import { Footer, NavBar } from "@/components";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import noproduct from "@/assets/noproduct.svg";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

const Profile: React.FC = () => {
	const navigation = useNavigate();

	const [searchQuery, setSearchQuery] = useState("");
	const [venueFilter, setVenueFilter] = useState("all");
	const [showAccountSettings, setShowAccountSettings] = useState(false);
	const [showRateEvent, setShowRateEvent] = useState(false);
	const [showPrivacySettings, setShowPrivacySettings] = useState(false);
	const [showPaymentMethods, setShowPaymentMethods] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<any>(null);
	const [form] = Form.useForm();
	const [paymentForm] = Form.useForm();
	const [rateForm] = Form.useForm();
	const [privacyForm] = Form.useForm();

	const handleAccountSettingsSubmit = (values: any) => {
		console.log("Account settings updated:", values);
		setShowAccountSettings(false);
	};

	const handleAccountSettingsCancel = () => {
		form.resetFields();
		setShowAccountSettings(false);
	};

	const filteredVenues = followedVenues.filter((venue) => {
		const matchesSearch = venue.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory =
			venueFilter === "all" || venue.category === venueFilter;
		return matchesSearch && matchesCategory;
	});

	const categories = [
		"all",
		...new Set(followedVenues.map((venue) => venue.category)),
	];

	const heroBackgroundImage =
		"https://readdy.ai/api/search-image?query=abstract%20modern%20background%20with%20soft%20gradient%20colors%20in%20light%20blue%20and%20purple%2C%20minimal%20design%2C%20clean%20and%20elegant%20pattern%2C%20professional%20high%20quality%20digital%20art%20for%20web%20header&width=1440&height=300&seq=14&orientation=landscape";

	return (
		<div className="min-h-screen bg-gray-50">
			{/* navbar */}
			<NavBar />

			<main className="pt-16 pb-12">
				{/* Hero Banner */}
				<div
					className="w-full h-72 bg-cover bg-center relative"
					style={{ backgroundImage: `url(${heroBackgroundImage})` }}
				>
					<div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-transparent" />
					<div className="container mx-auto px-4 relative h-full flex items-center">
						<div className="text-white z-10">
							<h1 className="text-4xl font-bold mb-2">
								Welcome back, {user.name.split(" ")[0]}!
							</h1>
							<p className="text-xl opacity-90">
								Discover your favorite spots and upcoming events
							</p>
						</div>
					</div>
				</div>
				{/* Main Content */}
				<div className="container mx-auto px-4 -mt-16">
					{/* Profile Section */}
					<div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8 relative z-10">
						<div className="flex flex-col md:flex-row items-start md:items-center">
							<div className="relative mb-4 md:mb-0 mr-6">
								<Avatar className="h-20 w-20 block">
									<AvatarImage src={user.profileImage} />
									<AvatarFallback className="bg-neutral-200 text-black">
										{user.name
											.toUpperCase()
											.split(" ")
											.splice(0, 2)
											.map((i) => i[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div className="absolute bottom-0 h-7 w-7 flex items-center text-white justify-center right-0 bg-indigo-600 rounded-full p-1 cursor-pointer">
									<EditOutlined className="text-sm" />
								</div>
							</div>
							<div className="flex-1 w-full">
								<div className="flex flex-col md:flex-row md:items-center md:justify-between">
									<div>
										<h2 className="text-2xl font-bold text-gray-900">
											{user.name}
										</h2>
										<div className="flex flex-col-reverse md:flex-col">
											<div className="flex flex-col md:flex-row md:items-center text-gray-500 mt-1">
												<div>
													<EnvironmentOutlined className="mr-2" />
													<span>{user.location}</span>
												</div>
												<span className="mx-2 hidden md:block">•</span>
												<div>
													<CalendarOutlined className="mr-2" />
													<span>Member since {user.memberSince}</span>
												</div>
											</div>
											<div className="flex flex-col md:flex-row md:items-center md:mt-2 text-gray-600">
												<div className="flex items-center">
													<MailOutlined className="mr-2" />
													<span className="mr-4">{user.email}</span>
												</div>
												<div className="flex items-center">
													<PhoneOutlined className="mr-2" />
													<span>{user.phone}</span>
												</div>
											</div>
										</div>
									</div>
									<Button
										type="primary"
										icon={<EditOutlined />}
										onClick={() => setShowAccountSettings(true)}
										className="mt-4 md:mt-0 !rounded-button whitespace-nowrap"
									>
										Edit Profile
									</Button>
								</div>
								<Divider />
								<div className="flex flex-wrap justify-between md:justify-items-start w-full md:w-fit">
									<div className="mr-8 mb-2">
										<div className="text-sm text-gray-500">Following</div>
										<div className="text-xl font-semibold">
											{user.stats.following}
										</div>
									</div>
									<div className="mr-8 mb-2">
										<div className="text-sm text-gray-500">Events Attended</div>
										<div className="text-xl font-semibold">
											{user.stats.eventsAttended}
										</div>
									</div>
									<div className="mb-2">
										<div className="text-sm text-gray-500">Reviews</div>
										<div className="text-xl font-semibold">
											{user.stats.reviews}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Loyalty Points Section */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
								<div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 md:px-6 py-4">
									<h3 className="text-xl font-bold text-white">
										Loyalty Points
									</h3>
								</div>
								<div className="p-4 md:p-6">
									<div className="flex justify-between items-center mb-2">
										<div className="text-3xl font-bold text-gray-900">
											{user.loyaltyPoints}
										</div>
										<div className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
											{user.loyaltyTier} Member
										</div>
									</div>
									<div className="mb-1 text-sm flex justify-between">
										<span>Current: {user.loyaltyTier}</span>
										<span>Next: {user.loyaltyNextTier}</span>
									</div>
									<Progress
										percent={Math.round(
											(user.loyaltyPoints /
												(user.loyaltyPoints + user.pointsToNextTier)) *
												100
										)}
										showInfo={false}
										strokeColor={{
											"0%": "#818cf8",
											"100%": "#6366f1",
										}}
										className="mb-4"
									/>
									<div className="text-sm text-gray-500 mb-6">
										{user.pointsToNextTier} more points to reach{" "}
										{user.loyaltyNextTier}
									</div>
									<h4 className="font-medium text-gray-900 mb-3">
										Recent Activity
									</h4>
									<div className="space-y-3">
										{pointsHistory.slice(0, 3).map((item) => (
											<div
												key={item.id}
												className="flex items-center p-2 hover:bg-gray-50 rounded-lg"
											>
												<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
													<i className={`fas ${item.icon}`}></i>
												</div>
												<div className="flex-1">
													<div className="flex justify-between">
														<div className="text-sm font-medium text-gray-900">
															{item.activity}
														</div>
														<div
															className={`text-sm font-medium ${
																item.points.startsWith("+")
																	? "text-green-600"
																	: "text-red-600"
															}`}
														>
															{item.points}
														</div>
													</div>
													<div className="flex justify-between text-xs text-gray-500">
														<div>{item.venue}</div>
														<div>{item.date}</div>
													</div>
												</div>
											</div>
										))}
									</div>
									<div className="mt-4 text-center">
										<Button
											type="link"
											className="text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap"
										>
											View All Activity <ArrowRightOutlined />
										</Button>
									</div>
								</div>
							</div>
							{/* Settings Section */}
							<div className="bg-white rounded-xl shadow-md overflow-hidden">
								<div className="px-4 md:px-6 py-4 border-b border-gray-100">
									<h3 className="text-xl font-bold text-gray-900">Settings</h3>
								</div>
								<div className="p-4">
									<div className="py-3 px-2 border-b border-gray-100">
										<div
											className="flex items-center justify-between cursor-pointer"
											onClick={() => setShowAccountSettings(true)}
										>
											<div className="flex items-center">
												<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
													<UserOutlined />
												</div>
												<span className="font-medium">Account Settings</span>
											</div>
											<RightOutlined className="text-gray-400" />
										</div>
									</div>
									<div className="py-3 px-2 border-b border-gray-100">
										<div className="flex items-center justify-between cursor-pointer">
											<div className="flex items-center">
												<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
													<BellFilled />
												</div>
												<span className="font-medium">
													Notification Preferences
												</span>
											</div>
											<RightOutlined className="text-gray-400" />
										</div>
									</div>
									<div className="py-3 px-2 border-b border-gray-100">
										<div
											className="flex items-center justify-between cursor-pointer"
											onClick={() => setShowPaymentMethods(true)}
										>
											<div className="flex items-center">
												<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
													<CreditCardOutlined />
												</div>
												<span className="font-medium">Payment Methods</span>
											</div>
											<RightOutlined className="text-gray-400" />
										</div>
									</div>
									<div className="py-3 px-2">
										<div
											className="flex items-center justify-between cursor-pointer"
											onClick={() => setShowPrivacySettings(true)}
										>
											<div className="flex items-center">
												<div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
													<LockOutlined />
												</div>
												<span className="font-medium">Privacy Settings</span>
											</div>
											<RightOutlined className="text-gray-400" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="lg:col-span-2">
							{/* Followed Venues Section */}
							<div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
								<div className="px-4 md:px-6 py-4 border-b border-gray-100 flex justify-between items-center">
									<h3 className="text-xl font-bold text-gray-900">
										Followed Venues
									</h3>
									{/* <Button
										type="default"
										className="!rounded-button whitespace-nowrap hidden md:block"
									>
										Discover More
									</Button> */}

									<Link
										to={""}
										className="block md:hidden text-indigo-400 text-sm"
									>
										Discover More
									</Link>

									{/* <Link
										to={""}
									>
										<Button
											type="link"
											className="text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap"
										>
											View All Activity <ArrowRightOutlined />
										</Button>
									</Link> */}
								</div>
								<div className="p-4 md:p-6">
									<div className="flex flex-col lg:flex-row lg:items-center mb-6">
										<div className="relative md:mr-4 mb-2 flex-grow md:flex-grow-0 w-full lg:w-64">
											<Input
												prefix={<FiSearch className="text-gray-400" />}
												type="text"
												placeholder="Search venues..."
												className="w-full"
												value={searchQuery}
												onChange={(e) => setSearchQuery(e.target.value)}
											/>
										</div>
										<ScrollArea className="w-full mt-2.5 lg:mt-4 whitespace-nowrap pb-4 overflow-x-auto">
											<div className="flex  space-x-2 md:mb-2">
												{categories.map((category) => (
													<div
														key={category}
														onClick={() => setVenueFilter(category)}
														className={` ${
															venueFilter === category
																? "text-white bg-indigo-600 border-indigo-400 hover:bg-indigo-400"
																: "text-gray-800 border-gray-200 hover:text-indigo-400 hover:border-indigo-400 bg-white"
														} whitespace-nowrap cursor-pointer border-2 py-1 px-3 rounded-md text-sm`}
													>
														{category === "all" ? "All Categories" : category}
													</div>
												))}
											</div>

											<ScrollBar orientation="horizontal" />
										</ScrollArea>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{filteredVenues.length > 0 ? (
											filteredVenues.map((venue) => (
												<div
													key={venue.id}
													className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
												>
													<Link to={`/spot-details/${venue.id}`}>
														<div className="h-50 overflow-hidden relative cursor-pointer">
															<img
																src={venue.image}
																alt={venue.name}
																className="w-full h-full object-cover object-top transition-transform hover:scale-110"
															/>
															<div className="absolute top-4 left-4">
																<Badge
																	className={`${
																		venue.isOpen ? "bg-green-500" : "bg-red-500"
																	} text-white`}
																>
																	{venue.isOpen ? "Open Now" : "Closed"}
																</Badge>
															</div>
															<div className="absolute top-4 right-4">
																<Badge className="flex bg-white items-center text-black">
																	<FaStar className="text-yellow-400" />
																	{venue.rating}
																</Badge>
															</div>
														</div>
													</Link>
													<div className="p-4">
														<div className="hidden md:flex justify-between items-start">
															<div className="mt-1">
																<h4 className="font-medium line-clamp-1 text-gray-900">
																	{venue.name}
																</h4>
																<Badge className="mt-1 bg-purple-400 text-white">
																	{venue.category}
																</Badge>
															</div>
															<Dropdown
																trigger={["click"]}
																overlay={
																	<Menu>
																		<Menu.Item
																			onClick={() =>
																				navigation(`/spot-details/${venue.id}`)
																			}
																			key="view"
																			icon={<FaEye className="mr-2" />}
																		>
																			View Details
																		</Menu.Item>
																		<Menu.Item
																			key="events"
																			icon={<FaCalendarAlt className="mr-2" />}
																		>
																			View Events
																		</Menu.Item>
																		<Menu.Item
																			key="unfollow"
																			icon={<FaHeartBroken className="mr-2" />}
																			danger
																		>
																			Unfollow
																		</Menu.Item>
																	</Menu>
																}
																placement="bottomRight"
															>
																<Button
																	type="text"
																	icon={<FaEllipsisH />}
																	className="whitespace-nowrap"
																/>
															</Dropdown>
														</div>

														<div className="flex md:hidden justify-between items-start">
															<div className="mt-1">
																<h4 className="font-medium line-clamp-1 text-gray-900">
																	{venue.name}
																</h4>
																<Badge className="mt-1 bg-purple-400 text-white">
																	{venue.category}
																</Badge>
															</div>
															<Dropdown
																overlay={
																	<Menu>
																		<Menu.Item
																			onClick={() =>
																				navigation(`/spot-details/${venue.id}`)
																			}
																			key="view"
																			icon={<FaEye className="mr-2" />}
																		>
																			View Details
																		</Menu.Item>
																		<Menu.Item
																			key="events"
																			icon={<FaCalendarAlt className="mr-2" />}
																		>
																			View Events
																		</Menu.Item>
																		<Menu.Item
																			key="unfollow"
																			icon={<FaHeartBroken className="mr-2" />}
																			danger
																		>
																			Unfollow
																		</Menu.Item>
																	</Menu>
																}
																placement="bottomRight"
															>
																<Button
																	type="text"
																	icon={<IoEllipsisVerticalSharp />}
																	className="whitespace-nowrap"
																/>
															</Dropdown>
														</div>
														<div className="mt-2 text-sm flex items-center line-clamp-1 text-gray-500">
															<EnvironmentOutlined className="mr-2" />
															{venue.location}
														</div>
														<div className="mt-2 text-sm flex items-center line-clamp-1 text-gray-500">
															<FaCalendarDay className="mr-2" />
															{venue.latestEvent}
														</div>
													</div>
												</div>
											))
										) : (
											<div className="col-span-2 py-8 text-center text-md lg:text-2xl text-black font-semibold">
												<img src={noproduct} alt="no product" />
												<span>No venues match your search criteria.</span>
											</div>
										)}
									</div>
								</div>
							</div>
							{/* Event Tickets Section */}
							<div className="bg-white rounded-xl shadow-md overflow-hidden">
								<div className="px-4 md:px-6 py-4 border-b border-gray-100">
									<h3 className="text-xl font-bold text-gray-900">My Events</h3>
								</div>
								<Tabs defaultActiveKey="upcoming">
									<p />
									<TabPane tab="Upcoming Events" key="upcoming">
										{upcomingEvents.length > 0 ? (
											<div className="space-y-4 px-4 md:px-6 pb-6">
												{upcomingEvents.map((event) => (
													<div
														key={event.id}
														className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
													>
														<div className="flex flex-col md:flex-row">
															<Link
																to={`/event-details/${event.id}`}
																className="md:w-1/3 h-48 md:h-auto overflow-hidden"
															>
																<img
																	src={event.image}
																	alt={event.name}
																	className="w-full h-full object-cover object-top"
																/>
															</Link>
															<div className="py-4 px-2.5 md:p-6 flex-1 flex flex-col justify-between">
																<div>
																	<h4 className="text-lg font-medium text-gray-900">
																		{event.name}
																	</h4>
																	<div className="text-sm flex items-center text-gray-500 mt-1">
																		<FaCalendarAlt className="mr-2" />
																		{event.date}
																	</div>
																	<div className="text-sm flex items-center text-gray-500 mt-1">
																		<EnvironmentOutlined className="mr-2" />
																		{event.venue}
																	</div>
																</div>
																<div className="mt-4 flex flex-col md:flex-row gap-2">
																	<Button
																		type="default"
																		icon={<FaTicketAlt className="mr-2" />}
																		className="!rounded-button whitespace-nowrap"
																	>
																		View Ticket
																	</Button>
																	<Button
																		type="default"
																		icon={<DownloadOutlined />}
																		className="!rounded-button whitespace-nowrap"
																	>
																		Download
																	</Button>
																	<Button
																		type="primary"
																		className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap"
																	>
																		<FaQrcode className="fas fa-qrcode mr-2" />
																		Show QR Code
																	</Button>
																</div>
															</div>
														</div>
													</div>
												))}
											</div>
										) : (
											<div className="py-8 text-center text-gray-500">
												You don't have any upcoming events.
											</div>
										)}
									</TabPane>
									<TabPane tab="Past Events" key="past">
										{pastEvents.length > 0 ? (
											<div className="space-y-4 px-4 md:px-6 pb-6">
												{pastEvents.map((event) => (
													<div
														key={event.id}
														className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
													>
														<div className="flex flex-col md:flex-row">
															<div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
																<img
																	src={event.image}
																	alt={event.name}
																	className="w-full h-full object-cover object-top"
																/>
															</div>
															<div className="py-4 px-2.5 md:p-6 flex-1 flex flex-col justify-between">
																<div>
																	<div className="flex justify-between items-start">
																		<h4 className="text-lg font-medium text-gray-900">
																			{event.name}
																		</h4>
																		{event.rated && (
																			<div className="flex items-center">
																				{[...Array(5)].map((_, i) => (
																					<FaStar
																						key={i}
																						className={`fas fa-star text-sm ${
																							i < event.rating
																								? "text-yellow-400"
																								: "text-gray-300"
																						}`}
																					/>
																				))}
																			</div>
																		)}
																	</div>
																	<div className="text-sm flex items-center text-gray-500 mt-1">
																		<FaCalendarAlt className="mr-2" />
																		{event.date}
																	</div>
																	<div className="text-sm flex items-center text-gray-500 mt-1">
																		<EnvironmentOutlined className="mr-2" />
																		{event.venue}
																	</div>
																</div>
																<div className="mt-4 flex flex-col md:flex-row gap-2">
																	<Button
																		type="default"
																		icon={<FaTicketAlt className="mr-2" />}
																		className="!rounded-button whitespace-nowrap"
																	>
																		View Ticket
																	</Button>
																	{!event.rated && (
																		<Button
																			type="primary"
																			icon={<StarOutlined />}
																			className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap"
																			onClick={() => {
																				setSelectedEvent(event);
																				setShowRateEvent(true);
																			}}
																		>
																			Rate Event
																		</Button>
																	)}
																</div>
															</div>
														</div>
													</div>
												))}
											</div>
										) : (
											<div className="py-8 text-center text-gray-500">
												You don't have any past events.
											</div>
										)}
									</TabPane>
								</Tabs>
							</div>
						</div>
					</div>
				</div>
			</main>
			{/* Footer */}
			<Footer />
			{/* Account Settings Modal */}
			<Modal
				title={
					<div className="flex items-center">
						<UserOutlined className="text-indigo-600 mr-2" />
						<span>Account Settings</span>
					</div>
				}
				open={showAccountSettings}
				onCancel={handleAccountSettingsCancel}
				footer={null}
				width={640}
				className="top-8"
			>
				<Form
					form={form}
					layout="vertical"
					initialValues={{
						firstName: user.name.split(" ")[0],
						lastName: user.name.split(" ")[1],
						email: user.email,
						phone: user.phone,
						location: user.location,
						language: "english",
						timezone: "PT",
						currency: "USD",
					}}
					onFinish={handleAccountSettingsSubmit}
					className="mt-4"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Form.Item
							name="firstName"
							label="First Name"
							rules={[
								{ required: true, message: "Please enter your first name" },
							]}
						>
							<Input placeholder="Enter your first name" />
						</Form.Item>
						<Form.Item
							name="lastName"
							label="Last Name"
							rules={[
								{ required: true, message: "Please enter your last name" },
							]}
						>
							<Input placeholder="Enter your last name" />
						</Form.Item>
					</div>
					<Form.Item
						name="email"
						label="Email Address"
						rules={[
							{ required: true, message: "Please enter your email" },
							{ type: "email", message: "Please enter a valid email" },
						]}
					>
						<Input placeholder="Enter your email address" />
					</Form.Item>
					<Form.Item
						name="phone"
						label="Phone Number"
						rules={[
							{ required: true, message: "Please enter your phone number" },
						]}
					>
						<Input placeholder="Enter your phone number" />
					</Form.Item>
					<Form.Item
						name="location"
						label="Location"
						rules={[{ required: true, message: "Please enter your location" }]}
					>
						<Input placeholder="Enter your location" />
					</Form.Item>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Form.Item
							name="language"
							label="Language"
							rules={[
								{ required: true, message: "Please select your language" },
							]}
						>
							<Select>
								<Select.Option value="english">English</Select.Option>
								<Select.Option value="spanish">Spanish</Select.Option>
								<Select.Option value="french">French</Select.Option>
								<Select.Option value="german">German</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item
							name="timezone"
							label="Time Zone"
							rules={[
								{ required: true, message: "Please select your timezone" },
							]}
						>
							<Select>
								<Select.Option value="PT">Pacific Time (PT)</Select.Option>
								<Select.Option value="MT">Mountain Time (MT)</Select.Option>
								<Select.Option value="CT">Central Time (CT)</Select.Option>
								<Select.Option value="ET">Eastern Time (ET)</Select.Option>
							</Select>
						</Form.Item>
					</div>
					<Form.Item
						name="currency"
						label="Preferred Currency"
						rules={[
							{
								required: true,
								message: "Please select your preferred currency",
							},
						]}
					>
						<Select>
							<Select.Option value="USD">US Dollar (USD)</Select.Option>
							<Select.Option value="EUR">Euro (EUR)</Select.Option>
							<Select.Option value="GBP">British Pound (GBP)</Select.Option>
							<Select.Option value="JPY">Japanese Yen (JPY)</Select.Option>
						</Select>
					</Form.Item>
					<Divider />
					<div className="flex justify-end space-x-4">
						<Button
							onClick={handleAccountSettingsCancel}
							className="!rounded-button whitespace-nowrap"
						>
							Cancel
						</Button>
						<Button
							type="primary"
							htmlType="submit"
							className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap"
						>
							Save Changes
						</Button>
					</div>
				</Form>
			</Modal>
			{/* Rate Event Modal */}
			<Modal
				title={
					<div className="flex items-center">
						<StarOutlined className="text-yellow-400 mr-2" />
						<span>Rate Your Experience</span>
					</div>
				}
				open={showRateEvent}
				onCancel={() => {
					setShowRateEvent(false);
					rateForm.resetFields();
				}}
				footer={null}
				width={640}
				className="top-8"
			>
				{selectedEvent && (
					<div className="mb-6 flex items-center space-x-4">
						<div className="w-20 h-20 rounded-lg overflow-hidden">
							<img
								src={selectedEvent.image}
								alt={selectedEvent.name}
								className="w-full h-full object-cover"
							/>
						</div>
						<div>
							<h3 className="text-lg font-medium text-gray-900">
								{selectedEvent.name}
							</h3>
							<p className="text-sm text-gray-500">
								<FaCalendarAlt className="fas fa-calendar-alt mr-2" />
								{selectedEvent.date}
							</p>
							<p className="text-sm text-gray-500">
								<FaMapMarkedAlt className="fas fa-map-marker-alt mr-2" />
								{selectedEvent.venue}
							</p>
						</div>
					</div>
				)}
				<Form
					form={rateForm}
					layout="vertical"
					onFinish={(values) => {
						console.log("Rating submitted:", values);
						setShowRateEvent(false);
						rateForm.resetFields();
					}}
				>
					<Form.Item
						name="rating"
						label="Overall Rating"
						rules={[{ required: true, message: "Please rate your experience" }]}
					>
						<Rate className="text-yellow-400" />
					</Form.Item>
					<Form.Item
						name="experience"
						label="How was your experience?"
						rules={[
							{ required: true, message: "Please share your experience" },
							{ max: 500, message: "Maximum 500 characters allowed" },
						]}
					>
						<Input.TextArea
							placeholder="Share your thoughts about the event..."
							rows={4}
							maxLength={500}
							showCount
						/>
					</Form.Item>
					<Form.Item name="highlights" label="What were the highlights?">
						<Select
							mode="multiple"
							placeholder="Select highlights"
							className="w-full"
						>
							<Select.Option value="atmosphere">Great Atmosphere</Select.Option>
							<Select.Option value="service">Excellent Service</Select.Option>
							<Select.Option value="value">Good Value</Select.Option>
							<Select.Option value="music">Amazing Music</Select.Option>
							<Select.Option value="food">Delicious Food/Drinks</Select.Option>
							<Select.Option value="crowd">Fun Crowd</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name="recommend" label="Would you recommend this venue?">
						<Radio.Group>
							<Radio value="yes">Yes, definitely!</Radio>
							<Radio value="maybe">Maybe</Radio>
							<Radio value="no">No</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						name="photos"
						label="Share Photos"
						extra="Upload photos from the event (optional)"
					>
						<Upload.Dragger
							multiple
							listType="picture-card"
							showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
							beforeUpload={() => false}
							className="w-full"
							style={{ marginBottom: "20px" }}
						>
							<div className="text-gray-500 flex flex-col gap-3 items-center">
								<FaCloudUploadAlt className="text-2xl mb-2" />
								Click or drag photos here
							</div>
						</Upload.Dragger>
					</Form.Item>
					<Divider />
					<div className="flex justify-end space-x-4">
						<Button
							onClick={() => {
								setShowRateEvent(false);
								rateForm.resetFields();
							}}
							className="!rounded-button whitespace-nowrap"
						>
							Cancel
						</Button>
						<Button
							type="primary"
							htmlType="submit"
							className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap"
						>
							Submit Review
						</Button>
					</div>
				</Form>
			</Modal>
			{/* Privacy Settings Modal */}
			<Modal
				title={
					<div className="flex items-center">
						<LockOutlined className="text-red-600 mr-2" />
						<span>Privacy Settings</span>
					</div>
				}
				open={showPrivacySettings}
				onCancel={() => {
					setShowPrivacySettings(false);
					privacyForm.resetFields();
				}}
				footer={null}
				width={640}
				className="top-8"
			>
				<Form
					form={privacyForm}
					layout="vertical"
					initialValues={{
						profileVisibility: "public",
						activitySharing: true,
						eventHistory: "friends",
						locationSharing: false,
						emailNotifications: true,
						pushNotifications: true,
						smsNotifications: false,
						marketingEmails: false,
						dataCollection: true,
						thirdPartySharing: false,
					}}
					onFinish={(values) => {
						console.log("Privacy settings updated:", values);
						setShowPrivacySettings(false);
					}}
				>
					<div className="space-y-6">
						<div className="bg-gray-50 p-4 rounded-lg">
							<h4 className="font-medium text-gray-900 mb-4">
								Profile Privacy
							</h4>
							<Form.Item name="profileVisibility" label="Profile Visibility">
								<Select>
									<Select.Option value="public">
										Public - Anyone can view
									</Select.Option>
									<Select.Option value="friends">Friends Only</Select.Option>
									<Select.Option value="private">
										Private - Only you
									</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item name="activitySharing" valuePropName="checked">
								<Switch
									checkedChildren="On"
									unCheckedChildren="Off"
									className="mr-2"
								/>
								<span>Share my activity with followers</span>
							</Form.Item>
							<Form.Item name="eventHistory" label="Event History Visibility">
								<Select>
									<Select.Option value="public">
										Visible to Everyone
									</Select.Option>
									<Select.Option value="friends">Friends Only</Select.Option>
									<Select.Option value="private">Keep Private</Select.Option>
								</Select>
							</Form.Item>
						</div>
						<div className="bg-gray-50 p-4 rounded-lg">
							<h4 className="font-medium text-gray-900 mb-4">
								Location & Data
							</h4>
							<Form.Item name="locationSharing" valuePropName="checked">
								<Switch
									checkedChildren="On"
									unCheckedChildren="Off"
									className="mr-2"
								/>
								<span>Share my location with venues</span>
							</Form.Item>
							<Form.Item name="dataCollection" valuePropName="checked">
								<Switch
									checkedChildren="On"
									unCheckedChildren="Off"
									className="mr-2"
								/>
								<span>
									Allow data collection for personalized recommendations
								</span>
							</Form.Item>
							<Form.Item name="thirdPartySharing" valuePropName="checked">
								<Switch
									checkedChildren="On"
									unCheckedChildren="Off"
									className="mr-2"
								/>
								<span>Share data with trusted partners</span>
							</Form.Item>
						</div>
						<div className="bg-gray-50 p-4 rounded-lg">
							<h4 className="font-medium text-gray-900 mb-4">
								Communication Preferences
							</h4>
							<Form.Item name="emailNotifications" valuePropName="checked">
								<Switch
									checkedChildren="On"
									unCheckedChildren="Off"
									className="mr-2"
								/>
								<span>Email notifications for events and updates</span>
							</Form.Item>
							<Form.Item name="pushNotifications" valuePropName="checked">
								<Switch
									checkedChildren="On"
									unCheckedChildren="Off"
									className="mr-2"
								/>
								<span>Push notifications on mobile</span>
							</Form.Item>
							<Form.Item name="smsNotifications" valuePropName="checked">
								<Switch
									checkedChildren="On"
									unCheckedChildren="Off"
									className="mr-2"
								/>
								<span>SMS notifications for important updates</span>
							</Form.Item>
							<Form.Item name="marketingEmails" valuePropName="checked">
								<Switch
									checkedChildren="On"
									unCheckedChildren="Off"
									className="mr-2"
								/>
								<span>Receive marketing emails and promotions</span>
							</Form.Item>
						</div>
					</div>
					<Divider />
					<div className="flex justify-between items-center">
						<Button
							type="text"
							danger
							className="!rounded-button whitespace-nowrap"
						>
							Delete Account
						</Button>
						<div className="flex space-x-4">
							<Button
								onClick={() => {
									setShowPrivacySettings(false);
									privacyForm.resetFields();
								}}
								className="!rounded-button whitespace-nowrap"
							>
								Cancel
							</Button>
							<Button
								type="primary"
								htmlType="submit"
								className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap"
							>
								Save Changes
							</Button>
						</div>
					</div>
				</Form>
			</Modal>

			{/* Payment Methods Modal */}
			<Modal
				title={
					<div className="flex items-center">
						<CreditCardOutlined className="text-green-600 mr-2" />
						<span>Payment Methods</span>
					</div>
				}
				open={showPaymentMethods}
				onCancel={() => {
					setShowPaymentMethods(false);
					paymentForm.resetFields();
				}}
				footer={null}
				width={640}
				className="top-8"
			>
				<div className="mb-6">
					<h4 className="font-medium text-gray-900 mb-4">
						Saved Payment Methods
					</h4>
					<div className="space-y-4">
						<div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
							<div className="flex items-center">
								<FaCcVisa className="text-2xl text-blue-600 mr-4" />
								<div>
									<div className="font-medium">Visa ending in 4242</div>
									<div className="text-sm text-gray-500">Expires 12/25</div>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<Tag color="blue">Default</Tag>
								<Dropdown
									overlay={
										<Menu>
											<Menu.Item
												key={"remove"}
												icon={<FaTrash className="mr-1" />}
												danger
											>
												Remove
											</Menu.Item>
										</Menu>
									}
								>
									<Button
										type="text"
										icon={<FaEllipsisH />}
										className="!rounded-button"
									/>
								</Dropdown>
							</div>
						</div>

						<div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
							<div className="flex items-center">
								<FaCcMastercard className="fab fa-cc-mastercard text-2xl text-red-600 mr-4" />
								<div>
									<div className="font-medium">Mastercard ending in 8888</div>
									<div className="text-sm text-gray-500">Expires 09/24</div>
								</div>
							</div>
							<Button
								type="text"
								icon={<EllipsisOutlined />}
								className="!rounded-button"
							/>
						</div>
					</div>
				</div>

				<Form
					form={paymentForm}
					layout="vertical"
					onFinish={(values) => {
						console.log("Payment method added:", values);
						setShowPaymentMethods(false);
					}}
				>
					<h4 className="font-medium text-gray-900 mb-4">
						Add New Payment Method
					</h4>
					<div className="bg-gray-50 p-4 rounded-lg">
						<Form.Item
							name="cardNumber"
							label="Card Number"
							rules={[{ required: true, message: "Please enter card number" }]}
						>
							<Input placeholder="1234 5678 9012 3456" maxLength={19} />
						</Form.Item>

						<div className="grid grid-cols-2 gap-4">
							<Form.Item
								name="expiryDate"
								label="Expiry Date"
								rules={[
									{ required: true, message: "Please enter expiry date" },
								]}
							>
								<Input placeholder="MM/YY" maxLength={5} />
							</Form.Item>

							<Form.Item
								name="cvv"
								label="CVV"
								rules={[{ required: true, message: "Please enter CVV" }]}
							>
								<Input placeholder="123" maxLength={4} />
							</Form.Item>
						</div>

						<Form.Item
							name="cardholderName"
							label="Cardholder Name"
							rules={[
								{ required: true, message: "Please enter cardholder name" },
							]}
						>
							<Input placeholder="Enter name as shown on card" />
						</Form.Item>

						<Form.Item
							name="billingAddress"
							label="Billing Address"
							rules={[
								{ required: true, message: "Please enter billing address" },
							]}
						>
							<Input.TextArea
								placeholder="Enter your billing address"
								rows={3}
							/>
						</Form.Item>

						<Form.Item name="setDefault" valuePropName="checked">
							<Switch
								checkedChildren="Yes"
								unCheckedChildren="No"
								className="mr-2"
							/>
							<span>Set as default payment method</span>
						</Form.Item>
					</div>

					<div className="mt-6 bg-gray-50 p-4 rounded-lg">
						<h4 className="font-medium text-gray-900 mb-4">
							Payment Preferences
						</h4>

						<Form.Item name="autoPayment" valuePropName="checked">
							<Switch
								checkedChildren="On"
								unCheckedChildren="Off"
								className="mr-2"
							/>
							<span>Enable automatic payments</span>
						</Form.Item>

						<Form.Item name="savePaymentInfo" valuePropName="checked">
							<Switch
								checkedChildren="Yes"
								unCheckedChildren="No"
								className="mr-2"
							/>
							<span>Save payment information for future transactions</span>
						</Form.Item>
					</div>

					<Divider />

					<div className="flex justify-end space-x-4">
						<Button
							onClick={() => {
								setShowPaymentMethods(false);
								paymentForm.resetFields();
							}}
							className="!rounded-button whitespace-nowrap"
						>
							Cancel
						</Button>
						<Button
							type="primary"
							htmlType="submit"
							className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap"
						>
							Add Payment Method
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};
export default Profile;
