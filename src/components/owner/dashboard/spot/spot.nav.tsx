import { PlusOutlined, SearchOutlined, StarFilled } from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Dropdown,
	Input,
	Row,
	Statistic,
	Typography,
} from "antd";
import { FaFilter, FaSort } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
const { Title } = Typography;

function SpotNav() {
	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-6">
				<Title level={4} className="m-0">
					Spot Management
				</Title>
				<Link to={"/list-spot"}>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						className="cursor-pointer whitespace-nowrap !rounded-button"
					>
						Add Spot
					</Button>
				</Link>
			</div>
			<Row className="p-0" gutter={[24, 24]}>
				{/* Stats Cards */}
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Total Spots"
							value={4}
							prefix={
								<FaCalendarCheck className="fas fa-calendar-star text-blue-600 mr-1" />
							}
							valueStyle={{ color: "#2563EB" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Followers"
							value={0}
							prefix={<i className="fas fa-users text-blue-600 mr-1"></i>}
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
							title="Avarage Ratings"
							value={28750}
							prefix={
								<StarFilled className="fas fa-star-alt text-blue-600 mr-1" />
							}
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
										{ key: "2", label: "Restaurants" },
										{ key: "3", label: "Spas" },
										{ key: "4", label: "Churches" },
										{ key: "5", label: "Bars" },
									],
								}}
								trigger={["click"]}
							>
								<Button className="cursor-pointer whitespace-nowrap !rounded-button">
									<FaFilter className="mr-2" />
									<span>Filter</span>
								</Button>
							</Dropdown>
							<Dropdown
								menu={{
									items: [
										{ key: "1", label: "Newest First" },
										{ key: "2", label: "Oldest First" },
										{ key: "4", label: "Highest Rated" },
										{ key: "5", label: "Most Followers" },
									],
								}}
								trigger={["click"]}
							>
								<Button className="cursor-pointer whitespace-nowrap !rounded-button">
									<FaSort className="mr-2" />
									<span>Sort</span>
								</Button>
							</Dropdown>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default SpotNav;
