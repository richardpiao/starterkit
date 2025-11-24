import type { HTMLAttributes, ReactNode } from "react";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";


type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface IContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  children: ReactNode;
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
};

export function Container({
  size = "xl",
  className,
  children,
  ...props
}: IContainerProps): ReactNode {
  return (
    <div
      className={twMerge(
        clsx("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeStyles[size], className)
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type { IContainerProps, ContainerSize };
