import React, { useState, useEffect } from "react";
import {
	Layout,
	Menu,
	Badge,
	Avatar,
	Input,
	Button,
	Dropdown,
	Modal,
	Drawer,
} from "antd";
import {
	DashboardOutlined,
	AppstoreOutlined,
	CalendarOutlined,
	MessageOutlined,
	TeamOutlined,
	StarOutlined,
	BarChartOutlined,
	WalletOutlined,
	SettingOutlined,
	BellOutlined,
	UserOutlined,
	PlusOutlined,
	DownOutlined,
	HeartOutlined,
	ScheduleOutlined,
	CheckCircleOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import logo from "@/assets/logo.png";
import * as echarts from "echarts";
import {
	DashboardContent,
	EventsContent,
	StaffContent,
	AnalyticsContent,
	PayoutsContent,
	SettingsContent,
	MessagesContent,
	AddStaff,
	SpotsContent,
	ViewFollowers,
	FollowersContent,
	CreateEvent,
	ReviewsContent,
	EditSpot,
} from "@/components";
const { Header, Sider, Content } = Layout;
const { Search } = Input;
import { useOwnerContext } from "@/lib/context/owner";
import CalendarBookings from "@/components/owner/dashboard/calendar";
import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";

const Dashboard: React.FC = () => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const [isMobileDrawer, setIsMobileDrawer] = useState<boolean>(false);
	const [maxW, setMaxW] = useState<number>(window.innerWidth);
	const {
		activeTab,
		setActiveTab,
		showStaffModal,
		setShowStaffModal,
		selectedSpot,
		followersModalVisible,
		setFollowersModalVisible,
		showCreateEventModal,
		setShowCreateEventModal,
		isSubmitted,
		setIsSubmitted,
		showEditSpotModal,
		setShowEditSpotModal,
		setActiveEdit,
		activeEdit,
		staffManageModal,
		setStaffManageModal,
	} = useOwnerContext();

	useEffect(() => {
		const handleResize = () => {
			setMaxW(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, [activeTab]);

	React.useEffect(() => {
		const chartDom = document.getElementById("revenue-chart");
		if (chartDom) {
			const myChart = echarts.init(chartDom);
			const option = {
				animation: false,
				tooltip: {
					trigger: "axis",
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["May 1", "May 8", "May 15", "May 22", "May 29", "Jun 5"],
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						name: "Revenue",
						type: "line",
						smooth: true,
						lineStyle: {
							width: 3,
							color: "#2563EB",
						},
						areaStyle: {
							opacity: 0.2,
							color: "#2563EB",
						},
						data: [4200, 5800, 5200, 6500, 7800, 8500],
					},
				],
			};
			myChart.setOption(option);
			// Resize chart on window resize
			window.addEventListener("resize", () => {
				myChart.resize();
			});
			return () => {
				window.removeEventListener("resize", () => {
					myChart.resize();
				});
				myChart.dispose();
			};
		}
	}, [activeTab, window.innerWidth]);
	// Bookings chart initialization
	React.useEffect(() => {
		const chartDom = document.getElementById("bookings-chart");
		if (chartDom) {
			const myChart = echarts.init(chartDom);
			const option = {
				animation: false,
				tooltip: {
					trigger: "item",
				},
				legend: {
					orient: "vertical",
					right: 10,
					top: "center",
					textStyle: {
						fontSize: 12,
					},
				},
				series: [
					{
						name: "Bookings by Spot",
						type: "pie",
						radius: ["50%", "70%"],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: "#fff",
							borderWidth: 2,
						},
						label: {
							show: false,
							position: "center",
						},
						emphasis: {
							label: {
								show: true,
								fontSize: 16,
								fontWeight: "bold",
							},
						},
						labelLine: {
							show: false,
						},
						data: [
							{ value: 24, name: "Seaside Restaurant" },
							{ value: 18, name: "Urban Spa Retreat" },
							{ value: 7, name: "Downtown Event Hall" },
							{ value: 32, name: "Rooftop Bar" },
						],
					},
				],
			};
			myChart.setOption(option);
			// Resize chart on window resize
			window.addEventListener("resize", () => {
				myChart.resize();
			});
			return () => {
				window.removeEventListener("resize", () => {
					myChart.resize();
				});
				myChart.dispose();
			};
		}
	}, [activeTab, window.innerWidth]);
	// Initialize analytics charts
	React.useEffect(() => {
		// Revenue by Spot Chart
		const revenueBySpotChart = document.getElementById("revenue-by-spot-chart");
		if (revenueBySpotChart) {
			const chart = echarts.init(revenueBySpotChart);
			const option = {
				animation: false,
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "shadow",
					},
				},
				legend: {
					data: ["Revenue", "Bookings"],
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					data: [
						"Seaside Restaurant",
						"Urban Spa",
						"Event Hall",
						"Rooftop Bar",
					],
				},
				yAxis: [
					{
						type: "value",
						name: "Revenue ($)",
						min: 0,
						max: 50000,
						interval: 10000,
					},
					{
						type: "value",
						name: "Bookings",
						min: 0,
						max: 250,
						interval: 50,
					},
				],
				series: [
					{
						name: "Revenue",
						type: "bar",
						data: [45000, 32000, 28000, 37500],
						itemStyle: {
							color: "#2563EB",
						},
					},
					{
						name: "Bookings",
						type: "line",
						yAxisIndex: 1,
						data: [180, 145, 120, 210],
						itemStyle: {
							color: "#10B981",
						},
					},
				],
			};
			chart.setOption(option);
			window.addEventListener("resize", () => chart.resize());
			return () => {
				window.removeEventListener("resize", () => chart.resize());
				chart.dispose();
			};
		}
		// Booking Distribution Chart
		const bookingDistChart = document.getElementById(
			"booking-distribution-chart"
		);
		if (bookingDistChart) {
			const chart = echarts.init(bookingDistChart);
			const option = {
				animation: false,
				tooltip: {
					trigger: "item",
				},
				legend: {
					orient: "vertical",
					right: 10,
					top: "center",
				},
				series: [
					{
						name: "Booking Type",
						type: "pie",
						radius: ["50%", "70%"],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: "#fff",
							borderWidth: 2,
						},
						label: {
							show: false,
						},
						emphasis: {
							label: {
								show: true,
								fontSize: "16",
								fontWeight: "bold",
							},
						},
						labelLine: {
							show: false,
						},
						data: [
							{ value: 45, name: "Direct", itemStyle: { color: "#2563EB" } },
							{ value: 25, name: "Website", itemStyle: { color: "#10B981" } },
							{ value: 20, name: "Partners", itemStyle: { color: "#F59E0B" } },
							{ value: 10, name: "Others", itemStyle: { color: "#6B7280" } },
						],
					},
				],
			};
			chart.setOption(option);
			window.addEventListener("resize", () => chart.resize());
			return () => {
				window.removeEventListener("resize", () => chart.resize());
				chart.dispose();
			};
		}
		// Demographics Chart
		const demographicsChart = document.getElementById("demographics-chart");
		if (demographicsChart) {
			const chart = echarts.init(demographicsChart);
			const option = {
				animation: false,
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "shadow",
					},
				},
				legend: {
					data: ["Male", "Female", "Other"],
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: {
					type: "value",
				},
				yAxis: {
					type: "category",
					data: ["18-24", "25-34", "35-44", "45-54", "55+"],
				},
				series: [
					{
						name: "Male",
						type: "bar",
						stack: "total",
						label: {
							show: true,
						},
						emphasis: {
							focus: "series",
						},
						data: [120, 200, 150, 80, 70],
						itemStyle: { color: "#2563EB" },
					},
					{
						name: "Female",
						type: "bar",
						stack: "total",
						label: {
							show: true,
						},
						emphasis: {
							focus: "series",
						},
						data: [110, 190, 140, 90, 80],
						itemStyle: { color: "#EC4899" },
					},
					{
						name: "Other",
						type: "bar",
						stack: "total",
						label: {
							show: true,
						},
						emphasis: {
							focus: "series",
						},
						data: [20, 30, 25, 15, 10],
						itemStyle: { color: "#6B7280" },
					},
				],
			};
			chart.setOption(option);
			window.addEventListener("resize", () => chart.resize());
			return () => {
				window.removeEventListener("resize", () => chart.resize());
				chart.dispose();
			};
		}
		// Peak Hours Chart
		const peakHoursChart = document.getElementById("peak-hours-chart");
		if (peakHoursChart) {
			const chart = echarts.init(peakHoursChart);
			const option = {
				animation: false,
				tooltip: {
					trigger: "axis",
				},
				legend: {
					data: ["Weekday", "Weekend"],
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						name: "Weekday",
						type: "line",
						stack: "Total",
						smooth: true,
						lineStyle: {
							width: 0,
						},
						showSymbol: false,
						areaStyle: {
							opacity: 0.8,
							color: "#2563EB",
						},
						emphasis: {
							focus: "series",
						},
						data: [30, 45, 75, 70, 60, 85, 95, 60],
					},
					{
						name: "Weekend",
						type: "line",
						stack: "Total",
						smooth: true,
						lineStyle: {
							width: 0,
						},
						showSymbol: false,
						areaStyle: {
							opacity: 0.8,
							color: "#10B981",
						},
						emphasis: {
							focus: "series",
						},
						data: [40, 65, 85, 80, 75, 95, 100, 85],
					},
				],
			};
			chart.setOption(option);
			window.addEventListener("resize", () => chart.resize());
			return () => {
				window.removeEventListener("resize", () => chart.resize());
				chart.dispose();
			};
		}
		// Followers Chart
		const chartDom = document.getElementById("followers-chart");
		if (chartDom) {
			const myChart = echarts.init(chartDom);
			const option = {
				animation: false,
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "shadow",
					},
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: [
					{
						type: "category",
						data: [
							"Seaside Restaurant",
							"Urban Spa",
							"Event Hall",
							"Rooftop Bar",
						],
						axisTick: {
							alignWithLabel: true,
						},
						axisLabel: {
							rotate: 30,
							fontSize: 10,
						},
					},
				],
				yAxis: [
					{
						type: "value",
					},
				],
				series: [
					{
						name: "Followers",
						type: "bar",
						barWidth: "60%",
						data: [
							{ value: 1250, itemStyle: { color: "#4F46E5" } },
							{ value: 875, itemStyle: { color: "#4F46E5" } },
							{ value: 520, itemStyle: { color: "#4F46E5" } },
							{ value: 1680, itemStyle: { color: "#4F46E5" } },
						],
					},
				],
			};
			myChart.setOption(option);
			// Resize chart on window resize
			window.addEventListener("resize", () => {
				myChart.resize();
			});
			return () => {
				window.removeEventListener("resize", () => {
					myChart.resize();
				});
				myChart.dispose();
			};
		}
	}, [activeTab, window.innerWidth]);

	// Render content based on active tab
	const renderContent: any = () => {
		switch (activeTab) {
			case "dashboard":
				return DashboardContent();
			case "staff":
				return StaffContent();
			case "spots":
				return SpotsContent();
			case "messages":
				return MessagesContent();
			case "followers":
				return FollowersContent();
			case "events":
				return EventsContent();
			case "analytics":
				return AnalyticsContent();
			case "payouts":
				return PayoutsContent();
			case "settings":
				return SettingsContent();
			case "calendar":
				return CalendarBookings();
			case "reviews":
				return ReviewsContent();
			default:
				return DashboardContent();
		}
	};

	return (
		<Layout>
			<Sider
				width={240}
				collapsible
				collapsed={collapsed}
				onCollapse={setCollapsed}
				className="fixed top-0 left-0 h-screen z-30 shadow-md hidden lg:block pt-20"
				style={{ background: "#fff" }}
			>
				<Menu
					mode="inline"
					selectedKeys={[activeTab]}
					style={{ borderRight: 0 }}
					onClick={(e) => setActiveTab(e.key)}
					items={[
						{
							key: "dashboard",
							icon: <DashboardOutlined />,
							label: "Dashboard",
						},
						{ key: "spots", icon: <AppstoreOutlined />, label: "My Spots" },
						{ key: "calendar", icon: <CalendarOutlined />, label: "Calendar" },
						{ key: "messages", icon: <MessageOutlined />, label: "Messages" },
						{ key: "events", icon: <ScheduleOutlined />, label: "Events" },
						{ key: "followers", icon: <HeartOutlined />, label: "Followers" },
						{ key: "staff", icon: <TeamOutlined />, label: "Staff" },
						{ key: "reviews", icon: <StarOutlined />, label: "Reviews" },
						{
							key: "analytics",
							icon: <BarChartOutlined />,
							label: "Analytics",
						},
						{ key: "payouts", icon: <WalletOutlined />, label: "Payouts" },
						{ key: "settings", icon: <SettingOutlined />, label: "Settings" },
					]}
				/>
			</Sider>

			<Layout style={{ minHeight: "100vh" }}>
				<Header
					className="bg-white px-6 hidden lg:flex justify-between items-center shadow-sm h-16 fixed top-0 right-0 z-34"
					style={{
						width: `100%`,
						backgroundColor: "#fff",
					}}
				>
					<div className="text-xl font-bold flex -ml-5 items-center gap-2.5 text-blue-600 lg:mr-50">
						<img src={logo} alt="logo" className="h-4 w-4" />
						<span
							className={`transition ease-in-out duration-1000 hidden ${
								collapsed ? "hidden" : "lg:block"
							}`}
						>
							SpotManager
						</span>
					</div>
					<div className="flex-1 justify-center mr-4 hidden lg:flex items-center">
						<Search
							placeholder="Search bookings, spots, staff..."
							allowClear
							className="max-w-lg"
						/>
					</div>
					<div className="hidden md:flex items-center gap-4">
						<Link to={"/list-spot"}>
							<Button
								onClick={() => setActiveTab("spots")}
								type="primary"
								icon={<PlusOutlined />}
								className="cursor-pointer whitespace-nowrap !rounded-button"
							>
								Add Spot
							</Button>
						</Link>
						<Dropdown
							menu={{
								items: [
									{
										key: "1",
										label: "Create Event",
										onClick: () => setShowCreateEventModal(true),
									},
									{ key: "2", label: "Add Staff" },
									{ key: "3", label: "New Booking" },
									{ key: "4", label: "Send Announcement" },
								],
							}}
							trigger={["click"]}
						>
							<Button className="mr-4 cursor-pointer whitespace-nowrap !rounded-button">
								Quick Actions <DownOutlined />
							</Button>
						</Dropdown>
						<Badge count={5} className="mr-6 cursor-pointer">
							<BellOutlined style={{ fontSize: "20px" }} />
						</Badge>
						<Dropdown
							className="ml-4"
							menu={{
								items: [
									{ key: "1", label: "Profile" },
									{ key: "2", label: "Account Settings" },
									{ key: "3", label: "Billing" },
									{ key: "4", label: "Help & Support" },
									{ key: "5", label: "Sign Out" },
								],
							}}
							trigger={["click"]}
						>
							<div className="flex items-center cursor-pointer">
								<Avatar size={32} icon={<UserOutlined />} />
								<span className="ml-2 mr-1">John Doe</span>
								<DownOutlined />
							</div>
						</Dropdown>
					</div>
				</Header>
				<Header
					className="bg-white flex lg:hidden justify-between items-center  shadow-sm fixed top-0 right-0 z-34"
					style={{
						width: `100%`,
						backgroundColor: "#fff",
						height: "60px",
						padding: `0px ${window.innerWidth >= 768 ? "32px" : "20px"}`,
					}}
				>
					<div
						onClick={() => setIsMobileDrawer(true)}
						className="text-xl font-bold"
					>
						<MenuIcon />
					</div>
					<div className="flex items-center gap-4">
						<Badge count={5}>
							<BellOutlined style={{ fontSize: "20px" }} />
						</Badge>
						<Dropdown
							className="ml-4"
							menu={{
								items: [
									{ key: "1", label: "Profile" },
									{ key: "2", label: "Account Settings" },
									{ key: "3", label: "Billing" },
									{ key: "4", label: "Help & Support" },
									{ key: "5", label: "Sign Out" },
								],
							}}
							trigger={["click"]}
						>
							<Avatar size={32} icon={<UserOutlined />} />
						</Dropdown>
					</div>
				</Header>

				<Content
					className="bg-white md:bg-gray-50 p-0 md:p-2.5 lg:p-6"
					style={{
						marginTop: 64,
						overflow: "auto",
						height: "calc(100vh - 64px)",
					}}
				>
					<Drawer
						placement="left"
						width={400}
						closeIcon={<CloseOutlined />}
						closable={true}
						open={isMobileDrawer && maxW <= 1024}
						onClose={() => setIsMobileDrawer(false)}
					>
						<Menu
							mode="inline"
							selectedKeys={[activeTab]}
							style={{ borderRight: 0 }}
							onClick={(e) => {
								setActiveTab(e.key);
								setIsMobileDrawer(false);
							}}
							items={[
								{
									key: "dashboard",
									icon: <DashboardOutlined />,
									label: "Dashboard",
								},
								{ key: "spots", icon: <AppstoreOutlined />, label: "My Spots" },
								{
									key: "calendar",
									icon: <CalendarOutlined />,
									label: "Calendar",
								},
								{
									key: "messages",
									icon: <MessageOutlined />,
									label: "Messages",
								},
								{ key: "events", icon: <ScheduleOutlined />, label: "Events" },
								{
									key: "followers",
									icon: <HeartOutlined />,
									label: "Followers",
								},
								{ key: "staff", icon: <TeamOutlined />, label: "Staff" },
								{ key: "reviews", icon: <StarOutlined />, label: "Reviews" },
								{
									key: "analytics",
									icon: <BarChartOutlined />,
									label: "Analytics",
								},
								{ key: "payouts", icon: <WalletOutlined />, label: "Payouts" },
								{
									key: "settings",
									icon: <SettingOutlined />,
									label: "Settings",
								},
							]}
						/>
					</Drawer>
					<Modal
						open={showEditSpotModal}
						onCancel={() => {
							setShowEditSpotModal(false);
							setActiveEdit("");
						}}
						footer={null}
						width={900}
						centered
						title={
							<h4 className="text-lg font-semibold text-gray-700 mb-4">
								{activeEdit === "basic"
									? "Basic Information"
									: activeEdit === "media"
									? "Media"
									: activeEdit === "contact"
									? "Contact and Social information"
									: activeEdit === "hours" && "Change Oparation Hours"}
							</h4>
						}
					>
						<EditSpot />
					</Modal>
					<Modal
						style={{ padding: 0 }}
						width={1000}
						footer={false}
						open={isSubmitted}
					>
						<div className="bg-gray-50/90 backdrop-blur-md flex flex-col">
							<main className="flex-grow flex items-center justify-center p-6">
								<div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full text-center">
									<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
										<CheckCircleOutlined className="text-4xl text-green-500" />
									</div>
									<h2 className="text-2xl font-bold text-gray-800 mb-4">
										Event Submitted Successfully!
									</h2>
									<p className="text-gray-600 mb-8">
										Your event has been submitted and is now pending review.
										You'll receive a notification once it's approved and live on
										our platform.
									</p>
									<div className="bg-gray-50 rounded-lg p-6 mb-8">
										<div className="flex justify-between mb-4">
											<span className="text-gray-500">Event ID:</span>
											<span className="font-medium">
												EVT-{Math.floor(100000 + Math.random() * 900000)}
											</span>
										</div>
										<div className="flex justify-between mb-4">
											<span className="text-gray-500">Submission Date:</span>
											<span className="font-medium">June 21, 2025</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-500">Status:</span>
											<span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
												Pending Review
											</span>
										</div>
									</div>
									<div className="flex flex-col sm:flex-row gap-4 justify-center">
										<Button
											type="primary"
											size="large"
											onClick={() => {}}
											className="!rounded-button whitespace-nowrap cursor-pointer"
										>
											Create Another Event
										</Button>
										<Button
											size="large"
											className="!rounded-button whitespace-nowrap cursor-pointer"
											onClick={() => setIsSubmitted(false)}
										>
											Go to Dashboard
										</Button>
									</div>
								</div>
							</main>
						</div>
					</Modal>
					<Modal
						title={"Create an Event"}
						onCancel={() => setShowCreateEventModal(false)}
						width={700}
						open={showCreateEventModal}
						footer={false}
					>
						<CreateEvent />
					</Modal>
					<Modal
						title={
							staffManageModal === "add_staff"
								? "Invite Staff Member"
								: staffManageModal === "edit_pms" && "Edit Permission"
						}
						open={showStaffModal}
						onCancel={() => {
							setShowStaffModal(false);
							setStaffManageModal("");
						}}
						footer={null}
						width={700}
					>
						<AddStaff />
					</Modal>
					<Modal
						title={
							selectedSpot ? `Followers of ${selectedSpot.name}` : "Followers"
						}
						open={followersModalVisible}
						onCancel={() => setFollowersModalVisible(false)}
						footer={null}
						width={700}
					>
						<ViewFollowers />
					</Modal>
					{renderContent()}
				</Content>
			</Layout>
		</Layout>
	);
};

export default Dashboard;
