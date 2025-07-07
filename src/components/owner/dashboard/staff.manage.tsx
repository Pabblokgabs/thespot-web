import { Tag, Dropdown, List, Row, Col, Card, Button, Input,Typography } from "antd";
import { useOwnerContext } from "@/lib/context/owner";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { staffMembers } from "@/lib/mock";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const { Title } = Typography;

const StaffContent = () => {
	const { setShowStaffModal } = useOwnerContext();

	const bargeColor = (status: string) => {
		switch (status) {
			case "Inactive":
				return "bg-gray-100 text-green-800";
			case "Active":
				return "bg-green-100 text-gray-800";
			case "Pending":
				return "bg-yellow-100 text-yellow-800";
		}
	};

	return (
		<div className="space-y-6 p-2 md:p-6">
			<div className="flex items-center justify-between">
				<Title level={4} >Staff Management</Title>
				<Button
					onClick={() => setShowStaffModal(true)}
					className="bg-blue-600 hover:bg-blue-700 !rounded-button whitespace-nowrap"
				>
					<i className="fas fa-user-plus mr-2"/>
					<span className='hidden md:block'>Add Staff Member</span>
					<span className='block md:hidden'>Add New</span>
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card className="col-span-2 border-none shadow-sm">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Staff Members</CardTitle>
							<div className="flex items-center space-x-2">
								<Input
									placeholder="Search staff member..."
									prefix={<SearchOutlined className="text-gray-400" />}
									className="w-64"
								/>
								<Dropdown
									menu={{
										items: [
											{ key: "1", label: "All Staff" },
											{ key: "2", label: "Managers" },
											{ key: "3", label: "Support" },
											{ key: "4", label: "Event Hosts" },
											{ key: "5", label: "Active Only" },
										],
									}}
									trigger={["click"]}
								>
									<Button
										type="default"
										className="cursor-pointer whitespace-nowrap !rounded-button"
									>
										Filter <FilterFilled />
									</Button>
								</Dropdown>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Spots Assigned</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Last Active</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{staffMembers.map((staff, index) => (
									<TableRow key={index}>
										<TableCell>
											<div className="flex items-center">
												<Avatar className="h-8 w-8 mr-2">
													<AvatarImage src={staff.avatar} />
													<AvatarFallback>
														{staff.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<span>{staff.name}</span>
											</div>
										</TableCell>
										<TableCell>{staff.role}</TableCell>
										<TableCell>
											{staff.spots.map((spot, i) => (
												<Badge
													key={i}
													variant="outline"
													className="bg-blue-50 text-blue-700 border-0 mr-1"
												>
													{spot}
												</Badge>
											))}
										</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className={bargeColor(staff.status)}
											>
												{staff.status}
											</Badge>
										</TableCell>
										<TableCell>{staff.lastActive}</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														type="default"
														className="cursor-pointer whitespace-nowrap !rounded-button"
													>
														<i className="fas fa-ellipsis-h"/>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem className="cursor-pointer">
														<i className="fas fa-eye mr-2"/>
														<span>View Profile</span>
													</DropdownMenuItem>
													<DropdownMenuItem className="cursor-pointer">
														<i className="fas fa-edit mr-2"/>
														<span>Edit Permissions</span>
													</DropdownMenuItem>
													<DropdownMenuItem className="cursor-pointer">
														<i className="fas fa-key mr-2"/>
														<span>Reset Password</span>
													</DropdownMenuItem>
													{staff.status === "Active" && (
														<DropdownMenuItem className="cursor-pointer text-yellow-600">
															<i className="fas fa-pause mr-2"/>
															<span>Deactivate</span>
														</DropdownMenuItem>
													)}
													{staff.status === "Inactive" && (
														<DropdownMenuItem className="cursor-pointer text-green-600">
															<i className="fas fa-play mr-2"/>
															<span>Activate</span>
														</DropdownMenuItem>
													)}
													<DropdownMenuItem className="cursor-pointer text-red-600">
														<i className="fas fa-trash mr-2"/>
														<span>Remove</span>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<div>
					<Card className=" border-none shadow-sm">
						<CardHeader>
							<CardTitle>Staff Roles</CardTitle>
							<CardDescription>Manage staff permissions</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{[
									{
										role: "Manager",
										description: "Full access to all features",
										count: 2,
									},
									{
										role: "Event Host",
										description: "Manage events and bookings",
										count: 1,
									},
									{
										role: "Support",
										description: "Handle customer inquiries",
										count: 2,
									},
								].map((role, index) => (
									<div
										key={index}
										className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg"
									>
										<div>
											<h3 className="font-medium">{role.role}</h3>
											<p className="text-sm text-gray-500">
												{role.description}
											</p>
										</div>
										<div className="flex items-center">
											<Badge
												variant="outline"
												className="mr-3 bg-blue-50 text-blue-700 border-0"
											>
												{role.count} members
											</Badge>
											<Button
												type="default"
												className="cursor-pointer whitespace-nowrap !rounded-button"
											>
												<i className="fas fa-edit text-gray-500"/>
											</Button>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
					<div className="h-6" />
					<Card className="border-none shadow-sm">
						<CardHeader>
							<CardTitle>Pending Invitations</CardTitle>
							<CardDescription>Staff awaiting confirmation</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{[
									{
										email: "james.wilson@example.com",
										role: "Manager",
										sent: "Jun 5, 2025",
									},
									{
										email: "anna.brown@example.com",
										role: "Support",
										sent: "Jun 6, 2025",
									},
								].map((invitation, index) => (
									<div
										key={index}
										className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg"
									>
										<div>
											<h3 className="font-medium">{invitation.email}</h3>
											<div className="flex items-center text-sm">
												<span className="text-gray-500">
													Role: {invitation.role}
												</span>
												<span className="mx-2 text-gray-300">•</span>
												<span className="text-gray-500">
													Sent: {invitation.sent}
												</span>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<Button
												type="default"
												className="cursor-pointer whitespace-nowrap !rounded-button"
											>
												<i className="fas fa-redo-alt mr-1"/>
												<span>Resend</span>
											</Button>
											<Button
												type="default"
												className="cursor-pointer whitespace-nowrap !rounded-button"
											>
												<i className="fas fa-times text-red-600 "/>
											</Button>
										</div>
									</div>
								))}
								<Button
									onClick={() => setShowStaffModal(true)}
									type="default"
									className="cursor-pointer whitespace-nowrap !rounded-button"
								>
									<i className="fas fa-paper-plane mr-2"/>
									<span>Send New Invitation</span>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<Row gutter={24}>
				<Col xs={24} lg={16}>
					<Card
						title="Role Permissions"
						className="shadow-sm h-full"
						extra={
							<Button
								type="link"
								className="cursor-pointer whitespace-nowrap !rounded-button"
							>
								Edit Permissions
							</Button>
						}
					>
						<div className="mb-6">
							<div className="font-medium mb-2">Manager</div>
							<div className="flex flex-wrap">
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									Manage Bookings
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									Manage Staff
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									View Analytics
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									Process Payments
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									Edit Spot Details
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									Manage Events
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									Manage Followers
								</Tag>
							</div>
						</div>
						<div className="mb-6">
							<div className="font-medium mb-2">Event Host</div>
							<div className="flex flex-wrap">
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									Manage Bookings
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									View Calendar
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									Reply to Messages
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									Manage Events
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									View Followers
								</Tag>
							</div>
						</div>
						<div>
							<div className="font-medium mb-2">Support Staff</div>
							<div className="flex flex-wrap">
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									View Bookings
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									View Calendar
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									Reply to Messages
								</Tag>
								<Tag
									color="blue"
									className="mb-2 mr-2 whitespace-nowrap !rounded-button"
								>
									View Followers
								</Tag>
							</div>
						</div>
					</Card>
				</Col>
				<Col xs={24} lg={8}>
					<Card title="Recent Activities" className="shadow-sm h-full">
						<List
							itemLayout="horizontal"
							dataSource={[
								{
									title: "David Miller accepted invitation",
									time: "2 hours ago",
									avatar:
										"https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20man%20with%20short%20blonde%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20lighting%2C%20soft%20focus%2C%20corporate%20headshot%20style&width=40&height=40&seq=17&orientation=squarish",
								},
								{
									title: "Jessica Lee updated her profile",
									time: "Yesterday",
									avatar:
										"https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20woman%20with%20medium%20length%20red%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20lighting%2C%20soft%20focus%2C%20corporate%20headshot%20style&width=40&height=40&seq=18&orientation=squarish",
								},
								{
									title: "Thomas Chen was assigned to Urban Spa Retreat",
									time: "2 days ago",
									avatar:
										"https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20asian%20man%20with%20black%20hair%2C%20business%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20lighting%2C%20soft%20focus%2C%20corporate%20headshot%20style&width=40&height=40&seq=19&orientation=squarish",
								},
								{
									title: "Emma Wilson changed role from Support to Manager",
									time: "3 days ago",
									avatar:
										"https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20blonde%20hair%20in%20a%20ponytail%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20lighting%2C%20soft%20focus%2C%20corporate%20headshot%20style&width=40&height=40&seq=20&orientation=squarish",
								},
								{
									title: "Michael Rodriguez was invited to join",
									time: "4 days ago",
									avatar:
										"https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20latino%20man%20with%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20high%20quality%20portrait%2C%20professional%20lighting%2C%20soft%20focus%2C%20corporate%20headshot%20style&width=40&height=40&seq=21&orientation=squarish",
								},
							]}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										avatar={
											<Avatar>
												<AvatarImage src={item.avatar} />
											</Avatar>
										}
										title={item.title}
										description={item.time}
									/>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default StaffContent;
