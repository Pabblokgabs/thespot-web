import {
	Avatar,
	Button,
	Card,
	Statistic,
	List,
	Typography,
	Row,
	Col,
} from "antd";
import {
	CalendarFilled,
	HeartOutlined,
	HeartFilled,
	UserAddOutlined,
	NotificationOutlined,
} from "@ant-design/icons";
import { followerActivity } from "@/lib/mock";
import FollowersComponent from "./followers.component";
const { Title, Text } = Typography;

const FollowersContent = () => {
	return (
		<div className="p-2 md:p-6">
				<div className="flex justify-between items-center mb-6">
					<Title level={4} className="m-0">
						Followers Management
					</Title>
					<div className='hidden md:block'>
						<Button
						type="primary"
						icon={<NotificationOutlined />}
						className="cursor-pointer whitespace-nowrap !rounded-button"
					>
						Send Announcement
					</Button>
					</div>
				</div>
				<Row gutter={[24, 24]}>
					{/* Stats Cards */}
					<Col xs={24} sm={12} md={6}>
						<Card className="h-full shadow-sm">
							<Statistic
								title="Total Followers"
								value={4325}
								prefix={<HeartFilled className="text-blue-600 mr-1" />}
								valueStyle={{ color: "#2563EB" }}
							/>
							<div className="mt-2 text-xs text-gray-500">
								<span className="text-green-500">↑ 15%</span> from last month
							</div>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6}>
						<Card className="h-full shadow-sm">
							<Statistic
								title="New Followers"
								value={342}
								prefix={<UserAddOutlined className="text-blue-600 mr-1" />}
								valueStyle={{ color: "#2563EB" }}
							/>
							<div className="mt-2 text-xs text-gray-500">
								<span className="text-green-500">↑ 23%</span> from last month
							</div>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6}>
						<Card className="h-full shadow-sm">
							<Statistic
								title="Engagement Rate"
								value={18.5}
								suffix="%"
								prefix={
									<i className="fas fa-chart-line text-blue-600 mr-1"></i>
								}
								valueStyle={{ color: "#2563EB" }}
								precision={1}
							/>
							<div className="mt-2 text-xs text-gray-500">
								<span className="text-green-500">↑ 3.2%</span> from last month
							</div>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6}>
						<Card className="h-full shadow-sm">
							<Statistic
								title="Avg. Bookings per Follower"
								value={2.4}
								prefix={<CalendarFilled className="text-blue-600 mr-1" />}
								valueStyle={{ color: "#2563EB" }}
								precision={1}
							/>
							<div className="mt-2 text-xs text-gray-500">
								<span className="text-green-500">↑ 0.3</span> from last month
							</div>
						</Card>
					</Col>
					<Col xs={24}>
						<FollowersComponent />
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
							className="h-full shadow-sm"
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
							className="shadow-sm h-full"
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
				</Row>
			</div>
	);
};

export default FollowersContent;
