import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import {
	Button,
	Input,
	Rate,
	Tabs,
	Tag,
	Avatar,
	Skeleton,
	Dropdown,
} from "antd";
import {
	SearchOutlined,
	EnvironmentOutlined,
	UserOutlined,
	DownOutlined,
	StarFilled,
	ClockCircleOutlined,
	HeartOutlined,
	ShareAltOutlined,
	BellOutlined,
	FilterOutlined,
	RightOutlined,
	CalendarOutlined,
	DollarOutlined,
} from "@ant-design/icons";
import * as echarts from "echarts";
import img from "@/assets/spot/1.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const { TabPane } = Tabs;

const App: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState<string>("spots");
	const [loading, setLoading] = useState<boolean>(true);
	const [currentLocation, setCurrentLocation] = useState<string>("New York");
	const [searchValue, setSearchValue] = useState<string>("");

	useEffect(() => {
		// Simulate loading data
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!loading) {
			// Initialize rating chart
			const chartDom = document.getElementById("rating-chart");
			if (chartDom) {
				const myChart = echarts.init(chartDom);
				const option = {
					animation: false,
					radar: {
						indicator: [
							{ name: "Food", max: 5 },
							{ name: "Service", max: 5 },
							{ name: "Ambiance", max: 5 },
							{ name: "Value", max: 5 },
							{ name: "Cleanliness", max: 5 },
						],
						radius: 80,
						splitNumber: 5,
						axisName: {
							color: "#333",
							fontSize: 12,
						},
					},
					series: [
						{
							type: "radar",
							data: [
								{
									value: [4.8, 4.6, 4.9, 4.5, 4.7],
									name: "Ratings",
									areaStyle: {
										color: "rgba(88, 80, 236, 0.3)",
									},
									lineStyle: {
										color: "#5850EC",
									},
									itemStyle: {
										color: "#5850EC",
									},
								},
							],
						},
					],
				};
				myChart.setOption(option);
			}
		}
	}, [loading]);

	const locationMenu = {
		items: [
			{ key: "1", label: "New York" },
			{ key: "2", label: "Los Angeles" },
			{ key: "3", label: "Chicago" },
			{ key: "4", label: "Miami" },
			{ key: "5", label: "San Francisco" },
		],
		onClick: ({ key }: { key: string }) => {
			const city =
				locationMenu.items.find((item) => item.key === key)?.label || "";
			setCurrentLocation(city);
		},
	};

	const renderSkeleton = () => (
		<div className="space-y-6">
			<Skeleton active avatar paragraph={{ rows: 1 }} />
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<Skeleton.Image active className="w-full h-40" />
				<Skeleton.Image active className="w-full h-40" />
				<Skeleton.Image active className="w-full h-40 hidden md:block" />
				<Skeleton.Image active className="w-full h-40 hidden md:block" />
			</div>
			<Skeleton active paragraph={{ rows: 4 }} />
		</div>
	);

	const featuredSlides = [
		{
			id: 1,
			title: "Summer Music Festival",
			category: "Music",
			date: "June 28-30, 2025",
			imageUrl: img,
		},
		{
			id: 2,
			title: "Rooftop Cocktail Lounge",
			category: "Nightlife",
			time: "Open until 2 AM",
			imageUrl: img,
		},
		{
			id: 3,
			title: "Culinary Masterclass",
			category: "Food & Drink",
			date: "July 5, 2025",
			imageUrl: img,
		},
	];

	const trendingSpots = [
		{
			id: 1,
			title: "The Rooftop Garden",
			category: "Restaurant",
			rating: 4.8,
			tags: ["Outdoor", "Cocktails"],
			imageUrl: img,
		},
		{
			id: 2,
			title: "Neon Arcade Bar",
			category: "Entertainment",
			rating: 4.6,
			tags: ["Games", "Drinks"],
			imageUrl: img,
		},
		{
			id: 3,
			title: "Artisan Coffee House",
			category: "Cafe",
			rating: 4.9,
			tags: ["Coffee", "Pastries"],
			imageUrl: img,
		},
		{
			id: 4,
			title: "Urban Art Gallery",
			category: "Arts & Culture",
			rating: 4.7,
			tags: ["Exhibits", "Free Entry"],
			imageUrl: img,
		},
	];

	const upcomingEvents = [
		{
			id: 1,
			title: "Jazz in the Park",
			category: "Music",
			date: "June 30, 2025",
			time: "7:00 PM",
			tags: ["Outdoor", "Free"],
			imageUrl: img,
		},
		{
			id: 2,
			title: "Food Truck Festival",
			category: "Food & Drink",
			date: "July 3-4, 2025",
			time: "12:00 PM - 10:00 PM",
			tags: ["Family-Friendly", "Outdoor"],
			imageUrl: img,
		},
		{
			id: 3,
			title: "Tech Conference 2025",
			category: "Business",
			date: "July 7-9, 2025",
			time: "9:00 AM - 6:00 PM",
			tags: ["Networking", "Workshops"],
			imageUrl: img,
		},
		{
			id: 4,
			title: "Summer Night Market",
			category: "Shopping",
			date: "Every Friday in July",
			time: "6:00 PM - 11:00 PM",
			tags: ["Artisan", "Street Food"],
			imageUrl: img,
		},
	];

	const personalizedRecommendations = [
		{
			id: 1,
			title: "Immersive Art Experience",
			category: "Arts & Culture",
			rating: 4.9,
			tags: ["Interactive", "Indoor"],
			imageUrl: img,
		},
		{
			id: 2,
			title: "Craft Brewery Tour",
			category: "Food & Drink",
			rating: 4.7,
			tags: ["Tastings", "Tours"],
			imageUrl: img,
		},
		{
			id: 3,
			title: "Sunrise Yoga in the Park",
			category: "Fitness",
			date: "Every Saturday",
			time: "6:30 AM",
			tags: ["Outdoor", "Wellness"],
			imageUrl: img,
		},
		{
			id: 4,
			title: "Vintage Vinyl Record Store",
			category: "Shopping",
			rating: 4.8,
			tags: ["Music", "Collectibles"],
			imageUrl: img,
		},
	];

	const summerEvents = [
		{
			id: 1,
			title: "Beachside Movie Nights",
			category: "Entertainment",
			date: "Thursdays in July",
			imageUrl: img,
		},
		{
			id: 2,
			title: "Waterfront Concert Series",
			category: "Music",
			date: "Weekends in July",
			imageUrl: img,
		},
		{
			id: 3,
			title: "Farmers Market",
			category: "Food & Shopping",
			date: "Saturdays, 8AM-2PM",
			imageUrl: img,
		},
	];

	const rooftopBars = [
		{
			id: 1,
			title: "Skyline Lounge",
			category: "Rooftop Bar",
			rating: 4.7,
			imageUrl: img,
		},
		{
			id: 2,
			title: "Cloud 9 Terrace",
			category: "Rooftop Bar",
			rating: 4.8,
			imageUrl: img,
		},
		{
			id: 3,
			title: "The Summit",
			category: "Rooftop Restaurant",
			rating: 4.9,
			imageUrl: img,
		},
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
				<div className="container mx-auto px-4 py-3 flex items-center justify-between">
					<div className="flex items-center">
						<h1 className="text-2xl font-bold text-indigo-600 mr-6">Ventura</h1>
						<Dropdown menu={locationMenu} trigger={["click"]}>
							<Button
								className="flex items-center !rounded-button whitespace-nowrap"
								type="text"
							>
								<EnvironmentOutlined className="mr-1" />
								{currentLocation}
								<DownOutlined className="ml-1 text-xs" />
							</Button>
						</Dropdown>
					</div>
					<div className="flex items-center space-x-4">
						<Button
							type="text"
							icon={<BellOutlined />}
							className="!rounded-button whitespace-nowrap cursor-pointer"
						/>
						<Avatar
							icon={<UserOutlined />}
							className="bg-indigo-500 cursor-pointer"
						/>
					</div>
				</div>
				<div className="container mx-auto px-4 py-3">
					<Input
						size="large"
						placeholder="Search for events, venues, or categories..."
						prefix={<SearchOutlined className="text-gray-400" />}
						className="rounded-full"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</div>
				<div className="container mx-auto px-4 pb-3 flex justify-between items-center">
					<div className="flex space-x-2">
						<Button
							type={activeCategory === "spots" ? "primary" : "default"}
							onClick={() => setActiveCategory("spots")}
							className="!rounded-button whitespace-nowrap cursor-pointer"
						>
							Spots
						</Button>
						<Button
							type={activeCategory === "events" ? "primary" : "default"}
							onClick={() => setActiveCategory("events")}
							className="!rounded-button whitespace-nowrap cursor-pointer"
						>
							Events
						</Button>
					</div>
					<Button
						icon={<FilterOutlined />}
						className="!rounded-button whitespace-nowrap cursor-pointer"
					>
						Filters
					</Button>
				</div>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-4 pt-44 pb-12">
				{loading ? (
					renderSkeleton()
				) : (
					<>
						{/* Filter Pills */}
						<div className="mb-8 overflow-x-auto hide-scrollbar">
							<div className="flex space-x-2 pb-2">
								<Tag.CheckableTag
									checked
									className="!rounded-button whitespace-nowrap cursor-pointer px-3 py-1 border border-indigo-500 bg-indigo-50 text-indigo-700"
								>
									All
								</Tag.CheckableTag>
								<Tag.CheckableTag className="!rounded-button whitespace-nowrap cursor-pointer px-3 py-1 border border-gray-300">
									<EnvironmentOutlined className="mr-1" />
									Nearby
								</Tag.CheckableTag>
								<Tag.CheckableTag className="!rounded-button whitespace-nowrap cursor-pointer px-3 py-1 border border-gray-300">
									<CalendarOutlined className="mr-1" />
									This Weekend
								</Tag.CheckableTag>
								<Tag.CheckableTag className="!rounded-button whitespace-nowrap cursor-pointer px-3 py-1 border border-gray-300">
									<DollarOutlined className="mr-1" />
									Free
								</Tag.CheckableTag>
								<Tag.CheckableTag className="!rounded-button whitespace-nowrap cursor-pointer px-3 py-1 border border-gray-300">
									Outdoor
								</Tag.CheckableTag>
								<Tag.CheckableTag className="!rounded-button whitespace-nowrap cursor-pointer px-3 py-1 border border-gray-300">
									Family-Friendly
								</Tag.CheckableTag>
							</div>
						</div>

						{/* Featured Carousel */}
						<div className="mb-12">
							<Swiper
								modules={[Pagination, Autoplay, Navigation]}
								pagination={{ clickable: true }}
								autoplay={{ delay: 5000 }}
								navigation
								loop
								className="rounded-xl overflow-hidden h-[400px]"
							>
								{featuredSlides.map((slide) => (
									<SwiperSlide key={slide.id}>
										<div className="relative h-full">
											<img
												src={slide.imageUrl}
												alt={slide.title}
												className="w-full h-full object-cover object-top"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
												<span className="text-white/80 text-sm font-medium mb-2">
													{slide.category}
												</span>
												<h2 className="text-white text-3xl font-bold mb-2">
													{slide.title}
												</h2>
												<p className="text-white/90 mb-4">
													{slide.date || slide.time}
												</p>
												<div className="flex space-x-3">
													<Button
														type="primary"
														size="large"
														className="!rounded-button whitespace-nowrap cursor-pointer"
													>
														Learn More
													</Button>
													<Button
														icon={<HeartOutlined />}
														size="large"
														className="!rounded-button whitespace-nowrap cursor-pointer"
													>
														Save
													</Button>
												</div>
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>

						{/* Trending Now Section */}
						<div className="mb-12">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-2xl font-bold">Trending Now</h2>
								<Button
									type="link"
									className="flex items-center !rounded-button whitespace-nowrap cursor-pointer"
								>
									See All <RightOutlined className="ml-1" />
								</Button>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
								{trendingSpots.map((spot) => (
									<div
										key={spot.id}
										className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
									>
										<div className="h-48 overflow-hidden">
											<img
												src={spot.imageUrl}
												alt={spot.title}
												className="w-full h-full object-cover object-top"
											/>
										</div>
										<div className="p-4">
											<div className="flex justify-between items-start">
												<div>
													<span className="text-xs font-medium text-indigo-600">
														{spot.category}
													</span>
													<h3 className="font-semibold text-lg mt-1">
														{spot.title}
													</h3>
												</div>
												<div className="flex items-center">
													<StarFilled className="text-yellow-400 mr-1" />
													<span className="font-medium">{spot.rating}</span>
												</div>
											</div>
											<div className="mt-3 flex flex-wrap gap-2">
												{spot.tags.map((tag, index) => (
													<span
														key={index}
														className="text-xs bg-gray-100 px-2 py-1 rounded-full"
													>
														{tag}
													</span>
												))}
											</div>
											<div className="mt-4 flex justify-between">
												<Button
													type="text"
													icon={<HeartOutlined />}
													className="!rounded-button whitespace-nowrap cursor-pointer"
												/>
												<Button
													type="text"
													icon={<ShareAltOutlined />}
													className="!rounded-button whitespace-nowrap cursor-pointer"
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Must-Visit Spot Feature */}
						<div className="mb-12 bg-white rounded-xl shadow-lg overflow-hidden">
							<div className="grid md:grid-cols-2">
								<div className="h-full">
									<img
										src={img}
										alt="The Grand Bistro"
										className="w-full h-full object-cover object-top"
									/>
								</div>
								<div className="p-8">
									<div className="flex items-start justify-between">
										<div>
											<span className="text-indigo-600 font-medium">
												Must-Visit Spot
											</span>
											<h2 className="text-3xl font-bold mt-2">
												The Grand Bistro
											</h2>
											<div className="flex items-center mt-2">
												<Rate
													disabled
													defaultValue={5}
													className="text-yellow-400 text-sm"
												/>
												<span className="ml-2 text-gray-500">
													(328 reviews)
												</span>
											</div>
										</div>
										<Button
											icon={<HeartOutlined />}
											shape="circle"
											size="large"
											className="!rounded-button whitespace-nowrap cursor-pointer"
										/>
									</div>

									<div className="mt-6">
										<div className="bg-gray-50 p-4 rounded-lg italic text-gray-700 mb-6">
											"The best culinary experience I've had in years. Chef
											Isabella's tasting menu is a journey through flavors that
											will leave you speechless."
											<div className="mt-2 text-sm text-gray-500 not-italic">
												— Michael T., Food Critic
											</div>
										</div>

										<div className="mb-6">
											<h3 className="font-semibold mb-3">Why it's special:</h3>
											<div className="grid grid-cols-2 gap-4">
												<div className="flex items-center">
													<Avatar src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20chef%20in%20white%20uniform%2C%20confident%20expression%2C%20clean%20studio%20background%2C%20professional%20portrait%20photography%2C%20neutral%20lighting%2C%20sophisticated%20look%2C%20high-end%20restaurant%20staff&width=100&height=100&seq=23&orientation=squarish" />
													<div className="ml-3">
														<div className="font-medium">Chef Isabella</div>
														<div className="text-sm text-gray-500">
															Michelin-starred
														</div>
													</div>
												</div>
												<div className="flex items-center">
													<div id="rating-chart" className="w-20 h-20"></div>
													<div className="ml-2">
														<div className="font-medium">Exceptional</div>
														<div className="text-sm text-gray-500">Ratings</div>
													</div>
												</div>
											</div>
										</div>

										<Button
											type="primary"
											size="large"
											className="!rounded-button whitespace-nowrap cursor-pointer"
										>
											Reserve a Table
										</Button>
									</div>
								</div>
							</div>
						</div>

						{/* Upcoming Events */}
						<div className="mb-12">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-2xl font-bold">Upcoming Events Near You</h2>
								<Button
									type="link"
									className="flex items-center !rounded-button whitespace-nowrap cursor-pointer"
								>
									See All <RightOutlined className="ml-1" />
								</Button>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
								{upcomingEvents.map((event) => (
									<div
										key={event.id}
										className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
									>
										<div className="h-48 overflow-hidden">
											<img
												src={event.imageUrl}
												alt={event.title}
												className="w-full h-full object-cover object-top"
											/>
										</div>
										<div className="p-4">
											<div>
												<span className="text-xs font-medium text-indigo-600">
													{event.category}
												</span>
												<h3 className="font-semibold text-lg mt-1">
													{event.title}
												</h3>
											</div>
											<div className="mt-2 flex items-center text-gray-600">
												<CalendarOutlined className="mr-1" />
												<span className="text-sm">{event.date}</span>
											</div>
											<div className="mt-1 flex items-center text-gray-600">
												<ClockCircleOutlined className="mr-1" />
												<span className="text-sm">{event.time}</span>
											</div>
											<div className="mt-3 flex flex-wrap gap-2">
												{event.tags.map((tag, index) => (
													<span
														key={index}
														className="text-xs bg-gray-100 px-2 py-1 rounded-full"
													>
														{tag}
													</span>
												))}
											</div>
											<div className="mt-4">
												<Button
													type="primary"
													block
													className="!rounded-button whitespace-nowrap cursor-pointer"
												>
													RSVP
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Personalized Recommendations */}
						<div className="mb-12 bg-indigo-50 p-6 rounded-xl">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-2xl font-bold">Because You Liked...</h2>
								<Button
									type="text"
									className="!rounded-button whitespace-nowrap cursor-pointer"
								>
									Refresh
								</Button>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
								{personalizedRecommendations.map((item) => (
									<div
										key={item.id}
										className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
									>
										<div className="h-48 overflow-hidden">
											<img
												src={item.imageUrl}
												alt={item.title}
												className="w-full h-full object-cover object-top"
											/>
										</div>
										<div className="p-4">
											<div className="flex justify-between items-start">
												<div>
													<span className="text-xs font-medium text-indigo-600">
														{item.category}
													</span>
													<h3 className="font-semibold text-lg mt-1">
														{item.title}
													</h3>
												</div>
												{item.rating && (
													<div className="flex items-center">
														<StarFilled className="text-yellow-400 mr-1" />
														<span className="font-medium">{item.rating}</span>
													</div>
												)}
											</div>
											{item.date && (
												<div className="mt-2 flex items-center text-gray-600">
													<CalendarOutlined className="mr-1" />
													<span className="text-sm">{item.date}</span>
												</div>
											)}
											{item.time && (
												<div className="mt-1 flex items-center text-gray-600">
													<ClockCircleOutlined className="mr-1" />
													<span className="text-sm">{item.time}</span>
												</div>
											)}
											<div className="mt-3 flex flex-wrap gap-2">
												{item.tags.map((tag, index) => (
													<span
														key={index}
														className="text-xs bg-gray-100 px-2 py-1 rounded-full"
													>
														{tag}
													</span>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Location-Based Modules */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
							{/* Summer Events */}
							<div>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-xl font-bold">Summer Events</h2>
									<Button
										type="link"
										className="flex items-center !rounded-button whitespace-nowrap cursor-pointer"
									>
										See All <RightOutlined className="ml-1" />
									</Button>
								</div>
								<div className="space-y-4">
									{summerEvents.map((event) => (
										<div
											key={event.id}
											className="bg-white rounded-lg shadow-md overflow-hidden flex cursor-pointer"
										>
											<div className="w-1/3 overflow-hidden">
												<img
													src={event.imageUrl}
													alt={event.title}
													className="w-full h-full object-cover object-top"
												/>
											</div>
											<div className="w-2/3 p-4">
												<span className="text-xs font-medium text-indigo-600">
													{event.category}
												</span>
												<h3 className="font-semibold mt-1">{event.title}</h3>
												<div className="mt-2 text-sm text-gray-600">
													<CalendarOutlined className="mr-1" />
													{event.date}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Rooftop Bars in NYC */}
							<div>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-xl font-bold">
										Rooftop Bars in {currentLocation}
									</h2>
									<Button
										type="link"
										className="flex items-center !rounded-button whitespace-nowrap cursor-pointer"
									>
										See All <RightOutlined className="ml-1" />
									</Button>
								</div>
								<div className="space-y-4">
									{rooftopBars.map((bar) => (
										<div
											key={bar.id}
											className="bg-white rounded-lg shadow-md overflow-hidden flex cursor-pointer"
										>
											<div className="w-1/3 overflow-hidden">
												<img
													src={bar.imageUrl}
													alt={bar.title}
													className="w-full h-full object-cover object-top"
												/>
											</div>
											<div className="w-2/3 p-4">
												<span className="text-xs font-medium text-indigo-600">
													{bar.category}
												</span>
												<h3 className="font-semibold mt-1">{bar.title}</h3>
												<div className="mt-2 flex items-center">
													<StarFilled className="text-yellow-400 mr-1" />
													<span className="font-medium">{bar.rating}</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Call to Action */}
						<div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
							<div className="md:flex justify-between items-center">
								<div className="mb-6 md:mb-0">
									<h2 className="text-2xl font-bold mb-2">
										Discover New Experiences
									</h2>
									<p className="text-white/80">
										Get notified when new spots and events are added in your
										area.
									</p>
								</div>
								<div className="flex space-x-3">
									<Button
										size="large"
										className="bg-white text-indigo-600 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer"
									>
										Enable Notifications
									</Button>
									<Button
										size="large"
										ghost
										className="!rounded-button whitespace-nowrap cursor-pointer"
									>
										Explore More
									</Button>
								</div>
							</div>
						</div>
					</>
				)}
			</main>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<h3 className="text-xl font-bold mb-4">Ventura</h3>
							<p className="text-gray-400">
								Discover the best events and venues around you.
							</p>
							<div className="mt-4 flex space-x-4">
								<i className="fab fa-facebook-f cursor-pointer"></i>
								<i className="fab fa-twitter cursor-pointer"></i>
								<i className="fab fa-instagram cursor-pointer"></i>
								<i className="fab fa-linkedin-in cursor-pointer"></i>
							</div>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Explore</h4>
							<ul className="space-y-2">
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Events
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Venues
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Categories
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Cities
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Company</h4>
							<ul className="space-y-2">
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										About Us
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Careers
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Blog
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Press
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-4">Support</h4>
							<ul className="space-y-2">
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Help Center
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Contact Us
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-white cursor-pointer"
									>
										Terms of Service
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-400">
							© 2025 Ventura. All rights reserved.
						</p>
						<div className="mt-4 md:mt-0 flex items-center space-x-4">
							<span className="text-gray-400">Payment Methods:</span>
							<i className="fab fa-cc-visa text-xl cursor-pointer"></i>
							<i className="fab fa-cc-mastercard text-xl cursor-pointer"></i>
							<i className="fab fa-cc-amex text-xl cursor-pointer"></i>
							<i className="fab fa-cc-paypal text-xl cursor-pointer"></i>
						</div>
					</div>
				</div>
			</footer>

			{/* Custom CSS */}
			<style jsx>{`
				.hide-scrollbar::-webkit-scrollbar {
					display: none;
				}
				.hide-scrollbar {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}

				/* Remove number input arrows */
				input[type="number"]::-webkit-inner-spin-button,
				input[type="number"]::-webkit-outer-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				input[type="number"] {
					-moz-appearance: textfield;
				}
			`}</style>
		</div>
	);
};

export default App;
