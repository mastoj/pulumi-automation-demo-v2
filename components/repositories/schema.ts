import { z } from "zod";

export const newRepositorySchema = z.object({
  repositoryName: z.string().min(2).max(50),
  resourceGroupName: z.string().min(2).max(50),
});

export type NewRepositoryType = z.infer<typeof newRepositorySchema>;
