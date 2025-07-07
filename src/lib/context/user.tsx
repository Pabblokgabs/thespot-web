import { createContext, useState, ReactNode, FC, useContext } from "react";

type UserContextType = {};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

const useUserContext = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within an UserProvider");
	}
	return context;
};

export { UserProvider, useUserContext };
