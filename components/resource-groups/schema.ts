import { z } from "zod";

export const newResourceGroupSchema = z.object({
  resourceGroupName: z
    .string()
    .min(2)
    .max(50)
    .refine((value) => {
      return /^[a-z0-9-]*$/.test(value);
    }, "Resource group name can only contain lowercase letters, numbers, and dashes."),
});

export type NewResourceGroupType = z.infer<typeof newResourceGroupSchema>;
