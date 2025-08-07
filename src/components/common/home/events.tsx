import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import img from "@/assets/spots/jazz.jpg";
import {
	FaBookmark,
	FaCalendar,
	FaCalendarAlt,
	FaMapMarkerAlt,
} from "react-icons/fa";
import { FaClock, FaUsers } from "react-icons/fa6";
import { spotTypes } from "@/lib/options";
import { trendingEvents } from "@/lib/mock";
import { Link } from "react-router-dom";

function Events() {
	const upcomingEvents = [
		{
			id: 6,
			title: "Community Garden Day",
			date: "June 18, 2025",
			time: "9:00 AM",
			location: "Riverside Gardens",
			category: "community",
			attendees: 210,
			image:
				"https://readdy.ai/api/search-image?query=Community%20garden%20with%20diverse%20group%20of%20people%20planting%20vegetables%20and%20flowers%2C%20morning%20sunlight%2C%20garden%20tools%2C%20raised%20beds%2C%20children%20and%20adults%20working%20together%2C%20green%20environment%2C%20community%20spirit&width=600&height=400&seq=6&orientation=landscape",
		},
		{
			id: 7,
			title: "Hiking Adventure",
			date: "June 20, 2025",
			time: "7:00 AM",
			location: "Mountain Trails",
			category: "outdoor",
			attendees: 150,
			image:
				"https://readdy.ai/api/search-image?query=Group%20of%20hikers%20on%20mountain%20trail%20with%20scenic%20views%2C%20morning%20light%2C%20diverse%20group%20with%20backpacks%2C%20forest%20and%20valley%20views%2C%20outdoor%20adventure%2C%20people%20taking%20photos%2C%20clear%20blue%20sky%2C%20professional%20nature%20photography&width=600&height=400&seq=7&orientation=landscape",
		},
		{
			id: 8,
			title: "Wine Tasting Evening",
			date: "June 14, 2025",
			time: "7:00 PM",
			location: "Vineyard Estate",
			category: "food",
			attendees: 180,
			image:
				"https://readdy.ai/api/search-image?query=Elegant%20wine%20tasting%20event%20with%20people%20holding%20wine%20glasses%2C%20sommelier%20explaining%20wines%2C%20vineyard%20setting%2C%20sunset%20lighting%2C%20cheese%20and%20appetizer%20platters%2C%20sophisticated%20atmosphere%2C%20professional%20photography&width=600&height=400&seq=8&orientation=landscape",
		},
		{
			id: 9,
			title: "Classical Concert",
			date: "June 22, 2025",
			time: "7:30 PM",
			location: "Symphony Hall",
			category: "music",
			attendees: 420,
			image:
				"https://readdy.ai/api/search-image?query=Classical%20music%20concert%20in%20elegant%20concert%20hall%2C%20orchestra%20performing%20on%20stage%2C%20conductor%20leading%20musicians%2C%20audience%20in%20formal%20attire%2C%20dramatic%20stage%20lighting%2C%20string%20instruments%2C%20professional%20photography&width=600&height=400&seq=9&orientation=landscape",
		},
		{
			id: 10,
			title: "Street Art Festival",
			date: "June 16, 2025",
			time: "11:00 AM",
			location: "Arts District",
			category: "arts",
			attendees: 780,
			image:
				"https://readdy.ai/api/search-image?query=Street%20art%20festival%20with%20artists%20painting%20murals%2C%20colorful%20urban%20setting%2C%20spectators%20watching%20artists%20work%2C%20spray%20paint%20cans%2C%20scaffolding%2C%20diverse%20crowd%2C%20vibrant%20atmosphere%2C%20professional%20urban%20photography&width=600&height=400&seq=10&orientation=landscape",
		},
	];

	return (
		<div className="py-10">
			<div className="container mx-auto px-4 py-12 my-20 bg-white rounded-xl shadow-sm">
				<Tabs defaultValue="trending" className="w-full">
					<div className="flex justify-between items-center mb-6">
						<TabsList className="bg-gray-50 text-black">
							<TabsTrigger
								value="trending"
								className="!rounded-button whitespace-nowrap cursor-pointer"
							>
								Trending Events
							</TabsTrigger>
							<TabsTrigger
								value="upcoming"
								className="!rounded-button whitespace-nowrap cursor-pointer"
							>
								Upcoming Events
							</TabsTrigger>
							<TabsTrigger
								value="all"
								className="!rounded-button whitespace-nowrap cursor-pointer"
							>
								All Events
							</TabsTrigger>
						</TabsList>
						<Button className="border-indigo-500 hidden lg:flex border-2 text-indigo-600 hover:bg-indigo-50 bg-transparent !rounded-button whitespace-nowrap cursor-pointer">
							<FaCalendar className="fas fa-calendar-alt mr-2" />
							View Calendar
						</Button>
					</div>

					<TabsContent value="trending" className="mt-0">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{trendingEvents.map((event) => (
								<Card
									key={event.id}
									className="overflow-hidden p-0 bg-neutral-50 hover:shadow-lg transition-shadow"
								>
									<Link to={`/event-details/${event.id}`}>
										<div className="relative h-48 overflow-hidden">
											<img
												src={img}
												alt={event.title}
												className="w-full h-full object-cover object-top transition-transform hover:scale-105 duration-300"
											/>
											<div className="absolute top-3 right-3">
												<Badge className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
													<FaUsers className="mr-1" />
													{event.attendees}+ going
												</Badge>
											</div>
										</div>
										<CardContent className="p-5">
											<div className="flex items-center mb-3">
												<Badge className="bg-purple-400 text-gray-700 border-gray-200 !rounded-button whitespace-nowrap">
													{
														spotTypes.find((c) =>
															c.value.includes(event.category)
														)?.icon
													}
													{
														spotTypes.find((c) =>
															c.value.includes(event.category)
														)?.label
													}
												</Badge>
												<div className="ml-auto flex items-center text-sm text-gray-500">
													<FaCalendarAlt className="mr-1" />
													{event.date}
												</div>
											</div>
											<h3 className="text-xl font-bold text-black mb-2">
												{event.title}
											</h3>
											<div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-4">
												<div className="mr-4 flex items-center">
													<FaClock className="mr-1" />
													{event.time}
												</div>
												<div className="flex items-center">
													<FaMapMarkerAlt className="mr-1" />
													{event.location}
												</div>
											</div>
											<div className="flex justify-between items-center">
												<Button className="border-gray-300 border-2 bg-transparent !rounded-button whitespace-nowrap cursor-pointer">
													<FaBookmark className="mr-1" />
													Save
												</Button>
												<Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
													Get Tickets
												</Button>
											</div>
										</CardContent>
									</Link>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value="upcoming" className="mt-0">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{upcomingEvents.map((event) => (
								<Card
									key={event.id}
									className="overflow-hidden p-0 bg-neutral-50 hover:shadow-lg transition-shadow"
								>
									<Link to={`/event-details/${event.id}`}>
										<div className="relative h-48 overflow-hidden">
											<img
												src={img}
												alt={event.title}
												className="w-full h-full object-cover object-top transition-transform hover:scale-105 duration-300"
											/>
											<div className="absolute top-3 right-3">
												<Badge className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
													<FaUsers className="mr-1"/>
													{event.attendees}+ going
												</Badge>
											</div>
										</div>
										<CardContent className="p-5">
											<div className="flex items-center mb-3">
												<Badge className="bg-purple-400 text-gray-700 border-gray-200 !rounded-button whitespace-nowrap">
													{
														spotTypes.find((c) =>
															c.value.includes(event.category)
														)?.icon
													}
													{
														spotTypes.find((c) =>
															c.value.includes(event.category)
														)?.label
													}
												</Badge>
												<div className="ml-auto flex items-center text-sm text-gray-500">
													<FaCalendarAlt className="mr-1" />
													{event.date}
												</div>
											</div>
											<h3 className="text-xl font-bold text-black mb-2">
												{event.title}
											</h3>
											<div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-4">
												<div className="mr-4 flex items-center">
													<FaClock className="mr-1" />
													{event.time}
												</div>
												<div className="flex items-center">
													<FaMapMarkerAlt className="mr-1" />
													{event.location}
												</div>
											</div>
											<div className="flex justify-between items-center">
												<Button className="border-gray-300 border-2 bg-transparent !rounded-button whitespace-nowrap cursor-pointer">
													<FaBookmark className="mr-1" />
													Save
												</Button>
												<Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
													Get Tickets
												</Button>
											</div>
										</CardContent>
									</Link>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value="all" className="mt-0">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[...trendingEvents, ...upcomingEvents].map((event) => (
								<Card
									key={event.id}
									className="overflow-hidden bg-neutral-50 p-0 hover:shadow-lg transition-shadow"
								>
									<Link to={`/event-details/${event.id}`}>
										<div className="relative h-48 overflow-hidden">
											<img
												src={img}
												alt={event.title}
												className="w-full h-full object-cover object-top transition-transform hover:scale-105 duration-300"
											/>
											<div className="absolute top-3 right-3">
												<Badge className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
													<FaUsers className="mr-1"/>
													{event.attendees}+ going
												</Badge>
											</div>
										</div>
										<CardContent className="p-5">
											<div className="flex items-center mb-3">
												<Badge className="bg-purple-400 text-gray-700 border-gray-200 !rounded-button whitespace-nowrap">
													{
														spotTypes.find((c) =>
															c.value.includes(event.category)
														)?.icon
													}
													{
														spotTypes.find((c) =>
															c.value.includes(event.category)
														)?.label
													}
												</Badge>
												<div className="ml-auto flex items-center text-sm text-gray-500">
													<FaCalendarAlt className="mr-1" />
													{event.date}
												</div>
											</div>
											<h3 className="text-xl font-bold text-black mb-2">
												{event.title}
											</h3>
											<div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-4">
												<div className="mr-4 flex items-center">
													<FaClock className="mr-1" />
													{event.time}
												</div>
												<div className="flex items-center">
													<FaMapMarkerAlt className="mr-1" />
													{event.location}
												</div>
											</div>
											<div className="flex justify-between items-center">
												<Button className="border-gray-300 border-2 bg-transparent !rounded-button whitespace-nowrap cursor-pointer">
													<FaBookmark className="mr-1" />
													Save
												</Button>
												<Button className="bg-indigo-600 hover:bg-indigo-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
													Get Tickets
												</Button>
											</div>
										</CardContent>
									</Link>
								</Card>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

export default Events;
