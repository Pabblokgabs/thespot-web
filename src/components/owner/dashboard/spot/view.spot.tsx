import { ChevronRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { useOwnerContext } from "@/lib/context/owner";
import { Btn } from "@/components";
import {
	FaBirthdayCake,
	FaCalendarPlus,
	FaChartLine,
	FaEdit,
	FaGlassCheers,
	FaGlobe,
	FaPowerOff,
	FaTrash,
	FaUserFriends,
} from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import {
	EnvironmentOutlined,
	MessageOutlined,
	PhoneOutlined,
} from "@ant-design/icons";
import { socialMediaIcons } from "@/lib/options";
import map from "@/assets/map.jpg";
import avatar from "@/assets/avatar.svg";
import { Tooltip } from "antd";
import { MdAddToPhotos } from "react-icons/md";

const ViewSpot: React.FC = () => {
	const {
		selectedSpot,
		setIsSpotView,
		setShowEditSpotModal,
		showFollowersModal,
		setActiveTab,
		setActiveEdit,
		setSelectedSpot,
	} = useOwnerContext();

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center mb-6">
				<Button
					variant="ghost"
					className="!rounded-button whitespace-nowrap cursor-pointer"
					onClick={() => {
						setIsSpotView(false);
					}}
				>
					<ChevronRight className="h-4 w-4 rotate-180 mr-2" />
					Back to Spots
				</Button>
				<Button
					onClick={() => {
						setShowEditSpotModal(true);
						setActiveEdit("basic");
					}}
					className="!rounded-button whitespace-nowrap cursor-pointer"
				>
					<FaEdit className="i-fa-solid-edit mr-2" />
					Edit Spot
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="col-span-1 md:col-span-2 lg:col-span3 space-y-6">
					<Card className="p-0 overflow-hidden">
						<div className="relative h-[250px] md:h-[400px]">
							<img
								src={selectedSpot.image}
								alt={selectedSpot.name}
								className="w-full h-full object-cover"
							/>
						</div>
						<CardContent className="p-6">
							<div className="flex justify-between items-start mb-4">
								<div>
									<h2 className="text-2xl font-bold mb-1">
										{selectedSpot.name}
									</h2>
									<p className="text-gray-500">{selectedSpot.location}</p>
								</div>
								<Badge
									className={
										selectedSpot.status === "active"
											? "bg-green-100 text-green-800"
											: "bg-amber-100 text-amber-800"
									}
								>
									{selectedSpot.status === "active" ? "Active" : "Maintenance"}
								</Badge>
							</div>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
								<div className="text-center p-4 bg-gray-50 rounded-lg">
									<p className="text-sm text-gray-500">Rating</p>
									<p className="text-xl font-bold flex items-center justify-center">
										{selectedSpot.rating}
										<span className="i-fa-solid-star text-amber-400 ml-1"></span>
									</p>
								</div>
								<div className="text-center p-4 bg-gray-50 rounded-lg">
									<p className="text-sm text-gray-500">Bookings</p>
									<p className="text-xl font-bold">{selectedSpot.bookings}</p>
								</div>
								<div className="text-center p-4 bg-gray-50 rounded-lg">
									<p className="text-sm text-gray-500">Revenue</p>
									<p className="text-xl font-bold">{selectedSpot.revenue}</p>
								</div>
								<div className="text-center p-4 bg-gray-50 rounded-lg">
									<p className="text-sm text-gray-500">Followers</p>
									<p className="text-xl font-bold">{7}</p>
								</div>
							</div>

							<div className="space-y-10">
								<div>
									<h3 className="text-lg font-semibold mb-2">Description</h3>
									<p className="text-gray-600">{selectedSpot.description}</p>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2">Location</h3>
									<div className="flex items-center space-x-2">
										<EnvironmentOutlined />
										<p className="text-gray-600">{selectedSpot.location}</p>
									</div>
								</div>

								<div>
									<div className="flex justify-between items-center mb-2">
										<h3 className="text-lg font-semibold">Contact & Socials</h3>
										<Button
											onClick={() => {
												setActiveEdit("contact");
												setShowEditSpotModal(true);
											}}
											className="cursor-pointer"
											variant={"outline"}
										>
											<Edit /> Edit
										</Button>
									</div>
									<div className="flex items-center space-x-2">
										<PhoneOutlined />
										<p className="text-gray-600">{selectedSpot.phone}</p>
									</div>
									<div className="flex items-center space-x-2">
										<FaGlobe />
										<a
											target="_blank"
											href={selectedSpot.website}
											className="text-gray-600"
										>
											{selectedSpot.website}
										</a>
									</div>
									<ul>
										{["facebook", "tiktok", "youtube"].map((social) => (
											<li>
												<a target="_blank" href="#">
													{socialMediaIcons(social)} {"  "}
													{social}
												</a>
											</li>
										))}
									</ul>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2">Amenities</h3>
									<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
										{selectedSpot.amenities?.map(
											(amenity: any, index: number) => (
												<div key={index} className="flex items-center">
													{/* {amenities.map((item) =>
														item.name.match(amenity.name) ? (
															item.icon
														) : (
															<AmbulanceIcon />
														)
													)} */}
													<span>{amenity.name}</span>
												</div>
											)
										)}
									</div>
								</div>

								<div>
									<div className="flex justify-between items-center mb-4">
										<h3 className="text-lg font-semibold">
											Hours of Operation
										</h3>
										<Button
											onClick={() => {
												setActiveEdit("hours");
												setShowEditSpotModal(true);
											}}
											className="cursor-pointer"
											variant={"outline"}
										>
											<Edit /> Change Time
										</Button>
									</div>
									<ul className="space-y-2">
										{selectedSpot.hours?.map((time: any) => (
											<li className="flex justify-between">
												<span className="font-medium">{time.day}</span>
												<span className="text-gray-600">{time.time}</span>
											</li>
										))}
									</ul>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2">Map Location</h3>
									<div className="mt-4 h-[300px] bg-gray-200 rounded-lg overflow-hidden">
										<img
											src={map}
											alt="Map location"
											className="w-full h-full object-cover"
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<CardTitle className="text-xl font-semibold">Media</CardTitle>
								<Button
									onClick={() => {
										setActiveEdit("media");
										setShowEditSpotModal(true);
									}}
									className="cursor-pointer"
									variant={"outline"}
								>
									<MdAddToPhotos /> Edit Media
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-3 gap-4">
								{selectedSpot.photos?.map((photo: string, index: number) => (
									<div
										key={index}
										className="relative aspect-video rounded-lg overflow-hidden"
									>
										<img
											src={photo}
											alt={`${selectedSpot.name} ${index + 1}`}
											className="w-full h-full object-cover"
										/>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="col-span-1 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Pricing</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<p className="text-sm text-gray-500">Base Rate</p>
									<p className="text-lg font-semibold">
										{selectedSpot.pricing?.base}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">Minimum Booking</p>
									<p className="text-lg font-semibold">
										{selectedSpot.pricing?.minimum}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">Security Deposit</p>
									<p className="text-lg font-semibold">
										{selectedSpot.pricing?.deposit}
									</p>
								</div>
								<Btn className="text-white" isAnimation text="Update Pricing" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Policies</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<p className="text-sm text-gray-500">Cancellation Policy</p>
									<p className="text-sm font-medium">
										{selectedSpot.policies?.cancellation}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Insurance Requirements
									</p>
									<p className="text-sm font-medium">
										{selectedSpot.policies?.insurance}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">Cleaning Fee</p>
									<p className="text-sm font-medium">
										{selectedSpot.policies?.cleaning}
									</p>
								</div>
								<Button
									variant="outline"
									className="w-full !rounded-button whitespace-nowrap cursor-pointer"
								>
									Edit Policies
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Staff Members</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{[1, 2, 3, 4].map((member, index) => (
									<div
										key={`${member + index}`}
										className="flex items-center gap-2"
									>
										<img
											src={avatar}
											alt={`${member}`}
											className="w-9 h-9 object-cover"
										/>
										<div className="flex-1">
											<h3 className="truncate font-medium">
												{"Pabblo" + member}
											</h3>
											<p className="truncate text-sm text-gray-500">
												{"Staff Member" + member}
											</p>
										</div>
										<div className="flex items-center gap-2.5">
											<Tooltip title="Messsage">
												<Button variant={"ghost"} className="cursor-pointer">
													<MessageOutlined />
												</Button>
											</Tooltip>
											<Tooltip title="Delete member">
												<Button
													variant={"ghost"}
													className="cursor-pointer text-red-400 hover:text-red-600"
												>
													<FaTrash />
												</Button>
											</Tooltip>
										</div>
									</div>
								))}
								<Button
									onClick={() => {
										setActiveTab("staff");
										setIsSpotView(false);
										setSelectedSpot([]);
									}}
									variant="outline"
									className="w-full !rounded-button whitespace-nowrap cursor-pointer"
								>
									Manage Members
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<Button
									variant="outline"
									className="w-full justify-start !rounded-button whitespace-nowrap cursor-pointer"
								>
									<FaCalendarPlus className="mr-2" />
									Create Booking
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start !rounded-button whitespace-nowrap cursor-pointer"
								>
									<FaChartLine className="mr-2" />
									View Analytics
								</Button>
								<Button
									onClick={() => showFollowersModal(selectedSpot)}
									variant="outline"
									className="w-full justify-start !rounded-button whitespace-nowrap cursor-pointer"
								>
									<FaUserFriends className="mr-2" />
									View Followers
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start !rounded-button whitespace-nowrap cursor-pointer"
								>
									<FaRegMessage className="mr-2" />
									Message Staff
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 !rounded-button whitespace-nowrap cursor-pointer"
								>
									<FaPowerOff className="mr-2" />
									Deactivate Spot
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Special Offers</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 mb-4">
								<div className="flex items-start">
									<FaGlassCheers className="text-purple-600 text-xl mt-1 mr-3" />
									<div>
										<h4 className="font-medium text-purple-800">Happy Hour</h4>
										<p className="text-sm text-purple-700">
											Mon-Fri, 4PM-7PM: 30% off all drinks
										</p>
									</div>
								</div>
							</div>
							<div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
								<div className="flex items-start">
									<FaBirthdayCake className="text-blue-600 text-xl mt-1 mr-3" />
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
							<div className="mt-5">
								<Btn
									isAnimation
									className="w-full text-white bg-gradient-to-r from-blue-600 to-purple-400"
								>
									Add New Special
								</Btn>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default ViewSpot;
