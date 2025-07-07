import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Footer, NavBar } from "@/components";
import {
	FaArrowLeft,
	FaBookmark,
	FaMapMarkerAlt,
	FaRegBookmark,
	FaShareAlt,
	FaTicketAlt,
	FaCalendarAlt,
	FaDirections,
	FaUtensils,
	FaFirstAid,
	FaWheelchair,
	FaSubway,
	FaParking,
	FaTaxi,
	FaUsers,
	FaEnvelope,
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
	FaLink,
	FaCopy,
	FaArrowRight,
	FaChevronRight,
	FaBuilding,
	FaClock,
} from "react-icons/fa";
import { FaRestroom } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { trendingEvents } from "@/lib/mock";
import { Link } from "react-router-dom";

import img1 from "@/assets/spots/jazz.jpg";
import img2 from "@/assets/spots/night.jpg";
import img3 from "@/assets/spots/bar.jpg";

const EventDetails: React.FC = () => {
	const navigation = useNavigate();
	const similarEvents = trendingEvents;

	const [isBookmarked, setIsBookmarked] = useState(false);
	const eventDate = new Date("2025-06-15T19:00:00");
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};
	const formattedDate = eventDate.toLocaleDateString("en-US", options);
	const handleBookmark = () => {
		setIsBookmarked(!isBookmarked);
	};
	return (
		<div className="min-h-screen bg-gray-50">
			<NavBar />
			{/* Hero Section with Background Image */}
			<div className="relative h-[600px] md:h-[500px] w-full">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: `url('https://readdy.ai/api/search-image?query=Vibrant%20urban%20nightlife%20scene%20with%20city%20skyline%20in%20background%2C%20showing%20a%20rooftop%20bar%20with%20string%20lights%2C%20people%20enjoying%20drinks%2C%20dancing%20in%20clubs%20with%20colorful%20lighting%2C%20live%20music%20performance%20on%20stage%2C%20all%20with%20a%20deep%20blue%20and%20purple%20atmospheric%20lighting%20creating%20an%20energetic%20evening%20mood&width=1440&height=800&seq=1&orientation=landscape')`,
						backgroundPosition: "center 30%",
					}}
				>
					<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
				</div>
				<div className="relative container mx-auto px-4 pt-20 z-10">
					<div className="hidden md:flex items-center mb-8">
						<Button
							onClick={() => navigation(-1)}
							variant="outline"
							size="sm"
							className="!rounded-button bg-white/10 backdrop-blur-sm text-white border-white/20 hover:text-indigo-400 hover:border-indigo-400 whitespace-nowrap cursor-pointer"
						>
							<FaArrowLeft className="mr-2" /> Back to Events
						</Button>
						<div className="ml-auto flex gap-2">
							<Button
								variant="outline"
								size="sm"
								className="!rounded-button bg-white/10 backdrop-blur-sm text-white border-white/20 hover:text-indigo-400 hover:border-indigo-400 whitespace-nowrap cursor-pointer"
								onClick={handleBookmark}
							>
								{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
								{isBookmarked ? "Saved" : "Save"}
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="!rounded-button bg-white/10 backdrop-blur-sm text-white border-white/20 hover:text-indigo-400 hover:border-indigo-400 whitespace-nowrap cursor-pointer"
							>
								<FaShareAlt className="mr-2" /> Share
							</Button>
						</div>
					</div>
					<div className="max-w-4xl">
						<div className="flex gap-2 mb-4">
							<Badge className="bg-purple-600 !rounded-button whitespace-nowrap">
								Music
							</Badge>
							<Badge className="bg-indigo-600 !rounded-button whitespace-nowrap">
								Live Performance
							</Badge>
							<Badge className="bg-blue-600 !rounded-button whitespace-nowrap">
								Nightlife
							</Badge>
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
							Summer Night Live: Downtown Music Festival
						</h1>
						<div className="flex flex-col md:flex-row gap-6 text-white/90 mb-6">
							<div className="flex items-center">
								<FaCalendarAlt className="fas fa-calendar-alt text-purple-400 mr-2" />
								<span>{formattedDate}</span>
							</div>
							<div className="flex items-center">
								<FaMapMarkerAlt className="text-purple-400 mr-2" />
								<span>Downtown Plaza, 123 Main Street, New York</span>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-6 text-lg !rounded-button whitespace-nowrap cursor-pointer">
								Get Tickets <FaTicketAlt className="ml-2" />
							</Button>
							<div className="text-white/80">
								<span className="font-semibold text-white">$45</span> / Standard
								Admission
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Main Content */}
			<div className="container mx-auto px-4 -mt-16 relative z-20 pb-20">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Event Details */}
					<div className="lg:col-span-2">
						<Card className="p-4 py-5 md:px-6 lg:p-8 shadow-lg !rounded-button">
							<Tabs defaultValue="about" className="w-full">
								<TabsList className="mb-6 w-full justify-start border-b pb-1">
									<TabsTrigger
										value="about"
										className="!rounded-button whitespace-nowrap cursor-pointer"
									>
										About
									</TabsTrigger>
									<TabsTrigger
										value="schedule"
										className="!rounded-button whitespace-nowrap cursor-pointer"
									>
										Schedule
									</TabsTrigger>
									<TabsTrigger
										value="performers"
										className="!rounded-button whitespace-nowrap cursor-pointer"
									>
										Performers
									</TabsTrigger>
									<TabsTrigger
										value="venue"
										className="!rounded-button whitespace-nowrap cursor-pointer"
									>
										Venue
									</TabsTrigger>
								</TabsList>
								<TabsContent value="about" className="mt-0">
									<h2 className="text-2xl font-bold mb-4">About This Event</h2>
									<div className="mb-8">
										<Swiper
											modules={[Pagination, Autoplay]}
											pagination={{ clickable: true }}
											autoplay={{ delay: 5000, disableOnInteraction: false }}
											spaceBetween={0}
											slidesPerView={1}
											className="rounded-xl overflow-hidden mb-6 aspect-[4/3]"
										>
											<SwiperSlide>
												<div
													className="w-full h-full bg-cover bg-center"
													style={{
														backgroundImage: `url(${img1})`,
													}}
												/>
											</SwiperSlide>
											<SwiperSlide>
												<div
													className="w-full h-full bg-cover bg-center"
													style={{
														backgroundImage: `url(${img2})`,
													}}
												/>
											</SwiperSlide>
											<SwiperSlide>
												<div
													className="w-full h-full bg-cover bg-center"
													style={{
														backgroundImage: `url(${img3})`,
													}}
												/>
											</SwiperSlide>
										</Swiper>
										<p className="text-gray-700 mb-4">
											Join us for the most anticipated music event of the
											summer! The Downtown Music Festival brings together an
											incredible lineup of artists across multiple genres for an
											unforgettable night of live performances, great food, and
											amazing atmosphere.
										</p>
										<p className="text-gray-700 mb-4">
											This year's festival features three stages with continuous
											performances from 7:00 PM until 2:00 AM. From indie rock
											to electronic dance music, there's something for everyone
											at this celebration of sound and community.
										</p>
										<p className="text-gray-700 mb-4">
											The event will take place at the iconic Downtown Plaza,
											transformed into an immersive musical experience with
											state-of-the-art sound systems, spectacular lighting, and
											visual installations that will enhance your festival
											experience.
										</p>
										<h3 className="text-xl font-bold mt-8 mb-3">
											What's Included
										</h3>
										<ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
											<li>Access to all three performance stages</li>
											<li>Food and beverage vendors (purchases separate)</li>
											<li>Art installations and interactive experiences</li>
											<li>Festival merchandise shop</li>
											<li>Lounge areas for relaxing between performances</li>
										</ul>
										<h3 className="text-xl font-bold mt-8 mb-3">
											Important Information
										</h3>
										<ul className="list-disc pl-5 text-gray-700 space-y-2">
											<li>
												This is an 18+ event. Valid ID required for entry.
											</li>
											<li>The event will proceed rain or shine.</li>
											<li>No outside food or beverages allowed.</li>
											<li>Re-entry is permitted with valid wristband.</li>
											<li>
												Limited parking available nearby. Public transportation
												recommended.
											</li>
										</ul>
									</div>
								</TabsContent>
								<TabsContent value="schedule" className="mt-0">
									<h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
									<div className="space-y-8">
										<div>
											<h3 className="text-xl font-bold text-purple-700 mb-4">
												Main Stage
											</h3>
											<div className="space-y-4">
												<div className="flex items-start">
													<div className="bg-purple-100 text-purple-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														7:00 PM
													</div>
													<div>
														<h4 className="font-bold">The Midnight Echo</h4>
														<p className="text-gray-600">
															Opening performance with their new album "City
															Lights"
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="bg-purple-100 text-purple-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														8:30 PM
													</div>
													<div>
														<h4 className="font-bold">Luna & The Waves</h4>
														<p className="text-gray-600">
															Indie rock sensation with special guest appearance
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="bg-purple-100 text-purple-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														10:00 PM
													</div>
													<div>
														<h4 className="font-bold">Electric Dreams</h4>
														<p className="text-gray-600">
															Synth-pop headliner with full visual production
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="bg-purple-100 text-purple-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														11:30 PM
													</div>
													<div>
														<h4 className="font-bold">Neon Pulse</h4>
														<p className="text-gray-600">
															Festival closing act with extended set
														</p>
													</div>
												</div>
											</div>
										</div>
										<Separator />
										<div>
											<h3 className="text-xl font-bold text-indigo-700 mb-4">
												Urban Stage
											</h3>
											<div className="space-y-4">
												<div className="flex items-start">
													<div className="bg-indigo-100 text-indigo-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														7:30 PM
													</div>
													<div>
														<h4 className="font-bold">Rhythm Collective</h4>
														<p className="text-gray-600">
															Hip-hop and R&B fusion group
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="bg-indigo-100 text-indigo-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														9:00 PM
													</div>
													<div>
														<h4 className="font-bold">DJ Apex</h4>
														<p className="text-gray-600">
															Urban beats and remixes set
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="bg-indigo-100 text-indigo-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														10:30 PM
													</div>
													<div>
														<h4 className="font-bold">Verse & Flow</h4>
														<p className="text-gray-600">
															Spoken word and live instrumental performance
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="bg-indigo-100 text-indigo-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														12:00 AM
													</div>
													<div>
														<h4 className="font-bold">Midnight Mix Session</h4>
														<p className="text-gray-600">
															Collaborative performance with surprise guests
														</p>
													</div>
												</div>
											</div>
										</div>
										<Separator />
										<div>
											<h3 className="text-xl font-bold text-blue-700 mb-4">
												Electronic Stage
											</h3>
											<div className="space-y-4">
												<div className="flex items-start">
													<div className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														8:00 PM
													</div>
													<div>
														<h4 className="font-bold">Aurora Beats</h4>
														<p className="text-gray-600">
															Ambient electronic opening set
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														9:30 PM
													</div>
													<div>
														<h4 className="font-bold">Pixel Pulse</h4>
														<p className="text-gray-600">
															Progressive house and techno
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														11:00 PM
													</div>
													<div>
														<h4 className="font-bold">Binary Collective</h4>
														<p className="text-gray-600">
															Electronic dance music with live elements
														</p>
													</div>
												</div>
												<div className="flex items-start">
													<div className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full text-sm w-24 text-center mr-4 mt-1">
														12:30 AM
													</div>
													<div>
														<h4 className="font-bold">Quantum Sound</h4>
														<p className="text-gray-600">
															Late night bass-heavy closing set until 2:00 AM
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</TabsContent>
								<TabsContent value="performers" className="mt-0">
									<h2 className="text-2xl font-bold mb-6">
										Featured Performers
									</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<Card className="overflow-hidden !rounded-button p-0">
											<div
												className="h-48 bg-cover bg-center"
												style={{
													backgroundImage: `url('https://readdy.ai/api/search-image?query=Indie%20rock%20band%20performing%20on%20stage%20at%20night%2C%20dramatic%20lighting%20with%20blue%20and%20purple%20tones%2C%20urban%20music%20festival%20atmosphere%2C%20professional%20music%20photography%20with%20shallow%20depth%20of%20field&width=400&height=200&seq=5&orientation=landscape')`,
												}}
											/>
											<div className="p-4">
												<h3 className="font-bold text-lg">The Midnight Echo</h3>
												<p className="text-sm text-gray-600 mb-3">
													Alternative Rock
												</p>
												<p className="text-gray-700 text-sm">
													Rising stars known for their atmospheric sound and
													powerful live performances. Their latest album "City
													Lights" has been critically acclaimed.
												</p>
											</div>
										</Card>
										<Card className="overflow-hidden !rounded-button p-0">
											<div
												className="h-48 bg-cover bg-center"
												style={{
													backgroundImage: `url('https://readdy.ai/api/search-image?query=Female%20vocalist%20performing%20with%20band%20at%20night%20concert%2C%20dramatic%20stage%20lighting%20with%20purple%20hues%2C%20urban%20festival%20setting%2C%20professional%20music%20photography%20with%20concert%20atmosphere&width=400&height=200&seq=6&orientation=landscape')`,
												}}
											/>
											<div className="p-4">
												<h3 className="font-bold text-lg">Luna & The Waves</h3>
												<p className="text-sm text-gray-600 mb-3">Indie Pop</p>
												<p className="text-gray-700 text-sm">
													Fronted by the charismatic Luna Chen, this quartet
													blends dreamy vocals with infectious melodies that
													have made them festival favorites.
												</p>
											</div>
										</Card>
										<Card className="overflow-hidden !rounded-button">
											<div
												className="h-48 bg-cover bg-center"
												style={{
													backgroundImage: `url('https://readdy.ai/api/search-image?query=Electronic%20music%20DJ%20performing%20at%20night%20with%20elaborate%20light%20show%2C%20silhouette%20against%20colorful%20lighting%20rig%2C%20urban%20nightclub%20atmosphere%2C%20professional%20music%20photography&width=400&height=200&seq=7&orientation=landscape')`,
												}}
											/>
											<div className="p-4">
												<h3 className="font-bold text-lg">DJ Apex</h3>
												<p className="text-sm text-gray-600 mb-3">
													Electronic / Urban
												</p>
												<p className="text-gray-700 text-sm">
													Internationally renowned DJ known for seamlessly
													blending genres and creating unforgettable dance
													experiences with innovative mixing techniques.
												</p>
											</div>
										</Card>
										<Card className="overflow-hidden !rounded-button">
											<div
												className="h-48 bg-cover bg-center"
												style={{
													backgroundImage: `url('https://readdy.ai/api/search-image?query=Synth%20pop%20band%20with%20elaborate%20electronic%20setup%20performing%20at%20night%2C%20dramatic%20blue%20and%20purple%20stage%20lighting%2C%20urban%20music%20festival%2C%20professional%20music%20photography%20with%20wide%20angle&width=400&height=200&seq=8&orientation=landscape')`,
												}}
											/>
											<div className="p-4">
												<h3 className="font-bold text-lg">Electric Dreams</h3>
												<p className="text-sm text-gray-600 mb-3">Synth-Pop</p>
												<p className="text-gray-700 text-sm">
													This electronic trio combines retro synthesizers with
													modern production for a nostalgic yet fresh sound that
													has earned them a dedicated following.
												</p>
											</div>
										</Card>
									</div>
									<Button
										variant="outline"
										className="!rounded-button mt-6 whitespace-nowrap cursor-pointer hover:bg-white hover:text-indigo-400 hover:border-indigo-400"
									>
										View All Performers <FaChevronRight className="ml-2" />
									</Button>
								</TabsContent>
								<TabsContent value="venue" className="mt-0">
									<h2 className="text-2xl font-bold mb-4">Venue Information</h2>
									<div className="rounded-xl overflow-hidden h-[300px] mb-6 bg-gray-200">
										{/* Map placeholder - in a real implementation, this would be an actual map */}
										<div
											className="w-full h-full bg-cover bg-center flex items-center justify-center"
											style={{
												backgroundImage: `url('https://readdy.ai/api/search-image?query=Aerial%20view%20of%20urban%20plaza%20at%20night%20with%20event%20setup%2C%20multiple%20stages%20visible%2C%20crowd%20areas%2C%20vendor%20sections%2C%20all%20lit%20up%20with%20colorful%20lighting%2C%20city%20buildings%20surrounding%20the%20venue&width=800&height=300&seq=9&orientation=landscape')`,
											}}
										/>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
										<div>
											<h3 className="text-xl font-bold mb-3">Location</h3>
											<p className="text-gray-700 flex items-center mb-2">
												<FaMapMarkerAlt className=" text-purple-600 mr-2" />
												Downtown Plaza
											</p>
											<p className="text-gray-700 mb-4">
												123 Main Street, New York, NY 10001
											</p>
											<div className="flex gap-2">
												<Button
													variant="outline"
													size="sm"
													className="!rounded-button whitespace-nowrap cursor-pointer hover:bg-white hover:text-indigo-400 hover:border-indigo-400"
												>
													<FaDirections className="mr-2" /> Get Directions
												</Button>
												<Button
													variant="outline"
													size="sm"
													className="bg-purple-50 text-purple-600 !rounded-button whitespace-nowrap cursor-pointer hover:bg-purple-600 hover:text-purple-50 hover:border-purple-600"
												>
													<FaBuilding className="mr-2" /> View Location
												</Button>
											</div>
										</div>
										<div>
											<h3 className="text-xl font-bold mb-3">Facilities</h3>
											<ul className="space-y-2 text-gray-700">
												<li className="flex items-center">
													<FaRestroom className="text-purple-600 mr-2" />
													Restroom facilities throughout venue
												</li>
												<li className="flex items-center">
													<FaUtensils className="fas fa-utensils text-purple-600 mr-2" />
													Food court with diverse options
												</li>
												<li className="flex items-center">
													<FaFirstAid className="text-purple-600 mr-2" />
													First aid stations at marked locations
												</li>
												<li className="flex items-center">
													<FaWheelchair className="fas fa-wheelchair text-purple-600 mr-2" />
													Accessible entrances and viewing areas
												</li>
											</ul>
										</div>
									</div>
									<div>
										<h3 className="text-xl font-bold mb-3">Transportation</h3>
										<div className="space-y-4">
											<div>
												<h4 className="font-bold flex items-center">
													<FaSubway className="text-purple-600 mr-2" />
													Public Transit
												</h4>
												<p className="text-gray-700 ml-6">
													Downtown Station (Blue Line) is a 5-minute walk. Buses
													42, 67, and 103 stop directly in front of the plaza.
												</p>
											</div>
											<div>
												<h4 className="font-bold flex items-center">
													<FaParking className="text-purple-600 mr-2" />
													Parking
												</h4>
												<p className="text-gray-700 ml-6">
													Limited parking available at City Center Garage (142
													Park Ave) for $25 flat rate. Pre-purchase recommended.
												</p>
											</div>
											<div>
												<h4 className="font-bold flex items-center">
													<FaTaxi className="fas fa-taxi text-purple-600 mr-2" />
													Ride Services
												</h4>
												<p className="text-gray-700 ml-6">
													Dedicated pickup/dropoff zone on West Street entrance.
													Expect high demand at event conclusion.
												</p>
											</div>
										</div>
									</div>
								</TabsContent>
							</Tabs>
						</Card>
					</div>
					{/* Sidebar */}
					<div className="lg:col-span-1 space-y-6">
						<Card className="p-4 py-5 md:px-6 shadow-lg !rounded-button">
							<h3 className="text-xl font-bold mb-4">Ticket Options</h3>
							<div className="space-y-4 mb-6">
								<div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer">
									<div className="flex justify-between items-start mb-2">
										<div>
											<h4 className="font-bold">Standard Admission</h4>
											<p className="text-sm text-gray-600">
												General access to all stages
											</p>
										</div>
										<span className="font-bold text-lg">$45</span>
									</div>
									<div className="text-sm text-gray-500 flex items-center">
										<FaTicketAlt className="text-purple-600 mr-1" />
										126 tickets remaining
									</div>
								</div>
								<div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer">
									<div className="flex justify-between items-start mb-2">
										<div>
											<h4 className="font-bold">VIP Experience</h4>
											<p className="text-sm text-gray-600">
												Priority entry, lounge access, complimentary drinks
											</p>
										</div>
										<span className="font-bold text-lg">$120</span>
									</div>
									<div className="text-sm text-gray-500 flex items-center">
										<FaTicketAlt className="text-purple-600 mr-1" />
										38 tickets remaining
									</div>
								</div>
								<div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer">
									<div className="flex justify-between items-start mb-2">
										<div>
											<h4 className="font-bold">Group Package (4+)</h4>
											<p className="text-sm text-gray-600">
												15% discount for groups of 4 or more
											</p>
										</div>
										<span className="font-bold text-lg">$38/person</span>
									</div>
									<div className="text-sm text-gray-500 flex items-center">
										<FaUsers className="text-purple-600 mr-1" />
										Perfect for friends
									</div>
								</div>
							</div>
							<Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
								Get Tickets Now <FaArrowRight className="ml-2" />
							</Button>
						</Card>
						<Card className="p-4 py-5 md:px-6 shadow-lg !rounded-button">
							<h3 className="text-xl font-bold mb-4">Organizer</h3>
							<div className="flex items-center mb-4">
								<Avatar className="h-12 w-12 mr-4">
									<AvatarImage src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20event%20organizer%20in%20business%20casual%20attire%2C%20neutral%20background%2C%20well-lit%20portrait%20with%20warm%20professional%20lighting&width=100&height=100&seq=10&orientation=squarish" />
									<AvatarFallback>UC</AvatarFallback>
								</Avatar>
								<div>
									<h4 className="font-bold">Urban Collective Events</h4>
									<p className="text-sm text-gray-600">
										Event Production & Promotion
									</p>
								</div>
							</div>
							<p className="text-gray-700 text-sm mb-4">
								Urban Collective specializes in creating immersive music and
								cultural experiences in city centers across the country. With
								over 10 years of experience, they've produced more than 200
								successful events.
							</p>
							<Button className="w-full !rounded-button whitespace-nowrap cursor-pointer hover:bg-black/80">
								<FaEnvelope className="mr-2" /> Contact Organizer
							</Button>
						</Card>
						<Card className="p-4 py-5 md:px-6 shadow-lg !rounded-button">
							<h3 className="text-xl font-bold mb-4">Share This Event</h3>
							<div className="flex justify-between mb-4">
								<Button
									variant="outline"
									size="icon"
									className="h-10 w-10 !rounded-button cursor-pointer"
								>
									<FaFacebook className="text-blue-600" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="h-10 w-10 !rounded-button cursor-pointer"
								>
									<FaTwitter className="text-blue-400" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="h-10 w-10 !rounded-button cursor-pointer"
								>
									<FaInstagram className="text-pink-600" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="h-10 w-10 !rounded-button cursor-pointer"
								>
									<FaLinkedin className="text-blue-700" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="h-10 w-10 !rounded-button cursor-pointer"
								>
									<FaLink className="text-gray-600" />
								</Button>
							</div>
							<div className="relative">
								<input
									type="text"
									value="https://events.com/summer-night-live"
									readOnly
									className="w-full pr-12 pl-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
								/>
								<Button
									variant="ghost"
									size="sm"
									className="absolute right-1 top-1 h-7 !rounded-button whitespace-nowrap cursor-pointer"
								>
									<FaCopy className="text-gray-500" />
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</div>
			{/* Related Events Section */}
			{similarEvents.length > 0 && (
				<div className="bg-gray-100 py-16">
					<div className="container mx-auto px-6">
						<div className="flex justify-between items-center mb-8">
							<h2 className="text-2xl font-bold">
								Similar Events You Might Like
							</h2>
							{/* <Button
								variant="link"
								className="text-indigo-600 !rounded-button whitespace-nowrap cursor-pointer"
							>
								View All <FaArrowRight className="ml-1" />
							</Button> */}
						</div>
						<Swiper
							modules={[Pagination, Autoplay, Navigation]}
							spaceBetween={20}
							slidesPerView={1}
							breakpoints={{
								640: {
									slidesPerView: 2,
								},
								1024: {
									slidesPerView: 3,
								},
								1280: {
									slidesPerView: 4,
								},
							}}
							autoplay
							pagination={{ clickable: true }}
							className="pb-20"
						>
							{similarEvents.map((event) => (
								<SwiperSlide className="mb-15" key={event.id}>
									<Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow !rounded-button cursor-pointer p-0">
										<Link to={`/event-details/${event.id}`}>
											<div
												className="h-48 bg-cover bg-center mb-4"
												style={{
													backgroundImage: `url(${event.image})`,
												}}
											/>
											<div className="px-5 pb-5">
												<div className="flex justify-between items-start mb-2">
													<Badge className="bg-purple-400 !rounded-button whitespace-nowrap flex items-center">
														{event.category}
													</Badge>
													<span className="text-sm text-gray-600">
														{event.date.split(",")[0]}
													</span>
												</div>
												<h3 className="font-bold text-lg mb-2 line-clamp-1">
													{event.title}
												</h3>
												<p className="text-gray-600 text-sm mb-3 flex items-center line-clamp-1">
													<FaMapMarkerAlt className="mr-1" /> {event.location}
												</p>
												<p className="text-gray-600 text-sm mb-3 flex items-center line-clamp-1">
													<FaClock className="mr-1" /> {event.time}
												</p>
												<div className="flex justify-between items-center">
													<span className="font-medium">$35</span>
													<Button
														size="sm"
														variant="outline"
														className="!rounded-button mt-6 whitespace-nowrap cursor-pointer hover:bg-white hover:text-indigo-400 hover:border-indigo-400"
													>
														Details
													</Button>
												</div>
											</div>
										</Link>
									</Card>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			)}
			{/* Footer */}
			<Footer />
		</div>
	);
};
export default EventDetails;
