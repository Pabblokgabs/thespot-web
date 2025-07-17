import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import React from "react";

interface paginationProps {
	currentPage?: number;
	total?: number;
	pageSize?: number;
	setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
	isNextPrev?: boolean;
}

const PaginationComponent: React.FC<paginationProps> = ({
	currentPage,
	setCurrentPage,
	total,
	pageSize,
	isNextPrev = true,
}) => {
	return (
		<div className="mt-8 flex justify-center">
			<Pagination
				current={currentPage}
				total={total}
				pageSize={pageSize}
				onChange={setCurrentPage}
				showSizeChanger={false}
				itemRender={(_, type, originalElement) => {
					if (type === "prev") {
						return (
							<Button className="!rounded-button whitespace-nowrap cursor-pointer">
								<LeftOutlined />
								<span
									className={`hidden ${isNextPrev ? "md:block" : "hidden"}`}
								>
									Previous
								</span>
							</Button>
						);
					}
					if (type === "next") {
						return (
							<Button className="!rounded-button whitespace-nowrap cursor-pointer">
								<span
									className={`hidden ${isNextPrev ? "md:block" : "hidden"}`}
								>
									Next
								</span>
								<RightOutlined />
							</Button>
						);
					}
					return originalElement;
				}}
			/>
		</div>
	);
};

export default PaginationComponent;
