import ResourceRow from "@/components/resource-row";
import Link from "next/link";
import React from "react";
import { formatDistance } from "date-fns";
import { getStacks } from "@/lib/pulumi-client";
import DeleteForm from "@/components/delete-form";

type Props = {};

const ResourceGroupList = async (props: Props) => {
  const stacks = await getStacks("resource-groups");

  console.log(process.env.ARM_CLIENT_ID);
  console.log(process.env.ARM_CLIENT_SECRET);
  console.log(process.env.ARM_SUBSCRIPTION_ID);
  console.log(process.env.ARM_TENANT_ID);

  console.log(stacks);
  return (
    <ul className="flex flex-col gap-4">
      {stacks.map((stack) => (
        <li key={stack.name}>
          <ResourceRow>
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
          </ResourceRow>
        </li>
      ))}
    </ul>
  );
};

export default ResourceGroupList;
