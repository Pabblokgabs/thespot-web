import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Button, Tag, Tooltip } from "antd";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function EventCard({ data }: any) {
  const navigate = useNavigate();
  
	return (
		<div
			key={data.id}
			className="bg-white rounded-xl shadow-sm hover:shadow-md transition-transform hover:scale-[1.02] overflow-hidden"
		>
			<div className="relative h-48 overflow-hidden">
				<img
					src={data.image}
					alt={data.title}
					className="w-full h-full object-cover object-center"
				/>
				<div className="absolute top-0 left-0 bg-orange-600 text-white px-3 py-1 rounded-br-lg">
					<i className="fas fa-calendar-alt mr-1"></i> Event
				</div>
				<Tooltip title="Save">
					<button className="absolute top-3 bg-white text-black rounded-full right-3 p-2 flex items-center justify-center cursor-pointer">
						{true ? <FaRegBookmark /> : <FaBookmark />}
					</button>
				</Tooltip>
			</div>
			<div className="p-4">
				<h3 className="text-lg font-semibold text-gray-800 mb-1">
					{data.title}
				</h3>
				<div className="flex items-center text-gray-600 mb-2">
					<EnvironmentOutlined />
					<span className="ml-1">at </span>
					<span className="font-medium ml-1 text-blue-600">{data.host}</span>
				</div>
				<div className="flex items-center text-gray-500 mb-3">
					<ClockCircleOutlined className="mr-1" />
					<span>{data.date}</span>
				</div>
				<p className="text-gray-600 mb-3 line-clamp-2">{data.description}</p>
				<div className="flex flex-wrap gap-2 mb-4">
					{data.tags.map((tag: string, index: any) => (
						<Tag key={index}>{tag}</Tag>
					))}
				</div>
				<Button type="primary" className="w-full" onClick={() => navigate(`/event-details/${data.id}`)}>
					More Details
				</Button>
			</div>
		</div>
	);
}

export default EventCard;
