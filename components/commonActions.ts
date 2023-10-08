"use server";

import { ResourceType } from "@/lib/program-factory";
import { removeStack } from "@/lib/pulumi-client";
import { revalidatePath } from "next/cache";

export const deleteResource = async (formData: FormData) => {
  const stackName = formData.get("stackName")! as string;
  const project = formData.get("project") as ResourceType;
  const url = formData.get("url");
  console.log("Deleting resource", project, stackName, url);
  try {
    await removeStack(project, stackName);
    revalidatePath("/" + url);
    return { message: `Deleted resource ${project}/${stackName}` };
  } catch (e) {
    return { message: "Failed to delete resource" };
  }
};
