import Link from "next/link";
import React, { Suspense } from "react";
import ResourceGroupList from "./resource-group-list";
import { Skeleton } from "@/components/ui/skeleton";
import ResourceRow from "@/components/resource-row";
import { buttonVariants } from "@/components/ui/button";

type Props = {};

const ListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
    </div>
  );
};

const ResourceGroupsPage = (props: Props) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between py-8">
        <h2 className="text-4xl">Resource groups</h2>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/resource-groups/new"
        >
          Create
        </Link>
      </div>
      <Suspense fallback={<ListSkeleton />}>
        <ResourceGroupList />
      </Suspense>
    </div>
  );
};

export default ResourceGroupsPage;
