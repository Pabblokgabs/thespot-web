function PopularCity() {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl font-bold mb-6 text-black">Popular Cities</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{[
						{
							name: "New York",
							image:
								"https://readdy.ai/api/search-image?query=New%20York%20City%20skyline%20with%20iconic%20buildings%2C%20urban%20landscape%2C%20bustling%20streets%2C%20modern%20architecture%2C%20recognizable%20landmarks%20like%20Empire%20State%20Building%2C%20vibrant%20city%20atmosphere%2C%20daytime%20view%20with%20clear%20skies%2C%20high-rise%20buildings%2C%20metropolitan%20setting&width=400&height=250&seq=14&orientation=landscape",
						},
						{
							name: "Los Angeles",
							image:
								"https://readdy.ai/api/search-image?query=Los%20Angeles%20cityscape%20with%20palm%20trees%2C%20modern%20buildings%2C%20sunny%20weather%2C%20blue%20skies%2C%20Hollywood%20sign%20visible%20in%20distance%2C%20urban%20sprawl%2C%20coastal%20city%20vibes%2C%20California%20architecture%2C%20entertainment%20capital%2C%20vibrant%20atmosphere&width=400&height=250&seq=15&orientation=landscape",
						},
						{
							name: "Chicago",
							image:
								"https://readdy.ai/api/search-image?query=Chicago%20skyline%20with%20distinctive%20architecture%2C%20view%20from%20Lake%20Michigan%2C%20iconic%20buildings%20like%20Willis%20Tower%2C%20urban%20landscape%2C%20modern%20skyscrapers%2C%20waterfront%20view%2C%20Midwest%20metropolis%2C%20architectural%20marvels%2C%20city%20known%20for%20its%20design%2C%20vibrant%20urban%20setting&width=400&height=250&seq=16&orientation=landscape",
						},
						{
							name: "Miami",
							image:
								"https://readdy.ai/api/search-image?query=Miami%20beach%20scene%20with%20art%20deco%20buildings%2C%20palm%20trees%2C%20turquoise%20waters%2C%20white%20sand%20beaches%2C%20colorful%20lifeguard%20towers%2C%20tropical%20atmosphere%2C%20sunny%20weather%2C%20coastal%20city%20vibes%2C%20vacation%20destination%2C%20vibrant%20South%20Beach%20area&width=400&height=250&seq=17&orientation=landscape",
						},
					].map((city, index) => (
						<div
							key={index}
							className="relative rounded-lg overflow-hidden h-64 group cursor-pointer"
						>
							<img
								src={city.image}
								alt={city.name}
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
								<div className="p-4 w-full">
									<h3 className="text-white text-xl font-bold">{city.name}</h3>
									<p className="text-white/80 text-sm mt-1">Explore spots</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default PopularCity;
