import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Divider, List, Switch, Tag, Button } from "antd";
import Subscription from "./subscription";
import { useOwnerContext } from "@/lib/context/owner";

const SettingsContent = () => {
	const { isBillingView, setIsBillingView } = useOwnerContext();

	const renderSpotContent = () => {
		return (
			<div className="space-y-6 p-2 md:p-6">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold">Settings</h1>
					<Button
						type="primary"
						className="cursor-pointer whitespace-nowrap !rounded-button"
					>
						<i className="fas fa-save mr-2" />
						<span>Save Changes</span>
					</Button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<Card className="lg:col-span-2 border-none shadow-sm">
						<CardHeader>
							<CardTitle>Account Settings</CardTitle>
							<CardDescription>
								Manage your account preferences and information
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-4">
								<div className="flex items-center space-x-4">
									<Avatar className="h-20 w-20">
										<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20business%20owner%2C%2040%20year%20old%20man%20with%20short%20hair%20and%20glasses%2C%20friendly%20smile%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20high%20quality%2C%20photorealistic&width=100&height=100&seq=avatar1&orientation=squarish" />
										<AvatarFallback>JD</AvatarFallback>
									</Avatar>
									<div>
										<Button
											type="default"
											className="cursor-pointer whitespace-nowrap !rounded-button"
										>
											<i className="fas fa-camera mr-2" />
											<span>Change Photo</span>
										</Button>
										<p className="text-sm text-gray-500 mt-1">
											Recommended: Square JPG, PNG. Max 2MB
										</p>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label className="text-sm font-medium">First Name</label>
										<Input defaultValue="John" className="border-gray-200" />
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Last Name</label>
										<Input defaultValue="Doe" className="border-gray-200" />
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Email Address</label>
										<Input
											defaultValue="john.doe@example.com"
											className="border-gray-200"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Phone Number</label>
										<Input
											defaultValue="+1 (555) 123-4567"
											className="border-gray-200"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Company Name</label>
										<Input
											defaultValue="SpotOwner Inc."
											className="border-gray-200"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Website</label>
										<Input
											defaultValue="www.spotowner.com"
											className="border-gray-200"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">Bio</label>
									<Input
										defaultValue="Experienced venue owner and event manager with a passion for creating memorable experiences."
										className="border-gray-200"
									/>
								</div>
								<Divider />
								<div>
									<div className="font-medium mb-4">
										Two-Factor Authentication
									</div>
									<div className="flex items-center justify-between">
										<div>
											<div className="text-gray-700">
												Enhance your account security
											</div>
											<div className="text-sm text-gray-500">
												Require a verification code when logging in
											</div>
										</div>
										<Switch defaultChecked />
									</div>
								</div>
								<Divider />
								<div>
									<div className="font-medium mb-4">Login History</div>
									<List
										size="small"
										dataSource={[
											{
												device: "MacBook Pro",
												location: "Miami, FL",
												time: "2 hours ago",
												status: "Current session",
											},
											{
												device: "iPhone 13",
												location: "Miami, FL",
												time: "Yesterday",
												status: "Logged out",
											},
										]}
										renderItem={(item) => (
											<List.Item>
												<div>
													<div className="flex items-center">
														<i className="fas fa-laptop mr-2" />
														<span className="font-medium">{item.device}</span>
													</div>
													<div className="text-sm text-gray-500">
														{item.location} · {item.time}
													</div>
												</div>
												<Tag
													color={
														item.status === "Current session"
															? "blue"
															: "default"
													}
													className="whitespace-nowrap !rounded-button"
												>
													{item.status}
												</Tag>
											</List.Item>
										)}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className="space-y-6">
						<Card className="border-none shadow-sm">
							<CardHeader>
								<CardTitle>Security</CardTitle>
								<CardDescription>
									Manage your account security settings
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">
										Current Password
									</label>
									<Input type="password" className="border-gray-200" />
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">New Password</label>
									<Input type="password" className="border-gray-200" />
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">
										Confirm New Password
									</label>
									<Input type="password" className="border-gray-200" />
								</div>
								<Button
									type="default"
									className="cursor-pointer whitespace-nowrap !rounded-button w-full"
								>
									<i className="fas fa-key mr-2" />
									<span>Update Password</span>
								</Button>

								<div className="pt-4 border-t">
									<h4 className="text-sm font-medium mb-3">
										Two-Factor Authentication
									</h4>
									<Button
										type="default"
										className="cursor-pointer whitespace-nowrap !rounded-button w-full"
									>
										<i className="fas fa-shield-alt mr-2" />
										<span>Enable 2FA</span>
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card className="border-none shadow-sm">
							<CardHeader>
								<CardTitle>Notifications</CardTitle>
								<CardDescription>
									Manage your notification preferences
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[
										{
											title: "Email Notifications",
											description: "Receive updates via email",
										},
										{
											title: "Push Notifications",
											description: "Get instant updates on your device",
										},
										{
											title: "SMS Notifications",
											description: "Receive text message alerts",
										},
										{
											title: "Marketing Emails",
											description: "Receive promotional content",
										},
									].map((item, index) => (
										<div
											key={index}
											className="flex items-center justify-between py-2"
										>
											<div>
												<h4 className="text-sm font-medium">{item.title}</h4>
												<p className="text-sm text-gray-500">
													{item.description}
												</p>
											</div>
											<Switch defaultChecked />
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<Card className="lg:col-span-2 border-none shadow-sm">
						<CardHeader>
							<CardTitle>Payment Settings</CardTitle>
							<CardDescription>
								Manage your payment methods and billing information
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								<div>
									<h4 className="text-sm font-medium mb-3">Payment Methods</h4>
									<div className="space-y-3">
										{[
											{
												type: "Visa",
												last4: "4242",
												expiry: "12/25",
												isDefault: true,
											},
											{
												type: "Mastercard",
												last4: "8888",
												expiry: "09/24",
												isDefault: false,
											},
										].map((card, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 border rounded-lg"
											>
												<div className="flex items-center">
													<i
														className={`fab fa-${card.type.toLowerCase()} text-2xl ${
															card.type === "Visa"
																? "text-blue-600"
																: "text-red-600"
														}`}
													/>
													<div className="ml-3">
														<div className="flex items-center">
															<span className="font-medium">
																•••• {card.last4}
															</span>
															{card.isDefault && (
																<Badge className="ml-2 bg-green-100 text-green-800 border-0">
																	Default
																</Badge>
															)}
														</div>
														<span className="text-sm text-gray-500">
															Expires {card.expiry}
														</span>
													</div>
												</div>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															type="default"
															className="cursor-pointer whitespace-nowrap !rounded-button"
														>
															<i className="fas fa-ellipsis-h" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem className="cursor-pointer">
															<i className="fas fa-star mr-2" />
															<span>Set as Default</span>
														</DropdownMenuItem>
														<DropdownMenuItem className="cursor-pointer">
															<i className="fas fa-edit mr-2" />
															<span>Edit</span>
														</DropdownMenuItem>
														<DropdownMenuItem className="cursor-pointer text-red-600">
															<i className="fas fa-trash mr-2" />
															<span>Remove</span>
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										))}
									</div>
									<Button
										type="default"
										className="cursor-pointer whitespace-nowrap !rounded-button w-full mt-4"
									>
										<i className="fas fa-plus mr-2" />
										<span>Add Payment Method</span>
									</Button>
								</div>

								<div className="pt-6 border-t">
									<h4 className="text-sm font-medium mb-3">
										Billing Information
									</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<label className="text-sm font-medium">
												Billing Name
											</label>
											<Input
												defaultValue="John Doe"
												className="border-gray-200"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">
												Company Name
											</label>
											<Input
												defaultValue="SpotOwner Inc."
												className="border-gray-200"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">
												Tax ID/VAT Number
											</label>
											<Input
												defaultValue="US123456789"
												className="border-gray-200"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">
												Billing Email
											</label>
											<Input
												defaultValue="billing@spotowner.com"
												className="border-gray-200"
											/>
										</div>
									</div>
								</div>

								<div className="pt-6 border-t">
									<h4 className="text-sm font-medium mb-3">Billing Address</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<label className="text-sm font-medium">
												Street Address
											</label>
											<Input
												defaultValue="123 Business Ave"
												className="border-gray-200"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">City</label>
											<Input
												defaultValue="New York"
												className="border-gray-200"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">
												State/Province
											</label>
											<Input defaultValue="NY" className="border-gray-200" />
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">
												ZIP/Postal Code
											</label>
											<Input defaultValue="10001" className="border-gray-200" />
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">Country</label>
											<Input
												defaultValue="United States"
												className="border-gray-200"
											/>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-none shadow-sm">
						<CardHeader>
							<CardTitle>Subscription</CardTitle>
							<CardDescription>Manage your subscription plan</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="p-4 bg-blue-50 rounded-lg">
									<div className="flex items-center justify-between mb-2">
										<h4 className="font-medium">Professional Plan</h4>
										<Badge className="bg-blue-100 text-blue-800 border-0">
											Current
										</Badge>
									</div>
									<p className="text-sm text-gray-600 mb-3">$49.99/month</p>
									<ul className="space-y-2 text-sm text-gray-600">
										<li className="flex items-center">
											<i className="fas fa-check text-green-600 mr-2" />
											<span>Unlimited Spots</span>
										</li>
										<li className="flex items-center">
											<i className="fas fa-check text-green-600 mr-2" />
											<span>Advanced Analytics</span>
										</li>
										<li className="flex items-center">
											<i className="fas fa-check text-green-600 mr-2" />
											<span>Priority Support</span>
										</li>
									</ul>
									<Button
										onClick={() => setIsBillingView(true)}
										className="cursor-pointer whitespace-nowrap !rounded-button w-full mt-4"
									>
										<span>Change Plan</span>
									</Button>
								</div>

								<div className="border-t pt-4">
									<h4 className="text-sm font-medium mb-2">Billing Cycle</h4>
									<p className="text-sm text-gray-600">
										Next billing date: July 7, 2025
									</p>
									<Button
										type="default"
										className="cursor-pointer whitespace-nowrap !rounded-button w-full mt-4"
									>
										<i className="fas fa-times mr-2" />
										<span className="text-red-600">Cancel Subscription</span>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card className="border-none shadow-sm">
					<CardHeader>
						<CardTitle>Connected Accounts</CardTitle>
						<CardDescription>
							Manage your connected service accounts
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ name: "Google", icon: "fa-google", connected: true },
								{ name: "Facebook", icon: "fa-facebook", connected: true },
								{ name: "Twitter", icon: "fa-twitter", connected: false },
								{ name: "Instagram", icon: "fa-instagram", connected: true },
							].map((account, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 border rounded-lg"
								>
									<div className="flex items-center">
										<i
											className={`fab ${account.icon} text-xl ${
												account.icon === "fa-google"
													? "text-red-500"
													: account.icon === "fa-facebook"
													? "text-blue-600"
													: account.icon === "fa-twitter"
													? "text-blue-400"
													: "text-pink-600"
											}`}
										/>
										<span className="ml-3 font-medium">{account.name}</span>
									</div>
									<Button
										type={account.connected ? "primary" : "default"}
										className="cursor-pointer whitespace-nowrap !rounded-button"
									>
										{account.connected ? (
											<>
												<i className="fas fa-unlink mr-2" />
												<span>Disconnect</span>
											</>
										) : (
											<>
												<i className="fas fa-link mr-2" />
												<span>Connect</span>
											</>
										)}
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="border-none shadow-sm">
					<CardHeader>
						<CardTitle>Danger Zone</CardTitle>
						<CardDescription>Irreversible account actions</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="p-4 border border-red-200 rounded-lg bg-red-50">
							<h4 className="text-sm font-medium text-red-800 mb-2">
								Delete Account
							</h4>
							<p className="text-sm text-red-600 mb-3">
								This action cannot be undone. All your data will be permanently
								removed.
							</p>
							<Button
								type="default"
								className="cursor-pointer whitespace-nowrap !rounded-button w-full"
							>
								<i className="fas fa-exclamation-triangle mr-2" />
								<span>Delete Account</span>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	};

	const renderDisplay = () => {
		switch (isBillingView) {
			case true:
				return <Subscription />;
			default:
				return renderSpotContent();
		}
	};

	return renderDisplay();
};

export default SettingsContent;
