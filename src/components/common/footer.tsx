import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { IoLogoInstagram, IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white pt-16 pb-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
					<div>
						<h3 className="text-xl font-bold mb-4">kgabs</h3>
						<p className="text-gray-400 mb-6">
							Discover and book amazing local spots in your area. From
							restaurants to spas, we've got you covered.
						</p>
						<h4 className="font-medium mb-2">Connect</h4>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<AiFillFacebook
									size={25}
									className="text-neutral-400 hover:text-neutral-100"
								/>
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<FaXTwitter
									size={24}
									className="text-neutral-400 hover:text-neutral-100"
								/>
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<IoLogoInstagram
									size={24}
									className="text-neutral-400 hover:text-neutral-100"
								/>
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<IoLogoLinkedin
									size={24}
									className="text-neutral-400 hover:text-neutral-100"
								/>
							</a>
						</div>

						{/* <h4 className="font-medium mb-2">Get the App</h4>
						<div className="flex space-x-3">
							<a
								href="#"
								className="bg-black border border-gray-700 rounded px-3 py-2 flex items-center hover:bg-gray-800 transition-colors"
							>
								<i className="fab fa-apple text-xl mr-2"/>
								<div className="text-left">
									<div className="text-xs">Download on the</div>
									<div className="font-medium">App Store</div>
								</div>
							</a>
							<a
								href="#"
								className="bg-black border border-gray-700 rounded px-3 py-2 flex items-center hover:bg-gray-800 transition-colors"
							>
								<i className="fab fa-google-play text-xl mr-2"/>
								<div className="text-left">
									<div className="text-xs">Get it on</div>
									<div className="font-medium">Google Play</div>
								</div>
							</a>
						</div> */}
					</div>
					<div>
						<h4 className="text-lg font-bold mb-4">Discover</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Spots Near Me
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Events This Weekend
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Top Rated Places
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									New Openings
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Featured Collections
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-bold text-lg mb-4">For Bussiness</h4>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Add Your Spot
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Advertise With Us
								</a>
							</li>
							<li>
								<Link to={'/pricing'} className="hover:text-white transition-colors">
									Pricing
								</Link>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Resources
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									FAQs
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Success Stories
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-bold mb-4">Company</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Careers
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Blog
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Press
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Partners
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Contact Us
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-bold mb-4">Support</h4>
						<ul className="space-y-2">
							<li>
								<Link
									className="text-gray-400 hover:text-white transition-colors"
									to="/"
								>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									className="text-gray-400 hover:text-white transition-colors"
									to="/"
								>
									Safety Information
								</Link>
							</li>
							<li>
								<Link
									className="text-gray-400 hover:text-white transition-colors"
									to="/"
								>
									Cancellation Options
								</Link>
							</li>
							<li>
								<Link
									className="text-gray-400 hover:text-white transition-colors"
									to="/"
								>
									Report a Concern
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-gray-800 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-4 md:mb-0">
							<p className="text-gray-400 text-sm">
								© {currentYear} kgabs, Inc. All rights reserved.
							</p>
						</div>
						<div className="flex flex-wrap justify-center gap-4">
							<Link
								className="text-gray-400 hover:text-white text-sm transition-colors"
								to="/"
							>
								Privacy Policy
							</Link>
							<Link
								className="text-gray-400 hover:text-white text-sm transition-colors"
								to="/"
							>
								Terms of Service
							</Link>
							<Link
								className="text-gray-400 hover:text-white text-sm transition-colors"
								to="/"
							>
								Cookie Policy
							</Link>
							<div className="flex items-center">
								<span className="text-gray-400 text-sm mr-2">
									Payment Methods:
								</span>
								<div className="flex space-x-2">
									<FaCcVisa
										size={20}
										className="fab fa-cc-visa text-gray-400"
									/>
									<FaCcMastercard
										size={20}
										className="fab fa-cc-visa text-gray-400"
									/>
									<FaCcAmex
										size={20}
										className="fab fa-cc-visa text-gray-400"
									/>
									<FaCcPaypal
										size={20}
										className="fab fa-cc-visa text-gray-400"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
