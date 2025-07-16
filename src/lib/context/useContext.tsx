import { createContext, useState, ReactNode, FC, useContext } from "react";

type OwnerContextType = {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	destination: string;
	setDestination: React.Dispatch<React.SetStateAction<string>>;
	what: string;
	setWhat: React.Dispatch<React.SetStateAction<string>>;
	isQuerying: boolean;
	setIsQuerying: React.Dispatch<React.SetStateAction<boolean>>;
	queryResults: any;
	setQueryResults: React.Dispatch<React.SetStateAction<any>>;
};

const OverAllContext = createContext<OwnerContextType | null>(null);

const OverAllProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [query, setQuery] = useState<string>("");
	const [queryResults, setQueryResults] = useState<any>();
	const [destination, setDestination] = useState<string>("");
	const [what, setWhat] = useState<string>("");
	const [isQuerying, setIsQuerying] = useState<boolean>(true);
	return (
		<OverAllContext.Provider
			value={{
				isQuerying,
				setIsQuerying,
				query,
				setQuery,
				destination,
				setDestination,
				what,
				setWhat,
				queryResults,
				setQueryResults,
			}}
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
