import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Home,
	Login,
	CookiePolicy,
	PrivacyPolicy,
	TermOfService,
	Email,
	ForgotPasswordEmail,
	ResetPassword,
	PersonalInfo,
	OwnerEmail,
	OwnerPersonalInfo,
	ViewAll,
	Search,
	SpotDetails,
	EventDetails,
	Dashboard,
	Profile,
	SpotListing,
	SubcriptionPricing,
} from "./pages/index";

function App() {
	return (
		<Router>
			<Routes>
				{/* Common pages */}
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<Login />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/terms-of-service" element={<TermOfService />} />
				<Route path="/cookie-policy" element={<CookiePolicy />} />
				<Route path="/forgot-password" element={<ForgotPasswordEmail />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/view-all" element={<ViewAll />} />
				<Route path="/search" element={<Search />} />
				<Route path="/spot-details/:id" element={<SpotDetails />} />
				<Route path="/event-details/:id" element={<EventDetails />} />
				<Route path="/pricing" element={<SubcriptionPricing />} />

				{/* User pages */}
				<Route path="/user/signup" element={<Email />} />
				<Route
					path="/user/signup/personal-information"
					element={<PersonalInfo />}
				/>
				<Route path="/user/profile" element={<Profile />} />

				{/* Owner pages */}
				<Route path="/owner/signup" element={<OwnerEmail />} />
				<Route
					path="/owner/signup/personal-information"
					element={<OwnerPersonalInfo />}
				/>
				<Route path="/owner/dashboard" element={<Dashboard />} />
				<Route path="/list-spot" element={<SpotListing />} />
			</Routes>
		</Router>
	);
}

export default App;
