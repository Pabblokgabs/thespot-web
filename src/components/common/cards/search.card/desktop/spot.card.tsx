import {
	EnvironmentOutlined,
	HeartOutlined,
	StarFilled,
} from "@ant-design/icons";
import { Button, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import img from "@/assets/spots/night.jpg";
import { Badge } from "@/components/ui/badge";

function SpotCard({ data }: any) {
	const navigate = useNavigate();

	return (
		<div
			key={data.id}
			className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
		>
			<div className="relative h-48">
				<img
					src={data.image || img}
					alt={data.name}
					className="w-full h-full object-cover object-top"
				/>
				<Tooltip title="Follow">
					<button className="absolute top-3 bg-white text-black rounded-full right-3 p-2 flex items-center justify-center cursor-pointer">
						<HeartOutlined />
					</button>
				</Tooltip>
				<div className="absolute bottom-4 left-4">
					<Badge
						className={`${
							data.isOpen ? "bg-green-500" : "bg-red-500"
						} text-white`}
					>
						{data.isOpen ? "Open Now" : "Closed"}
					</Badge>
				</div>
			</div>

			<div className="px-5  pb-5 pt-2">
				<div className="flex justify-between items-start mb-1">
					<span className="truncate text-sm font-medium text-indigo-600">
						{data.category}
					</span>
					<div className="flex">
						<StarFilled
							style={{ color: "oklch(85.2% 0.199 91.936)" }}
							className="mr-1"
						/>
						<span className="font-medium">{data.rating}</span>
						<span className="text-gray-500 font-medium ml-1">
							({data.reviews})
						</span>
					</div>
				</div>
				<h3 className="text-xl font-bold text-gray-900 truncate">
					{data.name}
				</h3>
				<p className="text-sm text-gray-600">
					<EnvironmentOutlined /> tafelkop zone 14
				</p>
				<div className="flex items-center mt-1 text-gray-500 text-sm mb-2">
					{data.tags.slice(0, 2).map((tag: string, index: number) => (
						<Tag key={`${tag}${index}`} className="mr-2capitalize">
							{tag}
						</Tag>
					))}
				</div>
				<p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
					{data.description}
				</p>
				<Button
					type="primary"
					onClick={() => navigate(`/spot-details/${data.id}`)}
					className="w-full"
				>
					View Details
				</Button>
			</div>
		</div>
	);
}

export default SpotCard;
