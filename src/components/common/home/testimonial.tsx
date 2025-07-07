import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Testimonial() {
	return (
		<div className="bg-indigo-900 py-16">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-white mb-4">
						What Our Users Say
					</h2>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto">
						Join thousands of satisfied users who have discovered amazing local
						spots
					</p>
				</div>
				<Swiper
					modules={[Pagination, Autoplay, Navigation]}
					spaceBetween={24}
					slidesPerView={1}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					pagination={{ clickable: true }}
					autoplay={{ delay: 5000, disableOnInteraction: false }}
					className="pb-12"
				>
					{[
						{
							name: "Sarah Johnson",
							location: "New York",
							avatar:
								"https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20long%20brown%20hair%20smiling%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=11&orientation=squarish",
							text: "kgabs helped me discover so many hidden gems in my neighborhood that I never knew existed. The booking process is seamless and I love the detailed descriptions and reviews.",
						},
						{
							name: "Michael Chen",
							location: "San Francisco",
							avatar:
								"https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20asian%20man%20in%20his%2030s%20smiling%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=12&orientation=squarish",
							text: "As someone who travels frequently for work, kgabs has been a game-changer. I can quickly find great restaurants and cafes wherever I go, and the user reviews are always spot on.",
						},
						{
							name: "Emily Rodriguez",
							location: "Chicago",
							avatar:
								"https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20latina%20woman%20in%20her%2020s%20smiling%2C%20neutral%20background%2C%20high%20quality%20portrait&width=100&height=100&seq=13&orientation=squarish",
							text: "I used kgabs to plan my anniversary dinner and found the perfect romantic restaurant. The filters made it easy to find exactly what I was looking for, and the booking was confirmed instantly.",
						},
					].map((testimonial, index) => (
						<SwiperSlide key={testimonial.name + index}>
							<Card key={index} className="p-6 mb-11 bg-white">
								<div className="flex items-center mb-4">
									<Avatar className="h-12 w-12 mr-4">
										<AvatarImage src={testimonial.avatar} />
										<AvatarFallback>
											{testimonial.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div>
										<h4 className="font-bold text-gray-900">
											{testimonial.name}
										</h4>
										<p className="text-gray-500 text-sm">
											{testimonial.location}
										</p>
									</div>
								</div>
								<p className="text-gray-600 italic h-30 md:h-25 line-clamp-3 md:line-clamp-4">"{testimonial.text}"</p>
								<div className="mb-4 flex flex-row">
									{Array.from({ length: 4 }).map((_, i) => (
										<FaStar key={i} className="text-yellow-400" />
									))}
									<FaStarHalfStroke className="text-yellow-400" />
								</div>
							</Card>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default Testimonial;
