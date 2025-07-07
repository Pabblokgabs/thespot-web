import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { OwnerProvider } from "./lib/context/owner";
import { UserProvider } from "./lib/context/user";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<OwnerProvider>
				<UserProvider>
					<App />
					<Toaster />
				</UserProvider>
			</OwnerProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
