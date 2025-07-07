import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { useOwnerContext } from "@/lib/context/owner";
import { Btn } from "@/components";
import {
	FaCalendarPlus,
	FaChartLine,
	FaEdit,
	FaPowerOff,
} from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

const ViewSpot: React.FC = () => {
	const { selectedSpot, setIsSpotView, setShowEditSpotModal } =
		useOwnerContext();

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
					onClick={() => setShowEditSpotModal(true)}
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
							<div className="absolute bottom-4 right-4 flex gap-2">
								<Button
									variant="outline"
									size="sm"
									className="bg-white/90 !rounded-button whitespace-nowrap cursor-pointer"
								>
									<span className="i-fa-solid-image mr-2"></span>
									View All Photos
								</Button>
								<Button
									size="sm"
									className="!rounded-button whitespace-nowrap cursor-pointer"
								>
									<span className="i-fa-solid-plus mr-2"></span>
									Add Photos
								</Button>
							</div>
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

							<div className="grid grid-cols-3 gap-4 mb-6">
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
							</div>

							<div className="space-y-6">
								<div>
									<h3 className="text-lg font-semibold mb-2">Description</h3>
									<p className="text-gray-600">{selectedSpot.description}</p>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2">Capacity</h3>
									<p className="text-gray-600">{selectedSpot.location}</p>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2">Amenities</h3>
									<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
										{selectedSpot.amenities?.map((amenity, index) => (
											<div key={index} className="flex items-center">
												<i
													className={`fas ${amenity.icon} text-gray-600 mr-3`}
												></i>
												<span>{amenity.name}</span>
											</div>
										))}
									</div>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2">
										Hours of Operation
									</h3>
									<ul className="space-y-2">
										{selectedSpot.hours?.map((time) => (
											<li className="flex justify-between">
												<span className="font-medium">{time.day}</span>
												<span className="text-gray-600">{time.time}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Photos</CardTitle>
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
								<Btn isAnimation text="Update Pricing" />
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
				</div>
			</div>
		</div>
	);
};

export default ViewSpot;
