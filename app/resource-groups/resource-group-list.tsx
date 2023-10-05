import ResourceRow from "@/components/resource-row";
import { ResourceItem } from "@/lib/types";
import { LocalWorkspace } from "@pulumi/pulumi/automation";
import Link from "next/link";
import React from "react";
import { formatDistance } from "date-fns";
import { HiOutlineTrash } from "react-icons/hi";
import { createPulumiClient } from "@/lib/pulumi-client";
import { revalidatePath } from "next/cache";

type Props = {};

const ResourceGroupList = async (props: Props) => {
  const pulumiClient = await createPulumiClient("resource-groups");
  const stacks = await pulumiClient.getStacks();

  async function handleDelete(formData: FormData) {
    "use server";
    const pulumiClient = await createPulumiClient("resource-groups");
    const name = formData.get("name") as string;
    await pulumiClient.removeStack(name);
    revalidatePath("/resource-groups");
  }

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
              <form action={handleDelete}>
                <input type="hidden" name="name" value={stack.name} />
                <button type="submit">
                  <HiOutlineTrash className="h-8 w-8 text-red-500 cursor-pointer" />
                </button>
              </form>
            </div>
          </ResourceRow>
        </li>
      ))}
    </ul>
  );
};

export default ResourceGroupList;
