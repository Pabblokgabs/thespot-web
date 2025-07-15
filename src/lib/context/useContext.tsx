import { createContext, useState, ReactNode, FC, useContext } from "react";

type OwnerContextType = {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	isQuerying: boolean;
	setIsQuerying: React.Dispatch<React.SetStateAction<boolean>>;
};

const OverAllContext = createContext<OwnerContextType | null>(null);

const OverAllProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [query, setQuery] = useState<string>("");
	const [isQuerying, setIsQuerying] = useState<boolean>(false);
	return (
		<OverAllContext.Provider
			value={{ isQuerying, setIsQuerying, query, setQuery }}
		>
			{children}
		</OverAllContext.Provider>
	);
};

const useOverAllContext = (): OwnerContextType => {
	const context = useContext(OverAllContext);
	if (!context) {
		throw new Error("useOverAllContext must be used within an OwnerProvider");
	}
	return context;
};

export { OverAllProvider, useOverAllContext };
