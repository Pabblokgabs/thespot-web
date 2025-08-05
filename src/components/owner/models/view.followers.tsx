import { useOwnerContext } from "@/lib/context/owner";
import {
	HeartFilled,
	MessageOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table, Typography } from "antd";
const { Text, Paragraph } = Typography;

function ViewFollowers() {
  const { selectedSpot } = useOwnerContext();
  
	// Followers columns for table
	const followersColumns = [
		{
			title: "Follower",
			dataIndex: "name",
			key: "name",
			render: (text: string, record: any) => (
				<div className="flex items-center">
					<Avatar src={record.avatar} size={40} className="mr-3" />
					<div>
						<div className="font-medium">{text}</div>
						<div className="text-xs text-gray-500">{record.location}</div>
					</div>
				</div>
			),
		},
		{
			title: "Following Since",
			dataIndex: "followedSince",
			key: "followedSince",
		},
		{
			title: "Actions",
			key: "actions",
			render: () => (
				<Space>
					<Button
						type="text"
						icon={<MessageOutlined />}
						className="cursor-pointer !rounded-button whitespace-nowrap"
						onClick={(e) => e.stopPropagation()}
					>
						Message
					</Button>
					{/* <Button
						type="text"
						icon={<UserOutlined />}
						className="cursor-pointer !rounded-button whitespace-nowrap"
						onClick={(e) => e.stopPropagation()}
					>
						Profile
					</Button> */}
				</Space>
			),
		},
	];
	return (
		<>
			<div className="mb-4 mt-6">
				<div className="flex items-center gap-2 mb-3">
					<div className="flex items-center">
						<HeartFilled className="text-red-500 mr-2 text-xl" />
						<Text strong className="text-lg">
							{selectedSpot.followersList?.length} Followers
						</Text>
					</div>
					<Input
						placeholder="Search followers"
						prefix={<SearchOutlined className="text-gray-400" />}
						className="flex-1"
					/>
				</div>
				<Paragraph className="text-gray-500">
					People who follow your spot will receive updates about events,
					promotions, and other news.
				</Paragraph>
			</div>
			<Table
				dataSource={selectedSpot.followersList}
				columns={followersColumns}
				pagination={{ pageSize: 5 }}
				rowKey="id"
			/>
		</>
	);
}

export default ViewFollowers;
