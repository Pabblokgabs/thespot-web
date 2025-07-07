import {
	Calendar,
	ChevronDown,
	ChevronRight,
	MessageSquare,
	Plus,
	Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
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

const CalendarBookings = () => {
	const today = new Date().getDate();

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Bookings & Calendar</h1>
				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						className="!rounded-button whitespace-nowrap cursor-pointer"
					>
						<Calendar className="h-4 w-4 mr-2" />
						{new Date().toLocaleDateString("en-US", {
							weekday: "short",
							year: "numeric",
							month: "short",
							day: "numeric",
						})}
					</Button>
					<Button className="!rounded-button whitespace-nowrap cursor-pointer">
						<Plus className="h-4 w-4 mr-2" />
						Create Booking
					</Button>
				</div>
			</div>
			<Tabs defaultValue="calendar" className="w-full">
				<TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
					<TabsTrigger value="calendar">Calendar</TabsTrigger>
					<TabsTrigger value="list">List View</TabsTrigger>
					<TabsTrigger value="requests">Requests</TabsTrigger>
				</TabsList>
				<TabsContent value="calendar" className="mt-0">
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-4">
									<Button
										variant="outline"
										size="sm"
										className="!rounded-button whitespace-nowrap cursor-pointer"
									>
										<ChevronRight className="h-4 w-4 rotate-180" />
										Previous
									</Button>
									<h3 className="text-lg font-medium">June 2025</h3>
									<Button
										variant="outline"
										size="sm"
										className="!rounded-button whitespace-nowrap cursor-pointer"
									>
										Next
										<ChevronRight className="h-4 w-4 ml-1" />
									</Button>
								</div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											className="!rounded-button whitespace-nowrap cursor-pointer"
										>
											Filter by Spot
											<ChevronDown className="h-4 w-4 ml-2" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem>All Spots</DropdownMenuItem>
										<DropdownMenuItem>Riverside Restaurant</DropdownMenuItem>
										<DropdownMenuItem>Grand Ballroom</DropdownMenuItem>
										<DropdownMenuItem>Serenity Spa</DropdownMenuItem>
										<DropdownMenuItem>Community Church</DropdownMenuItem>
										<DropdownMenuItem>The Craft Lounge</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-7 gap-1">
								{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
									(day, i) => (
										<div
											key={i}
											className="text-center py-2 font-medium text-sm"
										>
											{day}
										</div>
									)
								)}
								{Array.from({ length: 35 }).map((_, i) => {
									const day = i - 5; // Offset to start month on correct day
									const isCurrentMonth = day > 0 && day <= 30;
									const isToday = day === today; 
									return (
										<div
											key={i}
											className={`
border rounded-md min-h-[100px] p-1 relative
${isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"}
${isToday ? "ring-2 ring-blue-500" : ""}
`}
										>
											<div className="text-right text-sm p-1">
												{isCurrentMonth ? day : ""}
											</div>
											{isCurrentMonth && day === 8 && (
												<div className="absolute top-8 left-1 right-1">
													<div className="bg-blue-100 text-blue-800 p-1 rounded text-xs mb-1 truncate">
														7:00 PM - Riverside Restaurant
													</div>
												</div>
											)}
											{isCurrentMonth && day === 10 && (
												<div className="absolute top-8 left-1 right-1">
													<div className="bg-purple-100 text-purple-800 p-1 rounded text-xs mb-1 truncate">
														2:00 PM - Grand Ballroom
													</div>
												</div>
											)}
											{isCurrentMonth && day === 12 && (
												<div className="absolute top-8 left-1 right-1">
													<div className="bg-green-100 text-green-800 p-1 rounded text-xs mb-1 truncate">
														10:00 AM - Serenity Spa
													</div>
												</div>
											)}
											{isCurrentMonth && day === 13 && (
												<div className="absolute top-8 left-1 right-1">
													<div className="bg-amber-100 text-amber-800 p-1 rounded text-xs mb-1 truncate">
														9:00 AM - Community Church
													</div>
												</div>
											)}
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="list" className="mt-0">
					<Card>
						<CardHeader>
							<div className="flex justify-between items-center">
								<CardTitle>All Bookings</CardTitle>
								<div className="flex items-center gap-3">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
										<Input
											placeholder="Search bookings..."
											className="pl-10 w-[250px]"
										/>
									</div>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="outline"
												size="sm"
												className="!rounded-button whitespace-nowrap cursor-pointer"
											>
												Status: All
												<ChevronDown className="h-4 w-4 ml-2" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem>All</DropdownMenuItem>
											<DropdownMenuItem>Confirmed</DropdownMenuItem>
											<DropdownMenuItem>Pending</DropdownMenuItem>
											<DropdownMenuItem>Cancelled</DropdownMenuItem>
											<DropdownMenuItem>Completed</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Client</TableHead>
										<TableHead>Spot</TableHead>
										<TableHead>Date & Time</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">
											<div className="flex items-center gap-2">
												<Avatar className="h-8 w-8">
													<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20brown%20hair%20and%20friendly%20smile%2C%20high%20quality%20portrait%20photo%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=avatar1&orientation=squarish" />
													<AvatarFallback>JD</AvatarFallback>
												</Avatar>
												<span>Jessica Davis</span>
											</div>
										</TableCell>
										<TableCell>Riverside Restaurant</TableCell>
										<TableCell>Jun 8, 2025 • 7:00 PM</TableCell>
										<TableCell>
											<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
												Confirmed
											</Badge>
										</TableCell>
										<TableCell>$345.00</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 !rounded-button cursor-pointer"
												>
													<span className="i-fa-solid-eye"></span>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 !rounded-button cursor-pointer"
												>
													<span className="i-fa-solid-message"></span>
												</Button>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 !rounded-button cursor-pointer"
														>
															<span className="i-fa-solid-ellipsis-vertical"></span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent>
														<DropdownMenuItem>Edit Booking</DropdownMenuItem>
														<DropdownMenuItem>Send Reminder</DropdownMenuItem>
														<DropdownMenuItem>Print Details</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem className="text-red-600">
															Cancel Booking
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											<div className="flex items-center gap-2">
												<Avatar className="h-8 w-8">
													<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
													<AvatarFallback>MT</AvatarFallback>
												</Avatar>
												<span>Michael Thompson</span>
											</div>
										</TableCell>
										<TableCell>Grand Ballroom</TableCell>
										<TableCell>Jun 10, 2025 • 2:00 PM</TableCell>
										<TableCell>
											<Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
												Pending
											</Badge>
										</TableCell>
										<TableCell>$1,200.00</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 !rounded-button cursor-pointer"
												>
													<span className="i-fa-solid-eye"></span>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 !rounded-button cursor-pointer"
												>
													<span className="i-fa-solid-message"></span>
												</Button>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 !rounded-button cursor-pointer"
														>
															<span className="i-fa-solid-ellipsis-vertical"></span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent>
														<DropdownMenuItem>Edit Booking</DropdownMenuItem>
														<DropdownMenuItem>Send Reminder</DropdownMenuItem>
														<DropdownMenuItem>Print Details</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem className="text-red-600">
															Cancel Booking
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											<div className="flex items-center gap-2">
												<Avatar className="h-8 w-8">
													<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20blonde%20hair%20in%20business%20attire%2C%20clean%20studio%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar3&orientation=squarish" />
													<AvatarFallback>SW</AvatarFallback>
												</Avatar>
												<span>Sarah Wilson</span>
											</div>
										</TableCell>
										<TableCell>Serenity Spa</TableCell>
										<TableCell>Jun 12, 2025 • 10:00 AM</TableCell>
										<TableCell>
											<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
												Confirmed
											</Badge>
										</TableCell>
										<TableCell>$180.00</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 !rounded-button cursor-pointer"
												>
													<span className="i-fa-solid-eye"></span>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 !rounded-button cursor-pointer"
												>
													<span className="i-fa-solid-message"></span>
												</Button>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 !rounded-button cursor-pointer"
														>
															<span className="i-fa-solid-ellipsis-vertical"></span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent>
														<DropdownMenuItem>Edit Booking</DropdownMenuItem>
														<DropdownMenuItem>Send Reminder</DropdownMenuItem>
														<DropdownMenuItem>Print Details</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem className="text-red-600">
															Cancel Booking
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											<div className="flex items-center gap-2">
												<Avatar className="h-8 w-8">
													<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20older%20man%20with%20gray%20hair%20and%20beard%2C%20wearing%20formal%20attire%2C%20neutral%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20photo&width=100&height=100&seq=avatar4&orientation=squarish" />
													<AvatarFallback>RJ</AvatarFallback>
												</Avatar>
												<span>Robert Johnson</span>
											</div>
										</TableCell>
										<TableCell>Community Church</TableCell>
										<TableCell>Jun 13, 2025 • 9:00 AM</TableCell>
										<TableCell>
											<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
												Confirmed
											</Badge>
										</TableCell>
										<TableCell>$0.00</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 !rounded-button cursor-pointer"
												>
													<span className="i-fa-solid-eye"></span>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 !rounded-button cursor-pointer"
												>
													<span className="i-fa-solid-message"></span>
												</Button>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 !rounded-button cursor-pointer"
														>
															<span className="i-fa-solid-ellipsis-vertical"></span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent>
														<DropdownMenuItem>Edit Booking</DropdownMenuItem>
														<DropdownMenuItem>Send Reminder</DropdownMenuItem>
														<DropdownMenuItem>Print Details</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem className="text-red-600">
															Cancel Booking
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											<div className="flex items-center gap-2">
												<Avatar className="h-8 w-8">
													<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20man%20with%20dark%20hair%20and%20casual%20business%20attire%2C%20neutral%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20photo&width=100&height=100&seq=avatar5&orientation=squarish" />
													<AvatarFallback>DM</AvatarFallback>
												</Avatar>
												<span>David Miller</span>
											</div>
										</TableCell>
										<TableCell>The Craft Lounge</TableCell>
										<TableCell>Jun 15, 2025 • 8:30 PM</TableCell>
										<TableCell>
											<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
												Confirmed
											</Badge>
										</TableCell>
										<TableCell>$220.00</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 !rounded-button cursor-pointer"
												>
													<span className="i-fa-solid-eye"></span>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 !rounded-button cursor-pointer"
												>
													<span className="i-fa-solid-message"></span>
												</Button>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 !rounded-button cursor-pointer"
														>
															<span className="i-fa-solid-ellipsis-vertical"></span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent>
														<DropdownMenuItem>Edit Booking</DropdownMenuItem>
														<DropdownMenuItem>Send Reminder</DropdownMenuItem>
														<DropdownMenuItem>Print Details</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem className="text-red-600">
															Cancel Booking
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="requests" className="mt-0">
					<Card>
						<CardHeader>
							<CardTitle>Booking Requests</CardTitle>
							<CardDescription>
								Review and respond to pending booking requests
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="border rounded-lg p-4">
									<div className="flex justify-between items-start">
										<div className="flex gap-4">
											<Avatar className="h-12 w-12">
												<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
												<AvatarFallback>MT</AvatarFallback>
											</Avatar>
											<div>
												<h3 className="font-medium">Michael Thompson</h3>
												<p className="text-sm text-gray-500">
													Corporate Event • 50 guests
												</p>
												<div className="flex items-center mt-1">
													<Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
														Pending
													</Badge>
													<span className="text-sm text-gray-500 ml-2">
														Requested 2 hours ago
													</span>
												</div>
											</div>
										</div>
										<div className="text-right">
											<p className="font-medium">Grand Ballroom</p>
											<p className="text-sm">
												Jun 10, 2025 • 2:00 PM - 8:00 PM
											</p>
											<p className="font-medium mt-1">$1,200.00</p>
										</div>
									</div>
									<p className="text-sm mt-4">
										"We're hosting our annual company meeting and would like to
										book the Grand Ballroom. We'll need A/V equipment setup and
										catering options. Looking forward to your response."
									</p>
									<div className="flex justify-end gap-3 mt-4">
										<Button
											variant="outline"
											className="!rounded-button whitespace-nowrap cursor-pointer"
										>
											<MessageSquare className="h-4 w-4 mr-2" />
											Message
										</Button>
										<Button
											variant="outline"
											className="!rounded-button whitespace-nowrap cursor-pointer"
										>
											Request Details
										</Button>
										<Button
											variant="outline"
											className="!rounded-button whitespace-nowrap cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
										>
											Decline
										</Button>
										<Button className="!rounded-button whitespace-nowrap cursor-pointer">
											Accept
										</Button>
									</div>
								</div>
								<div className="border rounded-lg p-4">
									<div className="flex justify-between items-start">
										<div className="flex gap-4">
											<Avatar className="h-12 w-12">
												<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20red%20hair%20and%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20photo&width=100&height=100&seq=avatar6&orientation=squarish" />
												<AvatarFallback>EW</AvatarFallback>
											</Avatar>
											<div>
												<h3 className="font-medium">Emma Wilson</h3>
												<p className="text-sm text-gray-500">
													Birthday Celebration • 15 guests
												</p>
												<div className="flex items-center mt-1">
													<Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
														Pending
													</Badge>
													<span className="text-sm text-gray-500 ml-2">
														Requested 5 hours ago
													</span>
												</div>
											</div>
										</div>
										<div className="text-right">
											<p className="font-medium">The Craft Lounge</p>
											<p className="text-sm">
												Jun 18, 2025 • 7:00 PM - 11:00 PM
											</p>
											<p className="font-medium mt-1">$450.00</p>
										</div>
									</div>
									<p className="text-sm mt-4">
										"Looking to celebrate my 30th birthday with friends. Would
										love to reserve a section of the lounge with drink service.
										Do you offer any birthday packages?"
									</p>
									<div className="flex justify-end gap-3 mt-4">
										<Button
											variant="outline"
											className="!rounded-button whitespace-nowrap cursor-pointer"
										>
											<MessageSquare className="h-4 w-4 mr-2" />
											Message
										</Button>
										<Button
											variant="outline"
											className="!rounded-button whitespace-nowrap cursor-pointer"
										>
											Request Details
										</Button>
										<Button
											variant="outline"
											className="!rounded-button whitespace-nowrap cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
										>
											Decline
										</Button>
										<Button className="!rounded-button whitespace-nowrap cursor-pointer">
											Accept
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default CalendarBookings;
