import { createRepository } from "@/components/repositories/actions";
import { createResourceGroup } from "@/components/resource-groups/pulumiProgram";

const programLookup = {
  "resource-groups": () => createResourceGroup,
  repositories: () => createRepository,
};

export type ResourceType = keyof typeof programLookup;

type ProgramFactory<TSpecification> = (
  specification: TSpecification
) => () => Promise<Record<string, any> | void>;

export const programFactory = <TSpecification>(resourceType: ResourceType) => {
  return programLookup[resourceType]() as ProgramFactory<TSpecification>;
};
