"use server";
import { NewResourceGroupType } from "./schema";

export const createResourceGroup = (data: NewResourceGroupType) => async () => {
  return {
    resourceGroupName: data.resourceGroupName,
  };
};
