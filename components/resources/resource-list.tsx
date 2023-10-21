"use client";
import ResourceRow from "@/components/resources/resource-row";
import React from "react";
import useSWR from "swr";
import { ResourceItem } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ResourceType } from "@/lib/program-factory";
import { fetcher } from "@/lib/swr-helpers";

type ResourceListProps = {
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

const ResourceGroupList = ({ resourceType }: ResourceListProps) => {
  const {
    data: stacks,
    error,
    isLoading,
  } = useSWR<ResourceItem[]>(`/api/${resourceType}`, fetcher);

  console.log(stacks);
  if (isLoading && !stacks) {
    return <ListSkeleton />;
  }
  return stacks && stacks.length > 0 ? (
    <ul className="flex flex-col gap-4">
      {stacks.map((stack) => (
        <li key={stack.name}>
          <ResourceRow stack={stack} resourceType={resourceType} />
        </li>
      ))}
    </ul>
  ) : (
    <div>No stacks</div>
  );
};

export default ResourceGroupList;
