"use client";
import ResourceRow from "@/components/resource-row";
import Link from "next/link";
import React from "react";
import { formatDistance } from "date-fns";
import { getStacks } from "@/lib/pulumi-client";
import DeleteForm from "@/components/delete-form";
import useSWR from "swr";
import { ResourceItem } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

const ResourceGroupList = (props: Props) => {
  const {
    data: stacks,
    error,
    isLoading,
  } = useSWR<ResourceItem[]>("/api/resource-groups", fetcher);

  console.log(stacks);
  if (isLoading && !stacks) {
    return <ListSkeleton />;
  }
  return stacks && stacks.length > 0 ? (
    <ul className="flex flex-col gap-4">
      {stacks.map((stack) => (
        <li key={stack.name}>
          <ResourceRow stack={stack} />
        </li>
      ))}
    </ul>
  ) : (
    <div>No stacks</div>
  );
};

export default ResourceGroupList;
