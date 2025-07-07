import { useEffect, useState } from "react";
import img from "@/assets/spots/art.jpg";
import { Avatar, Rate, Button } from "antd";
import { FireFilled, HeartOutlined } from "@ant-design/icons";
import * as echarts from "echarts";
import Btn from "../btn";

function PopularSpots() {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!loading) {
			// Initialize rating chart
			const chartDom = document.getElementById("rating-chart");
			if (chartDom) {
				const myChart = echarts.init(chartDom);
				const option = {
					animation: false,
					radar: {
						indicator: [
							{ name: "Food", max: 5 },
							{ name: "Service", max: 5 },
							{ name: "Ambiance", max: 5 },
							{ name: "Value", max: 5 },
							{ name: "Cleanliness", max: 5 },
						],
						radius: 80,
						splitNumber: 5,
						axisName: {
							color: "#333",
							fontSize: 12,
						},
					},
					series: [
						{
							type: "radar",
							data: [
								{
									value: [4.8, 4.6, 4.9, 4.5, 4.7],
									name: "Ratings",
									areaStyle: {
										color: "rgba(88, 80, 236, 0.3)",
									},
									lineStyle: {
										color: "#5850EC",
									},
									itemStyle: {
										color: "#5850EC",
									},
								},
							],
						},
					],
				};
				myChart.setOption(option);
			}
		}
	}, [loading]);

	return (
		<div className="mb-12 overflow-hidden">
			<div className="container md:mt-10 mx-auto px-4">
				<h2 className="block md:hidden mb-10 font-bold truncate line-clamp-1">
					Must Check Out Spot <FireFilled style={{ color: "red" }} />
				</h2>
				<div className="grid md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="h-full">
						<img
							src={img}
							alt="The Grand Bistro"
							className="w-full h-full object-cover object-top"
						/>
					</div>
					<div className="p-4 md:p-8">
						<div className="flex items-start justify-between">
							<div>
								<span className="text-indigo-600 font-medium">
									Must-Visit Spot <FireFilled style={{ color: "red" }} />
								</span>
								<h2 className="text-3xl font-bold mt-2">The Grand Bistro</h2>
								<div className="flex items-center mt-2">
									<Rate
										disabled
										defaultValue={5}
										className="text-yellow-400 text-sm"
									/>
									<span className="ml-2 text-gray-500">(328 reviews)</span>
								</div>
							</div>
							<Button
								icon={<HeartOutlined />}
								shape="circle"
								size="large"
								className="!rounded-button whitespace-nowrap cursor-pointer"
							/>
						</div>

						<div className="mt-6">
							<div className="bg-gray-50 p-4 rounded-lg italic text-gray-700 mb-6">
								"The best culinary experience I've had in years. Chef Isabella's
								tasting menu is a journey through flavors that will leave you
								speechless."
								<div className="mt-2 text-sm text-gray-500 not-italic">
									— Michael T., Food Critic
								</div>
							</div>

							<div className="mb-6">
								<h3 className="font-semibold mb-3">Why it's special:</h3>
								<div className="grid grid-cols-2 gap-4">
									<div className="flex items-center">
										<Avatar src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20female%20chef%20in%20white%20uniform%2C%20confident%20expression%2C%20clean%20studio%20background%2C%20professional%20portrait%20photography%2C%20neutral%20lighting%2C%20sophisticated%20look%2C%20high-end%20restaurant%20staff&width=100&height=100&seq=23&orientation=squarish" />
										<div className="ml-3">
											<div className="font-medium">Chef Isabella</div>
											<div className="text-sm text-gray-500">
												Michelin-starred
											</div>
										</div>
									</div>
									<div className="flex items-center">
										<div id="rating-chart" className="w-20 h-20"></div>
										<div className="ml-2">
											<div className="font-medium">Exceptional</div>
											<div className="text-sm text-gray-500">Ratings</div>
										</div>
									</div>
								</div>
							</div>

							<Btn
								isAnimation
								text="Reserve a Table"
								className="w-full text-white"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PopularSpots;
