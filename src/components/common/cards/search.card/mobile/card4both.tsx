import { Badge } from "@/components/ui/badge";
import {
	ClockCircleOutlined,
	EnvironmentOutlined,
	HeartOutlined,
	StarFilled,
} from "@ant-design/icons";
import { Button, Tag } from "antd";
import { FaBookmark, FaRegBookmark, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Card4Both({ data }: any) {
	const navigate = useNavigate();

	return (
		<>
			{data.date ? (
				<div
					key={data.id}
					className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
				>
					<div className="flex flex-col gap-1">
						<div className="aspect-video relative">
							<img
								src={data.image}
								alt={data.title}
								className="w-full h-full object-cover"
							/>
							<div className="absolute bottom-4 left-4">
								<Badge className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
									<FaUsers className="mr-1" />
									{1000}+ going
								</Badge>
							</div>

							<button className="absolute top-3 bg-white text-black rounded-full right-3 p-2 flex items-center justify-center cursor-pointer">
								{true ? <FaRegBookmark /> : <FaBookmark />}
							</button>
						</div>
						<div className="p-3">
							<h3 className="text-base truncate font-semibold text-gray-800">
								{data.title}
							</h3>
							<div className="flex items-center truncate gap-1 text-sm text-gray-500 mb-1">
								<EnvironmentOutlined />
								at<span className="text-blue-600">{data.host}</span>
							</div>
							<div className="flex items-center text-gray-500 text-sm mt-1">
								<ClockCircleOutlined className="mr-1" />
								<span>{data.date}</span>
							</div>
							<div className="h-8 overflow-hidden">
								<div className="flex flex-wrap gap-1 mt-2">
									{data.tags.slice(0, 2).map((tag: string, index: number) => (
										<Tag key={index}>{tag}</Tag>
									))}
								</div>
							</div>

							<Button
								type="primary"
								onClick={() => navigate(`/event-details/${data.id}`)}
								className="w-full mt-3"
							>
								More Details
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div
					key={data.id}
					className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
				>
					<div className="flex flex-col gap-1">
						<div className="aspect-video relative">
							<img
								src={data.image}
								alt={data.name}
								className="w-full h-full object-cover"
							/>

							<div className="absolute bottom-4 left-4">
								<Badge
									className={`${
										data.isOpen ? "bg-green-500" : "bg-red-500"
									} text-white`}
								>
									{data.isOpen ? "Open Now" : "Closed"}
								</Badge>
							</div>

							<button className="absolute top-3 bg-white text-black rounded-full right-3 p-2 flex items-center justify-center cursor-pointer">
								<HeartOutlined />
							</button>
						</div>
						<div className="p-3">
							<div className="flex justify-between items-start">
								<h3 className="text-base truncate font-semibold text-gray-800">
									{data.name}
								</h3>
								<div className="flex items-center">
									<StarFilled
										style={{ color: "oklch(79.5% 0.184 86.047)" }}
										className="mr-1"
									/>
									<span className="text-sm">{data.rating}</span>
								</div>
							</div>
							<div className="flex items-center text-gray-500 text-sm mt-1">
								<EnvironmentOutlined className="mr-1" />
								<span>{data.distance}</span>
							</div>
							<p className="text-gray-500 text-sm mt-1 line-clamp-2">
								{data.description}
							</p>
							<div className="h-8 overflow-hidden">
								<div className="flex flex-wrap gap-1 mt-2">
									{data.tags.map((tag: string, index: number) => (
										<Tag key={index}>{tag}</Tag>
									))}
								</div>
							</div>
							<Button
								type="primary"
								onClick={() => navigate(`/spot-details/${data.id}`)}
								className="w-full mt-3"
							>
								View Details
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Card4Both;
