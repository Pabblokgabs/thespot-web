import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useOwnerContext } from "@/lib/context/owner";
import { mySpots } from "@/lib/mock";
import {
	FaArrowRight,
	FaChartLine,
	FaCog,
	FaEdit,
	FaEllipsisH,
	FaMapMarkerAlt,
	FaStar,
	FaTrash,
	FaUserFriends,
	FaUsers,
	FaEye,
	FaCalendarAlt,
	FaList,
	FaThLarge,
} from "react-icons/fa";
import { Button, Tooltip } from "antd";
import ViewSpot from "./view.spot";
import SpotNav from "./spot.nav";

function SpotsContent() {
	const {
		showFollowersModal,
		isSpotView,
		setIsSpotView,
		setSelectedSpot,
		setShowEditSpotModal,
	} = useOwnerContext();

	const ShowSpotContent = () => {
		return (
			<div className="space-y-6 p-2 md:p-6">
				<SpotNav />
				<Tabs defaultValue="grid" className="w-full hidden md:block">
					<div className="flex justify-between items-center">
						<TabsList>
							<TabsTrigger
								value="grid"
								className="!rounded-button whitespace-nowrap"
							>
								<FaThLarge className="mr-2" />
								<span>Grid View</span>
							</TabsTrigger>
							<TabsTrigger
								value="list"
								className="!rounded-button whitespace-nowrap"
							>
								<FaList className="mr-2" />
								<span>List View</span>
							</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent value="grid" className="mt-6 p-2 md:p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{mySpots.map((spot, index) => (
								<Card
									key={index}
									className="overflow-hidden border-none shadow-sm p-0 pb-6"
								>
									<div className="relative h-48 overflow-hidden">
										<img
											src={spot.image}
											alt={spot.name}
											className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
										/>
										<div className="absolute top-3 left-3">
											<Badge className="bg-purple-600 text-white">
												{spot.type}
											</Badge>
										</div>
										<div className="absolute top-3 right-3">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														type="default"
														className="cursor-pointer !rounded-button whitespace-nowrap"
													>
														<FaEllipsisH className="text-gray-700" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() => {
															setIsSpotView(true);
															setSelectedSpot(spot);
															setShowEditSpotModal(true);
														}}
														className="cursor-pointer"
													>
														<FaEdit className="mr-2" />
														<span>Edit Spot</span>
													</DropdownMenuItem>
													<DropdownMenuItem className="cursor-pointer">
														<FaCalendarAlt className="mr-2" />
														<span>View Bookings</span>
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => showFollowersModal(spot)}
														className="cursor-pointer"
													>
														<FaUserFriends className="mr-2" />
														<span>View Followers</span>
													</DropdownMenuItem>
													<DropdownMenuItem className="cursor-pointer">
														<FaChartLine className="mr-2" />
														<span>Analytics</span>
													</DropdownMenuItem>
													<DropdownMenuItem className="cursor-pointer text-red-600">
														<FaTrash className="mr-2" />
														<span>Delete</span>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>
									<CardHeader className="pb-2">
										<CardTitle>{spot.name}</CardTitle>
										<div className="flex items-center text-gray-500">
											<FaMapMarkerAlt className="mr-1" /> {spot.location}
										</div>
									</CardHeader>
									<CardContent className="pb-3">
										<div className="grid grid-cols-4 gap-2 text-sm">
											<div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
												<div className="text-gray-500 mb-1">Rating</div>
												<div className="font-semibold flex items-center">
													<FaStar className="text-amber-500 mr-1" />
													{spot.rating}
												</div>
											</div>
											<div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
												<div className="text-gray-500 mb-1">Bookings</div>
												<div className="font-semibold">{spot.bookings}</div>
											</div>
											<div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
												<div className="text-gray-500 mb-1">Revenue</div>
												<div className="font-semibold">{spot.revenue}</div>
											</div>
											<div
												onClick={() => showFollowersModal(spot)}
												className="flex flex-col items-center p-2 bg-indigo-50 rounded-lg cursor-pointer group"
											>
												<div className="text-indigo-500 mb-1 group-hover:text-indigo-700 group-hover:underline">
													Followers
												</div>
												<div className="font-semibold flex items-center">
													{spot.followers}
													<span className="text-green-600 text-xs ml-1">
														{spot.followerGrowth}
													</span>
												</div>
											</div>
										</div>
									</CardContent>
									<CardFooter className="pt-0">
										<Button
											onClick={() => {
												setIsSpotView(true);
												setSelectedSpot(spot);
											}}
											type="primary"
											className="cursor-pointer w-full !rounded-button whitespace-nowrap"
										>
											<span>Manage Spot</span>
											<FaArrowRight className="ml-2 text-xs" />
										</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					</TabsContent>
					<TabsContent value="list" className="mt-6 p-2 md:p-6">
						<Card className="border-none shadow-sm">
							<CardContent className="p-0">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Spot</TableHead>
											<TableHead>Type</TableHead>
											<TableHead>Location</TableHead>
											<TableHead>Rating</TableHead>
											<TableHead>Bookings</TableHead>
											<TableHead>Revenue</TableHead>
											<TableHead>Followers</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{mySpots.map((spot, index) => (
											<TableRow key={index}>
												<TableCell>
													<div className="flex items-center">
														<div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
															<img
																src={spot.image}
																alt={spot.name}
																className="w-full h-full object-cover object-top"
															/>
														</div>
														<span className="font-medium">{spot.name}</span>
													</div>
												</TableCell>
												<TableCell>
													<Badge
														variant="outline"
														className="bg-gray-100 text-gray-800 border-0"
													>
														{spot.type}
													</Badge>
												</TableCell>
												<TableCell>{spot.location}</TableCell>
												<TableCell>
													<div className="flex items-center">
														<FaStar className="text-amber-500 mr-1" />
														<span>{spot.rating}</span>
													</div>
												</TableCell>
												<TableCell>{spot.bookings}</TableCell>
												<TableCell>{spot.revenue}</TableCell>
												<TableCell>
													<div className="flex items-center">
														<span className="font-medium">
															{spot.followers}
														</span>
														<span className="text-green-600 text-xs ml-1">
															{spot.followerGrowth}
														</span>
													</div>
												</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end space-x-2">
														<Button
															type="default"
															className="cursor-pointer !rounded-button whitespace-nowrap"
														>
															<Tooltip title="Edit">
																<FaEdit />
															</Tooltip>
														</Button>
														<Button
															type="default"
															className="cursor-pointer !rounded-button whitespace-nowrap"
														>
															<Tooltip title="View Bookings">
																<FaCalendarAlt />
															</Tooltip>
														</Button>
														<Button
															type="default"
															className="cursor-pointer !rounded-button whitespace-nowrap"
														>
															<Tooltip title="View Followers">
																<FaUsers />
															</Tooltip>
														</Button>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	type="text"
																	className="cursor-pointer !rounded-button whitespace-nowrap"
																>
																	<FaEllipsisH />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem className="cursor-pointer">
																	<FaEye className="mr-2" />
																	<span>View Details</span>
																</DropdownMenuItem>
																<DropdownMenuItem className="cursor-pointer">
																	<FaUsers className="mr-2" />
																	<span>Manage Staff</span>
																</DropdownMenuItem>
																<DropdownMenuItem className="cursor-pointer">
																	<FaChartLine className="mr-2" />
																	<span>Analytics</span>
																</DropdownMenuItem>
																<DropdownMenuItem className="cursor-pointer">
																	<FaCog className="mr-2" />
																	<span>Settings</span>
																</DropdownMenuItem>
																<DropdownMenuItem className="cursor-pointer text-red-600">
																	<FaTrash className="mr-2" />
																	<span>Delete</span>
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
				<div className="grid md:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mySpots.map((spot, index) => (
						<Card
							key={index}
							className="overflow-hidden border-none shadow-sm p-0 pb-6"
						>
							<div className="relative h-48 overflow-hidden">
								<img
									src={spot.image}
									alt={spot.name}
									className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
								/>
								<div className="absolute top-3 left-3">
									<Badge className="bg-purple-400 text-gray-800">
										{spot.type}
									</Badge>
								</div>
								<div className="absolute top-3 right-3">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												type="default"
												className="cursor-pointer !rounded-button whitespace-nowrap"
											>
												<FaEllipsisH className="text-gray-700" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem className="cursor-pointer">
												<FaEdit className="mr-2" />
												<span>Edit Spot</span>
											</DropdownMenuItem>
											<DropdownMenuItem className="cursor-pointer">
												<FaCalendarAlt className="mr-2" />
												<span>View Bookings</span>
											</DropdownMenuItem>
											<DropdownMenuItem className="cursor-pointer">
												<FaUserFriends className="mr-2" />
												<span>Manage Followers</span>
											</DropdownMenuItem>
											<DropdownMenuItem className="cursor-pointer">
												<FaChartLine className="mr-2" />
												<span>Analytics</span>
											</DropdownMenuItem>
											<DropdownMenuItem className="cursor-pointer text-red-600">
												<FaTrash className="mr-2" />
												<span>Delete</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
							<CardHeader className="pb-2">
								<CardTitle>{spot.name}</CardTitle>
								<div className="flex items-center text-gray-500">
									<FaMapMarkerAlt className="mr-1" /> {spot.location}
								</div>
							</CardHeader>
							<CardContent className="pb-3">
								<div className="grid grid-cols-4 gap-2 text-sm">
									<div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
										<div className="text-gray-500 mb-1">Rating</div>
										<div className="font-semibold flex items-center">
											<FaStar className="text-amber-500 mr-1" />
											{spot.rating}
										</div>
									</div>
									<div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
										<div className="text-gray-500 mb-1">Bookings</div>
										<div className="font-semibold">{spot.bookings}</div>
									</div>
									<div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
										<div className="text-gray-500 mb-1">Revenue</div>
										<div className="font-semibold">{spot.revenue}</div>
									</div>
									<div
										onClick={() => showFollowersModal(spot)}
										className="flex flex-col items-center p-2 bg-indigo-50 rounded-lg cursor-pointer group"
									>
										<div className="text-indigo-500 mb-1 group-hover:text-indigo-700 group-hover:underline">
											Followers
										</div>
										<div className="font-semibold flex items-center">
											{spot.followers}
											<span className="text-green-600 text-xs ml-1">
												{spot.followerGrowth}
											</span>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter className="pt-0">
								<Button
									onClick={() => {
										setIsSpotView(true);
										setSelectedSpot(spot);
									}}
									type="primary"
									className="cursor-pointer w-full !rounded-button whitespace-nowrap"
								>
									<span>Manage Spot</span>
									<FaArrowRight className="ml-2 text-xs" />
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		);
	};

	const rendeDisplay = () => {
		switch (isSpotView) {
			case true:
				return <ViewSpot />;
			default:
				return ShowSpotContent();
		}
	};

	return rendeDisplay();
}

export default SpotsContent;
