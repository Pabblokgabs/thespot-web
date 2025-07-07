import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

function TransactionHistory() {
	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<div>
						<CardTitle>Transaction History</CardTitle>
						<CardDescription>
							View all your past transactions and payouts
						</CardDescription>
					</div>
					<div className="flex items-center gap-3">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
							<Input
								placeholder="Search transactions..."
								className="pl-10 w-[250px]"
							/>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="!rounded-button whitespace-nowrap cursor-pointer"
								>
									Filter
									<ChevronDown className="h-4 w-4 ml-2" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>All Transactions</DropdownMenuItem>
								<DropdownMenuItem>Payouts</DropdownMenuItem>
								<DropdownMenuItem>Bookings</DropdownMenuItem>
								<DropdownMenuItem>Refunds</DropdownMenuItem>
								<DropdownMenuItem>Fees</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
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
    <Card>
              <CardHeader>
                <CardTitle>Payout Settings</CardTitle>
                <CardDescription>Configure your payout preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Payout Schedule</label>
                    <div className="relative">
                      <select className="w-full h-10 px-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                        <option value="automatic">Automatic (Every 2 weeks)</option>
                        <option value="monthly">Monthly</option>
                        <option value="manual">Manual</option>
                      </select>
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none i-fa-solid-chevron-down text-gray-400"></span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Minimum Payout Amount
                    </label>
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
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                      <span className="absolute h-4 w-4 rounded-full bg-white translate-x-1"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">
                        Get notified about payouts
                      </p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                      <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                    </div>
                  </div>
                  <Button className="w-full !rounded-button whitespace-nowrap cursor-pointer">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
  )
}

export { TransactionHistory, PayoutsSettings};
