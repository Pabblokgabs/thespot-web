import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import img from "@/assets/spots/night.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { spots } from "@/lib/mock";
import { Button, Tag } from "antd";
import {
	CalendarOutlined,
	ClockCircleOutlined,
	EnvironmentOutlined,
	HeartOutlined,
	RightOutlined,
	StarFilled,
} from "@ant-design/icons";
import Btn from "../btn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function Recommended() {
	const featuredSpots = spots.filter((spot) => spot.isFeatured);

	const personalizedRecommendations = [
		{
			id: 1,
			title: "Immersive Art Experience",
			category: "Arts & Culture",
			rating: 4.9,
			address: "tafelkop zone 14",
			description:
				"The best culinary experience I've had in years. Chef Isabella's tasting menu is a journey through flavors that will leave you speechless.",
			tags: ["Interactive", "Indoor"],
			imageUrl: img,
		},
		{
			id: 2,
			title: "Craft Brewery Tour",
			category: "Food & Drink",
			rating: 4.7,
			address: "tafelkop zone 14",
			description:
				"The best culinary experience I've had in years. Chef Isabella's tasting menu is a journey through flavors that will leave you speechless.",
			tags: ["Tastings", "Tours"],
			imageUrl: img,
		},
		{
			id: 3,
			title: "Sunrise Yoga in the Park",
			category: "Fitness",
			date: "Every Saturday",
			time: "6:30 AM",
			location: "dijong lifestyle",
			tags: ["Outdoor", "Wellness"],
			imageUrl: img,
		},
		{
			id: 4,
			title: "Vintage Vinyl Record Store",
			category: "Shopping",
			rating: 4.8,
			address: "tafelkop zone 14",
			description:
				"The best culinary experience I've had in years. Chef Isabella's tasting menu is a journey through flavors that will leave you speechless.",
			tags: ["Music", "Collectibles"],
			imageUrl: img,
		},
	];

	return (
		<div className="bg-gray-50 lg:py-12">
			<div className="container mx-auto px-4">
				<div className="bg-gray-50 pb-12">
					<div className="container mx-auto md:px-4">
						<div className="flex justify-between items-center mb-8">
							<h2 className="md:text-2xl text-xl font-bold text-gray-900">
								Recommended
							</h2>
							<Button
								type="link"
								className="flex items-center !rounded-button whitespace-nowrap cursor-pointer"
							>
								See All <RightOutlined className="ml-1" />
							</Button>
						</div>
						<Swiper
							modules={[Pagination, Autoplay, Navigation]}
							spaceBetween={24}
							slidesPerView={1}
							breakpoints={{
								640: { slidesPerView: 2 },
								1024: { slidesPerView: 4 },
							}}
							pagination={{ clickable: true }}
							autoplay={{ delay: 5000, disableOnInteraction: false }}
							className="pb-12"
						>
							{featuredSpots.map((spot) => (
								<SwiperSlide key={spot.name + spot.id}>
									<Card className="overflow-hidden p-0 mb-11 bg-white hover:shadow-lg transition-shadow duration-300">
										<div className="relative h-48">
											<img
												src={img}
												alt={spot.name}
												className="w-full h-full object-cover object-top"
											/>
											<button className="absolute top-3 bg-gray-400 text-white rounded-full right-3 p-2 flex items-center justify-center cursor-pointer">
												<HeartOutlined />
											</button>
											<div className="absolute bottom-4 left-4">
												<Badge
													className={`${
														spot.isOpen ? "bg-green-500" : "bg-red-500"
													} text-white`}
												>
													{spot.isOpen ? "Open Now" : "Closed"}
												</Badge>
											</div>
										</div>

										<div className="px-5 pb-5">
											<div className="flex justify-between items-start mb-1">
												<span className="truncate text-sm font-medium text-indigo-600">
													{spot.category}
												</span>
												<div className="flex">
													<StarFilled
														style={{ color: "oklch(85.2% 0.199 91.936)" }}
														className="mr-1"
													/>
													<span className="font-medium">{spot.rating}</span>
													<span className="text-gray-500 font-medium ml-1">
														({spot.reviews})
													</span>
												</div>
											</div>
											<h3 className="text-xl font-bold text-gray-900 truncate">
												{spot.name}
											</h3>
											<p className="text-sm text-gray-600">
												<EnvironmentOutlined /> tafelkop zone 14
											</p>
											<div className="flex items-center mt-1 text-gray-500 text-sm mb-2">
												{["wifi", "drinks"].map((tag, index) => (
													<Tag
														key={`${tag}${index}`}
														className="mr-2capitalize"
													>
														{tag}
													</Tag>
												))}
											</div>
											<p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
												{spot.description}
											</p>
											<Link to={`/spot-details/${spot.id}`}>
												<Btn
													isAnimation
													text="View Details"
													className="w-full text-white"
												/>
											</Link>
										</div>
									</Card>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>

				<div className="mb-12 bg-indigo-50 p-6 hidden md:block rounded-xl">
					<div className="flex justify-between items-center mb-4">
						<h2 className="md:text-2xl font-bold">Because You Liked...</h2>
						<Button
							type="text"
							className="!rounded-button whitespace-nowrap cursor-pointer"
						>
							Refresh
						</Button>
					</div>
					<div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{personalizedRecommendations.map((item) => (
							<div
								key={item.id}
								className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
							>
								<div className="h-48 relative overflow-hidden">
									<img
										src={item.imageUrl}
										alt={item.title}
										className="w-full h-full object-cover object-top"
									/>
									{item.address && (
										<div className="absolute bottom-4 left-4">
											<Badge
												className={`${
													item ? "bg-green-500" : "bg-red-500"
												} text-white`}
											>
												{item ? "Open Now" : "Closed"}
											</Badge>
										</div>
									)}
								</div>
								<div className="p-4">
									<div className="flex flex-col">
										<div className="flex justify-between items-center">
											<span className="text-xs truncate font-medium text-indigo-600">
												{item.category}
											</span>
											{item.rating && (
												<div className="flex items-center">
													<StarFilled
														style={{ color: "oklch(85.2% 0.199 91.936)" }}
													/>
													<span className="font-medium">{item.rating}</span>
												</div>
											)}
										</div>
										<h3 className="font-semibold text-lg mt-1 truncate">
											{item.title}
										</h3>
									</div>
									{item.address && (
										<div className="mt-2 flex items-center text-gray-600">
											<EnvironmentOutlined className="mr-1" />
											<span className="text-sm">{item.address}</span>
										</div>
									)}
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
									{item.location && (
										<div className="mt-1 flex items-center text-gray-600">
											<EnvironmentOutlined className="mr-1" />
											<span className="text-sm">
												at{" "}
												<span className="text-indigo-600 hover:underline">
													{item.location}
												</span>
											</span>
										</div>
									)}
									{item.description && (
										<div className="mt-2 flex items-center text-gray-600">
											<span className="text-sm line-clamp-2">
												{item.description}
											</span>
										</div>
									)}
									<div className="mt-3 flex flex-wrap gap-2">
										{item.tags.map((tag, index) => (
											<Tag key={index}>{tag}</Tag>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="flex md:hidden flex-col gap-4">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold truncate line-clamp-1">
							Because You Liked dijong lifestyle
						</h2>
						<Button
							type="text"
							icon={
								<RefreshCcw
									style={{ height: "15px", width: "15px", marginLeft: "10px" }}
								/>
							}
						/>
					</div>
					<ScrollArea className="w-full whitespace-nowrap pb-6 overflow-x-auto">
						<div className="flex h-ful w-full px-1 space-x-4 mb-6">
							{personalizedRecommendations.map((item) => (
								<div
									key={item.id}
									className="bg-white rounded-xl w-75 shadow-md overflow-hidden"
								>
									<div className="h-48 relative overflow-hidden">
										<img
											src={item.imageUrl}
											alt={item.title}
											className="w-full h-full object-cover object-top"
										/>
										{item.address && (
											<div className="absolute bottom-4 left-4">
												<Badge
													className={`${
														item ? "bg-green-500" : "bg-red-500"
													} text-white`}
												>
													{item ? "Open Now" : "Closed"}
												</Badge>
											</div>
										)}
									</div>
									<div className="p-4">
										<div className="flex flex-col">
											<div className="flex justify-between items-center">
												<span className="text-xs truncate font-medium text-indigo-600">
													{item.category}
												</span>
												{item.rating && (
													<div className="flex items-center">
														<StarFilled
															style={{ color: "oklch(85.2% 0.199 91.936)" }}
														/>
														<span className="font-medium">{item.rating}</span>
													</div>
												)}
											</div>
											<h3 className="font-semibold text-lg mt-1 truncate">
												{item.title}
											</h3>
										</div>
										{item.address && (
											<div className="mt-2 flex items-center text-gray-600">
												<EnvironmentOutlined className="mr-1" />
												<span className="text-sm">{item.address}</span>
											</div>
										)}
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
										{item.location && (
											<div className="mt-1 flex items-center text-gray-600">
												<EnvironmentOutlined className="mr-1" />
												<span className="text-sm">
													at{" "}
													<span className="text-indigo-600 hover:underline">
														{item.location}
													</span>
												</span>
											</div>
										)}
										{item.description && (
											<p className="text-sm mt-2 text-gray-600 line-clamp-2 whitespace-normal">
												{item.description}
											</p>
										)}
										<div className="mt-3 flex flex-wrap gap-2">
											{item.tags.map((tag, index) => (
												<Tag key={index}>{tag}</Tag>
											))}
										</div>
										{item.location && <div className='h-2' />}
										<Button type="primary" className="w-full mt-4">
											View Details
										</Button>
									</div>
								</div>
							))}
						</div>

						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}

export default Recommended;
