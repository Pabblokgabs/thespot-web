import { PlusOutlined, SearchOutlined, StarFilled } from "@ant-design/icons";
import { Button, Card, Col, Dropdown, Input, Row, Typography } from "antd";
import { FaFilter, FaSort, FaUsers } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TopSmallContainerDisplay } from "../display.card";
import type { tscd } from "@/lib/types";
const { Title } = Typography;

function SpotNav() {
	const topContReviews: Array<tscd> = [
		{
			title: "Total Spots",
			value: 4,
			icon: <FaCalendarCheck className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
		},
		{
			title: "Followers",
			value: 0,
			icon: <FaUsers className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			increaseOrDecreaseBy: "↑ 25%",
			isIncreased: true,
			description: "unread messages",
		},
		{
			title: "Avarage Ratings",
			value: 4.5,
			icon: <StarFilled className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			precision: 1,
			suffix: "%",
			increaseOrDecreaseBy: "↑ 18%",
			isIncreased: true,
			description: "from last month",
		},
		{
			title: "Avg. Capacity Filled",
			value: 82,
			icon: <FaUsers className="text-blue-600 mr-1" />,
			valueColor: "#2563EB",
			increaseOrDecreaseBy: "↑ 5%",
			suffix: "%",
			isIncreased: true,
			description: "from last month",
		},
	];

	return (
		<div className="w-full">
			<div className="flex px-5 md:px-0 justify-between items-center mb-6 mt-4">
				<Title level={4} className="m-0 hidden md:block">
					Spot Management
				</Title>
				<h4 className="m-0 text-xl block md:hidden">Spot Management</h4>
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
				<TopSmallContainerDisplay data={topContReviews} />
				{/* Event Filters */}
				<Col xs={24}>
					<Card className="border-none shadow-none md:border md:shadow-sm mb-6">
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
