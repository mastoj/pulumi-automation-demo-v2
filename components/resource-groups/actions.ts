"use server";

import { NewResourceGroupType } from "./schema";

export const createResourceGroup = async (data: NewResourceGroupType) => {
  // Simulate long running process
  await new Promise((resolve) => setTimeout(resolve, 10000));
  // save data to server
  console.log(data);
  return {
    success: true,
  };
};
