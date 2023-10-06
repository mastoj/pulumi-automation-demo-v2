"use server";

import { NewRepositoryType } from "./schema";

export const createRepository = async (data: NewRepositoryType) => {
  // Simulate long running process
  await new Promise((resolve) => setTimeout(resolve, 10000));
  // save data to server
  console.log(data);
  return {
    success: true,
  };
};
