import { NewRepositoryType } from "./schema";

export const createRepository = async (newRepository: NewRepositoryType) => {
  const result = await fetch("/api/repositories", {
    method: "POST",
    body: JSON.stringify(newRepository),
  });
  if (result.ok) {
    return await result.json();
  }
  return { error: "Failed to create repository" };
};
