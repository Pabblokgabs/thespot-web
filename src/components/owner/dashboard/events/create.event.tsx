import { useOwnerContext } from "@/lib/context/owner";
import {
	CloseOutlined,
	DollarOutlined,
	InfoCircleOutlined,
	MinusCircleOutlined,
	PlusOutlined,
	TagOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Button,
	Input,
	DatePicker,
	Form,
	Select,
	TimePicker,
	Radio,
	Upload,
	Tooltip,
	Switch,
	message,
	Space,
	InputNumber,
	Tag,
	Divider,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import TextArea from "antd/es/input/TextArea";
import { FaTaxi } from "react-icons/fa6";

function CreateEvent() {
	const [form] = Form.useForm();
	const { setShowCreateEventModal } = useOwnerContext();
	const [isRecurring, setIsRecurring] = useState<boolean>(false);
	const [performers, setPerformers] = useState<any[]>([
		{ id: 1, name: "", bio: "", photo: null },
	]);
	const [timeSchedule, setTimeSchedule] = useState<
		{ title: string; timeRange: string; description: string }[]
	>([]);
	const [transportInfo, setTransportInfo] = useState<
		{ title: string; description: string }[]
	>([]);

	const [formData, setFormData] = useState<{
		title: string;
		date: string;
		start_time: string;
		end_time: string;
		location: string;
		category: string[];
		max_attendee: number;
		description: string;
		entrance: "free" | "other" | "ticketed";
		ticket_url: string;
		entrance_others_info: string;
		mainImage: UploadFile;
		media: UploadFile[];
		event_assigment: string;
		facilities: string[];
		transportation_info: typeof transportInfo;
		schedule: typeof timeSchedule;
		anouncement: string[];
		inportant_info: string[];
		the_includements: string[];
		tags: string[];
	}>({
		title: "",
		date: "",
		start_time: "",
		end_time: "",
		location: "",
		category: [],
		max_attendee: 0,
		description: "",
		entrance: "free",
		ticket_url: "",
		entrance_others_info: "",
		mainImage: null,
		media: [],
		event_assigment: "",
		facilities: [],
		transportation_info: transportInfo,
		schedule: timeSchedule,
		anouncement: [],
		inportant_info: [],
		the_includements: [],
		tags: [],
		performers: performers,
	});

	const dommyLocation = ["place 1", "place 2", "place 3", "place 4"];
	const dommyStaff = [
		"staff member 1",
		"staff member 2",
		"staff member 3",
		"staff member 4",
	];

	const what_included = [
		"Access to all performance",
		"Food and beverage vendors (purchases separate)",
		"Free food and beverage",
	];

	const facilities = [
		"Restroom facilities throughout venue",
		"Food court with diverse options",
		"First aid stations at marked locations",
		"Accessible entrances and viewing areas",
	];

	const predefinedTags = [
		"Free Entry",
		"Family Friendly",
		"Outdoor",
		"18+",
		"Live Music",
		"Food Available",
		"Drinks Included",
		"Wheelchair Accessible",
		"Pet Friendly",
		"Parking Available",
		"Public Transport",
	];

	const handleInput = (name: any, value: any) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle main image upload
	const handleMainImageChange = (info: any) => {
		if (info.file.status === "done") {
			setFormData({
				...formData,
				mainImage: info.fileList,
			});
			message.success("Main image uploaded successfully");
		} else if (info.file.status === "error") {
			message.error("Main image upload failed");
		}
	};

	// Handle gallery images upload
	const handleGalleryChange = ({ fileList }: { fileList: UploadFile[] }) => {
		setFormData({
			...formData,
			media: fileList,
		});
	};

	const [customFacility, setCustomFacility] = useState<string>("");
	const handleFacilityAdd = () => {
		if (customFacility && !formData.facilities.includes(customFacility)) {
			setFormData({
				...formData,
				facilities: [...formData.facilities, customFacility.trim()],
			});
			setCustomFacility("");
		}
	};

	const handleFacilityClick = (value: string) => {
		const isExisting = formData.facilities.some(
			(item: string) => item.toLowerCase() === value.trim().toLowerCase()
		);

		if (isExisting) return;

		if (value.trim() !== "") {
			setFormData({
				...formData,
				facilities: [...formData.facilities, value.trim()],
			});
		}
	};

	// Handle recurring event toggle
	const handleRecurringChange = (checked: boolean) => {
		setIsRecurring(checked);
	};

	// Handle tag selection
	const handleIncludeClick = (value: string) => {
		const isExisting = formData.the_includements.some(
			(item: string) => item.toLowerCase() === value.trim().toLowerCase()
		);

		if (isExisting) return;

		if (value.trim() !== "") {
			setFormData({
				...formData,
				the_includements: [...formData.the_includements, value.trim()],
			});
		}
	};

	// Add custom tag
	const [customInclude, setCustomInclude] = useState<string>("");

	const addCustomInclude = () => {
		if (customInclude && !formData.the_includements.includes(customInclude)) {
			setFormData({
				...formData,
				the_includements: [...formData.the_includements, customInclude.trim()],
			});
			setCustomInclude("");
		}
	};

	// Add performer
	const addPerformer = () => {
		setPerformers([
			...performers,
			{ id: performers.length + 1, name: "", bio: "", photo: null },
		]);
	};

	// Remove performer
	const removePerformer = (id: number) => {
		if (performers.length > 1) {
			setPerformers(performers.filter((performer) => performer.id !== id));
		}
	};

	// Handle performer change
	const handlePerformerChange = (id: number, field: string, value: any) => {
		setPerformers(
			performers.map((performer) =>
				performer.id === id ? { ...performer, [field]: value } : performer
			)
		);
	};

	// Before upload function to prevent actual upload in this demo
	const beforeUpload = (file: RcFile) => {
		const isImage = file.type.startsWith("image/");
		if (!isImage) {
			message.error("You can only upload image files!");
		}
		const isLt5M = file.size / 1024 / 1024 < 2;
		if (!isLt5M) {
			message.error("Image must be smaller than 2MB!");
		}
		return false; // Prevent actual upload
	};

	// Handle tag selection
	const [customTag, setCustomTag] = useState<string>("");

	const handleTagClick = (tag: string) => {
		if (formData.tags.length === 4)
			return message.error("Onky four tags required");

		if (formData.tags.includes(tag)) {
			setFormData({
				...formData,
				tags: [...formData.tags.filter((t) => t !== tag)],
			});
		} else {
			setFormData({ ...formData, tags: [...formData.tags, tag] });
		}
	};

	// Add custom tag
	const addCustomTag = () => {
		if (
			customTag &&
			!formData.tags.includes(customTag) &&
			formData.tags.length < 5
		) {
			setFormData({ ...formData, tags: [...formData.tags, customTag] });
			setCustomTag("");
		}
	};

	// Remove tag
	const removeTag = (tag: string) => {
		setFormData({
			...formData,
			tags: [...formData.tags.filter((t) => t !== tag)],
		});
	};

	const [currentStep, setCurrentStep] = useState(1);

	const steps = [
		{
			name: "step 1",
			fields: [
				"title",
				"date",
				"end_time",
				"start_time",
				"location",
				"category",
				"summary",
				"description",
				"recurrencePattern",
			],
		},
		{
			name: "step 2",
			fields: [
				"entranceType",
				"ticketUrl",
				"entranceDetails",
				"the_includements",
			],
		},
		{
			name: "step 3",
			fields: ["mainImage"],
		},
		{
			name: "step 4",
			fields: ["media"],
		},
		{
			name: "step 5",
			fields: [""],
		},
		{
			name: "step 6",
			fields: [""],
		},
	];

	const handleNext = async () => {
		try {
			await form.validateFields(steps[currentStep - 1].fields);
			setCurrentStep(currentStep + 1);
			console.log(formData);
		} catch (error) {
			console.log(error);
		}
	};

	const renderStep1 = () => {
		return (
			<>
				<Form.Item
					name="title"
					label="Event Title"
					rules={[
						{ required: true, message: "Please enter your the event title" },
					]}
				>
					<Input
						onChange={(e) => handleInput("title", e.target.value)}
						size="large"
						placeholder="Enter event title"
						className="rounded-md"
					/>
				</Form.Item>

				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex-1">
						<Form.Item
							name="date"
							label="Event date"
							rules={[
								{
									required: true,
									message: "Please select date of the event",
								},
								{
									validator: (_, value) => {
										if (!value) {
											return Promise.resolve();
										}
										const minDate = dayjs().subtract(-1, "years");
										if (value.isAfter(minDate)) {
											return Promise.reject(
												new Error("The date must be in the future")
											);
										}
										return Promise.resolve();
									},
								},
							]}
						>
							<DatePicker
								onChange={(_, dateString) => handleInput("date", dateString)}
								size="large"
								className="w-full rounded-md"
								placeholder="Select your date of birth"
								format="YYYY-MM-DD"
								showNow={false}
							/>
						</Form.Item>
					</div>
					<div className="flex gap-4">
						<Form.Item
							name="start_time"
							label="Start Time"
							rules={[
								{
									required: true,
									message: "Time is required",
								},
							]}
						>
							<TimePicker
								onChange={(_, timeString) =>
									handleInput("start_time", timeString)
								}
								size="large"
								format="hh:mm A"
								use12Hours
							/>
						</Form.Item>

						<Form.Item
							name="end_time"
							label="End Time"
							rules={[
								{
									required: true,
									message: "Time is required",
								},
							]}
						>
							<TimePicker
								size="large"
								format="hh:mm A"
								use12Hours
								onChange={(_, timeString) =>
									handleInput("end_time", timeString)
								}
							/>
						</Form.Item>
					</div>
				</div>

				<Form.Item
					name="location"
					label="Location"
					rules={[
						{
							required: true,
							message: "Please Choose one location",
						},
					]}
				>
					<Select
						onChange={(value) => handleInput("location", value)}
						placeholder="Select one spot for the event"
						size="large"
					>
						{dommyLocation.map((item) => (
							<Select.Option key={item} value={item}>
								{item}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Form.Item
						name="recurring"
						label="Recurring Event"
						className="flex items-center"
						valuePropName="checked"
					>
						<div className="flex items-center">
							<Switch
								onChange={handleRecurringChange}
								className="bg-gray-300"
							/>
							<span className="ml-2 text-gray-600">
								{isRecurring ? "Yes" : "No"}
							</span>
						</div>
					</Form.Item>

					{isRecurring && (
						<Form.Item
							rules={[{ required: isRecurring, message: "Pattern required" }]}
							name="recurrencePattern"
							label="Recurrence Pattern"
						>
							<Select placeholder="Select pattern" className="rounded-md">
								<Select.Option value="daily">Daily</Select.Option>
								<Select.Option value="weekly">Weekly</Select.Option>
								<Select.Option value="biweekly">Bi-weekly</Select.Option>
								<Select.Option value="monthly">Monthly</Select.Option>
							</Select>
						</Form.Item>
					)}
				</div>

				<Form.Item
					name="category"
					label="Category"
					rules={[
						{
							required: true,
							message: "Select at least one category",
						},
					]}
				>
					<Select
						onChange={(values) => handleInput("category", values)}
						mode="multiple"
						placeholder="Select at least one category"
						size="large"
					>
						{dommyLocation.map((item) => (
							<Select.Option key={item} value={item}>
								{item}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item name="max_attendee" label="Maximum Attendee (optional)">
					<Input
						onChange={(e) => handleInput("max_attendee", e.target.value)}
						size="large"
						placeholder="Enter event title"
						className="rounded-md"
						type="number"
					/>
				</Form.Item>

				<Form.Item
					name="summary"
					label="Event Summary"
					rules={[
						{ required: true, message: "Please provide a short summary" },
					]}
					className="md:col-span-2"
				>
					<Input.TextArea
						placeholder="A brief, catchy description of your event"
						autoSize={{ minRows: 2, maxRows: 3 }}
						showCount
						maxLength={180}
						className="rounded-md"
					/>
				</Form.Item>

				<Form.Item
					name="description"
					label="Full Description"
					rules={[
						{ required: true, message: "Please provide a full description" },
					]}
					className="md:col-span-2"
				>
					<TextArea
						placeholder="Provide detailed information about your event"
						autoSize={{ minRows: 4, maxRows: 8 }}
						showCount
						maxLength={2000}
						className="rounded-md"
					/>
				</Form.Item>

				<Form.Item name="the_includements" label="Staff assignment">
					<Radio.Group
						style={{ display: "flex", flexDirection: "column", gap: "10px" }}
					>
						{dommyStaff.map((staff) => (
							<Radio value={staff}>{staff} (manager)</Radio>
						))}
					</Radio.Group>
				</Form.Item>
			</>
		);
	};

	const renderStep2 = () => {
		return (
			<>
				<Form.Item
					name="entranceType"
					label="Entrance Type"
					rules={[{ required: true, message: "Please select entrance type" }]}
				>
					<Radio.Group
						onChange={(e) =>
							setFormData({
								...formData,
								entrance: e.target.value,
							})
						}
						value={formData.entrance}
					>
						<Space direction="vertical" className="w-full">
							<Radio value="free" className="py-2">
								<span className="font-medium">Free</span>
								<p className="text-sm text-gray-500 ml-6">
									No ticket required for entry
								</p>
							</Radio>
							<Radio value="ticketed" className="py-2">
								<span className="font-medium">Ticketed</span>
								<p className="text-sm text-gray-500 ml-6">
									Attendees must purchase tickets
								</p>
							</Radio>
							<Radio value="other" className="py-2">
								<span className="font-medium">Other</span>
								<p className="text-sm text-gray-500 ml-6">
									Custom entrance arrangement
								</p>
							</Radio>
						</Space>
					</Radio.Group>
				</Form.Item>

				{formData.entrance === "ticketed" && (
					<div className="bg-gray-50 p-6 rounded-lg mt-4">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-medium text-gray-800">
								Ticket Information
							</h3>
							<Tooltip title="Define different ticket tiers for your event">
								<InfoCircleOutlined className="text-gray-400" />
							</Tooltip>
						</div>

						<Form.Item
							name="ticketUrl"
							label="Ticket URL"
							rules={[
								{
									required: formData.entrance === "ticketed",
									message: "Please provide ticket URL",
								},
								{ type: "url", message: "Please enter a valid URL" },
							]}
						>
							<Input
								placeholder="https://tickets.example.com/your-event"
								className="rounded-md"
							/>
						</Form.Item>

						<Form.List name="ticketTiers">
							{(fields, { add, remove }) => (
								<>
									{fields.map(({ key, name, ...restField }) => (
										<div
											key={key}
											className="bg-white p-4 rounded-lg mb-4 border border-gray-200"
										>
											<div className="flex justify-between items-center mb-3">
												<h4 className="text-md font-medium text-gray-700">
													Ticket Tier {name + 1}
												</h4>
												<Button
													type="text"
													onClick={() => remove(name)}
													icon={
														<MinusCircleOutlined className="text-red-500" />
													}
													className="!rounded-button whitespace-nowrap cursor-pointer"
												/>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
												<Form.Item
													{...restField}
													name={[name, "tierName"]}
													rules={[
														{
															required: true,
															message: "Please enter tier name",
														},
													]}
													className="mb-2"
												>
													<Input
														placeholder="Tier Name (e.g., General, VIP)"
														className="rounded-md"
													/>
												</Form.Item>

												<Form.Item
													{...restField}
													name={[name, "price"]}
													rules={[
														{ required: true, message: "Please enter price" },
													]}
													className="mb-2"
												>
													<InputNumber
														className="w-full rounded-md"
														placeholder="Price"
														prefix={
															<DollarOutlined className="text-gray-400" />
														}
														min={0}
														precision={2}
													/>
												</Form.Item>

												<Form.Item
													{...restField}
													name={[name, "tierDescription"]}
													className="mb-2 md:col-span-3"
												>
													<Input.TextArea
														placeholder="Description or benefits (e.g., Includes front-row access and complimentary drink)"
														autoSize={{ minRows: 2, maxRows: 3 }}
														className="rounded-md"
													/>
												</Form.Item>
											</div>
										</div>
									))}
									<Form.Item>
										<Button
											type="dashed"
											onClick={() => add()}
											icon={<PlusOutlined />}
											className="w-full !rounded-button whitespace-nowrap cursor-pointer"
										>
											Add Ticket Tier
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>

						<Form.Item name="ticketDetails" label="Additional Ticket Details">
							<TextArea
								placeholder="Enter any additional information about tickets (e.g., age restrictions, refund policy)"
								autoSize={{ minRows: 3, maxRows: 5 }}
								className="rounded-md"
							/>
						</Form.Item>
					</div>
				)}

				{formData.entrance === "other" && (
					<Form.Item
						name="entranceDetails"
						label="Entrance Details"
						rules={[
							{
								required: formData.entrance === "other",
								message: "Please provide entrance details",
							},
						]}
					>
						<TextArea
							placeholder="Explain your entrance arrangement (e.g., donation-based entry, membership required)"
							autoSize={{ minRows: 3, maxRows: 5 }}
							className="rounded-md"
						/>
					</Form.Item>
				)}

				<div>
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-medium text-gray-800">
							What included?
						</h3>
						<Tooltip title="Tell attendee what is included on the entrance tier!">
							<InfoCircleOutlined className="text-gray-400" />
						</Tooltip>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-3">
							Suggested
						</label>
						<div className="flex flex-wrap gap-2">
							{what_included.map((value) => (
								<Tag
									key={value}
									className={`px-3 py-1.5 text-sm rounded-full cursor-pointer ${
										formData.the_includements.includes(value)
											? "bg-indigo-100 text-indigo-800 border-indigo-300"
											: "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
									}`}
									onClick={() => handleIncludeClick(value)}
								>
									{value}
								</Tag>
							))}
						</div>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-3">
							Custom value
						</label>
						<div className="flex gap-2.5">
							<Input
								value={customInclude}
								onChange={(e) => setCustomInclude(e.target.value)}
								placeholder="Add your own value"
								className="rounded-l-md"
							/>
							<Button
								onClick={addCustomInclude}
								className="rounded-r-md border-l-0 !rounded-button whitespace-nowrap cursor-pointer"
							>
								Add
							</Button>
						</div>
					</div>

					{formData.the_includements.length > 0 && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-3">
								The includements
							</label>
							<div className="p-4 bg-gray-50 rounded-lg flex flex-wrap gap-2">
								{formData.the_includements.map((value) => (
									<Tag
										key={value}
										closable
										onClose={() =>
											setFormData({
												...formData,
												the_includements: [
													...formData.the_includements.filter(
														(t) => t !== value
													),
												],
											})
										}
										className="px-3 py-1.5 text-sm rounded-full bg-indigo-100 text-indigo-800 border-indigo-300"
									>
										{value}
									</Tag>
								))}
							</div>
						</div>
					)}
				</div>
			</>
		);
	};

	const renderStep3 = () => {
		return (
			<>
				<div className="flex flex-col gap-5">
					<div>
						<Form.Item
							name="mainImage"
							label={
								<div className="flex justify-between w-full">
									<span>Main Event Image</span>
									<span className="text-sm text-gray-500 ml-2">(Required)</span>
								</div>
							}
							rules={[
								{ required: true, message: "Please upload a main image" },
							]}
						>
							<Upload.Dragger
								listType="picture-card"
								showUploadList={false}
								beforeUpload={beforeUpload}
								onChange={handleMainImageChange}
								className="w-full"
							>
								{formData.mainImage ? (
									<div className="relative w-full h-40 overflow-hidden">
										<img
											src={formData.mainImage.uid}
											alt="Event"
											className="w-full h-full object-cover object-top"
										/>
										<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
											<FaCloudUploadAlt className="text-white text-2xl" />
										</div>
									</div>
								) : (
									<div className="flex flex-col w-full h-30 items-center justify-center p-4">
										<FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
										<div className="text-gray-500 text-sm text-center">
											Upload main event image
											<p className="text-xs mt-1">Recommended: 1200×800px</p>
										</div>
									</div>
								)}
							</Upload.Dragger>
						</Form.Item>
						<p className="text-sm text-gray-500 mt-2">
							This will be the primary image displayed for your event.
						</p>
					</div>

					<div>
						<Form.Item
							name="galleryImages"
							label={
								<div className="flex justify-between w-full">
									<span>Gallery Images</span>
									<span className="text-sm text-gray-500 ml-2">(Optional)</span>
								</div>
							}
						>
							<Upload
								listType="picture-card"
								fileList={formData.media}
								beforeUpload={beforeUpload}
								onChange={handleGalleryChange}
								multiple
							>
								{formData.media.length >= 8 ? null : (
									<div className="flex flex-col items-center justify-center">
										<PlusOutlined className="text-gray-400" />
										<div className="mt-2 text-sm text-gray-500">Upload</div>
									</div>
								)}
							</Upload>
						</Form.Item>
						<p className="text-sm text-gray-500 mt-2">
							Add up to 8 additional images to showcase your event.
						</p>
					</div>
				</div>
			</>
		);
	};

	const renderStep4 = () => {
		return (
			<div>
				<div className="mt-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-medium text-gray-800">
							Detailed Schedule
						</h3>
						<Tooltip title="Add time blocks for different activities during your event">
							<InfoCircleOutlined className="text-gray-400" />
						</Tooltip>
					</div>

					<Form.List name="scheduleBlocks">
						{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, ...restField }) => (
									<div key={key} className="bg-gray-50 p-4 rounded-lg mb-4">
										<div className="flex justify-between items-center mb-3">
											<h4 className="text-md font-medium text-gray-700">
												Schedule Block {name + 1}
											</h4>
											<Button
												type="text"
												onClick={() => remove(name)}
												icon={<MinusCircleOutlined className="text-red-500" />}
												className="!rounded-button whitespace-nowrap cursor-pointer"
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<Form.Item
												{...restField}
												name={[name, "blockTitle"]}
												rules={[
													{ required: true, message: "Please enter title" },
												]}
												className="mb-2"
											>
												<Input
													placeholder="Block Title (e.g., DJ Set)"
													className="rounded-md"
												/>
											</Form.Item>

											<Form.Item
												{...restField}
												name={[name, "timeRange"]}
												rules={[
													{
														required: true,
														message: "Please select time range",
													},
												]}
												className="mb-2"
											>
												<TimePicker.RangePicker
													className="w-full rounded-md"
													format="h:mm A"
													use12Hours
												/>
											</Form.Item>

											<Form.Item
												{...restField}
												name={[name, "blockDescription"]}
												className="mb-2 md:col-span-3"
											>
												<Input.TextArea
													placeholder="Brief description of this block"
													autoSize={{ minRows: 2, maxRows: 3 }}
													className="rounded-md"
												/>
											</Form.Item>
										</div>
									</div>
								))}
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => add()}
										icon={<PlusOutlined />}
										className="w-full !rounded-button whitespace-nowrap cursor-pointer"
									>
										Add Schedule Block
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
				</div>
			</div>
		);
	};

	const renderStep5 = () => {
		return (
			<>
				{/* Performer Details Section */}
				<div>
					<div className="flex justify-end mb-4">
						<Tooltip title="Add little info about the perfomer to attract audiance">
							<InfoCircleOutlined className="text-gray-400" />
						</Tooltip>
					</div>

					<div className="space-y-6">
						{performers.map((performer, index) => (
							<div key={performer.id} className="bg-gray-50 p-6 rounded-lg">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-medium text-gray-800">
										Performer {index + 1}
									</h3>
									{performers.length > 1 && (
										<Button
											type="text"
											onClick={() => removePerformer(performer.id)}
											icon={<CloseOutlined className="text-red-500" />}
											className="!rounded-button whitespace-nowrap cursor-pointer"
										/>
									)}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div className="md:col-span-1">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Performer Photo
										</label>
										<Upload
											listType="picture-card"
											showUploadList={false}
											beforeUpload={beforeUpload}
											onChange={(info) => {
												if (info.file.status === "done") {
													// In a real app, this would handle the actual upload
													const photoUrl =
														"https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20performer%20or%20artist%20with%20neutral%20background%2C%20high%20quality%20studio%20lighting%2C%20professional%20attire%2C%20clear%20facial%20features%2C%20suitable%20for%20event%20promotion&width=300&height=300&seq=2&orientation=squarish";
													handlePerformerChange(
														performer.id,
														"photo",
														photoUrl
													);
												}
											}}
										>
											{performer.photo ? (
												<img
													src={performer.photo}
													alt="Performer"
													className="w-full h-full object-cover object-top rounded-md"
												/>
											) : (
												<div className="flex flex-col items-center justify-center">
													<UserOutlined className="text-2xl text-gray-400" />
													<div className="mt-2 text-xs text-gray-500">
														Upload
													</div>
												</div>
											)}
										</Upload>
									</div>

									<div className="md:col-span-2">
										<div className="space-y-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Performer Name
												</label>
												<Input
													value={performer.name}
													onChange={(e) =>
														handlePerformerChange(
															performer.id,
															"name",
															e.target.value
														)
													}
													placeholder="Full name"
													className="rounded-md"
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 mb-2">
													Short Bio
												</label>
												<TextArea
													value={performer.bio}
													onChange={(e) =>
														handlePerformerChange(
															performer.id,
															"bio",
															e.target.value
														)
													}
													placeholder="1-2 lines about this performer"
													autoSize={{ minRows: 2, maxRows: 3 }}
													className="rounded-md"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}

						<Button
							type="dashed"
							onClick={addPerformer}
							icon={<PlusOutlined />}
							className="w-full !rounded-button whitespace-nowrap cursor-pointer"
						>
							Add Another Performer
						</Button>
					</div>
				</div>
			</>
		);
	};

	const [imIn, setImIn] = useState<string>("");
	const handleImInAdd = () => {
		if (imIn && !formData.inportant_info.includes(imIn)) {
			setFormData({
				...formData,
				inportant_info: [...formData.inportant_info, imIn.trim()],
			});
			setImIn("");
		}
	};

	const renderStep6 = () => {
		return (
			<>
				<div className="pt-5">
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-lg font-medium text-gray-800">Facilities</h4>
						<Tooltip title="Tell attendee what is included on the entrance tier!">
							<InfoCircleOutlined className="text-gray-400" />
						</Tooltip>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-3">
							choose any
						</label>
						<div className="flex flex-wrap gap-2">
							{facilities.map((value) => (
								<Tag
									key={value}
									className={`px-3 py-1.5 text-sm rounded-full cursor-pointer ${
										formData.facilities.includes(value)
											? "bg-indigo-100 text-indigo-800 border-indigo-300"
											: "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
									}`}
									onClick={() => handleFacilityClick(value)}
								>
									{value}
								</Tag>
							))}
						</div>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-3">
							Custom value
						</label>
						<div className="flex gap-2.5">
							<Input
								value={customFacility}
								onChange={(e) => setCustomFacility(e.target.value)}
								placeholder="Add your own facility"
								className="rounded-l-md"
							/>
							<Button
								onClick={handleFacilityAdd}
								className="rounded-r-md border-l-0 !rounded-button whitespace-nowrap cursor-pointer"
							>
								Add
							</Button>
						</div>
					</div>

					{formData.facilities.length > 0 && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-3">
								added facilities
							</label>
							<div className="p-4 bg-gray-50 rounded-lg flex flex-col gap-2">
								{formData.facilities.map((value) => (
									<div className="flex items-center justify-between">
										<p key={value} className="text-sm truncate line-clamp-1">
											<span className="font-extrabold">-</span> {value}
										</p>
										<button
											className="h-5 w-5 flex items-center justify-center cursor-pointer"
											onClick={() => {
												setFormData({
													...formData,
													facilities: [
														...formData.facilities.filter((t) => t !== value),
													],
												});
											}}
										>
											x
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<Divider />

				<div className="mt-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-medium flex items-center text-gray-800">
							<FaTaxi className="mr-2 text-indigo-500" /> Transportation
							information
						</h3>
						<Tooltip title="Add time blocks for different activities during your event">
							<InfoCircleOutlined className="text-gray-400" />
						</Tooltip>
					</div>

					<Form.List name="transpotation_info">
						{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, ...restField }) => (
									<div key={key} className="bg-gray-50 p-4 rounded-lg mb-4">
										<div className="flex justify-between items-center mb-3">
											<h4 className="text-md font-medium text-gray-700">
												Information number {name + 1}
											</h4>
											<Button
												type="text"
												onClick={() => remove(name)}
												icon={<MinusCircleOutlined className="text-red-500" />}
												className="!rounded-button whitespace-nowrap cursor-pointer"
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<Form.Item
												{...restField}
												name={[name, "blockTitle"]}
												rules={[
													{ required: true, message: "Please enter title" },
												]}
												className="mb-2"
											>
												<Input
													placeholder="Info Title (e.g., Parking, )"
													className="rounded-md"
												/>
											</Form.Item>

											<Form.Item
												{...restField}
												name={[name, "blockDescription"]}
												className="mb-2 md:col-span-3"
											>
												<Input.TextArea
													placeholder="Brief description of this info (e.g., Limited parking available. requested rides are recommended."
													autoSize={{ minRows: 2, maxRows: 3 }}
													className="rounded-md"
												/>
											</Form.Item>
										</div>
									</div>
								))}
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => add()}
										icon={<PlusOutlined />}
										className="w-full !rounded-button whitespace-nowrap cursor-pointer"
									>
										Add informtion
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
				</div>

				<Divider />

				<div className="pt-5">
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-lg font-medium text-gray-800">
							Important Information
						</h4>
						<Tooltip title="Add any information that is important about this event">
							<InfoCircleOutlined className="text-gray-400" />
						</Tooltip>
					</div>

					<Form.Item>
						<div className="flex gap-2.5">
							<Input
								value={imIn}
								onChange={(e) => setImIn(e.target.value)}
								placeholder="Important info (e.g., Re-entry is permitted with valid wristband.)"
								className="rounded-l-md"
							/>
							<Button
								onClick={handleImInAdd}
								className="rounded-r-md border-l-0 !rounded-button whitespace-nowrap cursor-pointer"
							>
								Add
							</Button>
						</div>
					</Form.Item>

					{formData.inportant_info.length > 0 && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-3">
								added Inpormation
							</label>
							<div className="p-4 bg-gray-50 rounded-lg flex flex-col gap-2">
								{formData.inportant_info.map((value, index) => (
									<div className="flex items-center justify-between">
										<p key={value} className="text-sm truncate line-clamp-1">
											<span className="font-extrabold">{index + 1})</span>{" "}
											{value}
										</p>
										<button
											className="h-5 w-5 flex items-center justify-center cursor-pointer"
											onClick={() => {
												setFormData({
													...formData,
													inportant_info: [
														...formData.inportant_info.filter(
															(t) => t !== value
														),
													],
												});
											}}
										>
											x
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<Divider />

				<div>
					<h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
						<i className="fas fa-tags mr-2 text-indigo-500"></i>
						Event Tags
					</h3>

					<p className="text-gray-600 mb-4">
						Select tags that describe your event to help attendees find it.
					</p>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-3">
							Suggested Tags
						</label>
						<div className="flex flex-wrap gap-2">
							{predefinedTags.map((tag) => (
								<Tag
									key={tag}
									className={`px-3 py-1.5 text-sm rounded-full cursor-pointer ${
										formData.tags.includes(tag)
											? "bg-indigo-100 text-indigo-800 border-indigo-300"
											: "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
									}`}
									onClick={() => handleTagClick(tag)}
								>
									{tag}
								</Tag>
							))}
						</div>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-3">
							Custom Tag
						</label>
						<div className="flex">
							<Input
								value={customTag}
								onChange={(e) => setCustomTag(e.target.value)}
								placeholder="Add your own tag"
								className="rounded-l-md"
								prefix={<TagOutlined className="text-gray-400" />}
							/>
							<Button
								onClick={addCustomTag}
								className="rounded-r-md border-l-0 !rounded-button whitespace-nowrap cursor-pointer"
							>
								Add
							</Button>
						</div>
					</div>

					{formData.tags.length > 0 && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-3">
								Selected Tags
							</label>
							<div className="p-4 bg-gray-50 rounded-lg flex flex-wrap gap-2">
								{formData.tags.map((tag) => (
									<Tag
										key={tag}
										closable
										onClose={() => removeTag(tag)}
										className="px-3 py-1.5 text-sm rounded-full bg-indigo-100 text-indigo-800 border-indigo-300"
									>
										{tag}
									</Tag>
								))}
							</div>
						</div>
					)}
				</div>
			</>
		);
	};

	const content = () => {
		switch (currentStep) {
			case 1:
				return renderStep1();
			case 2:
				return renderStep2();
			case 3:
				return renderStep3();
			case 4:
				return renderStep4();
			case 5:
				return renderStep5();
			case 6:
				return renderStep6();
			default:
				break;
		}
	};

	const handleSubmit = (values: any) => {
		console.log(values);
		console.log(formData);
	};

	return (
		<>
			<div className="space-y-4 mt-4">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center space-x-2">
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center ${
								currentStep >= 1
									? "bg-blue-600 text-white"
									: "bg-gray-200 text-gray-500"
							}`}
						>
							1
						</div>
						<div
							className={`h-1 w-2.5 md:w-12 ${
								currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
							}`}
						></div>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center ${
								currentStep >= 2
									? "bg-blue-600 text-white"
									: "bg-gray-200 text-gray-500"
							}`}
						>
							2
						</div>
						<div
							className={`h-1 w-2.5 md:w-12 ${
								currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"
							}`}
						></div>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center ${
								currentStep >= 3
									? "bg-blue-600 text-white"
									: "bg-gray-200 text-gray-500"
							}`}
						>
							3
						</div>
						<div
							className={`h-1 w-2.5 md:w-12 ${
								currentStep >= 4 ? "bg-blue-600" : "bg-gray-200"
							}`}
						></div>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center ${
								currentStep >= 4
									? "bg-blue-600 text-white"
									: "bg-gray-200 text-gray-500"
							}`}
						>
							4
						</div>
						<div
							className={`h-1 w-2.5 md:w-12 ${
								currentStep >= 5 ? "bg-blue-600" : "bg-gray-200"
							}`}
						></div>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center ${
								currentStep >= 5
									? "bg-blue-600 text-white"
									: "bg-gray-200 text-gray-500"
							}`}
						>
							5
						</div>
						<div
							className={`h-1 w-2.5 md:w-12 ${
								currentStep >= 6 ? "bg-blue-600" : "bg-gray-200"
							}`}
						></div>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center ${
								currentStep >= 6
									? "bg-blue-600 text-white"
									: "bg-gray-200 text-gray-500"
							}`}
						>
							6
						</div>
					</div>
				</div>

				<div className="mb-5">
					<h3 className="font-medium text-lg">
						{currentStep === 1 && "Basic Information"}
						{currentStep === 2 && "Entrance & Pricing"}
						{currentStep === 3 && "Photos & Media"}
						{currentStep === 4 && "Event schedule (optional)"}
						{currentStep === 5 && "Perfomers Information (optional)"}
						{currentStep === 6 && "Rules & Policies"}
					</h3>
					<p className="text-sm text-gray-500">
						{currentStep === 1 && "Provide basic details about the event"}
						{currentStep === 2 && "Specify the entrance for the event"}
						{currentStep === 3 && "Upload photos and media content"}
						{currentStep === 4 &&
							"Set schedule for the event by adding time blocks for different activities during your event"}
						{currentStep === 5 &&
							"Add information about performers, speakers, or special guests at your event."}
						{currentStep === 6 && "Define rules and policies for your spot"}
					</p>
				</div>
				<Form
					form={form}
					layout="vertical"
					onFinish={handleSubmit}
					requiredMark={false}
					className="space-y-4"
				>
					{content()}
					<Form.Item>
						<div className="flex justify-end gap-5">
							{currentStep > 1 ? (
								<Button
									onClick={() => setCurrentStep(currentStep - 1)}
									type="default"
									htmlType="button"
									size="large"
									className="!rounded-button whitespace-nowrap cursor-pointer"
								>
									Back
								</Button>
							) : (
								<Button
									onClick={() => {
										setShowCreateEventModal(false);
										form.resetFields();
									}}
									type="default"
									htmlType="button"
									size="large"
									className="!rounded-button whitespace-nowrap cursor-pointer"
								>
									Cancel
								</Button>
							)}

							{currentStep < 6 ? (
								<Button
									onClick={() => handleNext()}
									type="primary"
									htmlType="button"
									size="large"
									className="!rounded-button whitespace-nowrap cursor-pointer"
								>
									Next
								</Button>
							) : (
								<Button
									onClick={() => setShowCreateEventModal(false)}
									type="primary"
									htmlType="submit"
									size="large"
									className="!rounded-button whitespace-nowrap cursor-pointer"
								>
									Create Event
								</Button>
							)}
						</div>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}

export default CreateEvent;
