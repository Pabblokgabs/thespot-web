import { Button } from "@/components/ui/button";
import { useOwnerContext } from "@/lib/context/owner";
import { Input } from "antd";

function AddStaff() {
	const { setShowStaffModal } = useOwnerContext();

	return (
		<>
			<div className="flex justify-between items-center mb-4">
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 !rounded-button cursor-pointer"
					onClick={() => setShowStaffModal(false)}
				>
					<span className="i-fa-solid-xmark"></span>
				</Button>
			</div>
			<div className="space-y-4">
				<div className="space-y-2">
					<label htmlFor="email" className="text-sm font-medium">
						Email Address
					</label>
					<Input id="email" placeholder="Enter email address" />
				</div>
				<div className="space-y-2">
					<label htmlFor="role" className="text-sm font-medium">
						Role
					</label>
					<div className="relative">
						<select
							id="role"
							className="w-full h-10 px-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
						>
							<option value="">Select a role</option>
							<option value="manager">Manager</option>
							<option value="host">Host</option>
							<option value="support">Support</option>
							<option value="admin">Admin</option>
						</select>
						<span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none i-fa-solid-chevron-down text-gray-400"></span>
					</div>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Assign to Spots</label>
					<div className="space-y-2">
						<div className="flex items-center">
							<input
								type="checkbox"
								id="all-spots"
								className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<label htmlFor="all-spots" className="ml-2 text-sm">
								All Spots
							</label>
						</div>
						<div className="flex items-center">
							<input
								type="checkbox"
								id="spot-1"
								className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<label htmlFor="spot-1" className="ml-2 text-sm">
								Riverside Restaurant
							</label>
						</div>
						<div className="flex items-center">
							<input
								type="checkbox"
								id="spot-2"
								className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<label htmlFor="spot-2" className="ml-2 text-sm">
								Grand Ballroom
							</label>
						</div>
						<div className="flex items-center">
							<input
								type="checkbox"
								id="spot-3"
								className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<label htmlFor="spot-3" className="ml-2 text-sm">
								Serenity Spa
							</label>
						</div>
						<div className="flex items-center">
							<input
								type="checkbox"
								id="spot-4"
								className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<label htmlFor="spot-4" className="ml-2 text-sm">
								Community Church
							</label>
						</div>
						<div className="flex items-center">
							<input
								type="checkbox"
								id="spot-5"
								className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<label htmlFor="spot-5" className="ml-2 text-sm">
								The Craft Lounge
							</label>
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<label htmlFor="message" className="text-sm font-medium">
						Personal Message (Optional)
					</label>
					<textarea
						id="message"
						rows={3}
						className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Add a personal message to your invitation"
					/>
				</div>
			</div>
		</>
	);
}

export default AddStaff;
