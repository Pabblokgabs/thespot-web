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
	allImageToView: string[];
	setAllImageToView: React.Dispatch<React.SetStateAction<string[]>>;
	isViewAllImgModal: boolean;
	setIsViewAllImgModal: React.Dispatch<React.SetStateAction<boolean>>;
	onViewImg: string;
	setOnViewImg: React.Dispatch<React.SetStateAction<string>>;
};

const OverAllContext = createContext<OwnerContextType | null>(null);

const OverAllProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [query, setQuery] = useState<string>("");
	const [queryResults, setQueryResults] = useState<any>();
	const [destination, setDestination] = useState<string>("");
	const [what, setWhat] = useState<string>("");
	const [isQuerying, setIsQuerying] = useState<boolean>(false);
	const [allImageToView, setAllImageToView] = useState<string[]>([]);
	const [isViewAllImgModal, setIsViewAllImgModal] = useState<boolean>(false);
	const [onViewImg, setOnViewImg] = useState<string>(allImageToView[0]);

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
				allImageToView,
				setAllImageToView,
				isViewAllImgModal,
				setIsViewAllImgModal,
				onViewImg,
				setOnViewImg,
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
