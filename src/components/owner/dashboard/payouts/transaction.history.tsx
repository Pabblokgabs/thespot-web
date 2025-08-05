import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FiSearch } from "react-icons/fi";
import { Input, Dropdown, Switch, Select } from "antd";

function TransactionHistory() {
	return (
		<Card className="border-none md:border shadow-none md:shadow-md m-0">
			<CardHeader>
				<div className="flex flex-col md:flex-row md:justify-between md:items-center">
					<div>
						<CardTitle>Transaction History</CardTitle>
						<CardDescription>
							View all your past transactions and payouts
						</CardDescription>
					</div>
					<div className="flex items-center gap-2 md:gap-3">
						<div className="w-full mt-2 md:mt-0 md:w-[250px]">
							<Input
								prefix={<FiSearch className="text-gray-400" />}
								placeholder="Search transactions..."
								className="w-full"
							/>
						</div>
						<div className="flex items-center md:gap-2.5">
							<Dropdown
								trigger={["click"]}
								menu={{
									items: [
										{ key: "all", label: "All Trasactions" },
										{ key: "payouts", label: "Payouts" },
										{ key: "bookings", label: "Bookings" },
										{ key: "refunds", label: "Refunds" },
										{ key: "fees", label: "Fees" },
									],
								}}
							>
								<Button variant="outline" className="h-4">
									Filter <ChevronDown />
								</Button>
							</Dropdown>

							<div className="hidden md:block">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											className="!rounded-button whitespace-nowrap cursor-pointer"
										>
											Last 30 Days
											<ChevronDown className="h-4 w-4 ml-2" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem>Last 7 Days</DropdownMenuItem>
										<DropdownMenuItem>Last 30 Days</DropdownMenuItem>
										<DropdownMenuItem>Last 90 Days</DropdownMenuItem>
										<DropdownMenuItem>This Year</DropdownMenuItem>
										<DropdownMenuItem>Custom Range</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Date</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Spot</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Jun 7, 2025</TableCell>
							<TableCell>Booking #12458</TableCell>
							<TableCell>Riverside Restaurant</TableCell>
							<TableCell>Booking Payment</TableCell>
							<TableCell>
								<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
									Completed
								</Badge>
							</TableCell>
							<TableCell className="text-right font-medium text-green-600">
								+$345.00
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Jun 5, 2025</TableCell>
							<TableCell>Payout to Bank Account</TableCell>
							<TableCell>-</TableCell>
							<TableCell>Payout</TableCell>
							<TableCell>
								<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
									Completed
								</Badge>
							</TableCell>
							<TableCell className="text-right font-medium text-red-600">
								-$5,000.00
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Jun 3, 2025</TableCell>
							<TableCell>Booking #12445</TableCell>
							<TableCell>Grand Ballroom</TableCell>
							<TableCell>Booking Payment</TableCell>
							<TableCell>
								<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
									Completed
								</Badge>
							</TableCell>
							<TableCell className="text-right font-medium text-green-600">
								+$1,200.00
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Jun 2, 2025</TableCell>
							<TableCell>Booking #12442</TableCell>
							<TableCell>Serenity Spa</TableCell>
							<TableCell>Booking Payment</TableCell>
							<TableCell>
								<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
									Completed
								</Badge>
							</TableCell>
							<TableCell className="text-right font-medium text-green-600">
								+$180.00
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Jun 1, 2025</TableCell>
							<TableCell>Platform Fee</TableCell>
							<TableCell>-</TableCell>
							<TableCell>Fee</TableCell>
							<TableCell>
								<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
									Completed
								</Badge>
							</TableCell>
							<TableCell className="text-right font-medium text-red-600">
								-$85.00
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>May 30, 2025</TableCell>
							<TableCell>Booking #12438</TableCell>
							<TableCell>The Craft Lounge</TableCell>
							<TableCell>Booking Payment</TableCell>
							<TableCell>
								<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
									Completed
								</Badge>
							</TableCell>
							<TableCell className="text-right font-medium text-green-600">
								+$220.00
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>May 28, 2025</TableCell>
							<TableCell>Booking #12435</TableCell>
							<TableCell>Skyline Rooftop</TableCell>
							<TableCell>Booking Payment</TableCell>
							<TableCell>
								<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
									Completed
								</Badge>
							</TableCell>
							<TableCell className="text-right font-medium text-green-600">
								+$850.00
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>May 25, 2025</TableCell>
							<TableCell>Booking #12430</TableCell>
							<TableCell>Riverside Restaurant</TableCell>
							<TableCell>Refund</TableCell>
							<TableCell>
								<Badge className="bg-red-100 text-red-800 hover:bg-red-200">
									Refunded
								</Badge>
							</TableCell>
							<TableCell className="text-right font-medium text-red-600">
								-$280.00
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

function PayoutsSettings() {
	return (
		<Card className="border-none md:border shadow-none md:shadow-md m-0">
			<CardHeader>
				<CardTitle>Payout Settings</CardTitle>
				<CardDescription>Configure your payout preferences</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium mb-2">Payout Schedule</label>
						<Select
							className="w-full"
							placeholder="Choose the schedule"
							defaultValue="Automatic (Every 2 weeks)"
						>
							{["Automatic (Every 2 weeks)", "Monthly", "Manual"].map(
								(item) => (
									<Select.Option value={item} key={item}>
										{item}
									</Select.Option>
								)
							)}
						</Select>
					</div>
					<div className="space-y-2">
						<label className="text-sm font-medium">Minimum Payout Amount</label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
								$
							</span>
							<Input className="pl-8" defaultValue="100.00" />
						</div>
						<p className="text-xs text-gray-500">
							Minimum amount required for automatic payouts
						</p>
					</div>
					<div className="flex items-center justify-between border-t pt-4 mt-4">
						<div>
							<p className="font-medium">Instant Payouts</p>
							<p className="text-sm text-gray-500">
								1% fee applies to instant transfers
							</p>
						</div>
						<Switch />
					</div>
					<div className="flex items-center justify-between border-t pt-4">
						<div>
							<p className="font-medium">Email Notifications</p>
							<p className="text-sm text-gray-500">
								Get notified about payouts
							</p>
						</div>
						<Switch />
					</div>
					<Button className="w-full !rounded-button whitespace-nowrap cursor-pointer">
						Save Changes
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

export { TransactionHistory, PayoutsSettings };
