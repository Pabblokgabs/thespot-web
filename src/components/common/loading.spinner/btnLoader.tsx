import React from "react";
import { ClipLoader } from "react-spinners";

interface spinnerProps {
	size?: number;
	loading?: boolean;
	color?: string;
}

const BtnLoader: React.FC<spinnerProps> = ({
	size = 20,
	loading = false,
	color = "white",
}) => {
	return <ClipLoader size={size} loading={loading} color={color} />;
};

export default BtnLoader;
