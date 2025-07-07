import { Badge } from "@/components/ui/badge";
import img from "@/assets/spots/night.jpg";

import { Link } from "react-router-dom";
import { spots } from "@/lib/mock";
import { Button, Tag } from "antd";
import {
	CalendarOutlined,
	ClockCircleOutlined,
	EnvironmentOutlined,
	RightOutlined,
} from "@ant-design/icons";
import Btn from "../btn";
import { FaUsers } from "react-icons/fa";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function AllEventsHomeComponent() {
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

	return (
		<div>
			<div className="container mx-auto px-4">
				{/* Upcoming Events */}
				<div className="mb-12">
					<div className="flex justify-between items-center mb-4">
						<h2 className="md:text-2xl font-bold">Upcoming Events Near You</h2>
						<Button
							type="link"
							className="flex items-center !rounded-button whitespace-nowrap cursor-pointer"
						>
							See All <RightOutlined className="ml-1" />
						</Button>
					</div>
					<div className="hidden md:grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{upcomingEvents.map((event) => (
							<div
								key={event.id}
								className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
							>
								<div className="h-48 relative overflow-hidden">
									<img
										src={event.imageUrl}
										alt={event.title}
										className="w-full h-full object-cover object-top"
									/>
									<div className="absolute top-3 right-3">
										<Badge className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
											<FaUsers className="mr-1" />
											{1000}+ going
										</Badge>
									</div>
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
									<div className="mt-1 flex items-center text-gray-600">
										<EnvironmentOutlined className="mr-1" />
										<span className="text-sm">
											at{" "}
											<span className="text-indigo-600 cursor-pointer hover:underline">
												{"dijong lifestyle"}
											</span>
										</span>
									</div>
									<div className="mt-3 flex flex-wrap gap-2 mb-4">
										{event.tags.map((tag, index) => (
											<Tag key={index}>{tag}</Tag>
										))}
									</div>
									<Link to={""}>
										<Btn
											isAnimation
											text="RSVP"
											className="text-white cursor-pointer"
										/>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>

				<ScrollArea className="w-full block md:hidden whitespace-nowrap overflow-x-auto">
					<div className="flex h-ful w-full px-1 space-x-4 mb-6">
						{upcomingEvents.map((event) => (
							<div
								key={event.id}
								className="bg-white rounded-xl shadow-md overflow-hidden w-75"
							>
								<div className="h-48 relative overflow-hidden">
									<img
										src={event.imageUrl}
										alt={event.title}
										className="w-full h-full object-cover object-top"
									/>
									<div className="absolute top-3 right-3">
										<Badge className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
											<FaUsers className="mr-1" />
											{1000}+ going
										</Badge>
									</div>
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
									<div className="mt-1 flex items-center text-gray-600">
										<EnvironmentOutlined className="mr-1" />
										<span className="text-sm">
											at{" "}
											<span className="text-indigo-600 cursor-pointer hover:underline">
												{"dijong lifestyle"}
											</span>
										</span>
									</div>
									<div className="mt-3 flex flex-wrap gap-2 mb-4">
										{event.tags.map((tag, index) => (
											<Tag key={index}>{tag}</Tag>
										))}
									</div>
									<Link to={""}>
										<Btn
											isAnimation
											text="RSVP"
											className="text-white cursor-pointer"
										/>
									</Link>
								</div>
							</div>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>

				<div className="mb-10">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-bold">Summer Events</h2>
						<Button
							type="link"
							className="flex items-center !rounded-button whitespace-nowrap"
						>
							View all <RightOutlined className="ml-1" />
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="relative rounded-xl overflow-hidden h-64 cursor-pointer group">
							<img
								src="https://readdy.ai/api/search-image?query=Outdoor%20summer%20music%20festival%20with%20large%20crowd%20enjoying%20concert%2C%20stage%20with%20performers%2C%20colorful%20lighting%2C%20sunset%20atmosphere%2C%20people%20dancing%2C%20festival%20atmosphere%2C%20high%20quality%20professional%20photography&width=600&height=400&seq=16&orientation=landscape"
								alt="Summer Music Festivals"
								className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
							<div className="absolute bottom-0 left-0 right-0 p-5">
								<h3 className="text-xl font-bold text-white mb-1">
									Summer Music Festivals
								</h3>
								<p className="text-white/80">15 upcoming events</p>
							</div>
						</div>
						<div className="relative rounded-xl overflow-hidden h-64 cursor-pointer group">
							<img
								src="https://readdy.ai/api/search-image?query=Outdoor%20rooftop%20pool%20party%20with%20people%20swimming%20and%20socializing%2C%20city%20skyline%20view%2C%20summer%20atmosphere%2C%20cocktails%2C%20lounge%20chairs%2C%20evening%20lighting%2C%20high%20quality%20professional%20photography&width=600&height=400&seq=17&orientation=landscape"
								alt="Rooftop Pool Parties"
								className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
							<div className="absolute bottom-0 left-0 right-0 p-5">
								<h3 className="text-xl font-bold text-white mb-1">
									Rooftop Pool Parties
								</h3>
								<p className="text-white/80">8 upcoming events</p>
							</div>
						</div>
					</div>
				</div>

				{/* New Additions */}
				<div className="mb-10">
					<div className="flex justify-between items-center mb-4">
						<h2 className="md:text-2xl font-bold">Just Added</h2>
						<Button
							type="link"
							className="flex items-center !rounded-button whitespace-nowrap"
						>
							View all <RightOutlined className="ml-1" />
						</Button>
					</div>

					<div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{spots.slice(0, 4).map((venue, index) => (
							<div
								key={`new-${index}`}
								className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
							>
								<div className="relative h-40">
									<img
										src={img}
										alt={venue.name}
										className="w-full h-full object-cover object-top"
									/>
									<div className="absolute top-3 left-3">
										<Tag
											color="red"
											className="rounded-full px-3 py-1 text-xs font-medium"
										>
											NEW
										</Tag>
									</div>
								</div>
								<div className="p-3">
									<div className="flex items-center mb-2.5 justify-between">
										<span className="truncate text-sm font-medium text-indigo-600">
											{venue.category}
										</span>
										<span className="text-sm text-neutral-600">0.2km</span>
									</div>
									<h3 className="text-base font-semibold line-clamp-1 mb-1">
										{venue.name}
									</h3>
									<div className="flex items-center text-gray-500 text-xs">
										<EnvironmentOutlined className="mr-1" />
										<span>{"mantshancha zone 14"}</span>
									</div>
									<p className="text-gray-600 text-sm mb-4 line-clamp-2 mt-2 h-10">
										The best culinary experience I've had in years. Chef
										Isabella's tasting menu is a journey through flavors that
										will leave you speechless.
									</p>
								</div>
							</div>
						))}
					</div>

					<ScrollArea className="w-full block md:hidden whitespace-nowrap overflow-x-auto">
						<div className="flex h-ful w-full px-1 space-x-4 mb-6">
							{spots.slice(0, 4).map((venue, index) => (
								<div
									key={`new-${index}`}
									className="bg-white rounded-xl overflow-hidden shadow-md w-75"
								>
									<div className="relative h-40">
										<img
											src={img}
											alt={venue.name}
											className="w-full h-full object-cover object-top"
										/>
										<div className="absolute top-3 left-3">
											<Tag
												color="red"
												className="rounded-full px-3 py-1 text-xs font-medium"
											>
												NEW
											</Tag>
										</div>
									</div>
									<div className="p-3">
										<div className="flex items-center mb-2.5 justify-between">
											<span className="truncate text-sm font-medium text-indigo-600">
												{venue.category}
											</span>
											<span className="text-sm text-neutral-600">0.2km</span>
										</div>
										<h3 className="text-base font-semibold line-clamp-1 mb-1">
											{venue.name}
										</h3>
										<div className="flex items-center text-gray-500 text-xs">
											<EnvironmentOutlined className="mr-1" />
											<span>{"mantshancha zone 14"}</span>
										</div>
										<p className="text-gray-600 text-sm mb-4 line-clamp-2 mt-2 h-10 whitespace-normal">
											The best culinary experience I've had in years. Chef
											Isabella's tasting menu is a journey through flavors that
											will leave you speechless.
										</p>

										<Button type="primary" className="w-full">
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

export default AllEventsHomeComponent;
