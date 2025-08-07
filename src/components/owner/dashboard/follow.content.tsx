import { Button, Card, List, Typography, Row, Col } from "antd";
import {
	CalendarFilled,
	HeartOutlined,
	HeartFilled,
	UserAddOutlined,
	NotificationOutlined,
} from "@ant-design/icons";
import { followerActivity } from "@/lib/mock";
import FollowersComponent from "./followers.component";
import { FaChartLine } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TopSmallContainerDisplay } from "./display.card";
import type { tscd } from "@/lib/types";
const { Title, Text } = Typography;

const FollowersContent = () => {
	const topDisplay: Array<tscd> = [
		{
			title: "Total Followers",
			value: 4325,
			icon: <HeartFilled className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			increaseOrDecreaseBy: "↑ 15%",
			isIncreased: true,
			description: "from last month",
		},
		{
			title: "New Followers",
			value: 342,
			icon: <UserAddOutlined className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			increaseOrDecreaseBy: "↑ 7%",
			isIncreased: true,
			description: "from last month",
		},
		{
			title: "Engagement Rate",
			value: 18.5,
			suffix: "%",
			icon: <FaChartLine className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			increaseOrDecreaseBy: "↑ 3.2%",
			isIncreased: true,
			description: "from last month",
			precision: 1,
		},
		{
			title: "Avg. Bookings per Follower",
			value: 2.4,
			icon: <CalendarFilled className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			increaseOrDecreaseBy: "↑ 1%",
			isIncreased: true,
			description: "from last month",
			precision: 1,
		},
	];
	return (
		<div className="md:p-6">
			<div className="flex px-5 md:px-0 justify-between items-center mb-6">
				<Title level={4} className="m-0">
					Followers Management
				</Title>
				<div className="hidden md:block">
					<Button type="primary" icon={<NotificationOutlined />}>
						Send Announcement
					</Button>
				</div>
			</div>
			<Row gutter={[24, 24]}>
				{/* Stats Cards */}
				<TopSmallContainerDisplay data={topDisplay} />

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
						className="border-none m-0 shadow-none md:shadow-md"
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
						className="border-none m-0 shadow-none md:shadow-md"
					>
						<List
							dataSource={followerActivity}
							renderItem={(item) => (
								<List.Item key={item.id} className="py-3">
									<div className="w-full">
										<div className="flex items-start">
											<Avatar>
												<AvatarImage src={item.avatar} />
												<AvatarFallback>
													{item.name.substring(0, 1)}
												</AvatarFallback>
											</Avatar>
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
