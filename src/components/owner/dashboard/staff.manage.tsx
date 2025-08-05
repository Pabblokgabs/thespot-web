import {
	Tag,
	Dropdown,
	List,
	Row,
	Col,
	Card,
	Button,
	Input,
	Typography,
	Tooltip,
} from "antd";
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
import {
	FaEdit,
	FaEllipsisH,
	FaEye,
	FaKey,
	FaPause,
	FaPlay,
	FaRedo,
	FaTimes,
	FaTrash,
	FaUserPlus,
} from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa6";
import toast from "react-hot-toast";
import { staffPermission } from "@/lib/options";
import { StaffDisplayCard } from "./display.card";
const { Title } = Typography;

const StaffContent = () => {
	const { setShowStaffModal, setStaffManageModal } = useOwnerContext();

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
	let isResend: boolean = false;
	const handleResend = () => {
		isResend = true;
		setTimeout(() => {
			isResend = false;
		}, 3000);
	};

	const handleCancelInvitation = () => {
		toast.success("Invitation Cancelled");
	};

	return (
		<div className="md:p-6">
			<div className="flex px-5 md:px-0 justify-between items-center mb-6 mt-4">
				<Title level={4} className="m-0 hidden md:block">
					Staff Management
				</Title>
				<h4 className="m-0 text-xl block md:hidden">Staff Management</h4>
				<Button
					onClick={() => {
						setShowStaffModal(true);
						setStaffManageModal("add_staff");
					}}
					type={window.innerWidth <= 768 ? "primary" : "default"}
				>
					<FaUserPlus className="mr-2" />
					<span className="hidden md:block">Add Staff Member</span>
					<span className="block md:hidden">Add New</span>
				</Button>
			</div>

			<div className="flex md:hidden px-5 mt-4 flex-col gap-2">
				<CardHeader className="p-0 m-0">
					<div className="flex flex-col mb-2">
						<div className="flex items-center space-x-2">
							<div className="w-full">
								<Input
									placeholder="Search staff member..."
									prefix={<SearchOutlined className="text-gray-400" />}
									className="w-full"
								/>
							</div>
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
								<Button type="default">
									Filter <FilterFilled />
								</Button>
							</Dropdown>
						</div>
					</div>
				</CardHeader>
				{staffMembers.map((staff) => (
					<StaffDisplayCard data={staff} />
				))}
			</div>

			<div className="grid mb-6  grid-cols-1 xl:grid-cols-3 gap-y-6 gap-x-0 xl:gap-y-0 xl:gap-x-6">
				<Card className="col-span-2 hidden md:block border-none m-0 md:border shadow-none md:shadow-md">
					<CardHeader className="p-0 m-0">
						<div className="flex flex-col md:flex-row md:justify-between md:items-center">
							<CardTitle>Staff Members</CardTitle>
							<div className="flex items-center space-x-2">
								<div className="w-full md:w-64">
									<Input
										placeholder="Search staff member..."
										prefix={<SearchOutlined className="text-gray-400" />}
										className="w-full"
									/>
								</div>
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
					<CardContent className="p-0 m-0">
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
														<FaEllipsisH />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem className="cursor-pointer">
														<FaEye className="mr-2" />
														<span>View Profile</span>
													</DropdownMenuItem>
													<DropdownMenuItem className="cursor-pointer">
														<FaEdit className="mr-2" />
														<span>Edit Permissions</span>
													</DropdownMenuItem>
													<DropdownMenuItem className="cursor-pointer">
														<FaKey className="mr-2" />
														<span>Reset Password</span>
													</DropdownMenuItem>
													{staff.status === "Active" && (
														<DropdownMenuItem className="cursor-pointer text-yellow-600">
															<FaPause className="fas fa-pause mr-2" />
															<span>Deactivate</span>
														</DropdownMenuItem>
													)}
													{staff.status === "Inactive" && (
														<DropdownMenuItem className="cursor-pointer text-green-600">
															<FaPlay className="mr-2" />
															<span>Activate</span>
														</DropdownMenuItem>
													)}
													<DropdownMenuItem className="cursor-pointer text-red-600">
														<FaTrash className="mr-2" />
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

				<div className="flex flex-col lg:flex-row xl:flex-col gap-y-6 md:gap-x-6 xl:gap-y-6">
					<Card className="flex-1 border-none m-0 md:border shadow-none md:shadow-md">
						<CardHeader className="p-0 m-0">
							<CardTitle>Staff Roles</CardTitle>
							<CardDescription>Manage staff permissions</CardDescription>
						</CardHeader>
						<CardContent className="p-0 m-0">
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
									{
										role: "Admin",
										description: "Reply Messages",
										count: 1,
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
											<Tooltip title="Edit">
												<Button
													type="default"
													className="cursor-pointer whitespace-nowrap !rounded-button"
												>
													<FaEdit className="text-gray-500" />
												</Button>
											</Tooltip>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="flex-1 border-none m-0 md:border shadow-none md:shadow-md">
						<CardHeader className="p-0 m-0">
							<CardTitle>Pending Invitations</CardTitle>
							<CardDescription>Staff awaiting confirmation</CardDescription>
						</CardHeader>
						<CardContent className="p-0 m-0">
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
										className="flex xs:flex-col sm:flex-row lg:flex-col xl:flex-row sm:justify-between lg:justify-start xl:justify-between sm:items-center md:items-start xl:items-center p-3 bg-white border border-gray-100 rounded-lg"
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
												onClick={() => handleResend()}
											>
												<FaRedo
													className={`mr-1 ${isResend && "animate-spin"}`}
												/>
												<span>Resend</span>
											</Button>
											<Tooltip title="Cancel invitation">
												<Button
													onClick={() => handleCancelInvitation()}
													danger
													type="default"
												>
													<FaTimes />
												</Button>
											</Tooltip>
										</div>
									</div>
								))}
								<Button
									onClick={() => {
										setShowStaffModal(true);
										setStaffManageModal("add_staff");
									}}
									type="default"
									className="cursor-pointer whitespace-nowrap !rounded-button"
								>
									<FaPaperPlane className="mr-2" />
									<span>Send New Invitation</span>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<Row gutter={24} className="gap-y-6 md:gap-y-0">
				<Col xs={24} md={12} xl={16}>
					<Card
						title="Role Permissions"
						className="border-none m-0 md:border shadow-none md:shadow-md"
						extra={
							<Button
								onClick={() => {
									setShowStaffModal(true);
									setStaffManageModal("edit_pms");
								}}
								type="link"
								className="cursor-pointer whitespace-nowrap !rounded-button"
							>
								Edit Permissions
							</Button>
						}
					>
						<div className="mb-6">
							<div className="font-medium mb-2">Manager</div>
							<div className="flex flex-wrap gap-2">
								{staffPermission.map((item) => (
									<Tag color="blue">{item}</Tag>
								))}
							</div>
						</div>
						<div className="mb-6">
							<div className="font-medium mb-2">Event Host</div>
							<div className="flex flex-wrap gap-2">
								{staffPermission.slice(0, 1).map((item) => (
									<Tag color="blue">{item}</Tag>
								))}
							</div>
						</div>
						<div className="mb-6">
							<div className="font-medium mb-2">Support Staff</div>
							<div className="flex flex-wrap gap-2">
								{staffPermission.slice(1, 2).map((item) => (
									<Tag color="blue">{item}</Tag>
								))}
							</div>
						</div>
						<div>
							<div className="font-medium mb-2">Admin</div>
							<div className="flex flex-wrap gap-2">
								{staffPermission.slice(2, 3).map((item) => (
									<Tag color="blue">{item}</Tag>
								))}
							</div>
						</div>
					</Card>
				</Col>
				<Col xs={24} md={12} xl={8}>
					<Card
						title="Recent Activities"
						className="border-none m-0 md:border shadow-none md:shadow-md"
					>
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
												<AvatarFallback>
													{item.title.substring(0, 1)}
												</AvatarFallback>
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
