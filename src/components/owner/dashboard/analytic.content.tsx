import {
	Button,
	Card,
	Table,
	Statistic,
	Progress,
	Space,
	Typography,
	Row,
	Col,
} from "antd";
import { DownOutlined, DollarOutlined } from "@ant-design/icons";
import { FaCalendarCheck, FaChartBar, FaChartLine, FaChartPie, FaClock, FaUsers } from "react-icons/fa";
const { Title, Text } = Typography;

const AnalyticsContent = () => {
	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<Title level={4} className="m-0">
					Analytics & Insights
				</Title>
				<Space>
					<Button className="cursor-pointer whitespace-nowrap !rounded-button">
						Last 30 Days <DownOutlined />
					</Button>
					<Button
						type="primary"
						icon={<i className="fas fa-download"></i>}
						className="cursor-pointer whitespace-nowrap !rounded-button"
					>
						Export Report
					</Button>
				</Space>
			</div>
			<Row gutter={[24, 24]}>
				{/* Overview Stats */}
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Total Revenue"
							value={142850}
							prefix={<DollarOutlined className="text-blue-600 mr-1" />}
							valueStyle={{ color: "#2563EB" }}
							precision={2}
						/>
						<div className="mt-2 text-xs text-gray-500">
							<span className="text-green-500">↑ 23%</span> vs last period
						</div>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Total Bookings"
							value={856}
							prefix={
								<FaCalendarCheck className="text-blue-600 mr-1"/>
							}
							valueStyle={{ color: "#2563EB" }}
						/>
						<div className="mt-2 text-xs text-gray-500">
							<span className="text-green-500">↑ 15%</span> vs last period
						</div>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Avg. Booking Value"
							value={167}
							prefix={<DollarOutlined className="text-blue-600 mr-1" />}
							valueStyle={{ color: "#2563EB" }}
							precision={2}
						/>
						<div className="mt-2 text-xs text-gray-500">
							<span className="text-green-500">↑ 8%</span> vs last period
						</div>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Customer Satisfaction"
							value={4.8}
							prefix={<i className="fas fa-star text-blue-600 mr-1"></i>}
							valueStyle={{ color: "#2563EB" }}
							precision={1}
						/>
						<div className="mt-2 text-xs text-gray-500">
							<span className="text-green-500">↑ 0.2</span> vs last period
						</div>
					</Card>
				</Col>
				{/* Revenue by Spot */}
				<Col xs={24} lg={12}>
					<Card
						title={
							<div className="flex items-center">
								<FaChartLine className="fas fa-chart-line mr-2 text-blue-600"/> Revenue
								by Spot
							</div>
						}
						className="shadow-sm h-full"
					>
						<div id="revenue-by-spot-chart" style={{ height: 300 }}></div>
					</Card>
				</Col>
				{/* Booking Distribution */}
				<Col xs={24} lg={12}>
					<Card
						title={
							<div className="flex items-center">
								<FaChartPie className="fas fa-chart-pie mr-2 text-blue-600"/> Booking
								Distribution
							</div>
						}
						className="shadow-sm h-full"
					>
						<div id="booking-distribution-chart" style={{ height: 300 }}></div>
					</Card>
				</Col>
				{/* Customer Demographics */}
				<Col xs={24} lg={12}>
					<Card
						title={
							<div className="flex items-center">
								<FaUsers className="fas fa-users mr-2 text-blue-600"/> Customer
								Demographics
							</div>
						}
						className="shadow-sm h-full"
					>
						<div id="demographics-chart" style={{ height: 300 }}></div>
					</Card>
				</Col>
				{/* Peak Hours */}
				<Col xs={24} lg={12}>
					<Card
						title={
							<div className="flex items-center">
								<FaClock className="text-blue-600"/> Peak Hours
								Analysis
							</div>
						}
						className="shadow-sm h-full"
					>
						<div id="peak-hours-chart" style={{ height: 300 }}></div>
					</Card>
				</Col>
				{/* Performance Metrics */}
				<Col xs={24}>
					<Card
						title={
							<div className="flex items-center">
								<FaChartBar className="fas fa-chart-bar mr-2 text-blue-600"/> Key
								Performance Metrics
							</div>
						}
						className="shadow-sm"
					>
						<Table
							dataSource={[
								{
									key: "1",
									metric: "Booking Conversion Rate",
									value: "23.5%",
									trend: "+2.1%",
									status: "positive",
								},
								{
									key: "2",
									metric: "Average Response Time",
									value: "2.8 hours",
									trend: "-0.5 hours",
									status: "positive",
								},
								{
									key: "3",
									metric: "Repeat Customer Rate",
									value: "42%",
									trend: "+5%",
									status: "positive",
								},
								{
									key: "4",
									metric: "Event Attendance Rate",
									value: "87%",
									trend: "-2%",
									status: "negative",
								},
								{
									key: "5",
									metric: "Customer Lifetime Value",
									value: "$850",
									trend: "+$75",
									status: "positive",
								},
							]}
							columns={[
								{
									title: "Metric",
									dataIndex: "metric",
									key: "metric",
									render: (text) => <Text strong>{text}</Text>,
								},
								{
									title: "Value",
									dataIndex: "value",
									key: "value",
									render: (text) => <Text className="font-medium">{text}</Text>,
								},
								{
									title: "Trend",
									dataIndex: "trend",
									key: "trend",
									render: (text, record) => (
										<Text
											className={
												record.status === "positive"
													? "text-green-500"
													: "text-red-500"
											}
										>
											{record.status === "positive" ? "↑" : "↓"} {text}
										</Text>
									),
								},
								{
									title: "Visualization",
									key: "visualization",
									render: (_, record) => (
										<Progress
											percent={parseInt(record.value)}
											status={
												record.status === "positive" ? "success" : "exception"
											}
											strokeColor="#2563EB"
											size="small"
										/>
									),
								},
							]}
							pagination={false}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default AnalyticsContent;
