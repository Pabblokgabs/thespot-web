import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { OwnerProvider } from "./lib/context/owner";
import { UserProvider } from "./lib/context/user";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverAllProvider } from "./lib/context/useContext";
import { ViewAllImages } from "./components";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<OverAllProvider>
				<OwnerProvider>
					<UserProvider>
						<App />
						<Toaster
							toastOptions={{ duration: 3000 }}
							position="bottom-right"
							reverseOrder={false}
						/>
						<ViewAllImages />
					</UserProvider>
				</OwnerProvider>
			</OverAllProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
