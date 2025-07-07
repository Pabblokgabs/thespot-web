import { FiSearch } from "react-icons/fi";
import { CalendarCheck } from "lucide-react";
import { FaStar } from "react-icons/fa";

function Wedo() {
	return (
		<div className="bg-white py-16">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 mb-6">
							How kgabs Works
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-20">
							Discover And Book Amazing Local Spots in Just a Few Simple Steps
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="bg-indigo-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
								<FiSearch className="text-indigo-600" size={30} />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">Discover</h3>
							<p className="text-gray-600">
								Browse through thousands of curated spots in your area. Filter
								by category, price, rating and more.
							</p>
						</div>
						<div className="text-center">
							<div className="bg-indigo-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
								<CalendarCheck className="text-indigo-600" size={30} />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">Book</h3>
							<p className="text-gray-600">
								Reserve your spot instantly with our secure booking system. Get
								confirmations in seconds.
							</p>
						</div>
						<div className="text-center">
							<div className="bg-indigo-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
								<FaStar className="text-indigo-600" size={30} />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">
								Experience
							</h3>
							<p className="text-gray-600">
								Enjoy your visit and share your experience by leaving reviews to
								help others discover great spots.
							</p>
						</div>
					</div>
				</div>
			</div>
	);
}

export default Wedo;
