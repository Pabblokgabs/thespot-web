import React from "react";
import {
	NavBar,
	Footer,
	GetApp,
	PopularSpots,
	Testimonial,
	Wedo,
	PopularCity,
	// Events,
	AllEventsHomeComponent,
} from "@/components";
import TrendingNow from "@/components/common/home/trending.now";
import Recommended from "@/components/common/home/recommended.spot";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<NavBar isSticky={true} />

			<TrendingNow />

			<PopularSpots />
			<Recommended />
			<AllEventsHomeComponent />
			{/* <Events /> */}
			<Wedo />
			<PopularCity />
			<Testimonial />
			<GetApp />
			<Footer />
		</div>
	);
};
export default Home;
