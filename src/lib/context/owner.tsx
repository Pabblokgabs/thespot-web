import React, {
	createContext,
	useState,
	ReactNode,
	FC,
	useContext,
} from "react";

interface ViewSpotProp {
	selectedSpot: {
		id: number;
		name: string;
		type?: string;
		location?: string;
		image?: string;
		bookings?: number;
		rating?: number;
		isFollowed?: boolean;
		revenue?: string;
		status?: string;
		photos?: [string];
		policies?: {
			cancellation: string;
			insurance: string;
			cleaning: string;
		};
		pricing?: {
			base: string;
			minimum: string;
			deposit: string;
		};
		hours?: [{ day: string; time: string }];
		address?: string;
		phone?: string;
		website?: string;
		description?: string;
		amenities?: [{ name: string; icon: string }];
		followerGrowth?: string;
		followersList?: [
			{
				id: number;
				name: string;
				avatar: string;
				location: string;
				followedSince: string;
			}
		];
	};
}

type OwnerContextType = {
	showStaffModal: boolean;
	setShowStaffModal: React.Dispatch<React.SetStateAction<boolean>>;
	showCreateEventModal: boolean;
	setShowCreateEventModal: React.Dispatch<React.SetStateAction<boolean>>;
	selectedSpot: ViewSpotProp["selectedSpot"];
	setSelectedSpot: React.Dispatch<React.SetStateAction<any>>;
	followersModalVisible: boolean;
	setFollowersModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	showFollowersModal: (spot: any) => void;
	isSpotView: boolean;
	setIsSpotView: React.Dispatch<React.SetStateAction<boolean>>;
	isSubmitted: boolean;
	setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
	showEditSpotModal: boolean;
	setShowEditSpotModal: React.Dispatch<React.SetStateAction<boolean>>;
	sortBy: "newest" | "highest" | "lowest" | "helpful";
	setSortBy: React.Dispatch<
		React.SetStateAction<"newest" | "highest" | "lowest" | "helpful">
	>;
	selectedSpotToFilter: number | "all";
	setSelectedSpotToFilter: React.Dispatch<React.SetStateAction<number | "all">>;
	isMobileMessage: boolean;
	setIsMobileMessage: React.Dispatch<React.SetStateAction<boolean>>;
	billingCycle: "monthly" | "yearly";
	setBillingCycle: React.Dispatch<React.SetStateAction<"monthly" | "yearly">>;
	activeBillingFaqTab: string;
	setActiveBillingFaqTab: React.Dispatch<React.SetStateAction<string>>;
	isBillingView: boolean;
	setIsBillingView: React.Dispatch<React.SetStateAction<boolean>>;
	activeTab: string;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
	activeEdit: string;
	setActiveEdit: React.Dispatch<React.SetStateAction<string>>;
	staffManageModal: "add_staff" | "edit_pms" | "";
	setStaffManageModal: React.Dispatch<
		React.SetStateAction<"add_staff" | "edit_pms" | "">
	>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	warning: boolean;
	setWarning: React.Dispatch<React.SetStateAction<boolean>>;
};

const OwnerContext = createContext<OwnerContextType | null>(null);

const OwnerProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [activeTab, setActiveTab] = useState("staff");
	const [showStaffModal, setShowStaffModal] = useState(false);
	const [isMobileMessage, setIsMobileMessage] = useState(false);
	const [showEditSpotModal, setShowEditSpotModal] = useState(false);
	const [showCreateEventModal, setShowCreateEventModal] = useState(false);
	const [selectedSpot, setSelectedSpot] = useState<any>(null);
	const [followersModalVisible, setFollowersModalVisible] = useState(false);
	const [isSpotView, setIsSpotView] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [sortBy, setSortBy] = useState<
		"newest" | "highest" | "lowest" | "helpful"
	>("newest");
	const [selectedSpotToFilter, setSelectedSpotToFilter] = useState<
		number | "all"
	>("all");
	const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
		"monthly"
	);
	const [activeBillingFaqTab, setActiveBillingFaqTab] = useState("1");
	const [isBillingView, setIsBillingView] = useState(false);
	const [activeEdit, setActiveEdit] = useState("basic");

	// for staff content
	const [staffManageModal, setStaffManageModal] = useState<
		"add_staff" | "edit_pms" | ""
	>("add_staff");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [warning, setWarning] = useState<boolean>(true);

	// Open followers modal for a specific spot
	const showFollowersModal = (spot: any) => {
		setSelectedSpot(spot);
		setFollowersModalVisible(true);
	};

	return (
		<OwnerContext.Provider
			value={{
				activeTab,
				setActiveTab,
				isSubmitted,
				setIsSubmitted,
				showStaffModal,
				setShowStaffModal,
				selectedSpot,
				setSelectedSpot,
				followersModalVisible,
				setFollowersModalVisible,
				showFollowersModal,
				isSpotView,
				setIsSpotView,
				showCreateEventModal,
				setShowCreateEventModal,
				showEditSpotModal,
				setShowEditSpotModal,
				sortBy,
				setSortBy,
				selectedSpotToFilter,
				setSelectedSpotToFilter,
				isMobileMessage,
				setIsMobileMessage,
				billingCycle,
				setBillingCycle,
				activeBillingFaqTab,
				setActiveBillingFaqTab,
				isBillingView,
				setIsBillingView,
				activeEdit,
				setActiveEdit,
				staffManageModal,
				setStaffManageModal,
				isLoading,
				setIsLoading,
				warning,
				setWarning,
			}}
		>
			{children}
		</OwnerContext.Provider>
	);
};

const useOwnerContext = (): OwnerContextType => {
	const context = useContext(OwnerContext);
	if (!context) {
		throw new Error("useOwnerContext must be used within an OwnerProvider");
	}
	return context;
};

export { OwnerProvider, useOwnerContext };
