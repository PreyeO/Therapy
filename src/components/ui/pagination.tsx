import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

// Pagination Wrapper
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

// Pagination Content
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

// Pagination Item
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

// Pagination Link Component with styling applied for active and normal states
type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "default",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({ size }),
      isActive
        ? "bg-[#889755] hover:bg-army_green text-white" // Active state styles
        : "bg-army_green text-white hover:bg-[#889755] cursor-pointer", // Normal state styles
      "px-4 py-2 rounded-md", // Shared styling
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

// Pagination Previous with disabled logic
const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn(
      disabled
        ? "bg-gray-100 text-gray-500 cursor-not-allowed hover:bg-gray-100 " // Disabled styling
        : "bg-army_green text-white hover:bg-[#889755] cursor-pointer", // Enabled styling
      "px-4 py-2 rounded-md", // Shared styling
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Prev</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

// Pagination Next with disabled logic
const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(
      disabled
        ? "bg-gray-100 text-gray-500 cursor-not-allowed hover:bg-gray-100 " // Disabled styling
        : "bg-army_green text-white hover:bg-[#889755] cursor-pointer", // Enabled styling
      "px-4 py-2 rounded-md", // Shared styling
      className
    )}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

// Pagination Ellipsis for handling large pagination ranges
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
