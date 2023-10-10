"use client";
import { ResourceItem } from "@/lib/types";
import { formatDistance } from "date-fns";
import Link from "next/link";
import DeleteForm from "./delete-form";

type ResourceRowProps = {
  stack: ResourceItem;
};

const ResourceRow = ({ stack }: ResourceRowProps) => {
  return (
    <div className="w-full border rounded px-4 py-2 hover:bg-secondary hover:text-secondary-foreground">
      <div className="flex flew-row items-center gap-4">
        <Link
          href={stack.url || "#"}
          target="_blank"
          className="flex-1 grid grid-cols-2 gap-2 grid-rows-2 items-center justify-between"
        >
          <span>{stack.name}</span>
          <span className="flex justify-end">
            Resources: {stack.resourceCount}
          </span>
          <span>
            {stack.lastUpdate &&
              formatDistance(new Date(stack.lastUpdate), new Date(), {
                addSuffix: true,
              })}
          </span>
        </Link>
        <DeleteForm
          stackName={stack.name!}
          project="resource-groups"
          url="resource-groups"
        />
      </div>
    </div>
  );
};

export default ResourceRow;
