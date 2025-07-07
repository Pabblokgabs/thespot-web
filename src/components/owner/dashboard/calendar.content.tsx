import { Badge } from "@/components/ui/badge";
import { Calendar, Card } from "antd";

function CalendarContent() {
	// Sample data for events
	const events = [
		{
			id: 1,
			title: "Jazz Night with The Quintet",
			date: "June 15, 2025",
			time: "8:00 PM",
			status: "Published",
			spot: "The Blue Note Jazz Club",
			rsvps: 78,
			image:
				"https://readdy.ai/api/search-image?query=A%20jazz%20quintet%20performing%20on%20stage%20with%20saxophone%2C%20trumpet%2C%20piano%2C%20bass%2C%20and%20drums%2C%20in%20a%20dimly%20lit%20club%20with%20blue%20lighting%2C%20audience%20silhouettes%20visible%2C%20creating%20an%20intimate%20jazz%20club%20atmosphere%20with%20sophisticated%20ambiance&width=400&height=300&seq=4&orientation=landscape",
		},
		{
			id: 2,
			title: "Cocktail Masterclass",
			date: "June 18, 2025",
			time: "7:00 PM",
			status: "Published",
			spot: "Sunset Lounge",
			rsvps: 24,
			image:
				"https://readdy.ai/api/search-image?query=A%20cocktail%20masterclass%20setup%20with%20professional%20bartender%20demonstrating%20techniques%2C%20elegant%20bar%20tools%20arranged%20neatly%2C%20various%20spirits%20and%20ingredients%20displayed%2C%20participants%20watching%20attentively%20in%20a%20stylish%20bar%20setting%20with%20warm%20lighting&width=400&height=300&seq=5&orientation=landscape",
		},
		{
			id: 3,
			title: "Summer Gala Fundraiser",
			date: "June 25, 2025",
			time: "6:30 PM",
			status: "Draft",
			spot: "Harmony Hall",
			rsvps: 0,
			image:
				"https://readdy.ai/api/search-image?query=An%20elegant%20gala%20fundraiser%20setup%20with%20round%20tables%20decorated%20with%20white%20linens%20and%20floral%20centerpieces%2C%20stage%20with%20banner%2C%20auction%20items%20displayed%2C%20champagne%20flutes%2C%20and%20soft%20lighting%20creating%20a%20sophisticated%20charity%20event%20atmosphere&width=400&height=300&seq=6&orientation=landscape",
		},
	];
	return (
		<Card className="shadow-sm">
			<Calendar
				fullscreen={true}
				dateCellRender={(date) => {
					const eventForDate = events.filter((event) => {
						const eventDate = new Date(event.date);
						return (
							eventDate.getDate() === date.date() &&
							eventDate.getMonth() === date.month() // &&
							// eventDate.getFullYear() === date.year()
						);
					});

					return (
						<ul className="events">
							{eventForDate.map((event) => (
								<li key={event.id}>
									<Badge
										color={event.status === "Published" ? "green" : "gold"}
										className={`${event.status === "Published" ? "bg-green-600" : "bg-yellow-700"} cursor-pointer whitespace-nowrap`}
									>
										{event.title}
									</Badge>
								</li>
							))}
						</ul>
					);
				}}
			/>
		</Card>
	);
}

export default CalendarContent;
