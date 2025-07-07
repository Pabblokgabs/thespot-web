import Footer from "./common/footer";
import NavBar from "./common/navbar";
import Btn from "./common/btn";
import TextInput from "./common/input";
import BtnLoader from "./common/loading.spinner/btnLoader";
import LoadingSpinner from "./common/loading.spinner/loading";
import SelectInput from "./common/select";
import ComboBox from "./common/comboBox";
import Popup from "./common/popup";
import OPTVerify from "./common/otp.verification";
import Password from "./common/password";
import Display from "./common/home/display";
import Wedo from "./common/home/wedo";
import { showToast } from "./common/toaster";
import GetApp from "./common/home/getTheApp";
import PopularSpots from "./common/home/popular.spots";
import Testimonial from "./common/home/testimonial";
import PopularCity from "./common/home/popular.cities";
import Events from "./common/home/events";
import Spots from "./common/home/spots";
import DashboardContent from "./owner/dashboard/dashboard.content";
import StaffContent from "./owner/dashboard/staff.manage";
import SpotsContent from "./owner/dashboard/spot/spots.content";
import FollowersContent from "./owner/dashboard/follow.content";
import EventsContent from "./owner/dashboard/events/events.content";
import AnalyticsContent from "./owner/dashboard/analytic.content";
import PayoutsContent from "./owner/dashboard/payouts/payout.content";
import SettingsContent from "./owner/dashboard/setting.content";
import MessagesContent from "./owner/dashboard/messages.content";
import AddStaff from "./owner/models/add.staff";
import ViewFollowers from "./owner/models/view.followers";
import CalendarContent from "./owner/dashboard/calendar.content";
import CreateEvent from "./owner/dashboard/events/create.event";
import PaginationComponent from "./common/pagination";
import { TileSkeletonCard, MobileTileSkeleton } from "./common/tile.skeleton";
import ReviewsContent from "./owner/dashboard/reviews.content";
import EditSpot from "./owner/dashboard/spot/edit.spot";
import AllEventsHomeComponent from "./common/home/event";

export {
	MobileTileSkeleton,
	TileSkeletonCard,
	Footer,
	EditSpot,
	NavBar,
	Btn,
	TextInput,
	BtnLoader,
	LoadingSpinner,
	SelectInput,
	ComboBox,
	Popup,
	OPTVerify,
	Password,
	Display,
	Wedo,
	showToast,
	GetApp,
	PopularSpots,
	Testimonial,
	PopularCity,
	Events,
	Spots,
	DashboardContent,
	StaffContent,
	SpotsContent,
	FollowersContent,
	EventsContent,
	AnalyticsContent,
	PayoutsContent,
	SettingsContent,
	MessagesContent,
	AddStaff,
	ViewFollowers,
	CalendarContent,
	CreateEvent,
	PaginationComponent,
	ReviewsContent,
	AllEventsHomeComponent
};
