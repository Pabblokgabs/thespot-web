import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { staffMembers } from "@/lib/types";
import { FaEdit, FaEye, FaKey, FaPause, FaPlay, FaTrash } from "react-icons/fa";
import { EllipsisVertical } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export { StaffDisplayCard };
