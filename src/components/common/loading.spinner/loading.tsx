import React from "react";
import { ClipLoader } from "react-spinners";

interface spinnerProps {
	size?: number;
	loading?: boolean;
	color?: string;
	hint?: string;
	bgColor?: string;
}

const LoadingSpinner: React.FC<spinnerProps> = ({
	size = 50,
	loading = false,
	color = "gray",
	hint,
	bgColor = "transparent",
}) => {
	return (
		<div
			className={`absolute z-[10000000] flex-1 h-full w-full ${bgColor} flex flex-col items-center justify-center gap-5`}
		>
			<ClipLoader size={size} loading={loading} color={color} />
			<span className="text-neutral-100 text-lg">{hint}</span>
		</div>
	);
};

export default LoadingSpinner;
