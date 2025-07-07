import { Link } from "react-router-dom";
import logo from "../../../assets/just.png";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import PopularSpots from "./popular.spots";
import PopularEvents from "./events";
import { recommended } from "@/lib/options";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const Display = () => {
	return (
		<div className="px-[20px] w-full py-5 md:px-[50px] xl:px-[100px] bg-blue-50 text-neutral-900">
			<section className="py-12">
				<h2 className="text-2xl font-semibold text-center mb-6">
					Popular Categories
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-6 md:min-w-[200px] lg:min-w-[500px] flex-1 py-2.5 gap-4 ">
					{recommended.map((item) => (
						<div
							key={item.value}
							className="cursor-pointer rounded-md hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] bg-gray-200"
						>
							<div className="p-6 flex flex-row md:flex-col gap-2.5 items-center">
								<div className="text-4xl">{item.icon}</div>
								<p className="font-medium text-black">{item.label}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="flex flex-col gap-2.5">
				<h1 className="font-extrabold text-black lg:mt-20 text-2xl lg:text-5xl !overflow-y-hidden">
					A must know spot
				</h1>

				<div className="mt-10 flex flex-col sm:flex-row gap-5">
					<Link to={""} className="relative group overflow-hidden">
						<img
							src={logo}
							className="h-[50vh] w-full md:w-auto object-fill rounded-md"
						/>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button className="z-10 hover:text-amber-600 text-white flex flex-row items-center justify-center absolute cursor-pointer top-5 right-5 bg-neutral-600 p-2.5 rounded-full">
										<Plus className="h-5 w-5 lg:h-7 lg:w-7" />
									</button>
								</TooltipTrigger>
								<TooltipContent className="bg-zinc-900 !overflow-y-hidden">
									<p className="!overflow-y-hidden text-neutral-100">Follow</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<div className="absolute z-0 hidden top-0 h-full group-hover:flex flex-row items-center right-2.5">
							<button className="cursor-pointer text-white hover:text-amber-600 hover:opacity-80 bg-neutral-600 opacity-40 p-2.5 rounded-full">
								<ChevronRight size={30} />
							</button>
						</div>

						<div className="absolute z-0 hidden top-0 h-full group-hover:flex flex-row items-center left-2.5">
							<button className="cursor-pointer text-white hover:text-amber-600 hover:opacity-80 bg-neutral-600 opacity-40 p-2.5 rounded-full">
								<ChevronLeft size={30} />
							</button>
						</div>

						<div className="md:hidden absolute gap-1.5 inset-0 flex flex-col justify-end-safe bg-gradient-to-t from-zinc-900/90 via-zinc-900/70 to-transparent text-white p-5">
							<h1 className="text-lg lg:text-[40px] truncate font-bold !overflow-y-hidden">
								Dijong Lifestyle
							</h1>
							<div className="space-y-1 text-sm text-neutral-300">
								<p>location</p>
								<p>Oparation time</p>
								<p>Spot Type</p>
							</div>
						</div>
					</Link>

					<div className="hidden md:flex w-[500px] flex-col">
						<h1 className="text-[40px] font-bold !overflow-y-hidden">
							Dijong Lifestyle
						</h1>
						<p>hey</p>
						<p>hey</p>
						<p>hey</p>
						<p>hey</p>
						<p>hey</p>
						<div className="flex-1" />
					</div>
				</div>
			</section>

			<PopularSpots />
			<PopularEvents />
		</div>
	);
};

export default Display;
