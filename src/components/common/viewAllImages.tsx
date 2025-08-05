import { useOverAllContext } from "@/lib/context/useContext";
import { Modal } from "antd";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function ViewAllImages() {
	const {
		onViewImg,
		setOnViewImg,
		allImageToView,
		isViewAllImgModal,
		setIsViewAllImgModal,
		setAllImageToView,
	} = useOverAllContext();

	if (!onViewImg) setOnViewImg(allImageToView[0]);

	return (
		<Modal
			onCancel={() => {
				setIsViewAllImgModal(false);
				setAllImageToView([]);
				setOnViewImg("");
			}}
			open={isViewAllImgModal}
			width={"95%"}
			footer={null}
			style={{ maxHeight: "90vh" }}
		>
			<div className="flex sm:flex-col lg:flex-row gap-4 justify-between h-full w-full mt-10">
				<div
					className="h-[70vh] relative flex-1 inset-0 bg-cover bg-center rounded-lg overflow-hidden backdrop-blur-2xl"
					style={{ backgroundImage: `url(${onViewImg})` }}
				>
					<div className="absolute -z-1 top-0 left-0 w-full h-full bg-white/60 backdrop-blur-2xl" />
					<img
						className="h-full w-full object-contain rounded-lg"
						src={onViewImg}
					/>
				</div>
				<ScrollArea className="w-full h-40 lg:h-full lg:w-50 whitespace-nowrap overflow-x-auto lg:overflow-y-auto">
					<div className="flex lg:h-[70vh] lg:flex-col gap-2.5">
						{allImageToView.map((image, index) => (
							<div
								className={`h-30 w-40 lg:w-40 lg:h-40 transition-all duration-300 rounded-lg overflow-hidden ${
									image === onViewImg &&
									"border-4 lg:border-2 shadow-lg border-indigo-600 lg:translate-x-2 "
								}`}
							>
								<img
									className="h-full w-full object-cover"
									onClick={() => setOnViewImg(image)}
									key={`photo-number${index + 1}-${image}`}
									src={image}
								/>
							</div>
						))}
					</div>
					<ScrollBar
						orientation={window.innerWidth >= 1024 ? "vertical" : "horizontal"}
					/>
				</ScrollArea>
			</div>
		</Modal>
	);
}

export default ViewAllImages;
