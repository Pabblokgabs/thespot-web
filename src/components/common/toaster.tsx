import { toast } from "sonner";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastVariant = "default" | "success" | "error" | "warning" | "info";

type ShowToastOptions = {
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  position?: ToastPosition;
  variant?: ToastVariant;
};

export function showToast(
  title: string,
  {
    description,
    actionLabel,
    onAction,
    position = "bottom-right",
    variant = "default",
  }: ShowToastOptions = {}
) {
  const baseOptions = {
    description,
    position,
    action:
      actionLabel && onAction
        ? {
            label: actionLabel,
            onClick: onAction,
          }
        : undefined,
  };

  switch (variant) {
    case "success":
      toast.success(title, baseOptions);
      break;
    case "error":
      toast.error(title, baseOptions);
      break;
    case "warning":
      toast.warning(title, baseOptions);
      break;
    case "info":
      toast.info(title, baseOptions);
      break;
    default:
      toast(title, baseOptions);
      break;
  }
}
