import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import img from "../../../assets/spots/cafe.jpg";
import noData from "@/assets/noproduct.svg";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { recommended } from "@/lib/options";
import { FaMapMarkedAlt, FaStar, FaThLarge } from "react-icons/fa";
import { MdAllInclusive } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Heart } from "lucide-react";
import { IoFilter } from "react-icons/io5";
import { Link } from "react-router-dom";
import { spots } from "@/lib/mock";
import { Modal } from "antd";

function Spots() {
	const [activeCategory, setActiveCategory] = useState("all");
	const [priceRange, setPriceRange] = useState([0, 100]);
	const [showMap, setShowMap] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const spotsPerPage = 9;
	const listingsRef = useRef<HTMLDivElement>(null);
	const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
	const [showFilterEvent, setShowFilterEvent] = useState<boolean>(false);

	useEffect(() => {
		setCurrentPage(1);
	}, [activeCategory]);

	const featuredSpots = spots.filter((spot) => spot.isFeatured);

	const filteredSpots =
		activeCategory === "all"
			? spots
			: spots.filter((spot) => spot.category.includes(activeCategory));

	return (
		<div className="bg-gray-50 lg:py-12">
			<div className="container mx-auto px-4">
				<div className="bg-gray-50 py-12">
					<div className="container mx-auto md:px-4">
						<div className="flex justify-between items-center mb-8">
							<h2 className="md:text-3xl text-xl font-bold text-gray-900">
								Recommended
							</h2>
							<Link
								to={"/"}
								className="!rounded-button whitespace-nowrap cursor-pointer text-sm text-indigo-400"
							>
								View all
							</Link>
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
									<Card className="overflow-hidden p-0 mb-11 bg-white h-full cursor-pointer hover:shadow-lg transition-shadow duration-300">
										<Link to={`/spot-details/${spot.id}`}>
											<div className="relative h-64">
												<img
													src={img}
													alt={spot.name}
													className="w-full h-full object-cover object-top"
												/>
												<div className="absolute top-4 right-4">
													<Button className="bg-white/80 backdrop-blur-sm rounded-full h-10 w-10 p-0 !rounded-button whitespace-nowrap cursor-pointer">
														<Heart className="text-neutral-700" />
													</Button>
												</div>
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
											<div className="p-5">
												<div className="flex justify-between items-start mb-2">
													<h3 className="text-xl font-bold text-gray-900 truncate">
														{spot.name}
													</h3>
													<div className="flex">
														<FaStar
															size={20}
															className="text-yellow-400 mr-1"
														/>
														<span className="font-medium text-gray-900">
															{spot.rating}
														</span>
														<span className="text-gray-500 font-medium ml-1">
															({spot.reviews})
														</span>
													</div>
												</div>
												<div className="flex items-center text-gray-500 text-sm mb-3">
													<Badge className="mr-2 bg-purple-400 text-white font-bold text-md capitalize">
														{spot.category}
													</Badge>
													<span className="font-medium">{spot.price}</span>
												</div>
												<p className="text-gray-600 mb-4 line-clamp-2 h-11">
													{spot.description}
												</p>
												<Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
													Book Now
												</Button>
											</div>
										</Link>
									</Card>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>

				<section className="mb-12 mt-15">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl lg:text-2xl font-bold text-black">
							Browse by Category
						</h2>
						<div className="flex space-x-2">
							<Button
								onClick={() => {
									setShowMap(false);
									setViewMode("grid");
								}}
								className={`!rounded-button ${
									viewMode === "grid"
										? "text-white bg-indigo-600 hover:bg-indigo-400"
										: "text-indigo-600 bg-transparent hover:bg-indigo-200"
								} whitespace-nowrap cursor-pointer border-2 border-indigo-600 hidden lg:flex`}
							>
								<FaThLarge
									className={`${
										viewMode === "grid" ? "text-white" : "text-indigo-600"
									}`}
								/>
								Grid
							</Button>
							<Button
								onClick={() => {
									setViewMode("map");
									setShowMap(!showMap);
								}}
								className={`!rounded-button ${
									viewMode === "map"
										? "text-white bg-indigo-600 hover:bg-indigo-400"
										: "text-indigo-600 bg-transparent hover:bg-indigo-200"
								} whitespace-nowrap cursor-pointer border-2 border-indigo-600 hidden lg:flex`}
							>
								<FaMapMarkedAlt
									className={`${
										viewMode === "map" ? "text-white" : "text-indigo-600"
									}`}
								/>
								Map View
							</Button>

							<Button
								onClick={() => setShowFilterEvent(true)}
								className=" text-indigo-600 active:bg-indigo-400 bg-transparent whitespace-nowrap cursor-pointer block lg:hidden"
							>
								<IoFilter size={20} />
							</Button>
						</div>
					</div>
					<ScrollArea className="w-full mt-2.5 lg:mt-0 whitespace-nowrap pb-4 overflow-x-auto">
						<div className="flex space-x-2 w-max">
							<Button
								key={"all"}
								onClick={() => setActiveCategory("all")}
								className={`!rounded-button ${
									activeCategory === "all"
										? "text-white bg-indigo-600 hover:bg-indigo-400"
										: "text-black hover:bg-indigo-400 bg-white"
								} whitespace-nowrap cursor-pointer`}
							>
								<MdAllInclusive size={24} className="text-orange-600" />
								All
							</Button>
							{recommended.map((category) => (
								<Button
									key={category.label}
									onClick={() => setActiveCategory(category.value)}
									className={`!rounded-button ${
										category.value === activeCategory
											? "text-white bg-indigo-600 hover:bg-indigo-400"
											: "text-black hover:bg-indigo-400 bg-white"
									} whitespace-nowrap cursor-pointer`}
								>
									{category.icon}
									{category.value}
								</Button>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</section>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filters Sidebar */}
					<div className="lg:w-1/4 hidden lg:block">
						<div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
							<h3 className="text-xl font-bold text-gray-900 mb-6">Filters</h3>
							<div className="mb-6">
								<h4 className="font-medium text-gray-900 mb-3">
									Distance From Me
								</h4>
								<div className="mb-4">
									<Slider
										defaultValue={[0, 10000]}
										max={10000}
										step={1}
										onValueChange={(value) => setPriceRange(value)}
									/>
								</div>
								<div className="flex justify-between text-sm text-gray-500">
									<span>1km</span>
									<span>2.5km</span>
									<span>5km</span>
									<span>10km</span>
								</div>
							</div>
							<div className="mb-6">
								<h4 className="font-medium text-gray-900 mb-3">Rating</h4>
								<div className="space-y-2">
									{[5, 4, 3, 2, 1].map((rating) => (
										<div key={rating} className="flex items-center">
											<input
												type="checkbox"
												id={`rating-${rating}`}
												className="mr-2"
											/>
											<label
												htmlFor={`rating-${rating}`}
												className="flex items-center"
											>
												{Array.from({ length: rating }).map((_, i) => (
													<FaStar
														key={i}
														className="fas fa-star text-yellow-400 mr-0.5"
													></FaStar>
												))}
												{Array.from({ length: 5 - rating }).map((_, i) => (
													<FaStar
														key={i}
														className=" text-neutral-300 mr-0.5"
													></FaStar>
												))}
												<span className="ml-1 text-gray-600">& up</span>
											</label>
										</div>
									))}
								</div>
							</div>
							<div className="mb-6">
								<h4 className="font-medium text-gray-900 mb-3">Features</h4>
								<div className="space-y-2">
									{[
										"Open Now",
										"Free Wifi",
										"Parking",
										"Outdoor Seating",
										"Pet Friendly",
									].map((feature) => (
										<div key={feature} className="flex items-center">
											<input
												type="checkbox"
												id={`feature-${feature}`}
												className="mr-2"
											/>
											<label
												htmlFor={`feature-${feature}`}
												className="text-gray-600"
											>
												{feature}
											</label>
										</div>
									))}
								</div>
							</div>
							<Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
								Apply Filters
							</Button>
						</div>
					</div>

					{/* Spots Grid */}
					<div className="lg:w-3/4">
						<div className="flex flex-col space-y-4 mb-6">
							<div className="flex justify-between items-center">
								<div className="flex items-center">
									<span className="text-gray-500 mr-2">Sort by:</span>
									<select className="border-none bg-transparent font-medium text-gray-900 cursor-pointer focus:ring-0">
										<option>All</option>
										<option>Highest Rated</option>
										<option>Following</option>
										<option>Not Following</option>
									</select>
								</div>
							</div>
						</div>
						{showMap ? (
							<div className="bg-white rounded-lg shadow-sm overflow-hidden h-[800px] relative">
								<div className="absolute inset-0 flex items-center justify-center bg-gray-100">
									<div className="text-center">
										<i className="fas fa-map-marked-alt text-6xl text-gray-300 mb-4"></i>
										<p className="text-gray-500">
											Map view would display here with all spots marked
										</p>
									</div>
								</div>
							</div>
						) : filteredSpots.length === 0 ? (
							<div className="bg-white rounded-lg shadow-sm overflow-hidden h-[400px] md:h-[800px] relative">
								<div className="absolute inset-0 flex items-center justify-center bg-white">
									<div className="flex flex-col justify-center items-center h-full w-full">
										<img
											src={noData}
											alt="No data"
											className=" w-[80%] h-[80%] md:w-[70%] md:h-[70%] lg:w-[60%] lg:h-[60%]"
										/>
										<span className="text-black font-bold text-xl capitalize">
											Oops! No Results for "{activeCategory}"
										</span>
									</div>
								</div>
							</div>
						) : (
							<div
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
								ref={listingsRef}
							>
								{filteredSpots
									.slice(
										(currentPage - 1) * spotsPerPage,
										currentPage * spotsPerPage
									)
									.map((spot) => (
										<Card
											key={spot.id}
											className="overflow-hidden p-0 bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300"
										>
											<Link to={`/spot-details/${spot.id}`}>
												<div className="relative h-48">
													<img
														src={img}
														alt={spot.name}
														className="w-full h-full object-cover object-top"
													/>
													<div className="absolute top-4 right-4">
														<Button
															variant="ghost"
															className="bg-white/80 backdrop-blur-sm rounded-full h-9 w-9 p-0 !rounded-button whitespace-nowrap cursor-pointer"
														>
															<i className="far fa-heart text-gray-700"></i>
														</Button>
													</div>
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
												<div className="p-4">
													<div className="flex justify-between items-start mb-2">
														<h3 className="text-lg font-bold text-gray-900 truncate">
															{spot.name}
														</h3>
														<div className="flex">
															<FaStar
																size={20}
																className="text-yellow-400 mr-1"
															/>
															<span className="font-medium text-black">
																{spot.rating}
															</span>
															<span className="text-gray-500 font-medium ml-1">
																({spot.reviews})
															</span>
														</div>
													</div>
													<div className="flex items-center text-neutral-500 text-sm mb-2">
														<Badge className="mr-2 bg-purple-400 text-white font-bold text-md capitalize">
															{spot.category}
														</Badge>
													</div>
													<p className="text-gray-600 text-sm mb-3 h-12 line-clamp-2">
														{spot.description}
													</p>
													<Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
														Book Now
													</Button>
												</div>
											</Link>
										</Card>
									))}
							</div>
						)}

						{/* Pagination */}
						{showMap || (
							<div className="flex justify-center mt-10">
								{filteredSpots.length > spotsPerPage && (
									<div className="flex space-x-1">
										<Button
											className="!rounded-button bg-transparent hover:bg-indigo-200 border-2 border-neutral-200 whitespace-nowrap cursor-pointer disabled:opacity-50"
											onClick={() => {
												if (currentPage > 1) {
													setCurrentPage((prev) => prev - 1);
													listingsRef.current?.scrollIntoView({
														behavior: "smooth",
													});
												}
											}}
											disabled={currentPage === 1}
										>
											<FaChevronLeft className="text-indigo-600" />
										</Button>

										{(() => {
											const totalPages = Math.ceil(
												filteredSpots.length / spotsPerPage
											);
											let startPage = Math.max(1, currentPage - 2);
											let endPage = Math.min(totalPages, startPage + 4);

											if (endPage - startPage < 4) {
												startPage = Math.max(1, endPage - 4);
											}

											return Array.from(
												{ length: endPage - startPage + 1 },
												(_, i) => startPage + i
											).map((page) => (
												<Button
													key={page}
													className={`!rounded-button whitespace-nowrap cursor-pointer ${
														currentPage === page
															? "text-white bg-indigo-600 hover:bg-indigo-200"
															: "text-black bg-transparent border-2 border-neutral-200 hover:bg-indigo-200"
													}`}
													onClick={() => {
														setCurrentPage(page);
														listingsRef.current?.scrollIntoView({
															behavior: "smooth",
														});
													}}
												>
													{page}
												</Button>
											));
										})()}

										<Button
											className="!rounded-button bg-transparent hover:bg-indigo-200 border-2 border-neutral-200 whitespace-nowrap cursor-pointer disabled:opacity-50"
											onClick={() => {
												const totalPages = Math.ceil(
													filteredSpots.length / spotsPerPage
												);
												if (currentPage < totalPages) {
													setCurrentPage((prev) => prev + 1);
													listingsRef.current?.scrollIntoView({
														behavior: "smooth",
													});
												}
											}}
											disabled={
												currentPage ===
												Math.ceil(filteredSpots.length / spotsPerPage)
											}
										>
											<FaChevronRight className="text-indigo-600" />
										</Button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			<Modal
				title="Filters"
				open={showFilterEvent}
				onCancel={() => {
					setShowFilterEvent(false);
				}}
				footer={null}
				width={640}
				className="top-8"
			>
				<div>
					<div className="my-6 ">
						<h4 className="font-medium text-gray-900 mb-3">Distance From Me</h4>
						<div className="mb-4">
							<Slider
								defaultValue={[0, 10000]}
								max={10000}
								step={1}
								onValueChange={(value) => setPriceRange(value)}
							/>
						</div>
						<div className="flex justify-between text-sm text-gray-500">
							<span>1km</span>
							<span>2.5km</span>
							<span>5km</span>
							<span>10km</span>
						</div>
					</div>
					<div className="mb-6">
						<h4 className="font-medium text-gray-900 mb-3">Rating</h4>
						<div className="space-y-2">
							{[5, 4, 3, 2, 1].map((rating) => (
								<div key={rating} className="flex items-center">
									<input
										type="checkbox"
										id={`rating-${rating}`}
										className="mr-2"
									/>
									<label
										htmlFor={`rating-${rating}`}
										className="flex items-center"
									>
										{Array.from({ length: rating }).map((_, i) => (
											<FaStar
												key={i}
												className="fas fa-star text-yellow-400 mr-0.5"
											></FaStar>
										))}
										{Array.from({ length: 5 - rating }).map((_, i) => (
											<FaStar
												key={i}
												className=" text-neutral-300 mr-0.5"
											></FaStar>
										))}
										<span className="ml-1 text-gray-600">& up</span>
									</label>
								</div>
							))}
						</div>
					</div>
					<div className="mb-6">
						<h4 className="font-medium text-gray-900 mb-3">Features</h4>
						<div className="space-y-2">
							{[
								"Open Now",
								"Free Wifi",
								"Parking",
								"Outdoor Seating",
								"Pet Friendly",
							].map((feature) => (
								<div key={feature} className="flex items-center">
									<input
										type="checkbox"
										id={`feature-${feature}`}
										className="mr-2"
									/>
									<label
										htmlFor={`feature-${feature}`}
										className="text-gray-600"
									>
										{feature}
									</label>
								</div>
							))}
						</div>
					</div>
					<Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
						Apply Filters
					</Button>
				</div>
			</Modal>
		</div>
	);
}

export default Spots;
