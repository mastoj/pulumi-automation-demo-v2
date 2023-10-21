import Link from "next/link";
import React, { PropsWithChildren, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import ResourceList from "@/components/resources/resource-list";
import { ResourceType } from "@/lib/program-factory";

type ResourcesPageProps = {
  title: string;
  resourceType: ResourceType;
};

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

const ResourcesPage = ({
  children,
  title,
  resourceType,
}: PropsWithChildren<ResourcesPageProps>) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between py-8">
        <h2 className="text-4xl">{title}</h2>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`/${resourceType}/new`}
        >
          Create
        </Link>
      </div>
      <Suspense fallback={<ListSkeleton />}>
        <ResourceList resourceType={resourceType} />
      </Suspense>
      {children}
    </div>
  );
};

export default ResourcesPage;
