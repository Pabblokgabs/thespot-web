import React, { useState, useEffect } from "react";
import {
	Button,
	Form,
	Input,
	Select,
	Upload,
	message,
	Space,
	Tag,
	Spin,
	Checkbox,
	TimePicker,
	Typography,
	Tooltip,
} from "antd";
import {
	PlusOutlined,
	PhoneOutlined,
	MailOutlined,
	GlobalOutlined,
	DeleteOutlined,
	EditOutlined,
	LoadingOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { useOwnerContext } from "@/lib/context/owner";
import {
	amenities,
	spotTypes,
	socialMediaIcons,
	socialPlatforms,
} from "@/lib/options";
import countries from "@/lib/county";
import p1 from "@/assets/spot/1.jpg";
import p2 from "@/assets/spot/2.jpg";
import p3 from "@/assets/spot/3.jpg";
import p4 from "@/assets/spot/4.jpg";
import p5 from "@/assets/spot/5.jpg";
import p6 from "@/assets/spot/6.jpg";

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

interface SocialMediaLink {
	platform: string;
	url: string;
}

interface SpotData {
	name: string;
	type: string;
	streetAddress: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	description: string;
	phone?: string;
	email?: string;
	website?: string;
	socialMedia: SocialMediaLink[];
	coverImage: UploadFile | null;
	galleryImages: UploadFile[];
	amenities: string[];
	customTags: string[];
	coordinates: {
		lat: number;
		lng: number;
	};
}

function EditSpot() {
	const { setShowEditSpotModal, showEditSpotModal, activeEdit } =
		useOwnerContext();

	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [customTagInput, setCustomTagInput] = useState("");
	const [isSaveDisabled, setIsSaveDisabled] = useState(true);
	const [characterCount, setCharacterCount] = useState(0);
	const [coverImage, setCoverImage] = useState<UploadFile | null>(null);
	const [galleryImages, setGalleryImages] = useState<UploadFile[]>([]);
	const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMediaLink[]>([
		{ platform: "instagram", url: "" },
	]);
	const [countryCode, setCountryCode] = useState<string>("");

	const [spotData, setSpotData] = useState<SpotData>({
		name: "The Urban Garden Café",
		type: "Cafe",
		streetAddress: "123 Main Street",
		city: "San Francisco",
		state: "CA",
		zipCode: "94105",
		country: "United States",
		description:
			"A cozy café with outdoor seating, serving organic coffee and farm-to-table breakfast and lunch options. Perfect for remote work with free Wi-Fi and plenty of outlets.",
		phone: "+1 (415) 555-1234",
		email: "contact@urbangardencafe.com",
		website: "https://www.urbangardencafe.com",
		socialMedia: [
			{ platform: "instagram", url: "https://instagram.com/urbangardencafe" },
			{ platform: "facebook", url: "https://facebook.com/urbangardencafe" },
		],
		coverImage: null,
		galleryImages: [],
		amenities: [
			"Wheelchair Accessible",
			"Outdoor Space",
			"Family Friendly",
			"Pet Friendly",
			"Free Wi-Fi",
			"Vegan Options",
			"Gluten-Free Options",
			"Live Music",
		],
		customTags: ["Organic", "Sustainable", "Plant-Based"],
		coordinates: {
			lat: 37.7749,
			lng: -122.4194,
		},
	});

	const weekdays = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	useEffect(() => {
		if (showEditSpotModal) {
			form.setFieldsValue({
				name: spotData.name,
				type: spotData.type,
				streetAddress: spotData.streetAddress,
				city: spotData.city,
				state: spotData.state,
				zipCode: spotData.zipCode,
				country: spotData.country,
				description: spotData.description,
				phone: spotData.phone,
				email: spotData.email,
				website: spotData.website,
			});
			setCharacterCount(spotData.description.length);
			setSocialMediaLinks(spotData.socialMedia);
		}
	}, [showEditSpotModal, form, spotData]);

	useEffect(() => {
		// Validate form to determine if save button should be enabled
		const hasRequiredFields =
			form.getFieldValue("name") &&
			form.getFieldValue("type") &&
			form.getFieldValue("streetAddress") &&
			form.getFieldValue("city") &&
			form.getFieldValue("state") &&
			form.getFieldValue("country");

		setIsSaveDisabled(!hasRequiredFields);
	}, [form]);

	const handleCancel = () => {
		setShowEditSpotModal(false);
		form.resetFields();
	};

	const handleSave = () => {
		form
			.validateFields()
			.then((values) => {
				setLoading(true);

				// Simulate API call
				setTimeout(() => {
					setLoading(false);
					setShowEditSpotModal(false);

					// Update spot data
					setSpotData({
						...spotData,
						...values,
						socialMedia: socialMediaLinks,
						coverImage: coverImage,
						galleryImages: galleryImages,
					});

					message.success({
						content: "Spot updated successfully!",
						className: "custom-success-message",
					});
				}, 1500);
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setCharacterCount(e.target.value.length);
	};

	const handleAddSocialMedia = () => {
		setSocialMediaLinks([
			...socialMediaLinks,
			{ platform: "instagram", url: "" },
		]);
	};

	const handleRemoveSocialMedia = (index: number) => {
		const newLinks = [...socialMediaLinks];
		newLinks.splice(index, 1);
		setSocialMediaLinks(newLinks);
	};

	const handleSocialMediaChange = (
		index: number,
		field: "platform" | "url",
		value: string
	) => {
		const newLinks = [...socialMediaLinks];
		newLinks[index][field] = value;
		setSocialMediaLinks(newLinks);
	};

	const handleAddCustomTag = () => {
		if (
			customTagInput.trim() &&
			!spotData.customTags.includes(customTagInput.trim())
		) {
			const newCustomTags = [...spotData.customTags, customTagInput];
			setSpotData({ ...spotData, customTags: newCustomTags });
			setCustomTagInput("");
		}
	};

	const handleRemoveCustomTag = (tag: string) => {
		const newCustomTags = spotData.customTags.filter((t) => t !== tag);
		setSpotData({ ...spotData, customTags: newCustomTags });
	};

	const handleTagToggle = (amenity: string) => {
		if (amenity.trim() && spotData.amenities.includes(amenity.trim())) {
			const filteredAmenities = spotData.amenities.filter(
				(item) => item !== amenity
			);

			setSpotData({ ...spotData, amenities: filteredAmenities });
		} else {
			setSpotData({ ...spotData, amenities: [...spotData.amenities, amenity] });
		}
	};

	const handleGalleryImagesChange: UploadProps["onChange"] = ({ fileList }) => {
		setGalleryImages(fileList);
	};

	const uploadButton = (
		<div className="flex flex-col items-center justify-center">
			<PlusOutlined className="text-xl mb-1" />
			<div className="text-sm">Upload</div>
		</div>
	);

	const galleryImageUrls = [p1, p2, p3, p4, p5, p6];

	const oparationHours = () => {
		return (
			<div>
				<Spin
					spinning={loading}
					indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
				>
					<Form
						form={form}
						layout="vertical"
						className="mt-10 overflow-y-auto max-h-[70vh]"
						initialValues={spotData}
					>
						<div className="w-full pr-4">
							<p className="text-neutral-500">
								Your spot will be online and offline according to the oparation
								time
							</p>
							{weekdays.map((day) => (
								<div key={day} className="my-6">
									<div className="flex flex-col gap-4 md:flex-row">
										<div className="flex-1/4">
											<Text strong>{day}</Text>
										</div>
										<div className="flex-3/4 grid md:grid-cols-2">
											<div className="md:mr-4 mb-2.5 md:mb-0">
												<Form.Item
													name={`${day.toLowerCase()}_open`}
													label="Open"
												>
													<TimePicker
														className="w-full"
														format="HH:mm"
														placeholder="Opening time"
													/>
												</Form.Item>
											</div>

											<Form.Item
												name={`${day.toLowerCase()}_close`}
												label="Close"
											>
												<TimePicker
													className="w-full"
													format="HH:mm"
													placeholder="Closing time"
												/>
											</Form.Item>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mb-4">
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
					</Form>
				</Spin>
				<div className="flex items-center gap-2.5 justify-end pt-4 border-t mt-4">
					<Button
						onClick={handleCancel}
						className="!rounded-button whitespace-nowrap"
					>
						Cancel
					</Button>
					<Button
						type="primary"
						onClick={handleSave}
						disabled={isSaveDisabled}
						loading={loading}
						className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700"
					>
						Save Changes
					</Button>
				</div>
			</div>
		);
	};

	const [imgError, setImgError] = useState("");
	const [coverImg, setCoverImg] = useState<UploadFile[]>([]);
	const beforeProfileUpload = (file: File) => {
		const isImage = file.type.startsWith("image/");
		const isLAllowed = file.size / 1024 / 1024 < 2;

		if (!isImage) {
			setImgError("Only image files are allowed!");
			return Upload.LIST_IGNORE;
		}

		if (!isLAllowed) {
			setImgError("Image must be smaller than 2MB!");
			return Upload.LIST_IGNORE;
		}

		setImgError("");

		return false;
	};

	const handleCoverChange = ({ fileList }: { fileList: UploadFile[] }) => {
		setCoverImg(fileList);
	};

	const media = () => {
		return (
			<div>
				<Spin
					spinning={loading}
					indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
				>
					<Form
						form={form}
						layout="vertical"
						className="mt-10 overflow-y-auto max-h-[70vh]"
						initialValues={spotData}
					>
						<div className="mb-8">
							<div className="mb-6">
								<p className="font-medium mb-2">Cover Image</p>
								<div className="flex flex-col items-center justify-center mb-8 relative">
									<div className="relative w-full h-56 flex justify-center group border border-dashed border-gray-300 rounded-lg">
										<Upload
											fileList={coverImg}
											onChange={handleCoverChange}
											beforeUpload={beforeProfileUpload}
											accept="image/*"
											maxCount={1}
											showUploadList={false}
											style={{ maxWidth: "200px" }}
										>
											<div className="w-full relative h-full bg-gray-800 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
												{coverImg.length > 0 ? (
													<img
														src={
															coverImg[0].thumbUrl ||
															URL.createObjectURL(
																coverImg[0].originFileObj as File
															)
														}
														alt="avatar"
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="text-gray-400 flex flex-col items-center justify-center">
														<p>Add new cover image</p>
													</div>
												)}
												<div className="absolute bottom-0 text-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:text-blue-600 transition-all">
													Change Image
												</div>
											</div>
										</Upload>
									</div>
									{imgError ? (
										<p className="text-red-400 w-full text-center text-sm">
											{imgError}
										</p>
									) : (
										<p className="text-xs text-gray-500 mt-2">
											spotTypes: 1200 x 800px. JPG, PNG or WEBP (max 5MB)
										</p>
									)}
								</div>
								{/* <div className="border border-dashed border-gray-300 rounded-lg p-4">
									<Upload
										listType="picture-card"
										showUploadList={false}
										beforeUpload={() => false}
										onChange={handleCoverImageChange}
										className="w-full"
									>
										{coverImage ? (
											<div className="relative w-full h-48 rounded-lg overflow-hidden">
												<img
													src={coverImageUrl}
													alt="Cover"
													className="w-full h-full object-cover object-top"
												/>
												<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
													<Button
														type="primary"
														ghost
														icon={<EditOutlined />}
														className="!rounded-button whitespace-nowrap"
													>
														Replace
													</Button>
												</div>
											</div>
										) : (
											uploadButton
										)}
									</Upload>
									
								</div> */}
							</div>

							<div>
								<p className="font-medium mb-2">Gallery Images</p>
								<div className="border border-dashed border-gray-300 rounded-lg p-4">
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
										{galleryImageUrls.map((url, index) => (
											<div
												key={index}
												className="relative rounded-lg overflow-hidden h-24"
											>
												<img
													src={url}
													alt={`Gallery ${index + 1}`}
													className="w-full h-full object-cover object-top"
												/>
												<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
													<Space>
														<Button
															type="primary"
															ghost
															icon={<EditOutlined />}
															size="small"
															className="!rounded-button whitespace-nowrap"
														/>
														<Button
															danger
															ghost
															icon={<DeleteOutlined />}
															size="small"
															className="!rounded-button whitespace-nowrap"
														/>
													</Space>
												</div>
											</div>
										))}
										<Upload
											listType="picture-card"
											showUploadList={false}
											beforeUpload={() => false}
											onChange={handleGalleryImagesChange}
										>
											{uploadButton}
										</Upload>
									</div>
									<p className="text-xs text-gray-500 mt-2">
										Add up to 10 images. JPG, PNG or WEBP (max 2MB each)
									</p>
								</div>
							</div>
						</div>
					</Form>
				</Spin>
				<div className="flex items-center gap-2.5 justify-end pt-4 border-t mt-4">
					<Button
						onClick={handleCancel}
						className="!rounded-button whitespace-nowrap"
					>
						Cancel
					</Button>
					<Button
						type="primary"
						onClick={handleSave}
						disabled={isSaveDisabled}
						loading={loading}
						className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700"
					>
						Save Changes
					</Button>
				</div>
			</div>
		);
	};

	const contactAndSocials = () => {
		return (
			<div>
				<Spin
					spinning={loading}
					indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
				>
					<Form
						form={form}
						layout="vertical"
						className="mt-10 overflow-y-auto max-h-[70vh]"
						initialValues={spotData}
					>
						<div className="mb-8">
							<Form.Item
								label={
									<span className="font-medium flex items-center">
										<PhoneOutlined className="mr-1" /> Phone Number
									</span>
								}
								name="phone"
							>
								<div className="flex gap-2 items-center">
									<div className="w-1/6">
										<Select
											onChange={(value) => setCountryCode(value)}
											placeholder="+123"
										>
											{countries.map((country) => (
												<Select.Option key={country.label} value={country.code}>
													{country.code}
												</Select.Option>
											))}
										</Select>
									</div>
									<Input placeholder="Enter phone number" className="py-2" />
								</div>
							</Form.Item>

							<Form.Item
								label={
									<span className="font-medium flex items-center">
										<MailOutlined className="mr-1" /> Email
									</span>
								}
								name="email"
								rules={[
									{ type: "email", message: "Please enter a valid email" },
								]}
							>
								<Input placeholder="Enter email address" className="py-2" />
							</Form.Item>

							<Form.Item
								label={
									<span className="font-medium flex items-center">
										<GlobalOutlined className="mr-1" /> Website
									</span>
								}
								name="website"
								rules={[{ type: "url", message: "Please enter a valid URL" }]}
							>
								<Input placeholder="https://" className="py-2" />
							</Form.Item>

							<div className="mb-2">
								<p className="font-medium mb-2">Social Media</p>
								{socialMediaLinks.map((link, index) => (
									<div key={index} className="flex items-center gap-2 mb-3">
										<Select
											value={link.platform}
											onChange={(value) =>
												handleSocialMediaChange(index, "platform", value)
											}
											style={{ width: 130 }}
											className="mr-2"
										>
											{socialPlatforms.map((platform) => (
												<Option key={platform.value} value={platform.value}>
													<div className="flex items-center">
														{socialMediaIcons(platform.value)}
														<span className="ml-2">{platform.label}</span>
													</div>
												</Option>
											))}
										</Select>
										<Input
											placeholder={`Enter ${link.platform} URL`}
											value={link.url}
											onChange={(e) =>
												handleSocialMediaChange(index, "url", e.target.value)
											}
											className="flex-1 py-2"
										/>
										<Button
											type="text"
											danger
											icon={<DeleteOutlined />}
											onClick={() => handleRemoveSocialMedia(index)}
											disabled={socialMediaLinks.length === 1}
											className="!rounded-button whitespace-nowrap"
										/>
									</div>
								))}
								<Button
									type="dashed"
									onClick={handleAddSocialMedia}
									block
									icon={<PlusOutlined />}
									className="!rounded-button whitespace-nowrap"
								>
									Add Social Media
								</Button>
							</div>
						</div>
					</Form>
				</Spin>
				<div className="flex items-center gap-2.5 justify-end pt-4 border-t mt-4">
					<Button
						onClick={handleCancel}
						className="!rounded-button whitespace-nowrap"
					>
						Cancel
					</Button>
					<Button
						type="primary"
						onClick={handleSave}
						disabled={isSaveDisabled}
						loading={loading}
						className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700"
					>
						Save Changes
					</Button>
				</div>
			</div>
		);
	};

	const basic = () => {
		return (
			<div>
				<Spin
					spinning={loading}
					indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
				>
					<Form
						form={form}
						layout="vertical"
						className="mt-10 overflow-y-auto max-h-[70vh]"
						initialValues={spotData}
					>
						<div className="pr-4 mt-4">
							<div className="mb-8">
								<Form.Item
									label={<span className="font-medium">Spot Name</span>}
									name="name"
									rules={[
										{ required: true, message: "Please enter the spot name" },
									]}
								>
									<Input placeholder="Enter spot name" className="py-2" />
								</Form.Item>

								<Form.Item
									label={<span className="font-medium">Spot Type</span>}
									name="type"
									rules={[
										{ required: true, message: "Please select the spot type" },
									]}
								>
									<Select placeholder="Select spot type" className="w-full">
										{spotTypes.map((type) => (
											<Option key={type.value} value={type.value}>
												{type.label}
											</Option>
										))}
									</Select>
								</Form.Item>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Form.Item
										label={<span className="font-medium">City</span>}
										name="city"
										rules={[
											{ required: true, message: "Please enter the city" },
										]}
									>
										<Input placeholder="Enter city" className="py-2" />
									</Form.Item>

									<Form.Item
										label={
											<Space>
												<span>Full Address</span>
												<Tooltip title="Include street name, building number, area, postal code, and any additional information to help visitors find your spot.">
													<InfoCircleOutlined className="text-gray-400" />
												</Tooltip>
											</Space>
										}
										name="streetAddress"
										rules={[
											{
												required: true,
												message: "Please enter the street address",
											},
										]}
									>
										<Input
											placeholder="Enter street address"
											className="py-2"
										/>
									</Form.Item>
								</div>

								<Form.Item
									name="description"
									label={
										<Space>
											<span>Short Description</span>
											<Tooltip title="A brief tagline or description that will appear in search results">
												<InfoCircleOutlined className="text-gray-400" />
											</Tooltip>
										</Space>
									}
									rules={[
										{
											required: true,
											message: "Please enter a short description",
										},
									]}
								>
									<TextArea
										placeholder="A brief one-line description of your spot"
										className="py-2"
										rows={3}
										maxLength={100}
										showCount
									/>
								</Form.Item>

								<Form.Item
									label={
										<Space>
											<span>Full Description</span>
											<Tooltip title="Detailed information about your spot that will appear on your listing page">
												<InfoCircleOutlined className="text-gray-400" />
											</Tooltip>
										</Space>
									}
									name="description"
									rules={[
										{ required: true, message: "Please enter a description" },
										{
											max: 1000,
											message: "Description cannot exceed 1000 characters",
										},
									]}
								>
									<TextArea
										placeholder="Describe your spot..."
										rows={6}
										showCount
										maxLength={1000}
										onChange={handleDescriptionChange}
										className="py-2"
									/>
								</Form.Item>
							</div>

							<div className="mb-8">
								<h4 className="text-lg font-semibold text-gray-700 mb-4">
									Amenities and Tags
								</h4>

								<div className="mb-4">
									<h4 className="font-medium mb-2">Amenities</h4>
									<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
										{amenities.map((item) => (
											<Checkbox
												key={item.name}
												value={item.name}
												checked={spotData.amenities.includes(item.name)}
												onChange={(e) => handleTagToggle(e.target.value)}
											>
												{item.name}
											</Checkbox>
										))}
									</div>
								</div>

								<div>
									<h4 className="font-medium mb-2">Tags</h4>
									<div className="flex flex-wrap gap-2 mb-3">
										{spotData.customTags.map((tag) => (
											<Tag
												key={tag}
												closable
												onClose={() => handleRemoveCustomTag(tag)}
												className="py-1 px-3 text-sm bg-green-50 text-green-700 border-green-300"
											>
												{tag}
											</Tag>
										))}
									</div>
									<div className="flex gap-2">
										<Input
											placeholder="Add custom tag"
											value={customTagInput}
											onChange={(e) => setCustomTagInput(e.target.value)}
											onPressEnter={handleAddCustomTag}
											className="py-2"
											readOnly={spotData.customTags.length >= 5}
										/>
										<Button
											type="primary"
											onClick={handleAddCustomTag}
											className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700"
											disabled={spotData.customTags.length >= 5}
										>
											Add
										</Button>
									</div>
									<p className="text-xs text-gray-500 mt-2">Maximum 5 tags</p>
								</div>
							</div>
						</div>
					</Form>
				</Spin>

				<div className="flex items-center gap-2.5 justify-end pt-4 border-t mt-4">
					<Button
						onClick={handleCancel}
						className="!rounded-button whitespace-nowrap"
					>
						Cancel
					</Button>
					<Button
						type="primary"
						onClick={handleSave}
						disabled={isSaveDisabled}
						loading={loading}
						className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700"
					>
						Save Changes
					</Button>
				</div>
			</div>
		);
	};

	const edit: any = () => {
		switch (activeEdit) {
			case "basic":
				return basic();
			case "media":
				return media();
			case "hours":
				return oparationHours();
			case "contact":
				return contactAndSocials();
		}
	};

	return edit();
}

export default EditSpot;
