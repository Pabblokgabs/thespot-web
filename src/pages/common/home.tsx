import React, { useEffect, useState } from "react";
import {
	NavBar,
	Footer,
	GetApp,
	PopularSpots,
	Testimonial,
	Wedo,
	PopularCity,
	// Events,
	AllEventsHomeComponent
} from "@/components";
import TrendingNow from "@/components/common/home/trending.now";
import Recommended from "@/components/common/home/recommended.spot";

const Home: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > -10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<div className="min-h-screen bg-gray-50">
			<NavBar isScrolled={isScrolled} isSticky={true} />


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
