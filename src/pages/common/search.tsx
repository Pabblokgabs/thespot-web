import React, { useEffect, useState } from "react";
import {
	Input,
	Slider,
	Select,
	DatePicker,
	Tag,
	Tabs,
	Empty,
	Drawer,
	Button,
	Dropdown,
	Menu,
	Tooltip,
} from "antd";
import {
	EnvironmentOutlined,
	StarFilled,
	DownOutlined,
	FilterOutlined,
	CloseOutlined,
	AppstoreOutlined,
} from "@ant-design/icons";
import event from "@/assets/spot/1.jpg";
import spot from "@/assets/spot/2.jpg";

import * as echarts from "echarts";
import "swiper/css";
import "swiper/css/pagination";
import {
	Btn,
	Footer,
	NavBar,
	PaginationComponent,
	MobileTileSkeleton,
	SpotCard,
	EventCard,
	MapViewCard,
	Card4Both,
	NoSpotResultsFoundCard,
	NoSpotResultsMobile,
} from "@/components";
import { recommended } from "@/lib/options";
import { useOverAllContext } from "@/lib/context/useContext";
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const SearchResults: React.FC = () => {
	const { what, setWhat, destination, setDestination, query } =
		useOverAllContext();

	const [viewMode, setViewMode] = useState<"list" | "map" | "grid">("grid");
	const [filterVisible, setFilterVisible] = useState(false);
	const [mapVisible, setMapVisible] = useState(false);
	const visibleSpots = 12;
	const visibleEvents = 12;
	const [spotCurrentPage, setSpotCurrentPage] = useState<number>(1);
	const [eventCurrentPage, setEventCurrentPage] = useState<number>(1);
	const [selectedFilters, setSelectedFilters] = useState<{
		spotType: string;
		eventType: string;
		distance: string;
		sortBy: string;
		tags: string[];
	}>({
		spotType: "All",
		eventType: "All",
		distance: "5 miles",
		sortBy: "Most Popular",
		tags: ["Open Now"],
	});
	const [loading, setLoading] = useState(true);
	const [maxW, setMaxW] = useState<number>(window.innerWidth);

	// Simulate loading data for now till we connect backend
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setMaxW(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleFilters = () => {
		setFilterVisible(!filterVisible);
	};
	// Mock data for spots
	const spots = [
		{
			id: 1,
			name: "Serenity Spa & Wellness",
			image: spot,
			description:
				"Luxury spa offering massages, facials, and wellness treatments in a tranquil environment.",
			distance: "0.3 mi",
			rating: 4.8,
			reviews: 124,
			tags: ["Open Now", "Top Rated", "Couples"],
			category: "spa",
		},
		{
			id: 2,
			name: "Soluna Bar & Lounge",
			image: spot,
			description:
				"Trendy cocktail bar with live music events and craft cocktails in downtown.",
			distance: "0.5 mi",
			rating: 4.6,
			reviews: 256,
			tags: ["Live Music", "Cocktails", "Happy Hour"],
			category: "bar",
		},
		{
			id: 3,
			name: "Grace Community Church",
			image: spot,
			description:
				"Welcoming community church offering weekly services and community outreach programs.",
			distance: "0.8 mi",
			rating: 4.9,
			reviews: 87,
			tags: ["Family Friendly", "Community Events"],
			category: "church",
		},
		{
			id: 4,
			name: "Fusion Kitchen",
			image: spot,
			description:
				"Asian-inspired restaurant serving innovative fusion dishes in a modern setting.",
			distance: "0.4 mi",
			rating: 4.5,
			reviews: 312,
			tags: ["Open Now", "Outdoor Seating", "Vegan Options"],
			category: "restaurant",
		},
		{
			id: 5,
			name: "Urban Fitness Center",
			image: spot,
			description:
				"Full-service gym with personal training, group classes, and wellness programs.",
			distance: "0.7 mi",
			rating: 4.7,
			reviews: 189,
			tags: ["24/7 Access", "Classes", "Personal Training"],
			category: "fitness",
		},
		{
			id: 6,
			name: "Artisan Coffee House",
			image: spot,
			description:
				"Specialty coffee shop serving single-origin brews and homemade pastries.",
			distance: "0.2 mi",
			rating: 4.9,
			reviews: 276,
			tags: ["Open Now", "WiFi", "Breakfast"],
			category: "cafe",
		},
	];
	// Mock data for events
	const events = [
		{
			id: 101,
			title: "Jazz Night at Soluna",
			host: "Soluna Bar & Lounge",
			image: event,
			date: "Today, 8:00 PM",
			tags: ["Live Music", "Free Entry"],
			description:
				"Enjoy an evening of smooth jazz with local musicians and specialty cocktails.",
			spotId: 2,
		},
		{
			id: 102,
			title: "Couples Massage Workshop",
			host: "Serenity Spa & Wellness",
			image: event,
			date: "Tomorrow, 2:00 PM",
			tags: ["Workshop", "Couples"],
			description:
				"Learn professional massage techniques to practice with your partner at home.",
			spotId: 1,
		},
		{
			id: 103,
			title: "Community Food Drive",
			host: "Grace Community Church",
			image: event,
			date: "Saturday, 10:00 AM",
			tags: ["Charity", "Family Friendly"],
			description:
				"Help collect food donations for local families in need. All contributions welcome.",
			spotId: 3,
		},
		{
			id: 104,
			title: "Wine Tasting Evening",
			host: "Fusion Kitchen",
			image: event,
			date: "Friday, 7:00 PM",
			tags: ["Tasting", "Reservation Required"],
			description:
				"Sample premium wines paired with chef-selected appetizers. Reservation required.",
			spotId: 4,
		},
		{
			id: 105,
			title: "Morning Yoga Session",
			host: "Urban Fitness Center",
			image: event,
			date: "Daily, 6:30 AM",
			tags: ["Fitness", "Beginners Welcome"],
			description:
				"Start your day with energizing yoga flows suitable for all experience levels.",
			spotId: 5,
		},
		{
			id: 106,
			title: "Coffee Brewing Workshop",
			host: "Artisan Coffee House",
			image: event,
			date: "Sunday, 11:00 AM",
			tags: ["Workshop", "Tasting"],
			description:
				"Learn professional brewing techniques and taste different coffee varieties.",
			spotId: 6,
		},
	];
	// Categories for filter
	const categories = [
		{ id: "all", name: "All", icon: "fas fa-globe" },
		{ id: "restaurant", name: "Restaurants", icon: "fas fa-utensils" },
		{ id: "bar", name: "Bars", icon: "fas fa-glass-martini-alt" },
		{ id: "cafe", name: "Cafes", icon: "fas fa-coffee" },
		{ id: "spa", name: "Spas", icon: "fas fa-spa" },
		{ id: "church", name: "Churches", icon: "fas fa-church" },
		{ id: "fitness", name: "Fitness", icon: "fas fa-dumbbell" },
	];
	// Event types for filter
	const eventTypes = [
		{ id: "all_events", name: "All Events" },
		{ id: "live_music", name: "Live Music" },
		{ id: "workshop", name: "Workshops" },
		{ id: "charity", name: "Charity" },
		{ id: "tasting", name: "Tastings" },
		{ id: "fitness", name: "Fitness" },
	];

	const searchResults = [...events, ...spots];
	// Initialize map when component mounts
	useEffect(() => {
		if (viewMode === "map" && !mapVisible) {
			setTimeout(() => {
				const mapContainer = document.getElementById("map-container");
				if (mapContainer) {
					const mapChart = echarts.init(mapContainer);
					const option = {
						animation: false,
						backgroundColor: "#f5f7fa",
						geo: {
							map: "world",
							roam: true,
							center: [-73.935242, 40.73061], // NYC coordinates
							zoom: 12,
							itemStyle: {
								areaColor: "#f5f7fa",
								borderColor: "#ddd",
							},
						},
						series: [
							{
								type: "scatter",
								coordinateSystem: "geo",
								data: spots.map((spot, _) => {
									// Generate random coordinates around NYC
									const lat = 40.73061 + (Math.random() - 0.5) * 0.02;
									const lng = -73.935242 + (Math.random() - 0.5) * 0.02;
									return {
										name: spot.name,
										value: [lng, lat, 1],
										itemStyle: {
											color: "#3b82f6",
										},
									};
								}),
								symbolSize: 15,
							},
							{
								type: "scatter",
								coordinateSystem: "geo",
								data: events.map((event) => {
									// Generate random coordinates around NYC
									const lat = 40.73061 + (Math.random() - 0.5) * 0.02;
									const lng = -73.935242 + (Math.random() - 0.5) * 0.02;
									return {
										name: event.title,
										value: [lng, lat, 1],
										itemStyle: {
											color: "#ec4899",
										},
									};
								}),
								symbolSize: 15,
							},
						],
						tooltip: {
							trigger: "item",
							formatter: (params: any) => {
								return params.name;
							},
						},
					};
					mapChart.setOption(option);
					setMapVisible(true);
					// Handle resize
					window.addEventListener("resize", () => {
						mapChart.resize();
					});
					return () => {
						mapChart.dispose();
						window.removeEventListener("resize", () => {
							mapChart.resize();
						});
					};
				}
			}, 100);
		}
	}, [viewMode, mapVisible]);

	// Filter spots based on active category
	const filteredSpots = spots;
	const filteredEvents = events;

	const handleFilterChange = (type: string, value: string | string[]) => {
		setSelectedFilters({
			...selectedFilters,
			[type]: value,
		});
	};

	const handleTagToggle = (tag: string) => {
		const currentTags = [...selectedFilters.tags];
		const tagIndex = currentTags.indexOf(tag);

		if (tagIndex > -1) {
			currentTags.splice(tagIndex, 1);
		} else {
			currentTags.push(tag);
		}

		setSelectedFilters({
			...selectedFilters,
			tags: currentTags,
		});
	};

	const clearFilters = () => {
		setSelectedFilters({
			spotType: "All",
			eventType: "All",
			distance: "5 miles",
			sortBy: "Most Popular",
			tags: [],
		});
	};

	const renderMobileFilters = () => (
		<div
			className={`fixed block md:hidden inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 z-50 transition-opacity duration-300 ${
				filterVisible ? "opacity-100" : "opacity-0 pointer-events-none"
			}`}
			onClick={() => setFilterVisible(false)}
		>
			<div
				className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-5 transition-transform duration-300 ${
					filterVisible ? "translate-y-0" : "translate-y-full"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-medium">Filters</h3>
					<Button
						type="text"
						icon={<CloseOutlined />}
						onClick={() => setFilterVisible(false)}
						className="cursor-pointer"
					/>
				</div>

				<div className="mb-4">
					<h4 className="text-sm font-medium mb-2">Spot Type</h4>
					<Select
						value={selectedFilters.spotType}
						onChange={(value) => handleFilterChange("spotType", value)}
						className="w-full"
					>
						<Option value="All">All Spots</Option>
						<Option value="Restaurant">Restaurants</Option>
						<Option value="Bar">Bars</Option>
						<Option value="Church">Churches</Option>
						<Option value="Spa">Spas</Option>
						<Option value="Gym">Gyms</Option>
						<Option value="Park">Parks</Option>
					</Select>
				</div>

				<div className="mb-4">
					<h4 className="text-sm font-medium mb-2">Event Type</h4>
					<Select
						value={selectedFilters.eventType}
						onChange={(value) => handleFilterChange("eventType", value)}
						className="w-full"
					>
						<Option value="All">All Events</Option>
						<Option value="Live Music">Live Music</Option>
						<Option value="Food & Drink">Food & Drink</Option>
						<Option value="Workshop">Workshops</Option>
						<Option value="Market">Markets</Option>
						<Option value="Art">Art & Culture</Option>
						<Option value="Fitness">Fitness</Option>
					</Select>
				</div>

				<div className="mb-4">
					<h4 className="text-sm font-medium mb-2">Distance</h4>
					<Select
						value={selectedFilters.distance}
						onChange={(value) => handleFilterChange("distance", value)}
						className="w-full"
					>
						<Option value="1 mile">Within 1 mile</Option>
						<Option value="3 miles">Within 3 miles</Option>
						<Option value="5 miles">Within 5 miles</Option>
						<Option value="10 miles">Within 10 miles</Option>
						<Option value="25 miles">Within 25 miles</Option>
					</Select>
				</div>

				<div className="mb-4">
					<h4 className="text-sm font-medium mb-2">Sort By</h4>
					<Select
						value={selectedFilters.sortBy}
						onChange={(value) => handleFilterChange("sortBy", value)}
						className="w-full"
					>
						<Option value="Most Popular">Most Popular</Option>
						<Option value="Closest">Closest</Option>
						<Option value="Highest Rated">Highest Rated</Option>
						<Option value="Newest">Newest</Option>
					</Select>
				</div>

				<div className="mb-5">
					<h4 className="text-sm font-medium mb-2">Quick Filters</h4>
					<div className="flex flex-wrap gap-2">
						{[
							"Open Now",
							"Free Entry",
							"Family Friendly",
							"Top Rated",
							"Indoor",
							"Outdoor",
						].map((tag) => (
							<Tag
								key={tag}
								color={selectedFilters.tags.includes(tag) ? "blue" : "default"}
								className="px-3 py-1 cursor-pointer"
								onClick={() => handleTagToggle(tag)}
							>
								{tag}
							</Tag>
						))}
					</div>
				</div>

				<div className="flex gap-3">
					<Button
						block
						onClick={clearFilters}
						className="!rounded-button whitespace-nowrap cursor-pointer"
					>
						Clear All
					</Button>
					<Button
						type="primary"
						block
						onClick={() => setFilterVisible(false)}
						className="!rounded-button whitespace-nowrap cursor-pointer"
					>
						Apply Filters
					</Button>
				</div>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-50">
			<NavBar isSticky={false} isSearchBar={false} />
			<header className="sticky top-0 z-50 bg-white shadow-sm">
				{/* Search Section */}
				<div className="bg-gradient-to-r hidden md:block from-blue-600 to-indigo-700 py-6">
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
										<Select.Option key={index + item.value} value={item.value}>
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

				{/* Desktop Filters */}
				<div className="hidden md:block bg-white border-b">
					<div className="container mx-auto px-4 py-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									{["Open Now", "Free Entry", "Family Friendly"].map((tag) => (
										<Tag
											key={tag}
											color={
												selectedFilters.tags.includes(tag) ? "blue" : "default"
											}
											className="px-2 py-1 cursor-pointer"
											onClick={() => handleTagToggle(tag)}
										>
											{tag}
										</Tag>
									))}
									<Dropdown
										overlay={
											<Menu>
												{["Top Rated", "Indoor", "Outdoor"].map((tag) => (
													<Menu.Item
														key={tag}
														onClick={() => handleTagToggle(tag)}
													>
														<div className="flex items-center justify-between">
															<span>{tag}</span>
															{selectedFilters.tags.includes(tag) && (
																<i className="fas fa-check ml-2 text-blue-500"></i>
															)}
														</div>
													</Menu.Item>
												))}
											</Menu>
										}
										trigger={["click"]}
									>
										<Button type="text" size="small" className="cursor-pointer">
											More <DownOutlined />
										</Button>
									</Dropdown>
								</div>
							</div>

							<div className="flex items-center">
								<span className="text-gray-600 mr-2">Sort By:</span>
								<Select
									value={selectedFilters.sortBy}
									onChange={(value) => handleFilterChange("sortBy", value)}
									className="w-36"
									variant="borderless"
									suffixIcon={
										<DownOutlined className="text-gray-400 text-xs" />
									}
								>
									<Option value="Recommended">Recommended</Option>
									<Option value="Most Popular">Most Popular</Option>
									<Option value="Closest">Closest</Option>
									<Option value="Highest Rated">Highest Rated</Option>
									<Option value="Newest">Newest</Option>
								</Select>

								<Button onClick={toggleFilters}>
									<FilterOutlined /> Filter
								</Button>

								<div className="ml-4 flex items-center space-x-2">
									<Tooltip title="Grid View">
										<Button
											type={viewMode === "grid" ? "primary" : "text"}
											icon={<AppstoreOutlined />}
											onClick={() => setViewMode("grid")}
											className="cursor-pointer !rounded-button whitespace-nowrap"
										/>
									</Tooltip>
									<Tooltip title="Map view">
										<Button
											type={viewMode === "map" ? "primary" : "text"}
											icon={<EnvironmentOutlined />}
											onClick={() => {
												setMapVisible(true);
												setViewMode("map");
											}}
											className="cursor-pointer !rounded-button whitespace-nowrap"
										/>
									</Tooltip>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile Filter Button */}
				<div className="md:hidden sticky top-16 z-30 bg-white shadow-sm border-b">
					<div className="container mx-auto px-4 py-2">
						<div className="flex justify-between items-center">
							<p className="text-sm text-gray-600 truncate line-clamp-1">
								<span className="font-medium">{searchResults.length}</span>{" "}
								results for <span className="font-medium">"{query}"</span>
							</p>
							<div className="flex space-x-2">
								<Button
									type={filterVisible ? "primary" : "text"}
									icon={<FilterOutlined />}
									onClick={toggleFilters}
									className="cursor-pointer !rounded-button whitespace-nowrap"
								/>
								<Button
									icon={<EnvironmentOutlined />}
									type={mapVisible ? "primary" : "text"}
									onClick={() => {
										setMapVisible((prev) => !prev);

										if (viewMode === "grid") {
											setViewMode("map");
										} else {
											setViewMode("grid");
										}
									}}
									className="cursor-pointer !rounded-button whitespace-nowrap"
								/>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* Main content */}
			<main className="container mx-auto px-4 py-6">
				{viewMode === "grid" ? (
					<div>
						{/* Active filters */}
						<div className="flex flex-wrap items-center mb-6 gap-2">
							<span className="text-gray-500 text-sm">Active filters:</span>
							<Tag
								closable
								className="rounded-full bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
							>
								Open Now
							</Tag>
							<Tag
								closable
								className="rounded-full bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
							>
								Within 2 miles
							</Tag>
							<Tag
								closable
								className="rounded-full bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
							>
								4+ Rating
							</Tag>
						</div>
						{/* Results count */}
						<div className="mb-6 hidden lg:block">
							<h2 className="text-xl font-semibold text-gray-800">
								{filteredSpots.length} spots & {filteredEvents.length} events
								found
							</h2>
							{what && destination && (
								<p className="text-gray-500">
									Showing results for "{what} near {destination}"
								</p>
							)}
						</div>
						{/* Tabs for Spots and Events */}
						<Tabs defaultActiveKey="spots" className="mb-6">
							<TabPane
								tab={
									<span>
										<i className="fas fa-map-marker-alt mr-1"></i> Spots
									</span>
								}
								key="spots"
							>
								{filteredSpots.length > 0 ? (
									<>
										{/* Mobile Carousel View */}
										<div className="md:hidden mb-6">
											{Array.from({
												length: Math.ceil(filteredSpots.length / 12),
											}).map((_, pageIndex) => (
												<div className="grid grid-cols-1 gap-4">
													{filteredSpots
														.slice(pageIndex * 12, (pageIndex + 1) * 12)
														.map((spot) => (
															<Card4Both data={spot} />
														))}
												</div>
											))}
										</div>

										{/* Desktop View */}
										<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
											{filteredSpots.map((spot) => (
												<SpotCard data={spot} />
											))}
										</div>
										<PaginationComponent
											pageSize={visibleSpots}
											total={500}
											currentPage={spotCurrentPage}
											setCurrentPage={setSpotCurrentPage}
										/>
									</>
								) : (
									<div className="py-8">
										<div className="text-center mb-8">
											<img
												src="https://readdy.ai/api/search-image?query=A%20simple%20illustration%20showing%20a%20map%20with%20location%20pins%20and%20search%20results%2C%20using%20minimal%20design%20style%20with%20soft%20colors%20and%20clean%20lines%2C%20perfect%20for%20a%20no%20results%20found%20page&width=200&height=200&seq=13&orientation=squarish"
												alt="No results"
												className="mx-auto w-48 h-48 mb-4"
											/>
											<h3 className="text-xl font-semibold text-gray-800 mb-2">
												No exact matches found in Tafelkop
											</h3>
											<p className="text-gray-600">
												But we found some similar spots nearby you might like!
											</p>
										</div>

										<div className="mb-6">
											{/* Mobile Carousel for Nearby Suggestions */}
											<div className="md:hidden">
												<NoSpotResultsMobile data={spots} />
											</div>

											{/* Desktop Grid for Nearby Suggestions */}
											<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
												{spots.slice(0, 6).map((spot) => (
													<NoSpotResultsFoundCard spot={spot} />
												))}
											</div>
										</div>

										<div className="text-center">
											<button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-200 !rounded-button whitespace-nowrap cursor-pointer">
												<i className="fas fa-search mr-2"></i>
												Search in All Areas
											</button>
										</div>
									</div>
								)}
							</TabPane>
							<TabPane
								tab={
									<span>
										<i className="fas fa-calendar-alt mr-1"></i> Events
									</span>
								}
								key="events"
							>
								{filteredEvents.length > 0 ? (
									<>
										{/* Mobile Events Carousel */}
										<div className="md:hidden mb-6">
											{Array.from({
												length: Math.ceil(filteredEvents.length / 12),
											}).map((_, pageIndex) => (
												<div className="grid grid-cols-1 gap-4">
													{filteredEvents
														.slice(pageIndex * 12, (pageIndex + 1) * 12)
														.map((event) => (
															<Card4Both data={event} />
														))}
												</div>
											))}
										</div>
										{/* Desktop View */}
										<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
											{filteredEvents.map((event) => (
												<EventCard data={event} />
											))}
										</div>
										<PaginationComponent
											pageSize={visibleEvents}
											total={50}
											currentPage={eventCurrentPage}
											setCurrentPage={setEventCurrentPage}
										/>
									</>
								) : (
									<Empty
										description="No events found matching your criteria"
										image={Empty.PRESENTED_IMAGE_SIMPLE}
									/>
								)}
							</TabPane>
						</Tabs>
					</div>
				) : (
					<div className="flex flex-col lg:flex-row h-[calc(100vh-220px)] min-h-[600px]">
						{/* List panel */}
						<div className="lg:w-1/3 overflow-y-auto overflow-x-hidden p-2 bg-white rounded-l-xl shadow-sm mb-4 lg:mb-0 lg:mr-4">
							<div className="mb-4">
								<h3 className="text-lg font-semibold text-gray-800 mb-2">
									Nearby Spots & Events
								</h3>
								<p className="text-gray-500 text-sm">Showing results on map</p>
							</div>
							<div className="space-y-3 hidden lg:block mb-2.5">
								{loading ? (
									<div>
										{Array(6)
											.fill(null)
											.map((_, index) => (
												<div className="mb-2.5" key={index}>
													{MobileTileSkeleton()}
												</div>
											))}
									</div>
								) : (
									<>
										{[
											...filteredSpots.slice(0, 3),
											...filteredEvents.slice(0, 3),
										].map((spot) => (
											<MapViewCard data={spot} />
										))}
									</>
								)}
								<PaginationComponent
									pageSize={visibleSpots}
									total={500}
									currentPage={spotCurrentPage}
									setCurrentPage={setSpotCurrentPage}
									isNextPrev={false}
								/>
							</div>
						</div>
						{/* Map container */}
						<div className="flex-grow bg-gray-100 rounded-r-xl overflow-hidden">
							<div id="map-container" className="w-full h-full"></div>
						</div>
					</div>
				)}
			</main>
			{/* Filter drawer */}
			<Drawer
				title="Filter Results"
				placement="right"
				closable={true}
				onClose={toggleFilters}
				open={filterVisible && maxW >= 768}
				width={400}
				closeIcon={<CloseOutlined />}
				className="hidden md:block z-"
				footer={
					<div className="flex justify-between">
						<button className="px-4 py-2 text-gray-600 font-medium !rounded-button whitespace-nowrap cursor-pointer">
							Reset All
						</button>
						<Button
							type="primary"
							className="!rounded-button whitespace-nowrap cursor-pointer"
						>
							Apply Filters
						</Button>
					</div>
				}
			>
				<div className="space-y-6">
					<div>
						<h4 className="font-medium text-gray-800 mb-3">Spot Type</h4>
						<div className="grid grid-cols-2 gap-2">
							{categories
								.filter((c) => c.id !== "all")
								.map((category) => (
									<button
										key={category.id}
										className="flex items-center justify-center px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-500 text-sm !rounded-button whitespace-nowrap cursor-pointer"
									>
										<i className={`${category.icon} mr-2`}></i>
										{category.name}
									</button>
								))}
						</div>
					</div>
					<div>
						<h4 className="font-medium text-gray-800 mb-3">Event Type</h4>
						<div className="grid grid-cols-2 gap-2">
							{eventTypes
								.filter((e) => e.id !== "all_events")
								.map((eventType) => (
									<button
										key={eventType.id}
										className="flex items-center justify-center px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-500 text-sm !rounded-button whitespace-nowrap cursor-pointer"
									>
										{eventType.name}
									</button>
								))}
						</div>
					</div>
					<div>
						<h4 className="font-medium text-gray-800 mb-3">Date & Time</h4>
						<RangePicker className="w-full rounded-lg mb-3" />
						<div className="flex flex-wrap gap-2">
							<button className="px-3 py-1 rounded-lg border border-gray-200 text-sm !rounded-button whitespace-nowrap cursor-pointer">
								Today
							</button>
							<button className="px-3 py-1 rounded-lg border border-gray-200 text-sm !rounded-button whitespace-nowrap cursor-pointer">
								Tomorrow
							</button>
							<button className="px-3 py-1 rounded-lg border border-gray-200 text-sm !rounded-button whitespace-nowrap cursor-pointer">
								This Weekend
							</button>
							<button className="px-3 py-1 rounded-lg border border-gray-200 text-sm !rounded-button whitespace-nowrap cursor-pointer">
								Next Week
							</button>
						</div>
					</div>
					<div>
						<h4 className="font-medium text-gray-800 mb-3">Distance</h4>
						<Slider
							min={0}
							max={50}
							defaultValue={5}
							marks={{
								0: "0 mi",
								10: "10 mi",
								25: "25 mi",
								50: "50 mi",
							}}
						/>
					</div>
					<div>
						<h4 className="font-medium text-gray-800 mb-3">Tags</h4>
						<div className="flex flex-wrap gap-2">
							<button className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-sm !rounded-button whitespace-nowrap cursor-pointer">
								Open Now
							</button>
							<button className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-sm !rounded-button whitespace-nowrap cursor-pointer">
								Free Entry
							</button>
							<button className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-sm !rounded-button whitespace-nowrap cursor-pointer">
								Family Friendly
							</button>
							<button className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-sm !rounded-button whitespace-nowrap cursor-pointer">
								Outdoor Seating
							</button>
							<button className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-sm !rounded-button whitespace-nowrap cursor-pointer">
								Wheelchair Access
							</button>
							<button className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-sm !rounded-button whitespace-nowrap cursor-pointer">
								Pet Friendly
							</button>
						</div>
					</div>
					<div>
						<h4 className="font-medium text-gray-800 mb-3">Rating</h4>
						<div className="flex items-center space-x-2">
							{[5, 4, 3, 2, 1].map((rating) => (
								<button
									key={rating}
									className="flex items-center justify-center px-3 py-1 rounded-lg border border-gray-200 hover:border-yellow-500 !rounded-button whitespace-nowrap cursor-pointer"
								>
									<span>{rating}+</span>
									<StarFilled className="text-yellow-500 ml-1" />
								</button>
							))}
						</div>
					</div>
				</div>
			</Drawer>

			{/* Mobile Filters Modal */}
			{renderMobileFilters()}

			{/* Mobile Map Toggle Button */}
			<div className="md:hidden fixed bottom-6 right-6 z-30">
				<Button
					type={viewMode === "map" ? "primary" : "default"}
					shape="circle"
					size="large"
					icon={<EnvironmentOutlined />}
					onClick={() => {
						setMapVisible((prev) => !prev);

						if (viewMode === "grid") {
							setViewMode("map");
						} else {
							setViewMode("grid");
						}
					}}
					className="shadow-lg cursor-pointer"
				/>
			</div>
			<Footer />
			<style>
				jsx:{" "}
				{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}
			</style>
		</div>
	);
};
export default SearchResults;
