import {
	CommandDialog,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandEmpty,
} from "../ui/command";
import { useOverAllContext } from "@/lib/context/useContext";
import noResults from "@/assets/noproduct.svg";
import { events, spots } from "@/lib/mock";
import { EnvironmentOutlined } from "@ant-design/icons";

function QueryCommand() {
	const { setIsQuerying, isQuerying, query, setQuery } = useOverAllContext();

	return (
		<CommandDialog open={isQuerying} onOpenChange={setIsQuerying}>
			<CommandInput
				onValueChange={(text) => setQuery(text)}
				placeholder="Search by name of the spot or event..."
			/>
			<CommandList>
				<CommandEmpty>
					<div>
						<img src={noResults} alt="No results" />
						<p>No results for {query}</p>
					</div>
				</CommandEmpty>

				<CommandGroup className="!w-full" heading="Spots">
					{spots.length > 0 ? (
						spots?.map((spot, index) => (
							<CommandItem
								className="border-b border-b-neutral-400 rounded-b-none"
								key={spot.id + index}
							>
								<div className="space-y-2">
									<div className="flex justify-between gap-2.5 items-center">
										<h4 className="truncate line-clamp-1 font-bold">
											{spot.name}
										</h4>
										<span
											className={`text-sm ${
												spot.isOpen ? "text-green-400 " : "text-red-400"
											}`}
										>
											{spot.isOpen ? "open" : "closed"}
										</span>
									</div>
									<div className="flex items-center gap-1 text-sm text-gray-400">
										<EnvironmentOutlined size={15} />
										<p className="text-sm text-gray-400">
											{"Tafelkop, zone 14"}
										</p>
									</div>
								</div>
							</CommandItem>
						))
					) : (
						<p>No Spot matches {query}</p>
					)}
				</CommandGroup>

				<CommandGroup heading="Events">
					{events.length > 0 ? (
						events?.map((event, index) => (
							<CommandItem
								className="border-b border-b-neutral-400 rounded-b-none"
								key={event.id + index}
							>
								<div>
									<div className="flex justify-between gap-2.5 items-center">
										<h4 className="truncate line-clamp-1 font-bold">
											{event.title}
										</h4>
										<span className="text-sm text-gray-400">{event.date}</span>
									</div>
									<p className="text-sm text-gray-400">{"Dijong lifestyle"}</p>
								</div>
							</CommandItem>
						))
					) : (
						<p>No Spot matches {query}</p>
					)}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}

export default QueryCommand;
