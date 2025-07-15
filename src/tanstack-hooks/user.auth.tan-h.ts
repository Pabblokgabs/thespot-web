// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// const { mutate: resendPassword} = useMutation({
//   mutationFn: async (email) => {
// 			try {
// 				const res = await fetch("http://localhost:5000/api/v1/auth/email", {
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify({ email }),
// 				});

// 				const data = await res.json();
// 				if (!res.ok || !data.success) {
// 					throw new Error(data.message || "Something went wrong");
// 				}

// 				return data;
// 			} catch (error: any) {
// 				toast.error(error.message);
// 				throw error;
// 			}
// 		},
// 		onSuccess: (data) => {
// 			setToken(data.token);
// 			setShowVerification(true);
// 			setIsCountingDown(true);
// 		},
// })