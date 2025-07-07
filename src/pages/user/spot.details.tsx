import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import map from "@/assets/map.jpg";
import heroBg from "@/assets/spot/spotHeroBg.jpg";
import p1 from "@/assets/spot/1.jpg";
import p2 from "@/assets/spot/2.jpg";
import p3 from "@/assets/spot/3.jpg";
import p4 from "@/assets/spot/4.jpg";
import p5 from "@/assets/spot/5.jpg";
import p6 from "@/assets/spot/6.jpg";

import * as echarts from "echarts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
	FaArrowRight,
	FaCalendarAlt,
	FaCalendarCheck,
	FaClock,
	FaCloudUploadAlt,
	FaConciergeBell,
	FaDirections,
	FaExpand,
	FaGlassCheers,
	FaGlobe,
	FaHeart,
	FaImages,
	FaInfoCircle,
	FaMapMarkedAlt,
	FaShareAlt,
	FaSort,
	FaStar,
	FaStarHalfAlt,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { Footer, NavBar } from "@/components";
import { followedVenues } from "@/lib/mock";
import { EnvironmentOutlined, StarOutlined } from "@ant-design/icons";
import { Heart } from "lucide-react";
import {
	DatePicker,
	Divider,
	Dropdown,
	Form,
	Input,
	Menu,
	Modal,
	Radio,
	Rate,
	Select,
	TimePicker,
	Upload,
} from "antd";

const SpotDetails: React.FC = () => {
	const [follow, setFollow] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [allReviewsModal, setAllReviewsModal] = useState(false);

	const [rateModal, setRateModal] = useState(false);
	const [rateForm] = Form.useForm();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 500);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const venue = {
		name: "Skyline Rooftop Lounge",
		rating: 4.7,
		reviewCount: 328,
		priceRange: "$$$",
		type: "Bar & Restaurant",
		location: "Downtown",
		photos: [p1, p2, p3, p4, p5, p6],
		hours: {
			monday: "4:00 PM - 12:00 AM",
			tuesday: "4:00 PM - 12:00 AM",
			wednesday: "4:00 PM - 1:00 AM",
			thursday: "4:00 PM - 1:00 AM",
			friday: "4:00 PM - 2:00 AM",
			saturday: "12:00 PM - 2:00 AM",
			sunday: "12:00 PM - 10:00 PM",
		},
		address: "123 Urban Avenue, Downtown, City",
		phone: "+1 (555) 123-4567",
		website: "www.skylinerooftop.com",
		description:
			"Perched on the 20th floor with panoramic city views, Skyline Rooftop Lounge offers a sophisticated urban escape with craft cocktails, gourmet small plates, and live music events. Our open-air terrace and stylish indoor lounge create the perfect atmosphere for everything from casual happy hours to special celebrations. Known for our sunset DJ sessions and seasonal menu, we've become a favorite destination for both locals and visitors seeking an elevated social experience.",
		amenities: [
			{ name: "Outdoor Seating", icon: "fa-umbrella-beach" },
			{ name: "Live Music", icon: "fa-music" },
			{ name: "Craft Cocktails", icon: "fa-martini-glass-citrus" },
			{ name: "Reservations", icon: "fa-calendar-check" },
			{ name: "Valet Parking", icon: "fa-car" },
			{ name: "Wheelchair Accessible", icon: "fa-wheelchair" },
			{ name: "Happy Hour", icon: "fa-clock" },
			{ name: "Private Events", icon: "fa-champagne-glasses" },
		],
	};
	const reviews = [
		{
			id: 1,
			user: "Emily J.",
			avatar:
				"https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20woman%20with%20short%20dark%20hair%20and%20friendly%20smile%2C%20minimalist%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=100&height=100&seq=1&orientation=squarish",
			rating: 5,
			date: "May 28, 2025",
			text: "Absolutely stunning views and amazing cocktails! The atmosphere here is unbeatable, especially during sunset. We had the truffle fries and tuna tartare - both were exceptional. Service was attentive without being intrusive. Will definitely be back!",
		},
		{
			id: 2,
			user: "Michael T.",
			avatar:
				"https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20middle-aged%20man%20with%20glasses%20and%20beard%2C%20minimalist%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=100&height=100&seq=2&orientation=squarish",
			rating: 4,
			date: "June 1, 2025",
			text: "Great spot for after-work drinks. The craft cocktail menu is innovative and the bartenders really know their stuff. It gets pretty crowded on weekends, so I'd recommend making a reservation if you want a good spot on the terrace. The small plates menu could use a few more options, but what they do have is delicious.",
		},
		{
			id: 3,
			user: "Sophia L.",
			avatar:
				"https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20woman%20with%20long%20blonde%20hair%20and%20professional%20appearance%2C%20minimalist%20neutral%20background%2C%20high%20quality%20professional%20headshot&width=100&height=100&seq=3&orientation=squarish",
			rating: 5,
			date: "May 15, 2025",
			text: "Celebrated my birthday here and it was perfect! The staff went above and beyond to make our evening special. The DJ was fantastic and the atmosphere was electric. Cocktails are on the pricier side but worth every penny for the quality and experience. The city views at night are magical!",
		},
	];

	// Similar venues
	const similarVenues = followedVenues;

	// Rating breakdown data for chart
	React.useEffect(() => {
		const chartDom = document.getElementById("rating-chart");
		if (chartDom) {
			const myChart = echarts.init(chartDom);
			const option = {
				animation: false,
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: {
					type: "value",
					max: 100,
					axisLabel: {
						formatter: "{value}%",
					},
				},
				yAxis: {
					type: "category",
					data: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
				},
				series: [
					{
						name: "Ratings",
						type: "bar",
						data: [78, 15, 5, 1, 1],
						itemStyle: {
							color: function (params: any) {
								const colorList = [
									"#10b981",
									"#22c55e",
									"#facc15",
									"#f97316",
									"#ef4444",
								];
								return colorList[params.dataIndex];
							},
						},
						label: {
							show: true,
							position: "right",
							formatter: "{c}%",
						},
					},
				],
			};
			myChart.setOption(option);

			return () => {
				myChart.dispose();
			};
		}
	}, []);

	return (
		<div className="min-h-screen bg-white">
			<NavBar isSticky={!isScrolled} />
			{/* Hero Section */}
			<div className="relative h-[500px] w-full">
				<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
				<img
					src={heroBg}
					alt="Skyline Rooftop Lounge"
					className="w-full h-full object-cover object-top"
				/>
				<div className="absolute container inset-0 z-20 flex flex-col justify-between p-8 mx-auto">
					<div>
						<div className="flex items-center space-x-4 mb-2">
							<Badge className="bg-purple-400 px-3 py-1 text-sm">
								Featured
							</Badge>
							<Badge className="bg-indigo-400 px-3 py-1 text-sm">Popular</Badge>
						</div>
						<h1 className="text-2xl md:text-5xl font-bold text-white mb-2">
							{venue.name}
						</h1>
						<div className="flex items-center text-white mb-4">
							<span className="flex items-center">
								<FaStar className="text-yellow-400 mr-1" />
								<span className="font-semibold">{venue.rating}</span>
							</span>
							<span className="mx-2">•</span>
							<span>{venue.reviewCount} reviews</span>
							<span className="mx-2 hidden">•</span>
							<span className="hidden">{venue.priceRange}</span>
							<span className="mx-2 hidden md:block">•</span>
							<span className="hidden md:block">{venue.type}</span>
						</div>
						<div className="flex items-center text-white">
							<FaMapMarkedAlt className="mr-2" />
							<span>{venue.location}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Action Bar */}
			<div className="sticky top-0 z-30 bg-white border-b shadow-sm">
				<div className="container mx-auto px-4 py-3 flex items-center justify-end md:justify-between">
					<div className="md:flex items-center hidden  space-x-6">
						<a
							href="#info"
							className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap"
						>
							Info
						</a>
						<a
							href="#photos"
							className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap"
						>
							Photos
						</a>
						<a
							href="#reviews"
							className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap"
						>
							Reviews
						</a>
						<a
							href="#similar"
							className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap"
						>
							Similar Spots
						</a>
					</div>
					<div className="flex items-center space-x-3">
						<Button
							variant="outline"
							size="sm"
							className={`!rounded-button whitespace-nowrap ${
								follow
									? "bg-green-600 text-white hover:text-white hover:border-green-700 hover:bg-green-700"
									: "hover:text-indigo-400 hover:border-indigo-400 hover:bg-white"
							} cursor-pointer `}
							onClick={() => setFollow(!follow)}
						>
							{follow ? <FaHeart /> : <Heart />}
							<span className="hidden md:block">
								{follow ? "following" : "Follow"}
							</span>
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="!rounded-button whitespace-nowrap cursor-pointer hover:text-indigo-400 hover:border-indigo-400 hover:bg-white"
						>
							<FaShareAlt className="mr-2" />
							<span className="hidden md:block">Share</span>
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="!rounded-button whitespace-nowrap cursor-pointer hover:text-indigo-400 hover:border-indigo-400 hover:bg-white"
						>
							<FaDirections className="mr-2" />
							<span className="hidden md:block">Directions</span>
						</Button>
						<Button
							className="bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
							size="sm"
						>
							<FaCalendarCheck className="mr-2" />
							Reserve
						</Button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column */}
					<div className="lg:col-span-2">
						{/* Key Information */}
						<section id="info" className="mb-12">
							<h2 className="text-2xl font-bold mb-6">About {venue.name}</h2>
							<p className="text-gray-700 mb-6 leading-relaxed">
								{venue.description}
							</p>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
								<div>
									<h3 className="text-lg font-semibold mb-3 flex items-center">
										<FaClock className="fas fa-clock text-blue-600 mr-2" />
										Hours
									</h3>
									<ul className="space-y-2">
										<li className="flex justify-between">
											<span className="font-medium">Monday</span>
											<span className="text-gray-600">
												{venue.hours.monday}
											</span>
										</li>
										<li className="flex justify-between">
											<span className="font-medium">Tuesday</span>
											<span className="text-gray-600">
												{venue.hours.tuesday}
											</span>
										</li>
										<li className="flex justify-between">
											<span className="font-medium">Wednesday</span>
											<span className="text-gray-600">
												{venue.hours.wednesday}
											</span>
										</li>
										<li className="flex justify-between">
											<span className="font-medium">Thursday</span>
											<span className="text-gray-600">
												{venue.hours.thursday}
											</span>
										</li>
										<li className="flex justify-between">
											<span className="font-medium">Friday</span>
											<span className="text-gray-600">
												{venue.hours.friday}
											</span>
										</li>
										<li className="flex justify-between">
											<span className="font-medium">Saturday</span>
											<span className="text-gray-600">
												{venue.hours.saturday}
											</span>
										</li>
										<li className="flex justify-between">
											<span className="font-medium">Sunday</span>
											<span className="text-gray-600">
												{venue.hours.sunday}
											</span>
										</li>
									</ul>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-3 flex items-center">
										<FaInfoCircle className="text-blue-600 mr-2" />
										Contact & Location
									</h3>
									<ul className="space-y-3">
										<li className="flex items-start">
											<FaMapMarkedAlt className="text-gray-600 mt-1 mr-3" />
											<span>{venue.address}</span>
										</li>
										<li className="flex items-center">
											<FaPhone className="text-gray-600 mr-3" />
											<span>{venue.phone}</span>
										</li>
										<li className="flex items-center">
											<FaGlobe className="text-gray-600 mr-3" />
											<a href="#" className="text-blue-600 hover:underline">
												{venue.website}
											</a>
										</li>
									</ul>

									<div className="mt-4 h-[200px] bg-gray-200 rounded-lg overflow-hidden">
										<img
											src={map}
											alt="Map location"
											className="w-full h-full object-cover"
										/>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4 flex items-center">
									<FaConciergeBell className="fas fa-concierge-bell text-blue-600 mr-2" />
									Amenities
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{venue.amenities.map((amenity, index) => (
										<div key={index} className="flex items-center">
											<i
												className={`fas ${amenity.icon} text-gray-600 mr-3`}
											></i>
											<span>{amenity.name}</span>
										</div>
									))}
								</div>
							</div>
						</section>

						{/* Photo Gallery */}
						<section id="photos" className="mb-12">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold">Photos</h2>
								<Button
									variant="outline"
									className="!rounded-button whitespace-nowrap cursor-pointer hover:text-indigo-400 hover:border-indigo-400 hover:bg-white"
								>
									<FaImages className="mr-2" />
									View All
								</Button>
							</div>

							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								{venue.photos.slice(0, 5).map((image, index) => (
									<div
										key={index}
										className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
									>
										<img
											src={image}
											alt={`Gallery image ${index + 1}`}
											className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
											<FaExpand className=" text-white text-xl" />
										</div>
									</div>
								))}

								{venue.photos.length > 5 && (
									<div className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group">
										<img
											src={venue.photos[5]}
											alt={`Gallery image 6`}
											className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-black/70 opacity-0 flex flex-col items-center text-indigo-600 group-hover:opacity-100 transition-opacity duration-300 justify-center">
											<FaImages className="mr-2 text-5xl" />
											View All
										</div>
									</div>
								)}
							</div>
						</section>

						{/* Reviews Section */}
						<section id="reviews" className="mb-12">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold">Reviews</h2>
								<Button
									onClick={() => setRateModal(true)}
									className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white !rounded-button whitespace-nowrap"
								>
									<FaStar className="mr-2" />
									Write a Review
								</Button>
							</div>

							<div className="flex flex-col md:flex-row gap-8 mb-8">
								<div className="bg-gray-50 p-6 rounded-lg flex-2/5 h-fit">
									<div className="text-center mb-4">
										<div className="text-4xl font-bold text-blue-600">
											{venue.rating}
										</div>
										<div className="flex items-center justify-center my-2">
											{[...Array(5)].map((_, i) => (
												<FaStar
													key={i}
													className={`${
														i < Math.floor(venue.rating) ? "fas" : "far"
													} fa-star ${
														i < Math.floor(venue.rating)
															? "text-yellow-400"
															: "text-gray-300"
													} mx-0.5`}
												/>
											))}
										</div>
										<div className="text-sm text-gray-600">
											{venue.reviewCount} reviews
										</div>
									</div>

									<div id="rating-chart" className="h-[200px] w-full"></div>
								</div>

								<div className="lg:col-span-2 flex-3/5">
									<Tabs defaultValue="recent">
										<TabsList className="mb-4">
											<TabsTrigger
												value="recent"
												className="!rounded-button whitespace-nowrap"
											>
												Recent
											</TabsTrigger>
											<TabsTrigger
												value="highest"
												className="!rounded-button whitespace-nowrap"
											>
												Highest Rated
											</TabsTrigger>
											<TabsTrigger
												value="lowest"
												className="!rounded-button whitespace-nowrap"
											>
												Lowest Rated
											</TabsTrigger>
										</TabsList>

										<TabsContent value="recent" className="mt-0">
											<div className="space-y-6">
												{reviews.slice(0, 3).map((review) => (
													<Card key={review.id} className="p-5">
														<div className="flex items-start">
															<Avatar className="h-12 w-12 mr-4">
																<img src={review.avatar} alt={review.user} />
															</Avatar>
															<div className="flex-1">
																<div className="flex items-center justify-between mb-1">
																	<h4 className="font-semibold">
																		{review.user}
																	</h4>
																	<span className="text-sm text-gray-500">
																		{review.date}
																	</span>
																</div>
																<div className="flex items-center mb-3">
																	{[...Array(5)].map((_, i) => (
																		<i
																			key={i}
																			className={`${
																				i < review.rating ? "fas" : "fas"
																			} fa-star ${
																				i < review.rating
																					? "text-yellow-400"
																					: "text-gray-300"
																			} text-sm mr-1`}
																		/>
																	))}
																</div>
																<p className="text-gray-700">{review.text}</p>
															</div>
														</div>
													</Card>
												))}
											</div>

											{reviews.length > 3 && (
												<div className="mt-6 text-center">
													<Button
														size={"sm"}
														onClick={() => setAllReviewsModal(true)}
														variant="outline"
														className="!rounded-button whitespace-nowrap cursor-pointer hover:text-indigo-400 hover:border-indigo-400 hover:bg-white"
													>
														View All Reviews
														<FaArrowRight className="ml-2" />
													</Button>
												</div>
											)}
										</TabsContent>

										<TabsContent value="highest" className="mt-0">
											<div className="p-8 text-center text-gray-500">
												<FaStarHalfAlt className="text-4xl mb-4 text-gray-400" />
												<p>Switch to this tab to see highest rated reviews</p>
											</div>
										</TabsContent>

										<TabsContent value="lowest" className="mt-0">
											<div className="p-8 text-center text-gray-500">
												<FaStarHalfAlt className="text-4xl mb-4 text-gray-400" />
												<p>Switch to this tab to see lowest rated reviews</p>
											</div>
										</TabsContent>
									</Tabs>
								</div>
							</div>
						</section>
					</div>

					{/* Right Column - Sidebar */}
					<div>
						<div className="sticky top-24">
							<Card className="mb-6 overflow-hidden p-0">
								<div className="p-5 bg-blue-50 border-b">
									<h3 className="font-bold text-lg">Make a Reservation</h3>
								</div>
								<div className="p-5">
									<div className="space-y-4">
										<div>
											<label className="block text-sm font-medium mb-1">
												Date
											</label>
											<DatePicker
												size="large"
												className="w-full"
												placeholder="Select the date"
												format="YYYY-MM-DD"
												showNow={true}
											/>
										</div>

										<div>
											<label className="block text-sm font-medium mb-1">
												Time
											</label>
											<div className="relative">
												<TimePicker
													use12Hours
													format="hh:mm A"
													placeholder="Choose time"
													className="w-full"
													size="large"
												/>
											</div>
										</div>

										<div>
											<label className="block text-sm font-medium mb-1">
												Party Size
											</label>
											<div className="relative">
												<Select
													placeholder="Enter size"
													className="w-full"
													size="large"
												>
													<Select.Option value="2">2 People</Select.Option>
													<Select.Option value="3">3 People</Select.Option>
													<Select.Option value="4">4 People</Select.Option>
													<Select.Option value="5">5 People</Select.Option>
													<Select.Option value="6+">6+ People</Select.Option>
												</Select>
											</div>
										</div>

										<Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
											Find a Table
										</Button>

										<p className="text-xs text-gray-500 text-center">
											Powered by TableReserve™ • No reservation fees
										</p>
									</div>
								</div>
							</Card>

							<Card className="mb-6 p-0">
								<div className="p-5">
									<h3 className="font-bold text-lg mb-4">Upcoming Events</h3>
									<ul className="space-y-4">
										<li className="flex">
											<div className="bg-blue-100 text-blue-800 rounded p-2 text-center mr-4 w-14 shrink-0">
												<div className="text-xs font-medium">JUN</div>
												<div className="text-xl font-bold">10</div>
											</div>
											<div>
												<h4 className="font-medium">Summer Cocktail Launch</h4>
												<p className="text-sm text-gray-600">
													7:00 PM - 10:00 PM
												</p>
											</div>
										</li>
										<li className="flex">
											<div className="bg-blue-100 text-blue-800 rounded p-2 text-center mr-4 w-14 shrink-0">
												<div className="text-xs font-medium">JUN</div>
												<div className="text-xl font-bold">15</div>
											</div>
											<div>
												<h4 className="font-medium">Live Jazz Night</h4>
												<p className="text-sm text-gray-600">
													8:00 PM - 11:00 PM
												</p>
											</div>
										</li>
										<li className="flex">
											<div className="bg-blue-100 text-blue-800 rounded p-2 text-center mr-4 w-14 shrink-0">
												<div className="text-xs font-medium">JUN</div>
												<div className="text-xl font-bold">22</div>
											</div>
											<div>
												<h4 className="font-medium">Sunset DJ Session</h4>
												<p className="text-sm text-gray-600">
													6:00 PM - 9:00 PM
												</p>
											</div>
										</li>
									</ul>
									<Button className="w-full mt-4 !rounded-button whitespace-nowrap cursor-pointer hover:bg-black/80">
										View All Events
									</Button>
								</div>
							</Card>

							<Card>
								<div className="p-5">
									<h3 className="font-bold text-lg mb-4">Special Offers</h3>
									<div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 mb-4">
										<div className="flex items-start">
											<FaGlassCheers className="text-purple-600 text-xl mt-1 mr-3" />
											<div>
												<h4 className="font-medium text-purple-800">
													Happy Hour
												</h4>
												<p className="text-sm text-purple-700">
													Mon-Fri, 4PM-7PM: 30% off all drinks
												</p>
											</div>
										</div>
									</div>
									<div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
										<div className="flex items-start">
											<i className="fas fa-birthday-cake text-blue-600 text-xl mt-1 mr-3"></i>
											<div>
												<h4 className="font-medium text-blue-800">
													Birthday Special
												</h4>
												<p className="text-sm text-blue-700">
													Free dessert and a complimentary cocktail
												</p>
											</div>
										</div>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>

				{/* Similar Spots Section */}
				<section id="similar" className="mt-12">
					<h2 className="text-2xl font-bold mb-6">
						Similar Spots You Might Like
					</h2>

					<Swiper
						modules={[Pagination, Autoplay, Navigation]}
						spaceBetween={20}
						slidesPerView={1}
						breakpoints={{
							640: {
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 3,
							},
							1280: {
								slidesPerView: 4,
							},
						}}
						pagination={{ clickable: true }}
						autoplay
						className="pb-20"
					>
						{similarVenues.map((venue) => (
							<SwiperSlide className="mb-15" key={venue.id}>
								<Card className="overflow-hidden md:mb-0 h-full cursor-pointer hover:shadow-md transition-shadow p-0">
									<div className="aspect-[4/3] h-48 overflow-hidden relative">
										<img
											src={venue.image}
											alt={venue.name}
											className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
									</div>
									<div className="px-4 pb-4">
										<h3 className="font-bold text-lg mb-1">{venue.name}</h3>
										<div className="flex items-center mb-2">
											<div className="flex items-center">
												<i className="fas fa-star text-yellow-400 mr-1 text-sm"></i>
												<span className="font-medium">{venue.rating}</span>
											</div>
											<span className="mx-2 text-gray-300">•</span>
											<span className="text-gray-600">{venue.category}</span>
										</div>
										<div className="text-gray-600 flex items center">
											<EnvironmentOutlined className="mr-2" />
											<span>{venue.location}</span>
										</div>
									</div>
								</Card>
							</SwiperSlide>
						))}
					</Swiper>
				</section>
			</div>

			{/* Footer */}
			<Footer />

			{/* Rate  Modal */}
			<Modal
				title={
					<div className="flex items-center">
						<StarOutlined className="text-yellow-400 mr-2" />
						<span>Rate Your Experience</span>
					</div>
				}
				open={rateModal}
				onCancel={() => {
					setRateModal(false);
					rateForm.resetFields();
				}}
				footer={null}
				width={640}
				className="top-8"
			>
				<div className="mb-6 flex items-center space-x-4">
					<div className="w-20 h-20 rounded-lg overflow-hidden">
						<img
							src={p1}
							alt={venue.name}
							className="w-full h-full object-cover"
						/>
					</div>
					<div>
						<h3 className="text-lg font-medium text-gray-900">{venue.name}</h3>
						<p className="text-sm text-gray-500">
							<FaCalendarAlt className="fas fa-calendar-alt mr-2" />
							{venue.type}
						</p>
						<p className="text-sm text-gray-500">
							<FaMapMarkedAlt className="fas fa-map-marker-alt mr-2" />
							{venue.location}
						</p>
					</div>
				</div>
				<Form
					form={rateForm}
					layout="vertical"
					onFinish={(values) => {
						console.log("Rating submitted:", values);
						setRateModal(false);
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
						>
							<p className="text-gray-500">
								<FaCloudUploadAlt className="fas fa-cloud-upload-alt text-2xl mb-2" />
								<br />
								Click or drag photos here
							</p>
						</Upload.Dragger>
					</Form.Item>
					<Divider />
					<div className="flex justify-end space-x-4">
						<Button
							onClick={() => {
								setRateModal(false);
								rateForm.resetFields();
							}}
							className="!rounded-button whitespace-nowrap"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap"
						>
							Submit Review
						</Button>
					</div>
				</Form>
			</Modal>

			{/* All reviews */}
			<Modal
				title={
					<div className="flex items-center mb-6">
						<FaStar className="text-yellow-400 mr-2" />
						<span>All Reviews</span>
					</div>
				}
				open={allReviewsModal}
				onCancel={() => setAllReviewsModal(false)}
				footer={null}
				width={640}
				className="top-8"
			>
				<div className="flex justify-end mb-4 gap-2.5">
					<Dropdown
						overlay={
							<Menu>
								<Menu.Item key="5">
									<div className="flex mb-1">
										{[...Array(5)].map((_, i) => (
											<FaStar
												key={i}
												className={`${
													i < 5 ? "text-yellow-400" : "text-gray-300"
												} text-sm mr-1`}
											/>
										))}
									</div>
								</Menu.Item>
								<Menu.Item key="4">
									<div className="flex mb-1">
										{[...Array(5)].map((_, i) => (
											<FaStar
												key={i}
												className={`${
													i < 4 ? "text-yellow-400" : "text-gray-300"
												} text-sm mr-1`}
											/>
										))}
									</div>
								</Menu.Item>
								<Menu.Item key="3">
									<div className="flex mb-1">
										{[...Array(5)].map((_, i) => (
											<FaStar
												key={i}
												className={`${
													i < 3 ? "text-yellow-400" : "text-gray-300"
												} text-sm mr-1`}
											/>
										))}
									</div>
								</Menu.Item>
								<Menu.Item key="2">
									<div className="flex mb-1">
										{[...Array(5)].map((_, i) => (
											<FaStar
												key={i}
												className={`${
													i < 2 ? "text-yellow-400" : "text-gray-300"
												} text-sm mr-1`}
											/>
										))}
									</div>
								</Menu.Item>
								<Menu.Item key="1">
									<div className="flex mb-1">
										{[...Array(5)].map((_, i) => (
											<FaStar
												key={i}
												className={`${
													i < 1 ? "text-yellow-400" : "text-gray-300"
												} text-sm mr-1`}
											/>
										))}
									</div>
								</Menu.Item>
							</Menu>
						}
						placement="bottomRight"
					>
						<Button
							size={"sm"}
							variant="outline"
							className="!rounded-button whitespace-nowrap cursor-pointer hover:text-indigo-400 hover:border-indigo-400 hover:bg-white"
						>
							<i className="fas fa-filter mr-1" /> Filter
						</Button>
					</Dropdown>

					<Dropdown
						overlay={
							<Menu>
								<Menu.Item key="oldest">Oldest First</Menu.Item>
								<Menu.Item key="newest">Newest First</Menu.Item>
							</Menu>
						}
						placement="bottomRight"
					>
						<Button
							size={"sm"}
							variant="outline"
							className="!rounded-button whitespace-nowrap cursor-pointer hover:text-indigo-400 hover:border-indigo-400 hover:bg-white"
						>
							<FaSort className="mr-1" /> Sort
						</Button>
					</Dropdown>
				</div>
				<div className="space-y-6">
					{reviews.map((review) => (
						<Card key={review.id} className="p-5">
							<div className="flex items-start">
								<Avatar className="h-12 w-12 mr-4">
									<img src={review.avatar} alt={review.user} />
								</Avatar>
								<div className="flex-1">
									<div className="flex items-center justify-between mb-1">
										<h4 className="font-semibold">{review.user}</h4>
										<span className="text-sm text-gray-500">{review.date}</span>
									</div>
									<div className="flex items-center mb-3">
										{[...Array(5)].map((_, i) => (
											<i
												key={i}
												className={`${
													i < review.rating ? "fas" : "far"
												} fa-star ${
													i < review.rating
														? "text-yellow-400"
														: "text-gray-300"
												} text-sm mr-1`}
											></i>
										))}
									</div>
									<p className="text-gray-700">{review.text}</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</Modal>
		</div>
	);
};

export default SpotDetails;
