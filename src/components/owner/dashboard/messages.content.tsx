import { ChevronLeft, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaFilter, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { messages } from "@/lib/mock";
import { Dropdown } from "antd";
import { useOwnerContext } from "@/lib/context/owner";

const MessagesContent = () => {
	const { isMobileMessage, setIsMobileMessage } = useOwnerContext();

	return (
		<div className="p-2 relative md:p-6 h-full overflow-hidden ">
			<div className="flex h-full">
				<div className="w-full lg:w-1/3 lg:border-r lg:pr-4">
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-2xl font-bold">Messages</h1>
						<Dropdown
							menu={{
								items: [
									{ key: "read", label: "Read" },
									{ key: "unread", label: "Unread" },
								],
							}}
							trigger={["click"]}
						>
							<Button
								variant="outline"
								size="sm"
								className="!rounded-button whitespace-nowrap cursor-pointer"
							>
								<FaFilter className="mr-2" />
								Filter
							</Button>
						</Dropdown>
					</div>
					<div className="relative mb-4 bg-white">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
						<Input placeholder="Search conversations..." className="pl-10" />
					</div>
					<ScrollArea className="flex-1 py-4 overflow-y-auto pr-5">
						<div className="space-y-1">
							{messages.map((message) => (
								<div
									onClick={() => setIsMobileMessage(true)}
									className="w-full justify-start rounded-2xl p-2.5 bg-transparent hover:bg-gray-200 font-normal !rounded-button whitespace-nowrap cursor-pointer"
								>
									<div className="flex items-center w-full">
										<div className="relative">
											<Avatar className="h-10 w-10">
												<AvatarImage src={message.avatar} />
												<AvatarFallback className="text-white bg-neutral-400">
													{message.sender
														.split(" ")
														.splice(0, 2)
														.map((i) => i[0].toUpperCase())}
												</AvatarFallback>
											</Avatar>
											<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
										</div>
										<div className="ml-3 flex-1 flex justify-between items-center">
											<div>
												<p className="font-medium text-gray-700">
													{message.sender}
												</p>
												<p className="text-sm text-gray-500 truncate w-40">
													{message.message}
												</p>
											</div>
											<div className="text-right">
												<p className="text-xs text-gray-500 mb-1">
													{message.time}
												</p>
												{message.unread && (
													<span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs rounded-full">
														3
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</ScrollArea>
				</div>
				<div className="w-2/3 pl-4 hidden lg:flex flex-col h-full">
					<div className="border-b pb-4">
						<div className="flex justify-between items-center">
							<div className="flex items-center">
								<Avatar className="h-10 w-10">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div className="ml-3">
									<div className="flex items-center">
										<h2 className="font-medium">Michael Thompson</h2>
										<span className="ml-2 h-2 w-2 bg-green-500 rounded-full"></span>
									</div>
									<p className="text-sm text-gray-500">
										Grand Ballroom • Jun 10, 2025
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9 !rounded-button cursor-pointer"
								>
									<span className="i-fa-solid-phone"></span>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9 !rounded-button cursor-pointer"
								>
									<span className="i-fa-solid-video"></span>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9 !rounded-button cursor-pointer"
								>
									<span className="i-fa-solid-info-circle"></span>
								</Button>
							</div>
						</div>
					</div>
					<ScrollArea className="flex-1 py-4 overflow-y-auto pr-5">
						<div className="space-y-4 bg-white p-4 rounded-2xl">
							<div className="flex items-start gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div>
									<div className="bg-gray-100 rounded-lg p-3 max-w-md">
										<p>
											Hello! I'm interested in booking the Grand Ballroom for
											our corporate event on June 10th. Do you have
											availability?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:24 AM</p>
								</div>
							</div>
							<div className="flex items-start justify-end gap-3">
								<div className="text-right">
									<div className="bg-blue-500 text-white rounded-lg p-3 max-w-md">
										<p>
											Hi Michael! Yes, the Grand Ballroom is available on June
											10th. What time would you like to book it for?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:30 AM</p>
								</div>
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20dark%20hair%20in%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar7&orientation=squarish" />
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex items-start gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div>
									<div className="bg-gray-100 rounded-lg p-3 max-w-md">
										<p>
											Great! We'd like to book it from 2:00 PM to 8:00 PM. We'll
											have about 50 guests. Do you offer any A/V equipment or
											catering options?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:35 AM</p>
								</div>
							</div>
							<div className="flex items-start justify-end gap-3">
								<div className="text-right">
									<div className="bg-blue-500 text-white rounded-lg p-3 max-w-md">
										<p>
											Yes, we provide full A/V setup including projector,
											screen, microphones, and sound system. We also have
											several catering packages available. Would you like me to
											send you our catering menu?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:42 AM</p>
								</div>
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20dark%20hair%20in%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar7&orientation=squarish" />
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex items-start gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div>
									<div className="bg-gray-100 rounded-lg p-3 max-w-md">
										<p>
											That would be perfect! Please send over the catering menu
											and also information about any additional services you
											offer. What's the total cost for the venue rental?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:48 AM</p>
								</div>
							</div>
							<div className="flex items-start justify-end gap-3">
								<div className="text-right">
									<div className="bg-blue-500 text-white rounded-lg p-3 max-w-md">
										<p>
											The venue rental for 6 hours is $1,200, which includes the
											A/V equipment. Catering is priced separately based on your
											selections. I'll send you our full pricing details and
											catering menu right away.
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:55 AM</p>
								</div>
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20dark%20hair%20in%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar7&orientation=squarish" />
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex items-start justify-end gap-3">
								<div className="text-right">
									<div className="bg-blue-500 text-white rounded-lg p-3 max-w-md">
										<div className="flex items-center gap-2 mb-2">
											<span className="i-fa-solid-file-pdf text-white"></span>
											<p className="font-medium">Catering_Menu.pdf</p>
										</div>
										<div className="flex items-center gap-2">
											<span className="i-fa-solid-file-invoice-dollar text-white"></span>
											<p className="font-medium">Grand_Ballroom_Pricing.pdf</p>
										</div>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:56 AM</p>
								</div>
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20dark%20hair%20in%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar7&orientation=squarish" />
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex items-start gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div>
									<div className="bg-gray-100 rounded-lg p-3 max-w-md">
										<p>
											Thank you for the information! I'll review these with my
											team and get back to you shortly. One more question - do
											you have parking available for our guests?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">11:05 AM</p>
								</div>
							</div>
							<div className="flex items-start justify-end gap-3">
								<div className="text-right">
									<div className="bg-blue-500 text-white rounded-lg p-3 max-w-md">
										<p>
											Yes, we have complimentary parking for up to 60 vehicles.
											For larger events, we can arrange valet service for an
											additional fee. Let me know if you need that option.
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">11:10 AM</p>
								</div>
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20dark%20hair%20in%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar7&orientation=squarish" />
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex items-start gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div>
									<div className="bg-gray-100 rounded-lg p-3 max-w-md">
										<p>
											Perfect! The regular parking should be sufficient. I'll
											get back to you by the end of the day about our decision.
											Thanks for your help!
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">11:15 AM</p>
								</div>
							</div>
						</div>
					</ScrollArea>
					<div className="border-t pt-4">
						<div className="flex items-end gap-3">
							<Button
								variant="outline"
								size="icon"
								className="h-10 w-10 !rounded-button cursor-pointer"
							>
								<FaPaperclip />
							</Button>
							<div className="flex-1 relative">
								<Input
									placeholder="Type your message..."
									className="pr-10 min-h-[44px]"
								/>
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 !rounded-button cursor-pointer"
								>
									<span className="i-fa-solid-face-smile text-gray-400"></span>
								</Button>
							</div>
							<Button
								size="icon"
								className="h-10 w-10 bg-indigo-600 hover:bg-indigo-400 !rounded-button cursor-pointer"
							>
								<FaPaperPlane />
							</Button>
						</div>
					</div>
				</div>

				{/* Mobile messages popup */}
				<div
					className={`pl-4 lg:hidden flex-col h-full bg-gray-50 top-0 left-0 ${
						isMobileMessage ? "absolute z-100000 w-full flex" : "hidden"
					}`}
				>
					<div className="border-b pb-4">
						<div className="flex justify-between items-center">
							<div className="flex items-center">
								<ChevronLeft onClick={() => setIsMobileMessage(false)} />
								<Avatar className="h-10 w-10">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div className="ml-3 w-full">
									<div className="flex items-center">
										<h2 className="font-medium">Michael Thompson</h2>
										<span className="ml-2 h-2 w-2 bg-green-500 rounded-full"></span>
									</div>
									<p className="text-sm w-full text-gray-500">
										Grand Ballroom • Jun 10, 2025
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9 !rounded-button cursor-pointer"
								>
									<span className="i-fa-solid-phone"></span>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9 !rounded-button cursor-pointer"
								>
									<span className="i-fa-solid-video"></span>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9 !rounded-button cursor-pointer"
								>
									<span className="i-fa-solid-info-circle"></span>
								</Button>
							</div>
						</div>
					</div>
					<ScrollArea className="flex-1 py-4 overflow-y-auto pr-5">
						<div className="space-y-4 bg-white p-4 rounded-2xl">
							<div className="flex items-start gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div>
									<div className="bg-gray-100 rounded-lg p-3 max-w-md">
										<p>
											Hello! I'm interested in booking the Grand Ballroom for
											our corporate event on June 10th. Do you have
											availability?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:24 AM</p>
								</div>
							</div>
							<div className="flex items-start justify-end gap-3">
								<div className="text-right">
									<div className="bg-blue-500 text-white rounded-lg p-3 max-w-md">
										<p>
											Hi Michael! Yes, the Grand Ballroom is available on June
											10th. What time would you like to book it for?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:30 AM</p>
								</div>
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20dark%20hair%20in%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar7&orientation=squarish" />
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex items-start gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div>
									<div className="bg-gray-100 rounded-lg p-3 max-w-md">
										<p>
											Great! We'd like to book it from 2:00 PM to 8:00 PM. We'll
											have about 50 guests. Do you offer any A/V equipment or
											catering options?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:35 AM</p>
								</div>
							</div>
							<div className="flex items-start justify-end gap-3">
								<div className="text-right">
									<div className="bg-blue-500 text-white rounded-lg p-3 max-w-md">
										<p>
											Yes, we provide full A/V setup including projector,
											screen, microphones, and sound system. We also have
											several catering packages available. Would you like me to
											send you our catering menu?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:42 AM</p>
								</div>
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20dark%20hair%20in%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar7&orientation=squarish" />
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex items-start gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div>
									<div className="bg-gray-100 rounded-lg p-3 max-w-md">
										<p>
											That would be perfect! Please send over the catering menu
											and also information about any additional services you
											offer. What's the total cost for the venue rental?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:48 AM</p>
								</div>
							</div>
							<div className="flex items-start justify-end gap-3">
								<div className="text-right">
									<div className="bg-blue-500 text-white rounded-lg p-3 max-w-md">
										<p>
											The venue rental for 6 hours is $1,200, which includes the
											A/V equipment. Catering is priced separately based on your
											selections. I'll send you our full pricing details and
											catering menu right away.
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:55 AM</p>
								</div>
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20dark%20hair%20in%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar7&orientation=squarish" />
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex items-start justify-end gap-3">
								<div className="text-right">
									<div className="bg-blue-500 text-white rounded-lg p-3 max-w-md">
										<div className="flex items-center gap-2 mb-2">
											<span className="i-fa-solid-file-pdf text-white"></span>
											<p className="font-medium">Catering_Menu.pdf</p>
										</div>
										<div className="flex items-center gap-2">
											<span className="i-fa-solid-file-invoice-dollar text-white"></span>
											<p className="font-medium">Grand_Ballroom_Pricing.pdf</p>
										</div>
									</div>
									<p className="text-xs text-gray-500 mt-1">10:56 AM</p>
								</div>
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20dark%20hair%20in%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar7&orientation=squarish" />
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex items-start gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div>
									<div className="bg-gray-100 rounded-lg p-3 max-w-md">
										<p>
											Thank you for the information! I'll review these with my
											team and get back to you shortly. One more question - do
											you have parking available for our guests?
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">11:05 AM</p>
								</div>
							</div>
							<div className="flex items-start justify-end gap-3">
								<div className="text-right">
									<div className="bg-blue-500 text-white rounded-lg p-3 max-w-md">
										<p>
											Yes, we have complimentary parking for up to 60 vehicles.
											For larger events, we can arrange valet service for an
											additional fee. Let me know if you need that option.
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">11:10 AM</p>
								</div>
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20dark%20hair%20in%20business%20attire%2C%20clean%20background%2C%20professional%20portrait%20lighting%2C%20high%20quality%20corporate%20photo&width=100&height=100&seq=avatar7&orientation=squarish" />
									<AvatarFallback>ME</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex items-start gap-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20with%20glasses%20and%20short%20dark%20hair%2C%20business%20casual%20attire%2C%20neutral%20background%2C%20professional%20portrait%20photo&width=100&height=100&seq=avatar2&orientation=squarish" />
									<AvatarFallback>MT</AvatarFallback>
								</Avatar>
								<div>
									<div className="bg-gray-100 rounded-lg p-3 max-w-md">
										<p>
											Perfect! The regular parking should be sufficient. I'll
											get back to you by the end of the day about our decision.
											Thanks for your help!
										</p>
									</div>
									<p className="text-xs text-gray-500 mt-1">11:15 AM</p>
								</div>
							</div>
						</div>
					</ScrollArea>
					<div className="border-t pt-4">
						<div className="flex items-end gap-3">
							<Button
								variant="outline"
								size="icon"
								className="h-10 w-10 !rounded-button cursor-pointer"
							>
								<FaPaperclip />
							</Button>
							<div className="flex-1 relative">
								<Input
									placeholder="Type your message..."
									className="pr-10 min-h-[44px]"
								/>
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 !rounded-button cursor-pointer"
								>
									<span className="i-fa-solid-face-smile text-gray-400"></span>
								</Button>
							</div>
							<Button
								size="icon"
								className="h-10 w-10 bg-indigo-600 hover:bg-indigo-400 !rounded-button cursor-pointer"
							>
								<FaPaperPlane />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessagesContent;
