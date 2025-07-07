import React, { useState } from "react";
import { Card, Button, Badge, Switch, Table, Collapse, Tabs } from "antd";
import {
	CheckOutlined,
	CloseOutlined,
	CrownOutlined,
	RocketOutlined,
	StarOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import { Footer, NavBar } from "@/components";

const { Panel } = Collapse;

const SubcriptionPricing: React.FC = () => {
	const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
		"monthly"
	);
	const [activeTab, setActiveTab] = useState<string>("1");

	// Current plan data
	const currentPlan = {
		name: "Pro",
		status: "Active",
		billingFrequency: "Monthly",
		nextBillingDate: "July 25, 2025",
		cost: billingCycle === "monthly" ? "$29.99" : "$299.90",
		eventsPosted: 12,
		eventsLimit: 20,
		storageUsed: 2.4,
		storageLimit: 5,
	};

	// Plans data
	const plans = [
		{
			id: "free",
			name: "Free",
			badge: "",
			monthlyCost: "$0",
			yearlyCost: "$0",
			features: [
				{ name: "Events per month", value: "2" },
				{ name: "Gallery uploads", value: "100MB" },
				{ name: "Basic analytics", value: true },
				{ name: "Featured listings", value: false },
				{ name: "Priority support", value: false },
				{ name: "Additional admin users", value: "1" },
			],
			description:
				"Perfect for individuals and small venues just getting started.",
			color: "#6B7280",
			icon: <StarOutlined />,
		},
		{
			id: "pro",
			name: "Pro",
			badge: "Most Popular",
			monthlyCost: "$29.99",
			yearlyCost: "$299.90",
			features: [
				{ name: "Events per month", value: "5" },
				{ name: "Gallery uploads", value: "1 GB" },
				{ name: "Advanced analytics", value: true },
				{ name: "Featured listings", value: "2 per month" },
				{ name: "Priority support", value: true },
				{ name: "Additional admin users", value: "3" },
			],
			description:
				"Ideal for established venues looking to grow their audience.",
			color: "#3B82F6",
			icon: <RocketOutlined />,
		},
		{
			id: "premium",
			name: "Premium",
			badge: "Best Value",
			monthlyCost: "$59.99",
			yearlyCost: "$599.90",
			features: [
				{ name: "Events per month", value: "Unlimited" },
				{ name: "Gallery uploads", value: "20 GB" },
				{ name: "Premium analytics", value: true },
				{ name: "Featured listings", value: "Unlimited" },
				{ name: "Priority support", value: true },
				{ name: "Additional admin users", value: "Unlimited" },
			],
			description:
				"For professional venues that need the ultimate in features and flexibility.",
			color: "#8B5CF6",
			icon: <CrownOutlined />,
		},
	];

	// Table columns for feature comparison
	const columns = [
		{
			title: "Feature",
			dataIndex: "feature",
			key: "feature",
			width: "40%",
		},
		{
			title: "Free",
			dataIndex: "free",
			key: "free",
			align: "center" as const,
			render: (value: boolean | string) => renderFeatureValue(value),
		},
		{
			title: "Pro",
			dataIndex: "pro",
			key: "pro",
			align: "center" as const,
			render: (value: boolean | string) => renderFeatureValue(value),
		},
		{
			title: "Premium",
			dataIndex: "premium",
			key: "premium",
			align: "center" as const,
			render: (value: boolean | string) => renderFeatureValue(value),
		},
	];

	// Table data for feature comparison
	const tableData = [
		{
			key: "1",
			feature: "Events per month",
			free: "2",
			pro: "5",
			premium: "Unlimited",
		},
		{
			key: "2",
			feature: "Gallery uploads",
			free: "100MB",
			pro: "1 GB",
			premium: "20 GB",
		},
		{
			key: "3",
			feature: "Analytics access",
			free: "Basic",
			pro: "Advanced",
			premium: "Premium",
		},
		{
			key: "4",
			feature: "Featured listings",
			free: false,
			pro: "2 per month",
			premium: "Unlimited",
		},
		{
			key: "5",
			feature: "Priority support",
			free: false,
			pro: true,
			premium: true,
		},
		{
			key: "6",
			feature: "Additional admin users",
			free: "1",
			pro: "3",
			premium: "Unlimited",
		},
		{
			key: "7",
			feature: "Custom branding",
			free: false,
			pro: true,
			premium: true,
		},
		{
			key: "8",
			feature: "API access",
			free: false,
			pro: false,
			premium: true,
		},
		{
			key: "9",
			feature: "Email marketing",
			free: false,
			pro: "Basic",
			premium: "Advanced",
		},
		{
			key: "10",
			feature: "Ticket sales",
			free: "3% fee",
			pro: "2% fee",
			premium: "1% fee",
		},
	];

	// Helper function to render feature values
	const renderFeatureValue = (value: boolean | string) => {
		if (typeof value === "boolean") {
			return value ? (
				<CheckOutlined className="text-green-500 text-lg" />
			) : (
				<CloseOutlined className="text-red-500 text-lg" />
			);
		}
		return <span>{value}</span>;
	};

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Plan Cards",
			children: (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
					{plans.map((plan) => (
						<Card
							key={plan.id}
							className={`h-full border-2 transition-all duration-300 hover:shadow-lg ${
								plan.id === currentPlan.name.toLowerCase()
									? "border-blue-500 shadow-md"
									: "border-gray-200"
							}`}
							style={{ borderRadius: "12px" }}
						>
							<div className="flex justify-between items-start mb-4">
								<div className="flex items-center">
									<div
										className="w-10 h-10 rounded-full flex items-center justify-center text-white mr-3"
										style={{ backgroundColor: plan.color }}
									>
										{plan.icon}
									</div>
									<h3 className="text-xl font-bold m-0">{plan.name}</h3>
								</div>
								{plan.badge && (
									<Badge
										className="!rounded-button"
										style={{ backgroundColor: plan.color }}
										count={plan.badge}
									/>
								)}
							</div>

							<div className="mb-6">
								<div className="text-3xl font-bold mb-1">
									{billingCycle === "monthly"
										? plan.monthlyCost
										: plan.yearlyCost}
									<span className="text-base font-normal text-gray-500 ml-1">
										/{billingCycle === "monthly" ? "month" : "year"}
									</span>
								</div>
								<p className="text-gray-500 text-sm">{plan.description}</p>
							</div>

							<div className="mb-6">
								<ul className="space-y-3 pl-0 list-none">
									{plan.features.map((feature, idx) => (
										<li key={idx} className="flex items-start">
											{typeof feature.value === "boolean" ? (
												feature.value ? (
													<CheckOutlined className="text-green-500 mt-1 mr-2" />
												) : (
													<CloseOutlined className="text-red-500 mt-1 mr-2" />
												)
											) : (
												<CheckOutlined className="text-green-500 mt-1 mr-2" />
											)}
											<span>
												<strong>{feature.name}:</strong>{" "}
												{typeof feature.value === "boolean"
													? ""
													: feature.value}
											</span>
										</li>
									))}
								</ul>
							</div>
							<Button
								type="primary"
								className="w-full !rounded-button whitespace-nowrap cursor-pointer"
								style={{
									backgroundColor: plan.color,
									borderColor: plan.color,
								}}
							>
								Get {plan.name}
							</Button>
						</Card>
					))}
				</div>
			),
		},
		{
			key: "2",
			label: "Feature Comparison",
			children: (
				<Table
					columns={columns}
					dataSource={tableData}
					pagination={false}
					className="mt-6"
				/>
			),
		},
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<NavBar />
			<div className="container mx-auto px-4 py-8">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Subscription Plans
					</h1>
					<p className="text-gray-600">
						Manage your venue subscription and explore available options
					</p>
				</header>

				{/* Plan Selection */}
				<div className="mb-8">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-bold text-gray-800">Available Plans</h2>
						<div className="flex items-center">
							<span className="mr-3 text-gray-600">Monthly</span>
							<Switch
								checked={billingCycle === "yearly"}
								onChange={(checked) =>
									setBillingCycle(checked ? "yearly" : "monthly")
								}
								className="bg-gray-300"
							/>
							<span className="ml-3 text-gray-600">
								Yearly{" "}
								<Badge
									count="Save 20%"
									style={{ backgroundColor: "#10B981" }}
									className="ml-1 !rounded-button"
								/>
							</span>
						</div>
					</div>

					<Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />
				</div>

				{/* Terms and Additional Information */}
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						Plan Terms & Information
					</h2>
					<Collapse className="bg-white">
						<Panel header="Billing Terms" key="1">
							<ul className="list-disc pl-5">
								<li>
									All plans are billed in advance on a monthly or yearly basis.
								</li>
								<li>
									Yearly subscriptions receive a 20% discount compared to
									monthly billing.
								</li>
								<li>
									Payment is processed securely through our payment provider.
								</li>
								<li>
									Invoices are sent via email and can be accessed in your
									account settings.
								</li>
							</ul>
						</Panel>
						<Panel header="Cancellation Policy" key="2">
							<ul className="list-disc pl-5">
								<li>
									You can cancel your subscription at any time from your account
									settings.
								</li>
								<li>
									Monthly plans: Access continues until the end of the current
									billing period.
								</li>
								<li>Yearly plans: No refunds for partial unused periods.</li>
								<li>
									Downgrading to a free plan will maintain your account data
									within free plan limits.
								</li>
							</ul>
						</Panel>
						<Panel header="Plan Change Rules" key="3">
							<ul className="list-disc pl-5">
								<li>
									Upgrades: Applied immediately with prorated billing for the
									remainder of the current cycle.
								</li>
								<li>
									Downgrades: Applied at the end of the current billing cycle.
								</li>
								<li>
									Switching between monthly and yearly billing occurs at
									renewal.
								</li>
								<li>
									Plan-specific features become available immediately upon
									upgrade.
								</li>
							</ul>
						</Panel>
						<Panel header="Frequently Asked Questions" key="4">
							<div className="space-y-4">
								<div>
									<h4 className="font-semibold">
										What happens if I exceed my plan limits?
									</h4>
									<p>
										You'll receive a notification when approaching limits. Once
										reached, you'll need to upgrade to continue adding content.
									</p>
								</div>
								<div>
									<h4 className="font-semibold">
										Can I change plans in the middle of a billing cycle?
									</h4>
									<p>
										Yes, you can upgrade at any time. Downgrades take effect at
										the end of your current billing period.
									</p>
								</div>
								<div>
									<h4 className="font-semibold">
										Is there a trial period for paid plans?
									</h4>
									<p>
										New users can try the Pro plan for 14 days before being
										charged.
									</p>
								</div>
								<div>
									<h4 className="font-semibold">
										What payment methods do you accept?
									</h4>
									<p>
										We accept all major credit cards, PayPal, and bank transfers
										for yearly plans.
									</p>
								</div>
							</div>
						</Panel>
					</Collapse>
				</div>

				{/* Need Help Section */}
				<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-4 md:mb-0">
							<h3 className="text-2xl font-bold mb-2">
								Need help choosing the right plan?
							</h3>
							<p className="text-blue-100 max-w-2xl">
								Our team is ready to help you find the perfect solution for your
								venue's specific needs. Schedule a free consultation with our
								plan experts.
							</p>
						</div>
						<Button
							size="large"
							className="bg-white text-blue-600 border-white hover:bg-blue-50 hover:border-blue-50 hover:text-blue-700 !rounded-button whitespace-nowrap cursor-pointer"
						>
							Contact Support
						</Button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default SubcriptionPricing;
