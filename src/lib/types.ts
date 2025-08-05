import { ReactNode } from "react";

export type event = {};

export type spot = {
	id: string;
	name: string;
	shot_description?: string;
	full_description?: string;
	city?: string;
	address?: string;
	business_number?: string;
	business_email?: string;
	website?: string;
	plan?: "Basic" | "Pro" | "Premium";
	currentPlan?: {
		name: "Basic" | "Pro" | "Premium";
		status: "Active" | "Inactive";
		billingFrequency: "Monthly" | "Yearly";
		nextBillingDate: Date;
		const: string;
	};
	location?: { latitude: number; longitude: number };
	isVerified?: boolean;
	isActive?: boolean;
	cover_photo?: string;
	promo_video?: string;
	media?: string[];
	rating?: number;
	reviews?: string[];
	bookings?: string[];
	spot_type: string;
	features_and_amenities?: string[];
	tags?: string[];
	social_media?: {
		platform:
			| "facebook"
			| "tiktok"
			| "x"
			| "youtube"
			| "instagram"
			| "linkedin";
		url: string;
	}[];
	preferredGender?: "female" | "male" | "any";
	preferredAge?: number;
	followerGrowth?: string;
	staff_members: {
		id: string;
		name: string;
		role: "Manager" | "Admin" | "Support Staff" | "Event Host";
		profile: string;
	}[];
	followers?: {
		id: string;
		name: string;
		avatar: string;
		location: string;
		followedSince: string;
	}[];
	revenue?: string;
	policies?: {
		cancellation: string;
		insurance: boolean;
		cleaning_fee: number;
	};
	pricing?: {
		base: string;
		minumum_deposit: string;
		deposit: string;
	};
	special_offer: {
		id: string;
		title: string;
		dayTime: { day: string; time: string };
		offer: string;
	}[];
	oparation_time?: [{ day: string; time: string }];
};

export type plan = {
	name: "Free" | "Pro" | "Premium";
	monthlyCost: number;
	yearlyCost: number;
	badge: string;
	description: string;
	icon: ReactNode;
	color: string;
	features: Array<{ name: string; value: boolean | string }>;
};

export type staffMembers = {
	key: string;
	name: string;
	avatar: string;
	role: string;
	spots: string[];
	status: string;
	lastActive: string;
};
