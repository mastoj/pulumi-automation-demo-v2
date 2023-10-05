import { LocalWorkspace } from "@pulumi/pulumi/automation";
import { ResourceItem } from "./types";

export type PulumiClient = {
  workspace: LocalWorkspace;
  projectName: String;
  getStacks: () => Promise<ResourceItem[]>;
  removeStack: (stackName: string) => Promise<void>;
};

const getStacks = (ws: LocalWorkspace) => async (): Promise<ResourceItem[]> => {
  const stacks: ResourceItem[] = await ws.listStacks();
  return stacks;
};

const removeStack =
  (ws: LocalWorkspace, projectName: string) =>
  async (stackName: string): Promise<void> => {
    const stack = await LocalWorkspace.selectStack({
      stackName,
      projectName,
      program: async () => {},
    });
    await stack.destroy();
    await ws.removeStack(stackName);
  };

type resourceType = "resource-groups" | "repositories";
export const createPulumiClient = async (
  projectName: resourceType
): Promise<PulumiClient> => {
  const workspace = await LocalWorkspace.create({
    projectSettings: {
      name: projectName,
      runtime: "nodejs",
    },
  });
  return {
    workspace,
    projectName,
    getStacks: getStacks(workspace),
    removeStack: removeStack(workspace, projectName),
  };
};
