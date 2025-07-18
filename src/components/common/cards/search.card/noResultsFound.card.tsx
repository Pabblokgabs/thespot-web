import { EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function NoSpotResultsFoundCard({ spot }: any) {
	const navigate = useNavigate();

	return (
		<div
			key={`nearby-${spot.id}`}
			className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
		>
			<div className="relative h-48">
				<img
					src={spot.image}
					alt={spot.name}
					className="w-full h-full object-cover"
				/>
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
					<div className="text-white">
						<div className="font-medium mb-1">{spot.name}</div>
						<div className="text-sm">
							<i className="fas fa-map-marker-alt mr-1"></i>
							2.5 miles from Downtown
						</div>
					</div>
				</div>
			</div>
			<div className="p-4">
				<div className="flex items-center mb-2">
					<StarFilled
						style={{ color: "oklch(85.2% 0.199 91.936)" }}
						className="mr-1"
					/>
					<span className="font-medium">{spot.rating}</span>
					<span className="text-gray-500 text-sm ml-1">({spot.reviews})</span>
				</div>
				<div className="flex flex-wrap gap-2 mb-3">
					{spot.tags.map((tag: string, index: number) => (
						<Tag key={index}>{tag}</Tag>
					))}
				</div>
				<Button
					type="primary"
					onClick={() => navigate(`/spot-details/${spot.id}`)}
					className="w-full"
				>
					View Details
				</Button>
			</div>
		</div>
	);
}

export function NoSpotResultsMobile({ data }: any) {
	return (
		<ScrollArea className="w-full block md:hidden whitespace-nowrap overflow-x-auto">
			<div className="flex h-ful w-full px-1 space-x-4 mb-6">
				{data.slice(0, 6).map((spot: any) => (
					<div
						key={`nearby-${spot.id}`}
						className="bg-white rounded-xl shadow-md overflow-hidden w-75"
					>
						<div className="">
							<div className="flex flex-col">
								<div className="aspect-video">
									<img
										src={spot.image}
										alt={spot.name}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="p-2.5">
									<div className="flex items-center justify-between">
										<span className="text-indigo-600 mb-2">
											{spot.category}
										</span>
										<div className="flex items-center mb-2">
											<StarFilled
												style={{ color: "oklch(85.2% 0.199 91.936)" }}
												className="mr-1"
											/>
											<span className="font-medium">{spot.rating}</span>
											<span className="text-gray-500 text-sm ml-1">
												({spot.reviews})
											</span>
										</div>
									</div>
									<h5 className="font-medium text-gray-800 truncate -mt-2 mb-1">
										{spot.name}
									</h5>
									<div className="text-sm text-gray-500 mb-2">
										<EnvironmentOutlined /> 1.5 Km from Downtown
									</div>
									<div className="h-6 mb-2.5 overflow-hidden">
										<div className="flex flex-wrap gap-1">
											{spot.tags.map((tag: string, index: number) => (
												<Tag key={index}>{tag}</Tag>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
