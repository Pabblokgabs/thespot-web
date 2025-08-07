import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useOwnerContext } from "@/lib/context/owner";
import {
	HeartFilled,
	MessageOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Typography } from "antd";
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
					<Avatar className="mr-3">
						<AvatarImage src={record.avatar} />
						<AvatarFallback>
							{record.name
								.split(" ")
								.map((n: any) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
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

	const mobileFollowersColumns = [
		{
			title: "Follower",
			dataIndex: "name",
			key: "name",
			render: (text: string, record: any) => (
				<div className="flex">
					<div className="flex-1 flex items-center">
						<Avatar className="mr-3">
							<AvatarImage src={record.avatar} />
							<AvatarFallback>
								{record.name
									.split(" ")
									.map((n: any) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-medium">{text}</div>
							<div className="text-xs text-gray-500">
								Follower since: {record.followedSince}
							</div>
						</div>
					</div>
					<Button
						type="text"
						icon={<MessageOutlined />}
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			),
		},
	];
	return (
		<div className="h-full wh-full overflow-y-auto">
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
				className="hidden md:block overflow-y-auto"
			/>
			<Table
				sticky={true}
				dataSource={selectedSpot.followersList}
				columns={mobileFollowersColumns}
				pagination={{ pageSize: 10 }}
				rowKey="id"
				className="block md:hidden max-h-[68vh] overflow-y-auto"
			/>
			{/* <div className="block md:hidden mb-4">
				{selectedSpot.followersList ? (
					<>
						{selectedSpot.followersList.map((follower) => (
							<div key={follower.id} className="flex gap-2.5">
								<div className="flex-1 flex gap-2 border-b py-2.5">
									<div>
										<Avatar className="h-8 w-8 mr-2">
											<AvatarImage src={follower.avatar} />
											<AvatarFallback>
												{follower.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
									</div>
									<div>
										<h2 className="font-semibold truncate">{follower.name}</h2>
										<span className="text-neutral-500">
											Follower since: {follower.followedSince}
										</span>
									</div>
								</div>
								<MessageOutlined />
							</div>
						))}
					</>
				) : (
					<>No followers</>
				)}
			</div> */}
		</div>
	);
}

export default ViewFollowers;
