import {
	CalendarOutlined,
	EnvironmentOutlined,
	HeartOutlined,
	RightOutlined,
	ShareAltOutlined,
	StarFilled,
} from "@ant-design/icons";
import { Badge } from "@/components/ui/badge";
import { Button, Carousel, Tag, Tooltip } from "antd";
import img from "@/assets/spot/1.jpg";
import img2 from "@/assets/spot/2.jpg";
import { tagColors } from "@/lib/options";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function TrendingNow() {
	const trendingSpots = [
		{
			id: 1,
			title: "The Rooftop Garden",
			category: "Restaurant",
			rating: 4.8,
			tags: ["Outdoor", "Cocktails"],
			imageUrl: img2,
		},
		{
			id: 2,
			title: "Neon Arcade Bar",
			category: "Entertainment",
			rating: 4.6,
			tags: ["Games", "Drinks"],
			imageUrl: img2,
		},
		{
			id: 3,
			title: "Artisan Coffee House",
			category: "Cafe",
			rating: 4.9,
			tags: ["Coffee", "Pastries"],
			imageUrl: img2,
		},
		{
			id: 4,
			title: "Urban Art Gallery",
			category: "Arts & Culture",
			rating: 4.7,
			tags: ["Exhibits", "Free Entry"],
			imageUrl: img2,
		},
	];

	const trendingEvents = [
		{
			id: "event1",
			title: "Summer Music Festival",
			date: "July 15-17, 2025",
			location: "Central Park",
			image: img,
			category: "Music",
			price: "$$",
		},
		{
			id: "event2",
			title: "Food & Wine Expo",
			date: "June 28-30, 2025",
			location: "Metropolitan Convention Center",
			image: img,
			category: "Food",
			price: "$$$",
		},
		{
			id: "event3",
			title: "Contemporary Art Exhibition",
			date: "July 1-30, 2025",
			location: "Modern Art Gallery",
			image: img,
			category: "Arts",
			price: "$",
		},
	];

	return (
		<section className=" mt-12 md:my-12">
			<div className="container mx-auto px-4">
				<Carousel autoplay className="rounded-xl overflow-hidden">
					{trendingEvents.map((event) => (
						<div key={event.id} className="relative h-100">
							<div
								className="absolute inset-0 bg-cover bg-center"
								style={{ backgroundImage: `url(${event.image})` }}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
							<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
								<div className="flex justify-between items-center mb-2">
									<Tag
										color="blue"
										className="bg-blue-600/80 border-0 text-white"
									>
										{event.category}
									</Tag>
								</div>
								<h3 className="text-2xl font-bold mb-2">{event.title}</h3>
								<div className="flex items-center mb-2">
									<CalendarOutlined className="mr-2" />
									<span>{event.date}</span>
								</div>
								<div className="flex items-center">
									<EnvironmentOutlined className="mr-2" />
									<span>{event.location}</span>
								</div>
								<div className="flex mt-8 space-x-3">
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
					))}
				</Carousel>

				<div className="my-12">
					<div className="flex justify-between items-center mb-4">
						<h2 className="md:text-2xl font-bold">Trending Now</h2>
						<Button
							type="link"
							className="flex items-center !rounded-button whitespace-nowrap cursor-pointer"
						>
							See All <RightOutlined className="ml-1" />
						</Button>
					</div>
					<div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{trendingSpots.map((spot) => (
							<div
								key={spot.id}
								className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
							>
								<Link to={""} className="cursor-pointer">
									<div className="h-48 relative overflow-hidden">
										<img
											src={spot.imageUrl}
											alt={spot.title}
											className="w-full h-full object-cover object-top"
										/>
										<div className="absolute bottom-4 left-4">
											<Badge
												className={`${
													spot ? "bg-green-500" : "bg-red-500"
												} text-white`}
											>
												{spot ? "Open Now" : "Closed"}
											</Badge>
										</div>
									</div>
									<div className="px-4 pt-4">
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
												<StarFilled
													style={{ color: "oklch(85.2% 0.199 91.936)" }}
													className="mr-1"
												/>
												<span className="font-medium">{spot.rating}</span>
											</div>
										</div>
										<div className="mt-3 flex flex-wrap gap-2">
											{spot.tags.map((tag: string, index) => (
												<Tag key={index}>
													{tag}
												</Tag>
											))}
										</div>
										<p className="mt-2 text-neutral-400 text-sm line-clamp-2">
											The best culinary experience I've had in years. Chef
											Isabella's tasting menu is a journey through flavors that
											will leave you speechless.
										</p>
									</div>
								</Link>

								<div className="p-4 flex justify-between">
									<Tooltip title="Follow">
										<Button
											type="text"
											icon={<HeartOutlined />}
											className="!rounded-button whitespace-nowrap cursor-pointer"
										/>
									</Tooltip>
									<Tooltip title="Share">
										<Button
											type="text"
											icon={<ShareAltOutlined />}
											className="!rounded-button whitespace-nowrap cursor-pointer"
										/>
									</Tooltip>
								</div>
							</div>
						))}
					</div>

					<ScrollArea className="w-full block md:hidden whitespace-nowrap overflow-x-auto">
						<div className="flex h-ful w-full px-1 space-x-4 mb-6">
							{trendingSpots.map((spot) => (
								<div
									key={spot.id}
									className="bg-white rounded-xl shadow-md overflow-hidden w-75"
								>
									<Link to={""} className="cursor-pointer">
										<div className="h-48 relative overflow-hidden">
											<img
												src={spot.imageUrl}
												alt={spot.title}
												className="w-full h-full object-cover object-top"
											/>
											<div className="absolute bottom-4 left-4">
												<Badge
													className={`${
														spot ? "bg-green-500" : "bg-red-500"
													} text-white`}
												>
													{spot ? "Open Now" : "Closed"}
												</Badge>
											</div>
										</div>
										<div className="px-4 pt-4">
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
													<StarFilled
														style={{ color: "oklch(85.2% 0.199 91.936)" }}
														className="mr-1"
													/>
													<span className="font-medium">{spot.rating}</span>
												</div>
											</div>
											<div className="mt-3 flex flex-wrap gap-2">
												{spot.tags.map((tag: string, index) => (
													<Tag color={tagColors(tag)} key={index}>
														{tag}
													</Tag>
												))}
											</div>
											<p className="mt-2 text-neutral-400 text-sm line-clamp-2">
												The best culinary experience I've had in years. Chef
												Isabella's tasting menu is a journey through flavors
												that will leave you speechless.
											</p>
										</div>
									</Link>

									<div className="p-4 flex justify-between">
										<Tooltip title="Follow">
											<Button
												type="text"
												icon={<HeartOutlined />}
												className="!rounded-button whitespace-nowrap cursor-pointer"
											/>
										</Tooltip>
										<Tooltip title="Share">
											<Button
												type="text"
												icon={<ShareAltOutlined />}
												className="!rounded-button whitespace-nowrap cursor-pointer"
											/>
										</Tooltip>
									</div>
								</div>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>
			</div>
		</section>
	);
}

export default TrendingNow;
