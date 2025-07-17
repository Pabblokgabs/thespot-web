import { useOverAllContext } from "@/lib/context/useContext";
import { recommended } from "@/lib/options";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { events, spots } from "@/lib/mock";
import { Badge } from "../ui/badge";

function SearchModal() {
	const {
		setIsQuerying,
		isQuerying,
		query,
		setQuery,
		destination,
		queryResults,
		setDestination,
		setQueryResults,
		setWhat,
		what,
	} = useOverAllContext();
	const [isSearchName, setIsSearchName] = useState<boolean>(false);
	const [maxW, setMaxW] = useState<number>(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setMaxW(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (!query.trim()) return setQueryResults([]);

		const filteredEvents = events.filter((event) =>
			event.title.toLowerCase().includes(query.trim().toLowerCase())
		);

		const filteredSpots = spots.filter((spot) =>
			spot.name.toLowerCase().includes(query.trim().toLowerCase())
		);

		setQueryResults([...filteredEvents, ...filteredSpots]);
	}, [query]);

	return (
		<Modal
			open={isQuerying && maxW < 768}
			onCancel={() => setIsQuerying(false)}
			footer={[
				<Button key="back" onClick={() => setIsQuerying(false)}>
					Close
				</Button>,
				<Button
					key="submit"
					type="primary"
					onClick={() => setIsQuerying(false)}
				>
					Search
				</Button>,
			]}
			width={700}
		>
			<div className="w-full mt-10 flex justify-end gap-2.5">
				<label htmlFor="searchByName" className="">
					Search by spot name
				</label>
				<Switch
					id="searchByName"
					onChange={setIsSearchName}
					checkedChildren={"Yes"}
					unCheckedChildren={"No"}
				/>
			</div>

			<div className="mt-5 flex flex-col gap-2.5">
				{isSearchName ? (
					<>
						<h1 className="text-lg font-bold">Name</h1>
						<Input
							size="large"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Enter the name of the spot or event..."
						/>

						{queryResults?.length > 0 && (
							<div className="flex flex-col gap-2">
								{queryResults?.map((item: any, index: number) => (
									<div
										className="border-b pb-2 border-b-neutral-400 rounded-b-none"
										key={index}
									>
										<div className="flex justify-between gap-2.5 items-center">
											<h4 className="truncate line-clamp-1 font-bold">
												{item.name || item.title}
											</h4>
											{item.date ? (
												<Badge className="bg-indigo-600">100+ going</Badge>
											) : (
												<Badge
													className={`text-sm ${
														item.isOpen ? "bg-green-400 " : "bg-red-400"
													}`}
												>
													{item.isOpen ? "Open now" : "closed"}
												</Badge>
											)}
										</div>
										<p>{item.time ? <>{item.date}</> : <>{item.category}</>}</p>
										<div className="flex items-center gap-1 text-sm text-gray-400">
											{item.time ? (
												<p className="flex items-center gap-1 truncate line-clamp-1">
													<EnvironmentOutlined size={15} /> at
													<span className="text-indigo-600 text-sm">
														Dijong lifestyle
													</span>
												</p>
											) : (
												<>
													<EnvironmentOutlined size={15} />
													<p className="text-sm text-gray-400">
														{"Tafelkop, zone 14"}
													</p>
												</>
											)}
										</div>
									</div>
								))}
							</div>
						)}
					</>
				) : (
					<>
						<h1 className="text-lg font-bold">Looking for!</h1>
						<Select
							value={what}
							onChange={(value) => setWhat(value)}
							size="large"
							placeholder="Select the type?"
						>
							{recommended.map((item, index) => (
								<Select.Option key={index + item.value} value={item.value}>
									{item.label}
								</Select.Option>
							))}
						</Select>

						<h1 className="text-lg font-bold">Where?</h1>
						<Input
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							size="large"
							placeholder="Enter the destination?"
						/>
					</>
				)}
			</div>
		</Modal>
	);
}

export default SearchModal;
