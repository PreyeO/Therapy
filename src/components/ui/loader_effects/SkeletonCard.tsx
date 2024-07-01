import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="space-y-4 p-4 w-full max-w-xl">
        <Skeleton className="h-12 w-full mb-4 rounded-lg" />
        <Skeleton className="h-8 w-3/4 mb-2 rounded-lg" />
        <Skeleton className="h-8 w-1/2 mb-2 rounded-lg" />
        <Skeleton className="h-8 w-1/3 rounded-lg" />
      </div>
    </div>
  );
}
