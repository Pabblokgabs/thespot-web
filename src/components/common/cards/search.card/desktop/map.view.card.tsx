import {
	ClockCircleOutlined,
	EnvironmentOutlined,
	StarFilled,
} from "@ant-design/icons";
import { Badge, Tag } from "antd";

function MapViewCard({ data }: any) {
	return (
		<>
			{data.date ? (
				<Badge.Ribbon text="Event" color="orange">
					<div
						key={data.id}
						className="flex bg-white p-3 rounded-lg border border-gray-100 hover:border-pink-300 cursor-pointer"
					>
						<div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
							<img
								src={data.image}
								alt={data.title}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="ml-3 flex-grow">
							<h4 className="font-medium text-gray-800">{data.title}</h4>
							<div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
								<EnvironmentOutlined />
								at<span className="text-blue-600">{data.host}</span>
							</div>
							<div className="flex items-center text-sm text-gray-500 mb-1">
								<ClockCircleOutlined className="mr-1 text-xs" />
								<span>{data.date}</span>
							</div>
							<div className="flex flex-wrap gap-1">
								{data.tags.slice(0, 2).map((tag: string, index: number) => (
									<Tag key={index}>{tag}</Tag>
								))}
							</div>
						</div>
					</div>
				</Badge.Ribbon>
			) : (
				<Badge.Ribbon text="Spot" color="blue">
					<div
						key={data.id}
						className="flex bg-white p-3 rounded-lg border border-gray-100 hover:border-blue-300 cursor-pointer"
					>
						<div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
							<img
								src={data.image}
								alt={data.name}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="ml-3 flex-grow">
							<h4 className="font-medium text-gray-800">{data.name}</h4>
							<div className="flex items-center text-sm text-gray-500 mb-1">
								<EnvironmentOutlined className="mr-1 text-xs" />
								<span>{data.distance}</span>
								<div className="mx-1">•</div>
								<StarFilled className="text-yellow-500 mr-1 text-xs" />
								<span>{data.rating}</span>
							</div>
							<div className="flex flex-wrap gap-1">
								{data.tags.slice(0, 2).map((tag: string, index: number) => (
									<Tag key={index}>{tag}</Tag>
								))}
							</div>
						</div>
					</div>
				</Badge.Ribbon>
			)}
		</>
	);
}

export default MapViewCard;
