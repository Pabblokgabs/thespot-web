import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { follower, staffMembers, tscd } from "@/lib/types";
import {
	FaChartLine,
	FaEdit,
	FaEye,
	FaGift,
	FaHandshake,
	FaKey,
	FaPause,
	FaPlay,
	FaStar,
	FaTrash,
} from "react-icons/fa";
import { EllipsisVertical } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Col, Statistic } from "antd";

const StaffDisplayCard: React.FC<{ data: staffMembers }> = ({ data }) => {
	return (
		<div className="flex items-center justify-between gap-2.5 border-b py-2.5">
			<div className="flex flex-1 gap-2.5">
				<div>
					<Avatar className="h-8 w-8 mr-2">
						<AvatarImage src={data.avatar} />
						<AvatarFallback>
							{data.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center gap-1">
						<h1 className="font-semibold truncate">{data.name}</h1>
						<span className="text-xs text-gray-500">({data.role})</span>
					</div>
					<span>Last active: {data.lastActive}</span>
				</div>
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<EllipsisVertical />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem className="cursor-pointer">
							<FaEye className="mr-2" />
							<span>View Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<FaEdit className="mr-2" />
							<span>Edit Permissions</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<FaKey className="mr-2" />
							<span>Reset Password</span>
						</DropdownMenuItem>
						{data.status === "Active" && (
							<DropdownMenuItem className="cursor-pointer text-yellow-600">
								<FaPause className="fas fa-pause mr-2" />
								<span>Deactivate</span>
							</DropdownMenuItem>
						)}
						{data.status === "Inactive" && (
							<DropdownMenuItem className="cursor-pointer text-green-600">
								<FaPlay className="mr-2" />
								<span>Activate</span>
							</DropdownMenuItem>
						)}
						<DropdownMenuItem className="cursor-pointer text-red-600">
							<FaTrash className="mr-2" />
							<span>Remove</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

const FollowersDisplayCard: React.FC<{ data: follower }> = ({ data }) => {
	return (
		<div className="flex items-center justify-between gap-2.5 border-b py-2.5">
			<div className="flex flex-1 gap-2.5">
				<div>
					<Avatar className="h-8 w-8 mr-2">
						<AvatarImage src={data.user.img} />
						<AvatarFallback>
							{data.user.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center gap-1">
						<h1 className="font-semibold truncate">{data.user.name}</h1>
						{data.user.isInfluencer && (
							<Badge className="ml-2 bg-purple-100 text-purple-800 border-0">
								<FaStar className="text-xs mr-1" />
								Influencer
							</Badge>
						)}
					</div>
					<div>
						Following: <span>{data.following[0]} </span>{" "}
						<span className="text-xs text-neutral-500">
							{data.following.length > 1 &&
								`& (${data.following.length - 1} more)`}
						</span>
					</div>
				</div>
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<EllipsisVertical />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem className="cursor-pointer">
							<FaEye className="mr-2" />
							<span>View Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<FaChartLine className="mr-2" />
							<span>Engagement History</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<FaGift className="fas fa-gift mr-2" />
							<span>Send Offer</span>
						</DropdownMenuItem>
						{data.user.isInfluencer ? (
							<DropdownMenuItem className="cursor-pointer text-purple-600">
								<FaHandshake className="mr-2" />
								<span>Manage Partnership</span>
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem className="cursor-pointer text-purple-600">
								<FaStar className="mr-2" />
								<span>Mark as Influencer</span>
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

const TopSmallContainerDisplay: React.FC<{ data: tscd[] }> = ({ data }) => {
	return (
		<Col xs={24}>
			<div className="w-full px-5 grid md:px-0 grid-cols-2 gap-6 md:grid-cols-4">
				{data.map((item, index) => (
					<div
						key={`${index}-${item.title}`}
						className="flex-1 p-6 md:bg-white rounded-lg shadow-md"
					>
						<Statistic
							title={item.title}
							value={item.value}
							prefix={item.icon}
							valueStyle={{ color: item.valueColor }}
							suffix={item.suffix ? item.suffix : ""}
							precision={item.precision ? item.precision : 0}
						/>
						{(item.description || item.increaseOrDecreaseBy) && (
							<div className="mt-2 text-xs text-gray-500">
								<span
									className={`${
										item.isIncreased ? "text-green-500" : "text-red-500"
									}`}
								>
									↑ {item.increaseOrDecreaseBy}
								</span>{" "}
								{item.description}
							</div>
						)}
					</div>
				))}
			</div>
		</Col>
	);
};

export { StaffDisplayCard, FollowersDisplayCard, TopSmallContainerDisplay };
