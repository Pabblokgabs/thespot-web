import { Button } from "@/components/ui/button";

function GetApp() {
	return (
		<div className="bg-white hidden md:block py-16">
			{/* <div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="md:w-1/2 mb-8 md:mb-0">
						<h2 className="text-3xl font-bold text-white mb-4">
							Get the kgabs App
						</h2>
						<p className="text-xl text-indigo-100 mb-8">
							Discover and book amazing local spots on the go. Download our
							mobile app for a seamless experience.
						</p>
						<div className="flex flex-wrap gap-4">
							<Button className="bg-black hover:bg-gray-900 text-white !rounded-button whitespace-nowrap cursor-pointer">
								<i className="fab fa-apple text-2xl mr-3"></i>
								<div className="text-left">
									<div className="text-xs">Download on the</div>
									<div className="text-lg font-medium">App Store</div>
								</div>
							</Button>
							<Button className="bg-black hover:bg-gray-900 text-white !rounded-button whitespace-nowrap cursor-pointer">
								<i className="fab fa-google-play text-2xl mr-3"></i>
								<div className="text-left">
									<div className="text-xs">Get it on</div>
									<div className="text-lg font-medium">Google Play</div>
								</div>
							</Button>
						</div>
					</div>
					<div className="md:w-1/2 flex justify-center">
						<img
							src="https://readdy.ai/api/search-image?query=smartphone%20displaying%20a%20modern%20app%20interface%20for%20booking%20restaurants%20and%20local%20spots%2C%20clean%20design%2C%20professional%20mockup%20on%20transparent%20background&width=400&height=600&seq=14&orientation=portrait"
							alt="kgabs App"
							className="max-w-xs"
						/>
					</div>
				</div>
			</div> */}

			<div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 md:p-12 md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get the App
              </h2>
              <p className="text-indigo-100 mb-8">
                Discover events on the go. Download our mobile app to get
                personalized recommendations and never miss what's happening
                around you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fab fa-apple text-xl mr-2"></i>
                  App Store
                </Button>
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fab fa-google-play text-xl mr-2"></i>
                  Google Play
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20smartphone%20displaying%20social%20events%20app%20interface%20with%20event%20listings%2C%20vibrant%20colors%2C%20clean%20design%2C%20floating%20on%20gradient%20background%2C%20professional%20app%20mockup%20style%2C%20high%20quality%20render&width=500&height=500&seq=19&orientation=portrait"
                alt="Mobile App"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
		</div>
	);
}

export default GetApp;
