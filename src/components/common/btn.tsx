import React, { useState, MouseEvent } from "react";
import { ClipLoader } from "react-spinners";

interface CustomButtonProps {
	text?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: "button" | "submit" | "reset";
	width?: string;
	isAnimation?: boolean;
	className?: string;
	size?: string;
	animationColor?: string;
	borderRadius?: string;
	children?: React.ReactNode;
	borderColor?: string;
	loading?: boolean;
	loadingColor?: string;
}

const Btn: React.FC<CustomButtonProps> = ({
	text,
	onClick,
	type = "button",
	width = "100%",
	isAnimation = false,
	className = "",
	size = "14px",
	animationColor = "rgba(250,250,250,0.5)",
	borderRadius = "rounded-md",
	children,
	borderColor = "border-transparent",
	loading = false,
	loadingColor = "white",
}) => {
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const animationStyle =
		isAnimation && isHovering
			? {
					backgroundImage: `radial-gradient(circle at ${pos.x}px ${pos.y}px, ${animationColor}, transparent 50%)`,
					transition: "background 0.2s ease",
			  }
			: {};

	return (
		<button
			disabled={loading}
			type={type}
			onClick={onClick}
			onMouseMove={isAnimation ? handleMouseMove : undefined}
			onMouseEnter={() => isAnimation && setIsHovering(true)}
			onMouseLeave={() => isAnimation && setIsHovering(false)}
			style={{
				...(width ? { width } : { paddingLeft: "20px", paddingRight: "20px" }),
				fontSize: size,
				...animationStyle,
			}}
			className={`
				bg-blue-600
				${borderRadius}
				${borderColor}
				relative overflow-hidden cursor-pointer py-[8px] !rounded-button whitespace-nowrap
				${className}
				flex items-center justify-center
			`}
		>
			{loading && (
				<ClipLoader
					size={18}
					loading={loading}
					color={loadingColor}
					className="mr-2"
				/>
			)}{" "}
			{children ? children : text}
		</button>
	);
};

export default Btn;
