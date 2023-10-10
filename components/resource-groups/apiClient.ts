import { Progress } from "@/lib/pulumi-client";
import { NewResourceGroupType } from "./schema";

export const createResourceGroup = async (
  newResourceGroup: NewResourceGroupType
) => {
  const result = await fetch("/api/resource-groups", {
    method: "POST",
    body: JSON.stringify(newResourceGroup),
  });
  if (result.ok) {
    return (await result.json()) as Progress;
  }
  return { error: "Failed to create resource group" };
};

export const getProgress = async (progressId: string) => {
  const result = await fetch(`/api/resource-groups/progress/${progressId}`);
  if (result.ok) {
    return (await result.json()) as Progress;
  }
  return { error: "Failed to get progress" };
};
