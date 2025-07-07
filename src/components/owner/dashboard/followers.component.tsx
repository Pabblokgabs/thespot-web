import { Button } from "antd";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import {
	FaArrowRight,
	FaChartLine,
	FaEllipsisH,
	FaEnvelope,
	FaEye,
	FaFilter,
	FaGift,
	FaHandshake,
	FaPlus,
	FaStar,
	FaUserTag,
} from "react-icons/fa";

function FollowersComponent() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<Card className="col-span-2 border-none shadow-sm">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Followers Overview</CardTitle>
							<CardDescription>Manage your community</CardDescription>
						</div>
						<div className="flex items-center space-x-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										type="default"
										className="cursor-pointer whitespace-nowrap !rounded-button"
									>
										<FaFilter className="mr-2" />
										<span>Filter</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem className="cursor-pointer">
										All Followers
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer">
										Influencers
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer">
										Most Active
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer">
										Recent Followers
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer">
										By Spot
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Follower</TableHead>
								<TableHead>Following</TableHead>
								<TableHead>Since</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Engagement</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{[
								{
									user: {
										name: "Jessica Parker",
										img: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20woman%20with%20curly%20hair%2C%20casual%20style%2C%20friendly%20smile%2C%20urban%20background%2C%20photorealistic%2C%20high%20quality&width=40&height=40&seq=follower1&orientation=squarish",
										isInfluencer: true,
									},
									following: ["Coastal Retreat", "Urban Lounge"],
									since: "Mar 15, 2025",
									status: "Active",
									statusColor: "bg-green-100 text-green-800",
									engagement: "High",
								},
								{
									user: {
										name: "Thomas Wright",
										img: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20middle%20aged%20man%20with%20beard%2C%20casual%20attire%2C%20friendly%20expression%2C%20outdoor%20setting%2C%20photorealistic%2C%20high%20quality&width=40&height=40&seq=follower2&orientation=squarish",
										isInfluencer: false,
									},
									following: ["Urban Lounge"],
									since: "Apr 2, 2025",
									status: "Active",
									statusColor: "bg-green-100 text-green-800",
									engagement: "Medium",
								},
								{
									user: {
										name: "Olivia Martinez",
										img: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20latina%20woman%20in%20her%2020s%2C%20stylish%20appearance%2C%20confident%20pose%2C%20city%20background%2C%20photorealistic%2C%20high%20quality&width=40&height=40&seq=follower3&orientation=squarish",
										isInfluencer: true,
									},
									following: ["Sunset Restaurant", "Harmony Spa"],
									since: "Jan 8, 2025",
									status: "Active",
									statusColor: "bg-green-100 text-green-800",
									engagement: "High",
								},
								{
									user: {
										name: "Daniel Lee",
										img: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20asian%20man%2C%20casual%20modern%20style%2C%20smiling%2C%20urban%20setting%2C%20photorealistic%2C%20high%20quality&width=40&height=40&seq=follower4&orientation=squarish",
										isInfluencer: false,
									},
									following: ["Event Center"],
									since: "May 12, 2025",
									status: "Inactive",
									statusColor: "bg-gray-100 text-gray-800",
									engagement: "Low",
								},
								{
									user: {
										name: "Rachel Green",
										img: "https://readdy.ai/api/search-image?query=portrait%20of%20a%20woman%20with%20blonde%20hair%2C%20professional%20appearance%2C%20friendly%20smile%2C%20office%20background%2C%20photorealistic%2C%20high%20quality&width=40&height=40&seq=follower5&orientation=squarish",
										isInfluencer: false,
									},
									following: ["Harmony Spa"],
									since: "Feb 20, 2025",
									status: "Active",
									statusColor: "bg-green-100 text-green-800",
									engagement: "Medium",
								},
							].map((follower, index) => (
								<TableRow key={index}>
									<TableCell>
										<div className="flex items-center">
											<Avatar className="h-8 w-8 mr-2">
												<AvatarImage src={follower.user.img} />
												<AvatarFallback>
													{follower.user.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<div>
												<div className="flex items-center">
													<span>{follower.user.name}</span>
													{follower.user.isInfluencer && (
														<Badge className="ml-2 bg-purple-100 text-purple-800 border-0">
															<FaStar className="text-xs mr-1" />
															Influencer
														</Badge>
													)}
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-1">
											{follower.following.map((spot, i) => (
												<Badge
													key={i}
													variant="outline"
													className="bg-blue-50 text-blue-700 border-0"
												>
													{spot}
												</Badge>
											))}
										</div>
									</TableCell>
									<TableCell>{follower.since}</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={`${follower.statusColor} border-0`}
										>
											{follower.status}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={`
    ${
			follower.engagement === "High"
				? "bg-green-100 text-green-800"
				: follower.engagement === "Medium"
				? "bg-blue-100 text-blue-800"
				: "bg-gray-100 text-gray-800"
		} border-0
    `}
										>
											{follower.engagement}
										</Badge>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end space-x-2">
											<Button
												type="default"
												className="cursor-pointer whitespace-nowrap !rounded-button"
											>
												<FaEnvelope className="text-gray-600" />
											</Button>
											<Button
												type="default"
												className="cursor-pointer whitespace-nowrap !rounded-button"
											>
												<FaUserTag className="text-gray-600" />
											</Button>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														type="default"
														className="cursor-pointer whitespace-nowrap !rounded-button"
													>
														<FaEllipsisH className="text-gray-600" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem className="cursor-pointer">
														<FaEye className="mr-2" />
														<span>View Profile</span>
													</DropdownMenuItem>
													<DropdownMenuItem className="cursor-pointer">
														<FaChartLine className="mr-2" />
														<span>Engagement History</span>
													</DropdownMenuItem>
													<DropdownMenuItem className="cursor-pointer">
														<FaGift className="fas fa-gift mr-2" />
														<span>Send Offer</span>
													</DropdownMenuItem>
													{follower.user.isInfluencer ? (
														<DropdownMenuItem className="cursor-pointer text-purple-600">
															<FaHandshake className="mr-2" />
															<span>Manage Partnership</span>
														</DropdownMenuItem>
													) : (
														<DropdownMenuItem className="cursor-pointer text-purple-600">
															<FaStar className="mr-2" />
															<span>Mark as Influencer</span>
														</DropdownMenuItem>
													)}
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className="flex justify-center border-t pt-4">
					<Button
						type="default"
						className="cursor-pointer whitespace-nowrap !rounded-button"
					>
						<span>View All Followers</span>
						<FaArrowRight className="ml-2 text-xs" />
					</Button>
				</CardFooter>
			</Card>
			<div className="space-y-6">
				<Card className="border-none shadow-sm">
					<CardHeader>
						<CardTitle>Follower Demographics</CardTitle>
						<CardDescription>Audience insights</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<div className="flex justify-between mb-1 text-sm">
									<span className="font-medium">Age Groups</span>
								</div>
								<div className="space-y-2">
									{[
										{ label: "18-24", value: 22 },
										{ label: "25-34", value: 38 },
										{ label: "35-44", value: 25 },
										{ label: "45-54", value: 10 },
										{ label: "55+", value: 5 },
									].map((item, index) => (
										<div key={index} className="flex items-center">
											<span className="w-12 text-sm text-gray-600">
												{item.label}
											</span>
											<div className="flex-1 mx-2">
												<div className="h-2 bg-gray-100 rounded-full overflow-hidden">
													<div
														className="h-full bg-indigo-600 rounded-full"
														style={{ width: `${item.value}%` }}
													></div>
												</div>
											</div>
											<span className="text-sm font-medium">{item.value}%</span>
										</div>
									))}
								</div>
							</div>
							<div className="w-full">
								<div className="flex justify-between mb-1 text-sm">
									<span className="font-medium">Gender</span>
								</div>
								<div className="flex items-center">
									<div className="w-32 h-32 mx-auto">
										<div className="relative w-full h-full rounded-full overflow-hidden">
											<div className="absolute inset-0 flex">
												<div
													className="bg-blue-500 h-full"
													style={{ width: "45%" }}
												></div>
												<div
													className="bg-pink-500 h-full"
													style={{ width: "42%" }}
												></div>
												<div
													className="bg-purple-500 h-full"
													style={{ width: "13%" }}
												></div>
											</div>
										</div>
									</div>
								</div>
								<div className="flex justify-center space-x-4 mt-2">
									<div className="flex items-center">
										<div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
										<span className="text-sm">Male (45%)</span>
									</div>
									<div className="flex items-center">
										<div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
										<span className="text-sm">Female (42%)</span>
									</div>
									<div className="flex items-center">
										<div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
										<span className="text-sm">Other (13%)</span>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className="border-none shadow-sm hidden md:block">
					<CardHeader>
						<CardTitle>Recent Campaigns</CardTitle>
						<CardDescription>Follower engagement initiatives</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4 w-full">
							{[
								{
									title: "Summer Special Offer",
									spot: "Coastal Retreat",
									date: "Jun 1, 2025",
									status: "Active",
									statusColor: "bg-green-100 text-green-800",
									engagement: "24%",
									trend: "up",
								},
								{
									title: "Weekend Happy Hour",
									spot: "Urban Lounge",
									date: "May 25, 2025",
									status: "Active",
									statusColor: "bg-green-100 text-green-800",
									engagement: "18%",
									trend: "up",
								},
								{
									title: "Spa Day Promotion",
									spot: "Harmony Spa",
									date: "May 15, 2025",
									status: "Completed",
									statusColor: "bg-blue-100 text-blue-800",
									engagement: "32%",
									trend: "up",
								},
							].map((campaign, index) => (
								<div
									key={index}
									className="flex flex-col md:flex-row justify-between md:items-center p-3 bg-white border border-gray-100 rounded-lg"
								>
									<div>
										<h3 className="font-medium">{campaign.title}</h3>
										<div className="flex items-center text-sm">
											<span className="text-gray-500">{campaign.spot}</span>
											<span className="mx-2 text-gray-300">•</span>
											<span className="text-gray-500">{campaign.date}</span>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<Badge
											variant="outline"
											className={`${campaign.statusColor} border-0`}
										>
											{campaign.status}
										</Badge>
										<div className="flex items-center">
											<span className="font-medium">{campaign.engagement}</span>
											<i
												className={`fas fa-arrow-${
													campaign.trend
												} ml-1 text-xs ${
													campaign.trend === "up"
														? "text-green-600"
														: "text-red-600"
												}`}
											></i>
										</div>
									</div>
								</div>
							))}
							<Button
								type="primary"
								className="cursor-pointer whitespace-nowrap !rounded-button w-full"
							>
								<FaPlus className="fas fa-plus mr-2" />
								<span>Create New Campaign</span>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default FollowersComponent;
