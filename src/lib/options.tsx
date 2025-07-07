interface Gender {
	label: string;
	value: string;
}

export const gender: Gender[] = [
	{ label: "Male", value: "male" },
	{ label: "Female", value: "female" },
	{ label: "Other", value: "other" },
];

interface Anemity {
	name: string;
	icon: string;
}

export const amenities: Anemity[] = [
	{ name: "Outdoor Seating", icon: "fa-umbrella-beach" },
	{ name: "Live Music", icon: "fa-music" },
	{ name: "Craft Cocktails", icon: "fa-martini-glass-citrus" },
	{ name: "Reservations", icon: "fa-calendar-check" },
	{ name: "Valet Parking", icon: "fa-car" },
	{ name: "Wheelchair Accessible", icon: "fa-wheelchair" },
	{ name: "Happy Hour", icon: "fa-clock" },
	{ name: "Private Events", icon: "fa-champagne-glasses" },
];

import { ReactNode } from "react";

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

export const recommended: RecommendationItem[] = [
	{
		label: "Food & Drinks",
		value: "food & drinks",
		icon: <MdFastfood size={24} className="text-orange-600" />,
	},
	{
		label: "Arts & Culture",
		value: "arts & culture",
		icon: <MdFastfood size={24} className="text-orange-600" />,
	},
	{
		label: "Wellness",
		value: "wellness",
		icon: <IoHeart size={24} className="text-orange-600" />,
	},
	{
		label: "Creative",
		value: "creative",
		icon: <IoColorPalette size={24} className="text-orange-600" />,
	},
	{
		label: "Bar",
		value: "bar",
		icon: <IoWine size={24} className="text-orange-600" />,
	},
	{
		label: "Restaurants",
		value: "restaurants",
		icon: <IoRestaurant size={24} className="text-orange-600" />,
	},
	{
		label: "Clubs",
		value: "clubs",
		icon: <IoMic size={24} className="text-orange-600" />,
	},
	{
		label: "Religion",
		value: "religion",
		icon: <MdChurch size={24} className="text-orange-600" />,
	},
	{
		label: "Sports",
		value: "sports",
		icon: <IoFootball size={24} className="text-orange-600" />,
	},
	{
		label: "Fashion",
		value: "fashion",
		icon: <IoShirt size={24} className="text-orange-600" />,
	},
	{
		label: "Dance",
		value: "dance",
		icon: <MdMusicNote size={24} className="text-orange-600" />,
	},
	{
		label: "Music",
		value: "music",
		icon: <IoMusicalNote size={24} className="text-orange-600" />,
	},
	{
		label: "Spa",
		value: "spa",
		icon: <MdSpa size={24} className="text-orange-600" />,
	},
	{
		label: "Gaming",
		value: "gaming",
		icon: <MdSportsEsports size={24} className="text-orange-600" />,
	},
	{
		label: "Theater",
		value: "theater",
		icon: <MdSportsEsports size={24} className="text-orange-600" />,
	},
	{
		label: "Park",
		value: "park",
		icon: <MdSportsEsports size={24} className="text-orange-600" />,
	},
	{
		label: "Cafe",
		value: "cafe",
		icon: <MdSportsEsports size={24} className="text-orange-600" />,
	},
	{
		label: "Museum",
		value: "museum",
		icon: <MdSportsEsports size={24} className="text-orange-600" />,
	},
];
