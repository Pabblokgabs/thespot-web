import {
	Avatar,
	Input,
	Button,
	Card,
	Dropdown,
	Tooltip,
	Statistic,
	Progress,
	Typography,
	Row,
	Col,
	Divider,
} from "antd";
import {
	SearchOutlined,
	PlusOutlined,
	DownOutlined,
	EnvironmentOutlined,
	DollarOutlined,
	CloseSquareOutlined,
} from "@ant-design/icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { events } from "@/lib/mock";
import { FaEllipsisH } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { useOwnerContext } from "@/lib/context/owner";
const { Title } = Typography;

const EventsContent = () => {
	const { setShowCreateEventModal } = useOwnerContext();

	return (
		<div className="p-2 md:p-6">
			<div className="flex justify-between items-center mb-6">
				<Title level={4} className="m-0">
					Event Management
				</Title>
				<Button
					onClick={() => setShowCreateEventModal(true)}
					type="primary"
					icon={<PlusOutlined />}
					className="cursor-pointer whitespace-nowrap !rounded-button"
				>
					Create Event
				</Button>
			</div>
			<Row gutter={[24, 24]}>
				{/* Stats Cards */}
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Total Events"
							value={12}
							prefix={
								<i className="fas fa-calendar-star text-blue-600 mr-1"></i>
							}
							valueStyle={{ color: "#2563EB" }}
						/>
						<div className="mt-2 text-xs text-gray-500">
							<span className="text-green-500">↑ 4</span> from last month
						</div>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Total Bookings"
							value={336}
							prefix={<i className="fas fa-ticket-alt text-blue-600 mr-1"></i>}
							valueStyle={{ color: "#2563EB" }}
						/>
						<div className="mt-2 text-xs text-gray-500">
							<span className="text-green-500">↑ 25%</span> from last month
						</div>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Revenue"
							value={28750}
							prefix={<DollarOutlined className="text-blue-600 mr-1" />}
							valueStyle={{ color: "#2563EB" }}
							precision={2}
						/>
						<div className="mt-2 text-xs text-gray-500">
							<span className="text-green-500">↑ 18%</span> from last month
						</div>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Avg. Capacity Filled"
							value={82}
							suffix="%"
							prefix={<i className="fas fa-users text-blue-600 mr-1"></i>}
							valueStyle={{ color: "#2563EB" }}
						/>
						<div className="mt-2 text-xs text-gray-500">
							<span className="text-green-500">↑ 5%</span> from last month
						</div>
					</Card>
				</Col>
				{/* Event Filters */}
				<Col xs={24}>
					<Card className="shadow-sm mb-6">
						<div className="flex flex-wrap gap-4 items-center">
							<Input
								placeholder="Search events"
								prefix={<SearchOutlined className="text-gray-400" />}
								className="w-64"
							/>
							<Dropdown
								menu={{
									items: [
										{ key: "1", label: "All Types" },
										{ key: "2", label: "Music" },
										{ key: "3", label: "Networking" },
										{ key: "4", label: "Food & Wine" },
										{ key: "5", label: "Workshop" },
									],
								}}
								trigger={["click"]}
							>
								<Button className="cursor-pointer whitespace-nowrap !rounded-button">
									Event Type <DownOutlined />
								</Button>
							</Dropdown>
							<Dropdown
								menu={{
									items: [
										{ key: "1", label: "All Spots" },
										{ key: "2", label: "Rooftop Bar" },
										{ key: "3", label: "Downtown Event Hall" },
										{ key: "4", label: "Seaside Restaurant" },
										{ key: "5", label: "Urban Spa Retreat" },
									],
								}}
								trigger={["click"]}
							>
								<Button className="cursor-pointer whitespace-nowrap !rounded-button">
									Location <DownOutlined />
								</Button>
							</Dropdown>
							<Dropdown
								menu={{
									items: [
										{ key: "1", label: "All Status" },
										{ key: "2", label: "Upcoming" },
										{ key: "3", label: "Ongoing" },
										{ key: "4", label: "Completed" },
										{ key: "5", label: "Cancelled" },
									],
								}}
								trigger={["click"]}
							>
								<Button className="cursor-pointer whitespace-nowrap !rounded-button">
									Status <DownOutlined />
								</Button>
							</Dropdown>
							<Button
								type="default"
								icon={<i className="fas fa-calendar-alt"></i>}
								className="cursor-pointer whitespace-nowrap !rounded-button"
							>
								Calendar View
							</Button>
						</div>
					</Card>
				</Col>
				{/* Event Cards */}
				{events.map((event) => (
					<Col xs={24} sm={12} lg={6} key={event.id}>
						<Card
							hoverable
							cover={
								<div className="h-48 overflow-hidden">
									<img
										src={event.image}
										alt={event.title}
										className="w-full h-full object-cover"
									/>
								</div>
							}
							actions={[
								<Tooltip title="View Details">
									<Button
										type="text"
										icon={<i className="fas fa-eye"></i>}
										className="cursor-pointer"
									/>
								</Tooltip>,
								<Tooltip title="Edit">
									<Button
										type="text"
										icon={<i className="fas fa-edit"></i>}
										className="cursor-pointer"
									/>
								</Tooltip>,
								<Tooltip title="Manage Bookings">
									<Button
										type="text"
										icon={<i className="fas fa-ticket-alt"></i>}
										className="cursor-pointer"
									/>
								</Tooltip>,
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											type="default"
											className="cursor-pointer !rounded-button whitespace-nowrap"
										>
											<FaEllipsisH />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem className="cursor-pointer">
											<CloseSquareOutlined className="mr-2" />
											<span>Cancel</span>
										</DropdownMenuItem>
										<DropdownMenuItem className="cursor-pointer text-red-600">
											<i className="fas fa-trash mr-2"></i>
											<span>Delete</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>,
							]}
							className="shadow-sm h-full"
						>
							<div className="mb-2">
								<div className="flex justify-between items-start">
									<Title level={5} className="m-0">
										{event.title}
									</Title>
									<Badge
										variant="outline"
										className="bg-purple-400 text-white border-0 mr-1"
									>
										{event.type}
									</Badge>
								</div>
								<div className="text-sm text-gray-500 flex items-center mt-1">
									<EnvironmentOutlined className="mr-1" /> {event.spot}
								</div>
								<div className="flex items-center mt-2">
									<Avatar
										src={event.postedBy.avatar}
										size={24}
										className="mr-2"
									/>
									<div className="text-xs text-gray-500">
										Posted by{" "}
										<span className="font-medium">{event.postedBy.name}</span>
										<span className="mx-1">·</span>
										<span className="text-blue-600">{event.postedBy.role}</span>
									</div>
								</div>
							</div>
							<Divider className="my-3" />
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="text-sm text-gray-500">
										<i className="fas fa-calendar-alt mr-1"></i> {event.date}
									</div>
									<div className="text-sm text-gray-500">
										<i className="fas fa-clock mr-1"></i> {event.time}
									</div>
								</div>
								<div className="flex items-center justify-between">
									<div className="text-sm text-gray-500">
										<i className="fas fa-users mr-1"></i> Capacity
									</div>
									<div className="text-sm font-medium">
										{event.booked}/{event.capacity}
									</div>
								</div>
								<Progress
									percent={Math.round((event.booked / event.capacity) * 100)}
									size="small"
									status="active"
									strokeColor="#2563EB"
								/>
								<div className="flex items-center justify-between mt-2">
									<div className="text-sm text-gray-500">Price</div>
									<div className="text-lg font-medium">${event.price}</div>
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default EventsContent;
