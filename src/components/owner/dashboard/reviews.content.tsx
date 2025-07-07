import {
	Input,
	Button,
	Card,
	Dropdown,
	Statistic,
	Typography,
	Row,
	Col,
	MenuProps,
	Space,
	Select,
} from "antd";
import {
	SearchOutlined,
	DownOutlined,
	DollarOutlined,
	CalendarOutlined,
	StarOutlined,
	LikeOutlined,
	SortAscendingOutlined,
} from "@ant-design/icons";
import { useOwnerContext } from "@/lib/context/owner";

const { Title } = Typography;
const { Option } = Select;

interface Spot {
	id: number;
	name: string;
	totalReviews: number;
	averageRating: number;
}

const ReviewsContent = () => {
	const { sortBy, setSortBy, selectedSpotToFilter, setSelectedSpotToFilter } =
		useOwnerContext();

	// Sort menu items
	const sortItems: MenuProps["items"] = [
		{
			key: "newest",
			label: "Newest First",
			icon: <CalendarOutlined />,
		},
		{
			key: "highest",
			label: "Highest Rated",
			icon: <StarOutlined />,
		},
		{
			key: "lowest",
			label: "Lowest Rated",
			icon: <StarOutlined />,
		},
		{
			key: "helpful",
			label: "Most Helpful",
			icon: <LikeOutlined />,
		},
	];
	// Sample data for spots
	const spots: Spot[] = [
		{ id: 1, name: "The Grand Hall", totalReviews: 45, averageRating: 4.7 },
		{ id: 2, name: "Riverside Lounge", totalReviews: 32, averageRating: 4.2 },
		{ id: 3, name: "Skyview Terrace", totalReviews: 28, averageRating: 4.5 },
		{ id: 4, name: "Urban Loft", totalReviews: 18, averageRating: 3.8 },
		{ id: 5, name: "Harbor View", totalReviews: 0, averageRating: 0 },
	];
	// Handle sort selection
	const handleSortMenuClick: MenuProps["onClick"] = (e) => {
		setSortBy(e.key as "newest" | "highest" | "lowest" | "helpful");
	};

	return (
		<div className="p-2 md:p-6">
			<div className="flex justify-between items-center mb-6">
				<Title level={4} className="m-0">
					Reviews Management
				</Title>
			</div>
			<Row gutter={[24, 24]}>
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm">
						<Statistic
							title="Total Reviews"
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
							title="Avgage Reviews"
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
				<Col xs={24} sm={12} md={6}>
					<Card className="h-full shadow-sm"></Card>
				</Col>
				{/* Event Filters */}
				<Col xs={24}>
					<Card className="shadow-sm mb-6">
						<div className="flex flex-col gap-5">
							<Input
								placeholder="Search events"
								prefix={<SearchOutlined className="text-gray-400" />}
								className="w-64"
							/>
							<div className="flex justify-end gap-2.5">
								<Select
									id="spot-filter"
									value={selectedSpotToFilter}
									onChange={setSelectedSpotToFilter}
								>
									<Option value="all">All Spots (12 reviews)</Option>
									{spots.map((spot) => (
										<Option key={spot.id} value={spot.id}>
											{spot.name} ({spot.totalReviews} reviews)
										</Option>
									))}
								</Select>
								{/* <div className="flex items-center space-x-2">
									{[5, 4, 3, 2, 1].map((rating) => (
										<Button
											key={rating}
											type={filterRating === rating ? "primary" : "default"}
											onClick={() =>
												setFilterRating(filterRating === rating ? null : rating)
											}
											className="!rounded-button whitespace-nowrap"
										>
											{rating}★
										</Button>
									))}
									{filterRating !== null && (
										<Button
											type="link"
											onClick={() => setFilterRating(null)}
											className="!rounded-button whitespace-nowrap"
										>
											Clear
										</Button>
									)}
								</div> */}
								<Dropdown
									trigger={['click']}
									menu={{ items: sortItems, onClick: handleSortMenuClick }}
								>
									<Button className="!rounded-button whitespace-nowrap">
										<Space>
											<SortAscendingOutlined />
											{sortBy === "newest" && "Newest First"}
											{sortBy === "highest" && "Highest Rated"}
											{sortBy === "lowest" && "Lowest Rated"}
											{sortBy === "helpful" && "Most Helpful"}
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</div>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};
export default ReviewsContent;
