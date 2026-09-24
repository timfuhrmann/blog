import { ComponentProps, ReactNode } from "react";
import { X } from "react-feather";
import { toast as sonnerToast } from "sonner";
import { cn } from "cn";

type ToastProps = Omit<ComponentProps<"div">, "id"> & {
  id: string | number;
};

export const Toast = ({ id, children, className, ...props }: ToastProps) => {
  return (
    <div
      className={cn(
        "border-foreground-0 bg-layer-0 text-foreground-0 relative flex w-[356px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-none border p-4",
        className
      )}
      {...props}
    >
      <div className="flex-1 font-mono text-sm leading-relaxed">{children}</div>
      <button
        type="button"
        aria-label="Close"
        onClick={() => sonnerToast.dismiss(id)}
        className="border-foreground-0 bg-layer-0 text-foreground-0 absolute top-0 right-0 flex size-5 translate-x-[35%] -translate-y-[35%] items-center justify-center rounded-none border"
      >
        <X size={12} aria-hidden />
      </button>
    </div>
  );
};

type ShowToastOptions = Parameters<typeof sonnerToast.custom>[1];

export const showToast = (
  content: ReactNode,
  options?: ShowToastOptions & { className?: string }
) => {
  const { className, ...rest } = options ?? {};
  return sonnerToast.custom(
    (id) => (
      <Toast id={id} className={className}>
        {content}
      </Toast>
    ),
    rest
  );
};
