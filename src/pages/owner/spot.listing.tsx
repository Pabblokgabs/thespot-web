import React, { useState } from "react";
import {
	Form,
	Input,
	Select,
	Switch,
	Checkbox,
	Button,
	Upload,
	TimePicker,
	Tag,
	message,
	Divider,
	Steps,
	Card,
	Row,
	Col,
	Typography,
	Space,
	Tooltip,
} from "antd";
import {
	UploadOutlined,
	PlusOutlined,
	CloseOutlined,
	InfoCircleOutlined,
	CheckCircleOutlined,
	EnvironmentOutlined,
	PhoneOutlined,
	GlobalOutlined,
	MailOutlined,
	ClockCircleOutlined,
	InstagramOutlined,
	FacebookOutlined,
	TwitterOutlined,
	YoutubeOutlined,
	CameraOutlined,
	TagOutlined,
	FileImageOutlined,
	MenuOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import dayjs from "dayjs";
import logo from "@/assets/logo.png";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const SpotListing: React.FC = () => {
	const [form] = Form.useForm();
	const [currentStep, setCurrentStep] = useState(0);
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [additionalImages, setAdditionalImages] = useState<UploadFile[]>([]);
	const [logoFile, setLogoFile] = useState<UploadFile[]>([]);
	const [videoFile, setVideoFile] = useState<UploadFile[]>([]);
	const [tags, setTags] = useState<string[]>([]);
	const [inputVisible, setInputVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const spotTypes = [
		"Restaurant",
		"Café",
		"Bar",
		"Pub",
		"Nightclub",
		"Spa",
		"Salon",
		"Gym",
		"Church",
		"Temple",
		"Mosque",
		"Museum",
		"Art Gallery",
		"Theater",
		"Cinema",
		"Park",
		"Beach",
		"Shopping Mall",
		"Boutique",
		"Hotel",
		"Event Space",
		"Coworking Space",
		"Other",
	];

	const predefinedTags = [
		"Open Now",
		"Free Entry",
		"Outdoor Seating",
		"Wheelchair Accessible",
		"Family Friendly",
		"Pet Friendly",
		"Live Music",
		"Vegan Options",
		"Gluten Free",
		"WiFi",
		"Parking Available",
		"Reservations",
		"Delivery",
		"Takeout",
		"LGBTQ+ Friendly",
		"Sustainable",
		"Historic",
		"Rooftop",
		"Waterfront",
		"Happy Hour",
	];

	const weekdays = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	const handleSubmit = (values: any) => {
		setSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			console.log("Form values:", values);
			setSubmitting(false);
			setSubmitted(true);
			message.success("Your spot has been submitted for review!");
		}, 2000);
	};

	const handleTagClose = (removedTag: string) => {
		const newTags = tags.filter((tag) => tag !== removedTag);
		setTags(newTags);
	};

	const showInput = () => {
		setInputVisible(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputConfirm = () => {
		if (inputValue && tags.indexOf(inputValue) === -1) {
			setTags([...tags, inputValue]);
		}
		setInputVisible(false);
		setInputValue("");
	};

	const beforeUpload = (file: File) => {
		const isImage = file.type.startsWith("image/");
		if (!isImage) {
			message.error("You can only upload image files!");
		}
		const isLt5M = file.size / 1024 / 1024 < 5;
		if (!isLt5M) {
			message.error("Image must be smaller than 5MB!");
		}
		return isImage && isLt5M;
	};

	const beforeVideoUpload = (file: File) => {
		const isVideo = file.type.startsWith("video/");
		if (!isVideo) {
			message.error("You can only upload video files!");
		}
		const isLt20M = file.size / 1024 / 1024 < 20;
		if (!isLt20M) {
			message.error("Video must be smaller than 20MB!");
		}
		return isVideo && isLt20M;
	};

	const handleCoverChange = ({ fileList }: { fileList: UploadFile[] }) => {
		setFileList(fileList);
	};

	const handleAdditionalImagesChange = ({
		fileList,
	}: {
		fileList: UploadFile[];
	}) => {
		setAdditionalImages(fileList);
	};

	const handleLogoChange = ({ fileList }: { fileList: UploadFile[] }) => {
		setLogoFile(fileList);
	};

	const handleVideoChange = ({ fileList }: { fileList: UploadFile[] }) => {
		setVideoFile(fileList);
	};

	const nextStep = () => {
		form
			.validateFields()
			.then(() => {
				setCurrentStep(currentStep + 1);
				window.scrollTo(0, 0);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};

	const prevStep = () => {
		setCurrentStep(currentStep - 1);
		window.scrollTo(0, 0);
	};

	const steps = [
		{
			title: "Basic Info",
			content: (
				<div className="space-y-8">
					<div className="space-y-6">
						<Form.Item
							name="spotName"
							label="Spot Name"
							rules={[
								{ required: true, message: "Please enter your spot name" },
							]}
						>
							<Input
								placeholder="Enter the name of your business or venue"
								className="h-12 text-base"
							/>
						</Form.Item>

						<Form.Item
							name="spotType"
							label="Spot Type"
							rules={[{ required: true, message: "Please select a spot type" }]}
						>
							<Select
								mode="multiple"
								maxCount={3}
								placeholder="Select the type of your spot"
							>
								{spotTypes.map((type) => (
									<Select.Option key={type} value={type}>
										{type}
									</Select.Option>
								))}
							</Select>
						</Form.Item>

						<Form.Item
							name="shortDescription"
							label={
								<Space>
									<span>Short Description</span>
									<Tooltip title="A brief tagline or description that will appear in search results">
										<InfoCircleOutlined className="text-gray-400" />
									</Tooltip>
								</Space>
							}
							rules={[
								{ required: true, message: "Please enter a short description" },
							]}
						>
							<TextArea
								placeholder="A brief one-line description of your spot"
								className="h-12 text-base"
								maxLength={100}
								showCount
							/>
						</Form.Item>

						<Form.Item
							name="fullDescription"
							label={
								<Space>
									<span>Full Description</span>
									<Tooltip title="Detailed information about your spot that will appear on your listing page">
										<InfoCircleOutlined className="text-gray-400" />
									</Tooltip>
								</Space>
							}
							rules={[
								{ required: true, message: "Please enter a full description" },
							]}
						>
							<TextArea
								placeholder="Tell visitors what makes your spot special, what to expect, and any other relevant details"
								className="text-base"
								rows={6}
								maxLength={2000}
								showCount
							/>
						</Form.Item>
					</div>
				</div>
			),
		},
		{
			title: "Location",
			content: (
				<div className="space-y-8">
					<div className="space-y-6">
						<Form.Item
							name="city"
							label={
								<Space>
									<EnvironmentOutlined />
									<span>City</span>
								</Space>
							}
							rules={[{ required: true, message: "Please enter your city" }]}
						>
							<Input
								placeholder="Enter the city where your spot is located"
								className="h-12 text-base"
							/>
						</Form.Item>

						<Form.Item
							name="address"
							label={
								<Space>
									<EnvironmentOutlined />
									<span>Full Address</span>
								</Space>
							}
							rules={[
								{ required: true, message: "Please enter your full address" },
							]}
							extra="Include street name, building number, area, postal code, and any additional information to help visitors find your spot."
						>
							<TextArea
								placeholder="Enter the complete address of your spot"
								className="text-base"
								rows={4}
								maxLength={2000}
								showCount
							/>
						</Form.Item>
					</div>
				</div>
			),
		},
		{
			title: "Contact & Hours",
			content: (
				<div className="space-y-8">
					<div className="space-y-6">
						<Form.Item
							name="phoneNumber"
							label={
								<Space>
									<PhoneOutlined />
									<span>Phone Number</span>
								</Space>
							}
							rules={[
								{ required: true, message: "Please enter your phone number" },
							]}
						>
							<Input
								placeholder="Enter your business phone number"
								className="h-12 text-base"
							/>
						</Form.Item>

						<Form.Item
							name="website"
							label={
								<Space>
									<GlobalOutlined />
									<span>Website or Booking Link</span>
								</Space>
							}
							rules={[
								{
									type: "url",
									message:
										"Please enter a valid URL starting with http:// or https://",
								},
							]}
						>
							<Input
								placeholder="https://www.example.com"
								className="h-12 text-base"
							/>
						</Form.Item>

						<Form.Item
							name="email"
							label={
								<Space>
									<MailOutlined />
									<span>Email</span>
								</Space>
							}
							rules={[
								{
									type: "email",
									message: "Please enter a valid email address",
								},
							]}
						>
							<Input
								placeholder="contact@yourbusiness.com"
								className="h-12 text-base"
							/>
						</Form.Item>

						<Divider orientation="left">
							<Space>
								<ClockCircleOutlined />
								<span>Operating Hours</span>
							</Space>
						</Divider>

						{weekdays.map((day) => (
							<div key={day} className="mb-6">
								<Row gutter={16} align="middle">
									<Col xs={24} sm={6}>
										<Text strong>{day}</Text>
									</Col>
									<Col xs={24} sm={18}>
										<Row gutter={16}>
											<Col xs={12}>
												<Form.Item
													name={`${day.toLowerCase()}_open`}
													label="Open"
													className="mb-2"
												>
													<TimePicker
														format="HH:mm"
														className="w-full h-10"
														placeholder="Opening time"
													/>
												</Form.Item>
											</Col>
											<Col xs={12}>
												<Form.Item
													name={`${day.toLowerCase()}_close`}
													label="Close"
													className="mb-2"
												>
													<TimePicker
														format="HH:mm"
														className="w-full h-10"
														placeholder="Closing time"
													/>
												</Form.Item>
											</Col>
										</Row>
									</Col>
								</Row>
							</div>
						))}

						<div className="mt-4">
							<Button
								type="default"
								onClick={() => {
									const mondayOpen = form.getFieldValue("monday_open");
									const mondayClose = form.getFieldValue("monday_close");

									if (mondayOpen && mondayClose) {
										weekdays.slice(1).forEach((day) => {
											form.setFieldsValue({
												[`${day.toLowerCase()}_open`]: mondayOpen,
												[`${day.toLowerCase()}_close`]: mondayClose,
											});
										});
										message.success("Hours copied to all days");
									} else {
										message.error("Please set Monday hours first");
									}
								}}
							>
								Copy Monday hours to all days
							</Button>
						</div>
					</div>
				</div>
			),
		},
		{
			title: "Social Media",
			content: (
				<div className="space-y-8">
					<div className="space-y-6">
						<Form.Item
							name="instagram"
							label={
								<Space>
									<InstagramOutlined />
									<span>Instagram</span>
								</Space>
							}
							rules={[
								{
									type: "url",
									message:
										"Please enter a valid URL starting with http:// or https://",
								},
							]}
						>
							<Input
								placeholder="Instagram handle or URL"
								className="h-12 text-base"
								prefix="@"
							/>
						</Form.Item>

						<Form.Item
							name="facebook"
							label={
								<Space>
									<FacebookOutlined />
									<span>Facebook</span>
								</Space>
							}
							rules={[
								{
									type: "url",
									message:
										"Please enter a valid URL starting with http:// or https://",
								},
							]}
						>
							<Input
								placeholder="Facebook page URL"
								className="h-12 text-base"
							/>
						</Form.Item>

						<Form.Item
							name="twitter"
							label={
								<Space>
									<TwitterOutlined />
									<span>X (Twitter)</span>
								</Space>
							}
							rules={[
								{
									type: "url",
									message:
										"Please enter a valid URL starting with http:// or https://",
								},
							]}
						>
							<Input
								placeholder="X (Twitter) handle or URL"
								className="h-12 text-base"
								prefix="@"
							/>
						</Form.Item>

						<Form.Item
							name="tiktok"
							label={
								<Space>
									<i className="fab fa-tiktok mr-1"></i>
									<span>TikTok</span>
								</Space>
							}
							rules={[
								{
									type: "url",
									message:
										"Please enter a valid URL starting with http:// or https://",
								},
							]}
						>
							<Input
								placeholder="TikTok handle or URL"
								className="h-12 text-base"
								prefix="@"
							/>
						</Form.Item>

						<Form.Item
							name="youtube"
							label={
								<Space>
									<YoutubeOutlined />
									<span>YouTube</span>
								</Space>
							}
							rules={[
								{
									type: "url",
									message:
										"Please enter a valid URL starting with http:// or https://",
								},
							]}
						>
							<Input
								placeholder="YouTube channel URL"
								className="h-12 text-base"
							/>
						</Form.Item>
					</div>
				</div>
			),
		},
		{
			title: "Media",
			content: (
				<div className="space-y-8">
					<div className="space-y-6">
						<Form.Item
							name="coverPhoto"
							label={
								<Space>
									<CameraOutlined />
									<span>Cover Photo</span>
									<Tooltip title="This will be the main image displayed for your spot">
										<InfoCircleOutlined className="text-gray-400" />
									</Tooltip>
								</Space>
							}
							rules={[
								{ required: true, message: "Please upload a cover photo" },
							]}
						>
							<Upload
								listType="picture-card"
								fileList={fileList}
								beforeUpload={beforeUpload}
								onChange={handleCoverChange}
								maxCount={1}
								accept="image/*"
							>
								{fileList.length === 0 && (
									<div className="flex flex-col items-center justify-center">
										<FileImageOutlined className="text-2xl mb-2" />
										<div className="text-xs">Upload Cover Photo</div>
									</div>
								)}
							</Upload>
						</Form.Item>

						<Form.Item
							name="additionalImages"
							label={
								<Space>
									<FileImageOutlined />
									<span>Additional Images</span>
									<Tooltip title="Add more photos to showcase different aspects of your spot">
										<InfoCircleOutlined className="text-gray-400" />
									</Tooltip>
								</Space>
							}
						>
							<Upload
								listType="picture-card"
								fileList={additionalImages}
								beforeUpload={beforeUpload}
								onChange={handleAdditionalImagesChange}
								multiple
								accept="image/*"
							>
								{additionalImages.length < 8 && (
									<div className="flex flex-col items-center justify-center">
										<PlusOutlined className="text-2xl mb-2" />
										<div className="text-xs">Upload Image</div>
									</div>
								)}
							</Upload>
						</Form.Item>

						<Row gutter={24}>
							<Col xs={24} md={12}>
								<Form.Item
									name="logo"
									label={
										<Space>
											<i className="fas fa-copyright mr-1"></i>
											<span>Business Logo (Optional)</span>
										</Space>
									}
								>
									<Upload
										listType="picture-card"
										fileList={logoFile}
										beforeUpload={beforeUpload}
										onChange={handleLogoChange}
										maxCount={1}
										accept="image/*"
									>
										{logoFile.length === 0 && (
											<div className="flex flex-col items-center justify-center">
												<UploadOutlined className="text-2xl mb-2" />
												<div className="text-xs">Upload Logo</div>
											</div>
										)}
									</Upload>
								</Form.Item>
							</Col>
							<Col xs={24} md={12}>
								<Form.Item
									name="video"
									label={
										<Space>
											<i className="fas fa-film mr-1"></i>
											<span>Promotional Video (Optional)</span>
										</Space>
									}
								>
									<Upload
										listType="picture-card"
										fileList={videoFile}
										beforeUpload={beforeVideoUpload}
										onChange={handleVideoChange}
										maxCount={1}
										accept="video/*"
									>
										{videoFile.length === 0 && (
											<div className="flex flex-col items-center justify-center">
												<UploadOutlined className="text-2xl mb-2" />
												<div className="text-xs">Upload Video</div>
											</div>
										)}
									</Upload>
								</Form.Item>
							</Col>
						</Row>
					</div>
				</div>
			),
		},
		{
			title: "Tags & Features",
			content: (
				<div className="space-y-8">
					<div className="space-y-6">
						<Form.Item
							name="predefinedTags"
							label={
								<Space>
									<TagOutlined />
									<span>Amenities</span>
								</Space>
							}
						>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{predefinedTags.map((tag) => (
									<Checkbox key={tag} value={tag}>
										{tag}
									</Checkbox>
								))}
							</div>
						</Form.Item>

						<Divider orientation="left">
							<Space>
								<TagOutlined />
								<span>Custom Tags</span>
							</Space>
						</Divider>

						<div className="custom-tags-container">
							<div className="flex flex-wrap gap-2 mb-4">
								{tags.map((tag) => (
									<Tag
										key={tag}
										closable
										onClose={() => handleTagClose(tag)}
										className="py-1 px-3 text-base !rounded-button"
									>
										{tag}
									</Tag>
								))}
							</div>

							{inputVisible ? (
								<Input
									type="text"
									size="small"
									className="w-full md:w-1/3 h-10 mb-4"
									value={inputValue}
									onChange={handleInputChange}
									onBlur={handleInputConfirm}
									onPressEnter={handleInputConfirm}
									autoFocus
									placeholder="Press Enter to add tag"
								/>
							) : (
								<Button
									onClick={showInput}
									type="dashed"
									icon={<PlusOutlined />}
									className="h-10 !rounded-button whitespace-nowrap"
								>
									Add Custom Tag
								</Button>
							)}
						</div>
					</div>
				</div>
			),
		},
		{
			title: "Review & Submit",
			content: (
				<div className="space-y-8">
					<div className="space-y-6">
						<Card className="bg-blue-50 border-blue-200">
							<div className="flex items-start">
								<InfoCircleOutlined className="text-blue-500 text-xl mr-4 mt-1" />
								<div>
									<Text strong className="text-blue-700">
										Almost there!
									</Text>
									<Paragraph className="text-blue-600 mt-1">
										Please review all the information you've provided before
										submitting. Once submitted, your spot will be reviewed by
										our team before being published.
									</Paragraph>
								</div>
							</div>
						</Card>

						<Form.Item
							name="termsAgreed"
							valuePropName="checked"
							rules={[
								{
									validator: (_, value) =>
										value
											? Promise.resolve()
											: Promise.reject(
													new Error(
														"You must agree to the terms and privacy policy"
													)
											  ),
								},
							]}
						>
							<Checkbox>
								I agree to the{" "}
								<a href="#" className="text-blue-600 hover:underline">
									Terms of Service
								</a>{" "}
								and{" "}
								<a href="#" className="text-blue-600 hover:underline">
									Privacy Policy
								</a>
							</Checkbox>
						</Form.Item>
					</div>
				</div>
			),
		},
	];

	if (submitted) {
		return (
			<div className="min-h-screen bg-gray-50">
				<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
					<div className="flex flex-col items-center justify-center py-16">
						<div className="text-center mb-8">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
								<CheckCircleOutlined className="text-green-500 text-3xl" />
							</div>
							<Title level={2}>Your Spot Has Been Submitted!</Title>
							<Paragraph className="text-lg text-gray-600 mt-2">
								Thank you for listing your spot with us. Our team will review
								your submission and get back to you shortly.
							</Paragraph>
						</div>

						<Card className="w-full max-w-2xl shadow-md">
							<div className="space-y-6">
								<div>
									<Text className="text-gray-500">What happens next?</Text>
									<ul className="mt-4 space-y-4">
										<li className="flex">
											<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3">
												1
											</div>
											<div>
												<Text strong>Review Process</Text>
												<Paragraph className="text-gray-600">
													Our team will review your submission within 1-3
													business days.
												</Paragraph>
											</div>
										</li>
										<li className="flex">
											<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3">
												2
											</div>
											<div>
												<Text strong>Verification</Text>
												<Paragraph className="text-gray-600">
													We may contact you to verify some details about your
													spot.
												</Paragraph>
											</div>
										</li>
										<li className="flex">
											<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 mr-3">
												3
											</div>
											<div>
												<Text strong>Publication</Text>
												<Paragraph className="text-gray-600">
													Once approved, your spot will be published and visible
													to all users.
												</Paragraph>
											</div>
										</li>
									</ul>
								</div>

								<Divider />

								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Button
										type="primary"
										size="large"
										className="!rounded-button whitespace-nowrap"
										onClick={() => window.location.reload()}
									>
										List Another Spot
									</Button>
									<Button
										size="large"
										className="!rounded-button whitespace-nowrap"
										onClick={() => (window.location.href = "#")}
									>
										Go to Dashboard
									</Button>
								</div>
							</div>
						</Card>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="max-w-7xl flex-1 mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
				<div className="mb-8">
					<Title level={2}>List Your Spot</Title>
					<Paragraph className="text-gray-600">
						Share your business or venue with our community and attract new
						visitors.
					</Paragraph>
				</div>

				<div className="mb-8">
					<Steps current={currentStep} responsive={true}>
						{steps.map((item) => (
							<Step key={item.title} title={item.title} />
						))}
					</Steps>
				</div>

				<Card className="shadow-md">
					<Form
						form={form}
						layout="vertical"
						onFinish={handleSubmit}
						initialValues={{
							termsAgreed: false,
							openNow: false,
						}}
						className="max-w-full mx-auto"
					>
						<div className="py-4">{steps[currentStep].content}</div>

						<div className="flex justify-between mt-8">
							{currentStep > 0 && (
								<Button
									onClick={prevStep}
									className="!rounded-button whitespace-nowrap"
								>
									Previous
								</Button>
							)}

							<div className="ml-auto">
								{currentStep < steps.length - 1 && (
									<Button
										type="primary"
										onClick={nextStep}
										className="!rounded-button whitespace-nowrap"
									>
										Next
									</Button>
								)}

								{currentStep === steps.length - 1 && (
									<Button
										type="primary"
										htmlType="submit"
										loading={submitting}
										className="!rounded-button whitespace-nowrap"
									>
										Submit for Review
									</Button>
								)}
							</div>
						</div>
					</Form>
				</Card>
			</main>
		</div>
	);
};

export default SpotListing;
