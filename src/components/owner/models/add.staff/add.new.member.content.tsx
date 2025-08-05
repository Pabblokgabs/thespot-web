import { useOwnerContext } from "@/lib/context/owner";
import { LoadingOutlined, WarningOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Select, Spin, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRef } from "react";
import toast from "react-hot-toast";

const AddStaffMember = () => {
	const [form] = Form.useForm();
	const { setShowStaffModal, setStaffManageModal, isLoading, setIsLoading, warning, setWarning } =
		useOwnerContext();
	// const [assignedSpot, setAssignedSpot] = useState<string[]>([]);

	const triggerSubmitButton = useRef<HTMLButtonElement | null>(null);

	const handleAssignedSpot = (amenity: string) => {
		// if (amenity.trim() && assignedSpot.includes(amenity.trim())) {
		// 	const filteredAmenities = assignedSpot.filter((item) => item !== amenity);
		// 	setAssignedSpot(filteredAmenities);
		// } else {
		// 	setAssignedSpot([...assignedSpot, amenity]);
		// }
	};

	const handleSubmit = (values: any) => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			toast.success(
				<div>
					<span className="font-semibold text-green-600">
						Invitation send successfully
					</span>
					<p>Waiting your the user to accept</p>
				</div>
			);
			form.resetFields();
			setShowStaffModal(false);
			// setAssignedSpot([]);
			setWarning(true);
		}, 3000);
		console.log(values);
	};

	return (
		<div>
			<Spin
				spinning={isLoading}
				indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
			>
				<Form
					form={form}
					layout="vertical"
					className="overflow-y-auto max-h-[70vh]"
					onFinish={handleSubmit}
				>
					{warning ? (
						<div className="mt-6">
							<div className="flex items-center justify-center mb-2.5 gap-2.5 text-red-400 text-xl">
								<WarningOutlined />
								<h3>Warning</h3>
							</div>
							<h4 className="text-lg font-medium">
								Kgabs will not be held eligable for any damage done by the
								person added as staff member.
							</h4>
							<p>
								Refer to{" "}
								<a href="#" target="_blank" rel="noopener noreferrer">
									Terms
								</a>
							</p>
						</div>
					) : (
						<div className="mt-6">
							<div className="space-y-4">
								<Form.Item
									name="email"
									label="Email Address"
									rules={[
										{ required: true, message: "Please enter your email" },
										{ type: "email", message: "Please enter a valid email" },
									]}
								>
									<Input
										placeholder="Enter your email address"
										className="rounded-md"
									/>
								</Form.Item>

								<Form.Item
									name="role"
									label="Role"
									rules={[
										{ required: true, message: "Please select the role" },
									]}
								>
									<Select placeholder="Select a role">
										{["Manager", "Host", "Support", "Admin"].map((role) => (
											<Select.Option key={role} value={role}>
												{role}
											</Select.Option>
										))}
									</Select>
								</Form.Item>

								<Form.Item
									name="assign_to_spots"
									label="Assign to Spots"
									rules={[
										{ required: true, message: "Please select one spot" },
									]}
								>
									<div className="grid">
										{[
											"Riverside Restaurant",
											"Grand Ballroom",
											"Serenity Spa",
											"Community Church",
											"The Craft Lounge",
										].map((spot) => (
											<Checkbox
												key={spot}
												value={spot}
												// checked={assignedSpot.includes(spot)}
												onChange={(e) => handleAssignedSpot(e.target.value)}
											>
												{spot}
											</Checkbox>
										))}
									</div>
								</Form.Item>

								<Form.Item
									label={"Personal Message"}
									name="personal_message"
									rules={[
										{
											max: 100,
											message: "Personal Message cannot exceed 100 characters",
										},
									]}
								>
									<TextArea
										placeholder="Enter your Message..."
										rows={3}
										showCount
										maxLength={100}
										className="py-2"
									/>
								</Form.Item>
							</div>
						</div>
					)}
					<button
						ref={triggerSubmitButton}
						type={warning ? "button" : "submit"}
						className="hidden"
					/>
				</Form>
			</Spin>
			<div className="flex items-center gap-2.5 justify-end pt-4 border-t mt-4">
				<Button
					onClick={() => {
						setShowStaffModal(false);
						form.resetFields();
						// setAssignedSpot([]);
						setTimeout(() => {
							setWarning(true);
							setStaffManageModal("");
						}, 1000);
					}}
					disabled={isLoading}
				>
					Cancel
				</Button>
				<Button
					type="primary"
					onClick={() => {
						if (warning) {
							setWarning(false);
						} else {
							if (triggerSubmitButton.current) {
								triggerSubmitButton.current.click();
							}
						}
					}}
					loading={isLoading}
				>
					{warning ? "Continue" : "Save Changes"}
				</Button>
			</div>
		</div>
	);
};

export default AddStaffMember;
