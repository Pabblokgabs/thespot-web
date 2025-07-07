import React from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogFooter,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import Btn from "./btn.js";

interface PopupProps {
	children?: React.ReactNode;
	title?: string;
	action?: string;
	trigger?: React.ReactNode;
	onConfirm?: () => void;
	onCancel?: () => void;
}

const Popup: React.FC<PopupProps> = ({
	children,
	title,
	action,
	trigger,
	onConfirm,
	onCancel,
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				{trigger ?? <Btn text="Open" />}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader className="flex flex-col justify-center">
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>
						<div className="py-2 h-fit w-full">{children}</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={onCancel}
						className="hover:text-orange-600"
						asChild
					>
						<Btn
							text="Cancel"
							textColor="text-orange-600"
							isAnimation
							bgColor="transparent"
						/>
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						className="bg-orange-600 hover:bg-orange-600"
						asChild
					>
						<Btn text={action || "Confirm"} isAnimation />
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default Popup;
