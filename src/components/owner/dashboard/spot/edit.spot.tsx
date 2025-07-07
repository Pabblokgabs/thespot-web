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
} from "antd";
import {
	PlusOutlined,
	PhoneOutlined,
	MailOutlined,
	GlobalOutlined,
	DeleteOutlined,
	EditOutlined,
	CheckOutlined,
	LoadingOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { useOwnerContext } from "@/lib/context/owner";

const { TextArea } = Input;
const { Option } = Select;

interface SocialMediaLink {
	platform: string;
	url: string;
}

interface SpotTag {
	id: string;
	name: string;
	selected: boolean;
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
	tags: SpotTag[];
	customTags: string[];
	coordinates: {
		lat: number;
		lng: number;
	};
}

function EditSpot() {
	const { setShowEditSpotModal, showEditSpotModal } = useOwnerContext();

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
		tags: [
			{ id: "1", name: "Wheelchair Accessible", selected: true },
			{ id: "2", name: "Outdoor Space", selected: true },
			{ id: "3", name: "Family Friendly", selected: false },
			{ id: "4", name: "Pet Friendly", selected: true },
			{ id: "5", name: "Free Wi-Fi", selected: true },
			{ id: "6", name: "Vegan Options", selected: true },
			{ id: "7", name: "Gluten-Free Options", selected: false },
			{ id: "8", name: "Live Music", selected: false },
		],
		customTags: ["Organic", "Sustainable", "Plant-Based"],
		coordinates: {
			lat: 37.7749,
			lng: -122.4194,
		},
	});

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
		if (customTagInput && !spotData.customTags.includes(customTagInput)) {
			const newCustomTags = [...spotData.customTags, customTagInput];
			setSpotData({ ...spotData, customTags: newCustomTags });
			setCustomTagInput("");
		}
	};

	const handleRemoveCustomTag = (tag: string) => {
		const newCustomTags = spotData.customTags.filter((t) => t !== tag);
		setSpotData({ ...spotData, customTags: newCustomTags });
	};

	const handleTagToggle = (tagId: string) => {
		const newTags = spotData.tags.map((tag) =>
			tag.id === tagId ? { ...tag, selected: !tag.selected } : tag
		);
		setSpotData({ ...spotData, tags: newTags });
	};

	const handleCoverImageChange: UploadProps["onChange"] = ({ fileList }) => {
		if (fileList.length > 0) {
			setCoverImage(fileList[fileList.length - 1]);
		} else {
			setCoverImage(null);
		}
	};

	const handleGalleryImagesChange: UploadProps["onChange"] = ({ fileList }) => {
		setGalleryImages(fileList);
	};

	const spotTypeOptions = [
		"Bar",
		"Cafe",
		"Restaurant",
		"Club",
		"Outdoor Venue",
		"Gallery",
		"Theater",
		"Museum",
		"Park",
		"Gym",
		"Studio",
		"Coworking Space",
		"Other",
	];

	const socialPlatforms = [
		{ value: "instagram", label: "Instagram" },
		{ value: "facebook", label: "Facebook" },
		{ value: "twitter", label: "Twitter" },
		{ value: "linkedin", label: "LinkedIn" },
		{ value: "youtube", label: "YouTube" },
		{ value: "tiktok", label: "TikTok" },
		{ value: "pinterest", label: "Pinterest" },
	];

	const getSocialIcon = (platform: string) => {
		switch (platform) {
			case "instagram":
				return <i className="fab fa-instagram text-xl"></i>;
			case "facebook":
				return <i className="fab fa-facebook text-xl"></i>;
			case "twitter":
				return <i className="fab fa-twitter text-xl"></i>;
			case "linkedin":
				return <i className="fab fa-linkedin text-xl"></i>;
			case "youtube":
				return <i className="fab fa-youtube text-xl"></i>;
			case "tiktok":
				return <i className="fab fa-tiktok text-xl"></i>;
			case "pinterest":
				return <i className="fab fa-pinterest text-xl"></i>;
			default:
				return <i className="fab fa-link text-xl"></i>;
		}
	};

	const uploadButton = (
		<div className="flex flex-col items-center justify-center">
			<PlusOutlined className="text-xl mb-1" />
			<div className="text-sm">Upload</div>
		</div>
	);

	const coverImageUrl = coverImage
		? "https://readdy.ai/api/search-image?query=A%20cozy%20cafe%20with%20outdoor%20seating%2C%20lush%20plants%2C%20and%20a%20modern%20aesthetic.%20The%20image%20shows%20a%20beautiful%20urban%20garden%20cafe%20with%20large%20windows%2C%20wooden%20tables%2C%20and%20comfortable%20seating%20arrangements.%20Natural%20light%20floods%20the%20space&width=800&height=500&seq=1&orientation=landscape"
		: "https://readdy.ai/api/search-image?query=A%20cozy%20cafe%20with%20outdoor%20seating%2C%20lush%20plants%2C%20and%20a%20modern%20aesthetic.%20The%20image%20shows%20a%20beautiful%20urban%20garden%20cafe%20with%20large%20windows%2C%20wooden%20tables%2C%20and%20comfortable%20seating%20arrangements.%20Natural%20light%20floods%20the%20space&width=800&height=500&seq=2&orientation=landscape";

	const galleryImageUrls = [
		"https://readdy.ai/api/search-image?query=Interior%20of%20a%20modern%20cafe%20with%20wooden%20tables%2C%20hanging%20plants%2C%20and%20natural%20light%20streaming%20through%20large%20windows.%20The%20space%20has%20a%20warm%2C%20inviting%20atmosphere%20with%20comfortable%20seating%20and%20minimalist%20decor&width=400&height=300&seq=3&orientation=landscape",
		"https://readdy.ai/api/search-image?query=Outdoor%20seating%20area%20of%20a%20cafe%20with%20string%20lights%2C%20potted%20plants%2C%20and%20wooden%20furniture.%20People%20enjoying%20coffee%20and%20food%20in%20a%20relaxed%20garden%20atmosphere%20with%20greenery%20all%20around&width=400&height=300&seq=4&orientation=landscape",
		"https://readdy.ai/api/search-image?query=Close-up%20of%20artisanal%20coffee%20being%20prepared%20by%20a%20barista%20at%20a%20modern%20cafe%20counter.%20Beautiful%20latte%20art%20visible%20in%20a%20ceramic%20cup%20with%20organic%20pastries%20displayed%20nearby&width=400&height=300&seq=5&orientation=landscape",
		"https://readdy.ai/api/search-image?query=Farm-to-table%20breakfast%20spread%20at%20a%20cafe%20featuring%20avocado%20toast%2C%20fresh%20fruit%2C%20organic%20eggs%2C%20and%20colorful%20vegetable%20dishes.%20The%20food%20is%20beautifully%20presented%20on%20wooden%20serving%20boards&width=400&height=300&seq=6&orientation=landscape",
	];

	return (
		<div>
			<Spin
				spinning={loading}
				indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
			>
				<Form
					form={form}
					layout="vertical"
					className="mt-10 overflow-y-auto max-h-[70vh] pr-2"
					initialValues={spotData}
				>
					<div className="mb-8">
						<Form.Item
							label={
								<span className="font-medium">
									Spot Name <span className="text-red-500">*</span>
								</span>
							}
							name="name"
							rules={[
								{ required: true, message: "Please enter the spot name" },
							]}
						>
							<Input placeholder="Enter spot name" className="py-2" />
						</Form.Item>

						<Form.Item
							label={
								<span className="font-medium">
									Spot Type <span className="text-red-500">*</span>
								</span>
							}
							name="type"
							rules={[
								{ required: true, message: "Please select the spot type" },
							]}
						>
							<Select placeholder="Select spot type" className="w-full">
								{spotTypeOptions.map((type) => (
									<Option key={type} value={type}>
										{type}
									</Option>
								))}
							</Select>
						</Form.Item>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Form.Item
								label={
									<span className="font-medium">
										Street Address <span className="text-red-500">*</span>
									</span>
								}
								name="streetAddress"
								rules={[
									{
										required: true,
										message: "Please enter the street address",
									},
								]}
							>
								<Input placeholder="Enter street address" className="py-2" />
							</Form.Item>

							<Form.Item
								label={
									<span className="font-medium">
										City <span className="text-red-500">*</span>
									</span>
								}
								name="city"
								rules={[{ required: true, message: "Please enter the city" }]}
							>
								<Input placeholder="Enter city" className="py-2" />
							</Form.Item>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<Form.Item
								label={
									<span className="font-medium">
										State <span className="text-red-500">*</span>
									</span>
								}
								name="state"
								rules={[{ required: true, message: "Please enter the state" }]}
							>
								<Input placeholder="Enter state" className="py-2" />
							</Form.Item>

							<Form.Item
								label={<span className="font-medium">Zip Code</span>}
								name="zipCode"
							>
								<Input placeholder="Enter zip code" className="py-2" />
							</Form.Item>

							<Form.Item
								label={
									<span className="font-medium">
										Country <span className="text-red-500">*</span>
									</span>
								}
								name="country"
								rules={[
									{ required: true, message: "Please enter the country" },
								]}
							>
								<Input placeholder="Enter country" className="py-2" />
							</Form.Item>
						</div>

						<Form.Item
							label={
								<div className="flex justify-between w-full">
									<span className="font-medium">
										Description <span className="text-red-500">*</span>
									</span>
									<span className="text-gray-500 text-sm">
										{characterCount}/1000
									</span>
								</div>
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
								rows={4}
								maxLength={1000}
								onChange={handleDescriptionChange}
								className="py-2"
							/>
						</Form.Item>
					</div>

					<div className="mb-8">
						<h4 className="text-lg font-semibold text-gray-700 mb-4">Media</h4>

						<div className="mb-6">
							<p className="font-medium mb-2">Cover Image</p>
							<div className="border border-dashed border-gray-300 rounded-lg p-4">
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
								<p className="text-xs text-gray-500 mt-2">
									Recommended: 1200 x 800px. JPG, PNG or WEBP (max 5MB)
								</p>
							</div>
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

					<div className="mb-8">
						<h4 className="text-lg font-semibold text-gray-700 mb-4">
							Contact Information
						</h4>

						<Form.Item
							label={
								<span className="font-medium flex items-center">
									<PhoneOutlined className="mr-1" /> Phone Number
								</span>
							}
							name="phone"
						>
							<Input placeholder="Enter phone number" className="py-2" />
						</Form.Item>

						<Form.Item
							label={
								<span className="font-medium flex items-center">
									<MailOutlined className="mr-1" /> Email
								</span>
							}
							name="email"
							rules={[{ type: "email", message: "Please enter a valid email" }]}
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
													{getSocialIcon(platform.value)}
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

					<div className="mb-8">
						<h4 className="text-lg font-semibold text-gray-700 mb-4">
							Features & Tags
						</h4>

						<div className="mb-4">
							<p className="font-medium mb-2">Spot Features</p>
							<div className="flex flex-wrap gap-3">
								{spotData.tags.map((tag) => (
									<div
										key={tag.id}
										onClick={() => handleTagToggle(tag.id)}
										className={`
                        cursor-pointer border rounded-full px-3 py-2 text-sm font-medium
                        flex items-center justify-between
                        ${
													tag.selected
														? "bg-blue-50 border-blue-300 text-blue-700"
														: "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
												}
                      `}
									>
										<span>{tag.name}</span>
										{tag.selected && (
											<CheckOutlined className="ml-1 text-blue-600" />
										)}
									</div>
								))}
							</div>
						</div>

						<div>
							<p className="font-medium mb-2">Custom Tags</p>
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
								/>
								<Button
									type="primary"
									onClick={handleAddCustomTag}
									className="!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700"
								>
									Add
								</Button>
							</div>
							<p className="text-xs text-gray-500 mt-2">
								Maximum 10 custom tags
							</p>
						</div>
					</div>
				</Form>
			</Spin>

			<div className="flex justify-between pt-4 border-t mt-4">
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
}

export default EditSpot;
