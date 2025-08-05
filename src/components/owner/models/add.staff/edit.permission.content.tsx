import { useOwnerContext } from "@/lib/context/owner";
import { staffPermission } from "@/lib/options";
import { LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Form, Spin, Button, Typography } from "antd";
import { useRef } from "react";
import toast from "react-hot-toast";

const { Title } = Typography;

function editPermission() {
	const [form] = Form.useForm();
	const { setShowStaffModal, setStaffManageModal,isLoading, setIsLoading } = useOwnerContext();
	// const [managerPermission, setManagerPermission] = useState<string[]>([]);
	// const [adminPermission, setAdminPermission] = useState<string[]>([]);
	// const [eventHost, setEventHost] = useState<string[]>([]);
	// const [supportStaff, setSupportStaff] = useState<string[]>([]);

	const triggerSubmitButton = useRef<HTMLButtonElement | null>(null);

	// const handlePermission = (value: string, name: string) => {
	// 	if (name === "manager") {
	// 		if (value.trim() && managerPermission.includes(value.trim())) {
	// 			const filteredAmenities = managerPermission.filter(
	// 				(item) => item !== value
	// 			);

	// 			setManagerPermission(filteredAmenities);
	// 		} else {
	// 			setManagerPermission([...managerPermission, value]);
	// 		}
	// 	} else if (name === "admin") {
	// 		if (value.trim() && adminPermission.includes(value.trim())) {
	// 			const filteredAmenities = adminPermission.filter(
	// 				(item) => item !== value
	// 			);

	// 			setAdminPermission(filteredAmenities);
	// 		} else {
	// 			setAdminPermission([...adminPermission, value]);
	// 		}
	// 	} else if (name === "support_staff") {
	// 		if (value.trim() && supportStaff.includes(value.trim())) {
	// 			const filteredAmenities = supportStaff.filter((item) => item !== value);

	// 			setSupportStaff(filteredAmenities);
	// 		} else {
	// 			setSupportStaff([...supportStaff, value]);
	// 		}
	// 	} else if (name === "event_host") {
	// 		if (value.trim() && eventHost.includes(value.trim())) {
	// 			const filteredAmenities = eventHost.filter((item) => item !== value);

	// 			setEventHost(filteredAmenities);
	// 		} else {
	// 			setEventHost([...eventHost, value]);
	// 		}
	// 	}
	// };

	const handleSaveChanges = (values: any) => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			toast.success("Changes saved successfully");
			form.resetFields();
			setShowStaffModal(false);
			// setSupportStaff([]);
			// setAdminPermission([]);
			// setEventHost([]);
			// setManagerPermission([]);
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
					onFinish={handleSaveChanges}
				>
					<div className="mt-6">
						<div className="space-y-4">
							<Form.Item
								name="manager"
								label={<Title level={5}>Manager</Title>}
								rules={[{ required: true, message: "Please select one spot" }]}
							>
								<div className="grid grid-cols-2 md:grid-cols-3">
									{staffPermission.map((spot) => (
										<Checkbox
											key={spot}
											value={spot}
											// checked={managerPermission.includes(spot)}
											// onChange={(e) =>
											// 	handlePermission(e.target.value, "manager")
											// }
										>
											{spot}
										</Checkbox>
									))}
								</div>
							</Form.Item>

							<Form.Item
								name="admin"
								label={<Title level={5}>Admin</Title>}
								rules={[{ required: true, message: "Please select one spot" }]}
							>
								<div className="grid grid-cols-2 md:grid-cols-3">
									{staffPermission.map((spot) => (
										<Checkbox
											key={spot}
											value={spot}
											// checked={adminPermission.includes(spot)}
											// onChange={(e) =>
											// 	handlePermission(e.target.value, "admin")
											// }
										>
											{spot}
										</Checkbox>
									))}
								</div>
							</Form.Item>

							<Form.Item
								name="support_staff"
								label={<Title level={5}>Support Staff</Title>}
								rules={[{ required: true, message: "Please select one spot" }]}
							>
								<div className="grid grid-cols-2 md:grid-cols-3">
									{staffPermission.map((spot) => (
										<Checkbox
											key={spot}
											value={spot}
											// checked={supportStaff.includes(spot)}
											// onChange={(e) =>
											// 	handlePermission(e.target.value, "support_staff")
											// }
										>
											{spot}
										</Checkbox>
									))}
								</div>
							</Form.Item>

							<Form.Item
								name="event_host"
								label={<Title level={5}>Event Host</Title>}
								rules={[{ required: true, message: "Please select one spot" }]}
							>
								<div className="grid grid-cols-2 md:grid-cols-3">
									{staffPermission.map((spot) => (
										<Checkbox
											key={spot}
											value={spot}
											// checked={eventHost.includes(spot)}
											// onChange={(e) =>
											// 	handlePermission(e.target.value, "event_host")
											// }
										>
											{spot}
										</Checkbox>
									))}
								</div>
							</Form.Item>
						</div>
					</div>
					<button ref={triggerSubmitButton} type="submit" className="hidden" />
				</Form>
			</Spin>
			<div className="flex items-center gap-2.5 justify-end pt-4 border-t mt-4">
				<Button
					onClick={() => {
						setShowStaffModal(false);
						setTimeout(() => {
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
						if (triggerSubmitButton.current) {
							triggerSubmitButton.current.click();
						}
					}}
					loading={isLoading}
				>
					{isLoading ? "Saving.." : "Save Changes"}
				</Button>
			</div>
		</div>
	);
}

export default editPermission;
