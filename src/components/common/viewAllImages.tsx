import { useOverAllContext } from "@/lib/context/useContext";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

export function ViewAllImages() {
	const {
		onViewImg,
		setOnViewImg,
		allImageToView,
		isViewAllImgModal,
		setIsViewAllImgModal,
		setAllImageToView,
	} = useOverAllContext();

	return (
		<div
			className={`hidden ${
				isViewAllImgModal && "block z-900000000000000000 absolute"
			}`}
		>
			<div className="flex justify-end">
				<Button
					size="large"
					icon={<CloseOutlined />}
					onClick={() => {
						setIsViewAllImgModal(true);
						setAllImageToView([]);
					}}
				/>
			</div>
			<div className="flex flex-col justify-between">
				<img className="aspect-video" src={onViewImg} />
				<div className="flex gap-2.5">
					{allImageToView.map((image, index) => (
						<img
							className="h-10 w-10"
							onClick={() => setOnViewImg(image)}
							key={`photo-number${index + 1}-${image}`}
							src={image}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default ViewAllImages;
