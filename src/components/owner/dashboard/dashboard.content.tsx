import {
	Badge,
	Avatar,
	Button,
	Card,
	Table,
	Tag,
	Dropdown,
	List,
	Space,
	Typography,
	Row,
	Col,
} from "antd";
import {
	CalendarOutlined,
	MessageOutlined,
	TeamOutlined,
	BarChartOutlined,
	UserOutlined,
	PlusOutlined,
	CheckCircleOutlined,
	ClockCircleOutlined,
	ExclamationCircleOutlined,
	EnvironmentOutlined,
	CalendarFilled,
	MessageFilled,
	DollarOutlined,
	EllipsisOutlined,
	RightOutlined,
	HeartOutlined,
	HeartFilled,
	UserAddOutlined,
} from "@ant-design/icons";
import {
	followerActivity,
	messages,
	staffTasks,
	upcomingBookings,
} from "@/lib/mock";
import { TopSmallContainerDisplay } from "./display.card";
import type { tscd } from "@/lib/types";
const { Title, Text } = Typography;

const DashboardContent = () => {
	// Status color mapping
	const getStatusColor = (status: string) => {
		switch (status) {
			case "confirmed":
				return "green";
			case "pending":
				return "gold";
			case "cancelled":
				return "red";
			default:
				return "blue";
		}
	};

	// Priority color mapping
	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high":
				return "red";
			case "medium":
				return "gold";
			case "low":
				return "green";
			default:
				return "blue";
		}
	};

	const topContReviews: Array<tscd> = [
		{
			title: "Total Bookings",
			value: 81,
			icon: <CalendarFilled className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			increaseOrDecreaseBy: "↑ 12%",
			isIncreased: true,
			description: "from last month",
		},
		{
			title: "New Messages",
			value: 14,
			icon: <MessageFilled className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			increaseOrDecreaseBy: "↑ 5",
			isIncreased: true,
			description: "unread messages",
		},
		{
			title: "Revenue",
			value: 12850,
			icon: <DollarOutlined className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			increaseOrDecreaseBy: "↑ 8%",
			isIncreased: true,
			description: "from last month",
		},
		{
			title: "Total Followers",
			value: 81,
			icon: <HeartFilled className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			increaseOrDecreaseBy: "↑ 15%",
			isIncreased: true,
			description: "from last month",
		},
	];

	return (
		<div className="md:p-6">
			<div className="flex px-5 md:px-0 justify-between items-center mb-6 mt-4">
				<Title level={4} className="m-0 hidden md:block">
					Dashboard Overview
				</Title>
				<h4 className="m-0 text-xl block md:hidden">Dashboard</h4>
				<div className="flex items-center">
					<Text className="mr-2 text-gray-500 hidden md:block">Today is</Text>
					<Tag color="blue" className="whitespace-nowrap !rounded-button">
						{new Date().toLocaleDateString("en-US", {
							weekday: "short",
							year: "numeric",
							month: "short",
							day: "numeric",
						})}
					</Tag>
				</div>
			</div>
			<Row gutter={[24, 24]}>
				{/* Stats Cards */}
				<TopSmallContainerDisplay data={topContReviews} />

				{/* Upcoming Bookings */}
				<Col xs={24} lg={12}>
					<Card
						title={
							<div className="flex items-center">
								<CalendarOutlined className="mr-2 text-blue-600" /> Upcoming
								Bookings
							</div>
						}
						extra={
							<Button
								type="link"
								className="cursor-pointer whitespace-nowrap !rounded-button"
							>
								View All
							</Button>
						}
						className="h-full border-0 m-0 shadow-none md:shadow-md"
					>
						<List
							dataSource={upcomingBookings}
							renderItem={(item) => (
								<List.Item key={item.id} className="py-3">
									<div className="w-full">
										<div className="flex justify-between items-start">
											<div>
												<div className="font-medium">{item.customerName}</div>
												<div className="text-sm text-gray-500 flex items-center">
													<EnvironmentOutlined className="mr-1" />{" "}
													{item.spotName}
												</div>
											</div>
											<Tag
												color={getStatusColor(item.status)}
												className="whitespace-nowrap !rounded-button"
											>
												{item.status.charAt(0).toUpperCase() +
													item.status.slice(1)}
											</Tag>
										</div>
										<div className="mt-2 flex flex-col gap-2.5 md:flex-row justify-between md:items-center">
											<div className="text-sm">
												<CalendarOutlined className="mr-1" /> {item.date},{" "}
												{item.time}
											</div>
											<div className="text-sm">
												<UserOutlined className="mr-1" /> {item.guests}{" "}
												{item.guests === 1 ? "Guest" : "Guests"}
											</div>
											<div className="text-xs text-gray-500">{item.type}</div>
										</div>
									</div>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
				{/* Recent Messages */}
				<Col xs={24} lg={12}>
					<Card
						title={
							<div className="flex items-center">
								<MessageOutlined className="mr-2 text-blue-600" /> Recent
								Messages
							</div>
						}
						extra={
							<Button
								type="link"
								className="cursor-pointer whitespace-nowrap !rounded-button"
							>
								View All
							</Button>
						}
						className="h-full border-none m-0 shadow-none md:shadow-md"
					>
						<List
							dataSource={messages}
							renderItem={(item) => (
								<List.Item key={item.id} className="py-3">
									<div className="w-full">
										<div className="flex justify-between items-start">
											<div className="flex items-center">
												<Avatar src={item.avatar} size={40} className="mr-3" />
												<div>
													<div className="font-medium flex items-center">
														{item.sender}
														{item.unread && <Badge dot className="ml-2" />}
													</div>
													<div className="text-sm text-gray-500">
														{item.time}
													</div>
												</div>
											</div>
											<Button
												type="text"
												icon={<RightOutlined />}
												className="cursor-pointer"
											/>
										</div>
										<div className="mt-2 text-sm hidden md:block pl-12">
											{item.message.length > 80
												? `${item.message.substring(0, 80)}...`
												: item.message}
										</div>
										<p className="truncate pt-2.5 block md:hidden line-clamp-1">
											{item.message}
										</p>
									</div>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
				{/* Revenue Chart */}
				<Col xs={24} lg={12}>
					<Card
						title={
							<div className="flex items-center">
								<BarChartOutlined className="mr-2 text-blue-600" /> Revenue
								Trend
							</div>
						}
						extra={
							<Space>
								<Button
									type="text"
									className="cursor-pointer whitespace-nowrap !rounded-button"
								>
									Weekly
								</Button>
								<Button
									type="text"
									className="cursor-pointer whitespace-nowrap !rounded-button"
								>
									Monthly
								</Button>
							</Space>
						}
						className="h-full border-none m-0 shadow-none md:shadow-md"
					>
						<div id="revenue-chart" style={{ height: 300 }}></div>
					</Card>
				</Col>
				{/* Followers Chart */}
				<Col xs={24} lg={12}>
					<Card
						title={
							<div className="flex items-center">
								<HeartOutlined className="mr-2 text-blue-600" /> Followers by
								Spot
							</div>
						}
						className="h-full border-0 m-0 shadow-none md:shadow-md"
					>
						<div id="followers-chart" style={{ height: 300 }}></div>
					</Card>
				</Col>
				{/* Recent Follower Activity */}
				<Col xs={24} lg={12}>
					<Card
						title={
							<div className="flex items-center">
								<UserAddOutlined className="mr-2 text-blue-600" /> Recent
								Follower Activity
							</div>
						}
						extra={
							<Button
								type="link"
								className="cursor-pointer whitespace-nowrap !rounded-button"
							>
								View All
							</Button>
						}
						className="border-none m-0 shadow-none md:shadow-md h-full"
					>
						<List
							dataSource={followerActivity}
							renderItem={(item) => (
								<List.Item key={item.id} className="py-3">
									<div className="w-full">
										<div className="flex items-start">
											<Avatar src={item.avatar} size={40} className="mr-3" />
											<div>
												<div>
													<Text strong>{item.name}</Text>
													<Text> {item.action} </Text>
													<Text strong>{item.spot}</Text>
												</div>
												<div className="text-xs text-gray-500 mt-1">
													{item.time}
												</div>
											</div>
										</div>
									</div>
								</List.Item>
							)}
						/>
					</Card>
				</Col>
				{/* Staff Tasks */}
				<Col xs={24} lg={12}>
					<Card
						className="hidden md:block border-none m-0 shadow-none md:shadow-md h-full"
						title={
							<div className="flex items-center">
								<TeamOutlined className="mr-2 text-blue-600" /> Staff Tasks
							</div>
						}
						extra={
							<Button
								type="primary"
								icon={<PlusOutlined />}
								className="cursor-pointer whitespace-nowrap !rounded-button"
							>
								Assign Task
							</Button>
						}
					>
						<Table
							dataSource={staffTasks}
							pagination={false}
							rowKey="id"
							columns={[
								{
									title: "Task",
									dataIndex: "task",
									key: "task",
									render: (text, record: any) => (
										<div>
											<div className="font-medium">{text}</div>
											<div className="text-xs text-gray-500">
												Due: {record.dueDate}
											</div>
										</div>
									),
								},
								{
									title: "Assignee",
									dataIndex: "assignee",
									key: "assignee",
									render: (text, record: any) => (
										<div className="flex items-center">
											<Avatar src={record.avatar} size={32} className="mr-2" />
											<span>{text}</span>
										</div>
									),
								},
								{
									title: "Priority",
									dataIndex: "priority",
									key: "priority",
									render: (priority) => (
										<Tag
											color={getPriorityColor(priority)}
											className="whitespace-nowrap !rounded-button"
										>
											{priority.charAt(0).toUpperCase() + priority.slice(1)}
										</Tag>
									),
								},
								{
									title: "Status",
									dataIndex: "status",
									key: "status",
									render: (status) => {
										let icon = null;
										let color = "";
										let text = "";
										switch (status) {
											case "completed":
												icon = <CheckCircleOutlined />;
												color = "text-green-600";
												text = "Completed";
												break;
											case "in-progress":
												icon = <ClockCircleOutlined />;
												color = "text-blue-600";
												text = "In Progress";
												break;
											case "pending":
												icon = <ExclamationCircleOutlined />;
												color = "text-amber-600";
												text = "Pending";
												break;
											default:
												icon = <ExclamationCircleOutlined />;
												color = "text-gray-600";
												text = "Unknown";
										}
										return (
											<div className={`flex items-center ${color}`}>
												{icon} <span className="ml-1">{text}</span>
											</div>
										);
									},
								},
								{
									title: "Actions",
									key: "actions",
									render: () => (
										<Dropdown
											menu={{
												items: [
													{ key: "1", label: "Edit" },
													{ key: "2", label: "Mark Complete" },
													{ key: "3", label: "Reassign" },
													{ key: "4", label: "Delete" },
												],
											}}
											trigger={["click"]}
										>
											<Button
												type="text"
												icon={<EllipsisOutlined />}
												className="cursor-pointer"
											/>
										</Dropdown>
									),
								},
							]}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default DashboardContent;
