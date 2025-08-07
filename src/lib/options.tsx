import {
	MdFastfood,
	MdChurch,
	MdMusicNote,
	MdSpa,
	MdSportsEsports,
} from "react-icons/md";
import {
	IoHeart,
	IoColorPalette,
	IoWine,
	IoRestaurant,
	IoMic,
	IoFootball,
	IoShirt,
	IoMusicalNote,
} from "react-icons/io5";
import {
	CrownOutlined,
	FacebookOutlined,
	InstagramOutlined,
	LinkedinOutlined,
	PinterestOutlined,
	RocketOutlined,
	StarOutlined,
	TikTokOutlined,
	TwitterOutlined,
	YoutubeOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import {
	FaCalendarCheck,
	FaCar,
	FaClock,
	FaMusic,
	FaStudiovinari,
	FaUmbrella,
	FaWheelchair,
} from "react-icons/fa";
import { FaChampagneGlasses, FaMartiniGlassCitrus } from "react-icons/fa6";
import type { plan } from "./types";

export const gender: { label: string; value: string }[] = [
	{ label: "Male", value: "male" },
	{ label: "Female", value: "female" },
	{ label: "Other", value: "other" },
];

export const amenities: {
	name: string;
	icon: ReactNode;
}[] = [
	{ name: "Outdoor Seating", icon: <FaUmbrella /> },
	{ name: "Live Music", icon: <FaMusic /> },
	{ name: "Craft Cocktails", icon: <FaMartiniGlassCitrus /> },
	{ name: "Reservations", icon: <FaCalendarCheck /> },
	{ name: "Valet Parking", icon: <FaCar /> },
	{ name: "Wheelchair Accessible", icon: <FaWheelchair /> },
	{ name: "Happy Hour", icon: <FaClock /> },
	{ name: "Private Events", icon: <FaChampagneGlasses /> },
];

export const socialPlatforms = [
	{ value: "instagram", label: "Instagram" },
	{ value: "facebook", label: "Facebook" },
	{ value: "twitter", label: "Twitter" },
	{ value: "linkedin", label: "LinkedIn" },
	{ value: "youtube", label: "YouTube" },
	{ value: "tiktok", label: "TikTok" },
	{ value: "pinterest", label: "Pinterest" },
];

export const socialMediaIcons = (platform: string) => {
	const newOpt = platform.toLowerCase();

	switch (newOpt) {
		case "youtube":
			return <YoutubeOutlined />;
		case "instagram":
			return <InstagramOutlined />;
		case "facebook":
			return <FacebookOutlined />;
		case "twitter":
			return <TwitterOutlined />;
		case "tiktok":
			return <TikTokOutlined />;
		case "pinterest":
			return <PinterestOutlined />;
		case "linkedin":
			return <LinkedinOutlined />;
	}
};

interface RecommendationItem {
	label: string;
	value: string;
	icon: ReactNode;
}

export const tagColors = (item: string) => {
	const string = item.toLowerCase();
	const colors = [
		"green",
		"blue",
		"geekblue",
		"purple",
		"pink",
		"magenta",
		"red",
		"cyan",
		"lime",
		"volcano",
		"gold",
	];

	if (string.includes("couple")) {
		return "pink";
	} else if (string.includes("limited")) {
		("red");
	} else if (string.includes("luxury")) {
		("geekblue");
	} else if (string.includes("open")) {
		("green");
	} else {
		const x = Math.floor(Math.random() * colors.length);

		return colors[x];
	}
};

export const spotTypes: RecommendationItem[] = [
	{
		label: "Food & Drinks",
		value: "food_drinks",
		icon: <MdFastfood />,
	},
	{
		label: "Gallary",
		value: "gallary",
		icon: <MdFastfood />,
	},
	{
		label: "Wellness",
		value: "wellness",
		icon: <IoHeart />,
	},
	{
		label: "Creative",
		value: "creative",
		icon: <IoColorPalette />,
	},
	{
		label: "Bar",
		value: "bar",
		icon: <IoWine />,
	},
	{
		label: "Restaurants",
		value: "restaurants",
		icon: <IoRestaurant />,
	},
	{
		label: "Clubs",
		value: "clubs",
		icon: <IoMic />,
	},
	{
		label: "Religion",
		value: "religion",
		icon: <MdChurch />,
	},
	{
		label: "Sports",
		value: "sports",
		icon: <IoFootball />,
	},
	{
		label: "Outdoor Venue",
		value: "outdoor_venue",
		icon: <IoFootball />,
	},
	{
		label: "Coworking Space",
		value: "coworking_space",
		icon: <IoFootball />,
	},
	{
		label: "Event Space",
		value: "event_space",
		icon: <IoFootball />,
	},
	{
		label: "Fashion",
		value: "fashion",
		icon: <IoShirt />,
	},
	{
		label: "Boutique",
		value: "boutique",
		icon: <IoShirt />,
	},
	{
		label: "Dance",
		value: "dance",
		icon: <MdMusicNote />,
	},
	{
		label: "Music",
		value: "music",
		icon: <IoMusicalNote />,
	},
	{
		label: "Spa",
		value: "spa",
		icon: <MdSpa />,
	},
	{
		label: "Shopping Mall",
		value: "shopping_mall",
		icon: <MdSpa />,
	},
	{
		label: "Beach",
		value: "beach",
		icon: <MdSpa />,
	},
	{
		label: "Studio",
		value: "studio",
		icon: <FaStudiovinari />,
	},
	{
		label: "Gaming",
		value: "gaming",
		icon: <MdSportsEsports />,
	},
	{
		label: "Theater",
		value: "theater",
		icon: <MdSportsEsports />,
	},
	{
		label: "Cinema",
		value: "cinema",
		icon: <MdSportsEsports />,
	},
	{
		label: "Park",
		value: "park",
		icon: <MdSportsEsports />,
	},
	{
		label: "Cafe",
		value: "cafe",
		icon: <MdSportsEsports />,
	},
	{
		label: "Pub",
		value: "pub",
		icon: <MdSportsEsports />,
	},
	{
		label: "Salon",
		value: "salon",
		icon: <MdSportsEsports />,
	},
	{
		label: "Museum",
		value: "museum",
		icon: <MdSportsEsports />,
	},
	{
		label: "Other",
		value: "other",
		icon: <MdSportsEsports />,
	},
];

// Plans data
export const plans: plan[] = [
	{
		name: "Free",
		badge: "",
		monthlyCost: 0,
		yearlyCost: 0,
		features: [
			{ name: "Spot", value: "1" },
			{ name: "Events per month", value: "2" },
			{ name: "Basic analytics", value: true },
			{ name: "Featured listings", value: false },
			{ name: "Priority support", value: false },
			{ name: "Additional admin users", value: "1" },
		],
		description:
			"Perfect for individuals and small venues just getting started.",
		color: "#6B7280",
		icon: <StarOutlined />,
	},
	{
		name: "Pro",
		badge: "Most Popular",
		monthlyCost: 29.99,
		yearlyCost: 299.9,
		features: [
			{ name: "Number of spots", value: "3" },
			{ name: "Events per month", value: "5" },
			{ name: "Advanced analytics", value: true },
			{ name: "Featured listings", value: "2 per month" },
			{ name: "Priority support", value: true },
			{ name: "Additional admin users", value: "3" },
		],
		description: "Ideal for established venues looking to grow their audience.",
		color: "#3B82F6",
		icon: <RocketOutlined />,
	},
	{
		name: "Premium",
		badge: "Best Value",
		monthlyCost: 59.99,
		yearlyCost: 599.9,
		features: [
			{ name: "Number of spots", value: "5" },
			{ name: "Events per month", value: "Unlimited" },
			{ name: "Premium analytics", value: true },
			{ name: "Featured listings", value: "Unlimited" },
			{ name: "Priority support", value: true },
			{ name: "Additional admin users", value: "Unlimited" },
		],
		description:
			"For professional venues that need the ultimate in features and flexibility.",
		color: "#8B5CF6",
		icon: <CrownOutlined />,
	},
];

export const staffPermission: Array<string> = [
	"View Bookings",
	"View Calendar",
	"Reply to Messages",
	"View Followers",
	"Manage Bookings",
	"Manage Events",
	"Manage Staff",
	"View Analytics",
	"Process Payments",
	"Edit Spot Details",
];
