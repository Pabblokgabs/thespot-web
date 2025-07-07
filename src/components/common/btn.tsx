import React, { useState, MouseEvent } from "react";

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
				bg-indigo-600
				${borderRadius}
				${borderColor}
				relative overflow-hidden cursor-pointer py-[8px] !rounded-button whitespace-nowrap
				${className}
			`}
		>
			{children ? children : text}
		</button>
	);
};

export default Btn;
