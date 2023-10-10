"use server";
import { EngineEvent, LocalWorkspace, Stack } from "@pulumi/pulumi/automation";
import { ResourceItem } from "./types";
import { createResourceGroup } from "@/components/resource-groups/pulumiProgram";
import { ResourceType, programFactory } from "./program-factory";

const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

const updateOutput = (id: string, output: any) => {
  console.log("==> updateOutput", id, output);
};

const progressLogger = () => {
  const id = generateId();
  return (message: any) => {
    console.log(`==> ${id} Progress : `, message);
  };
};

type ProvisionResult = { message: string } | { message: string; error: string };
export const startUp = async <TSpecification>(
  projectName: ResourceType,
  stackName: string,
  specification: TSpecification
): Promise<ProvisionResult> => {
  const logger = progressLogger();
  try {
    const program = programFactory<TSpecification>(projectName);
    const stack = await LocalWorkspace.createOrSelectStack({
      stackName,
      projectName,
      program: program(specification),
    });
    const upRes = await stack.up({
      onOutput: (str) => logger(str),
    });
    logger("UPRESULT: " + upRes);
  } catch (e: any) {
    logger("==> Error: " + e);
    return {
      message: "failed",
      error: "failed to create resource",
    };
  }
  return { message: "success" };
};

export const getStacks = async (
  projectName: ResourceType
): Promise<ResourceItem[]> => {
  const workspace = await LocalWorkspace.create({
    projectSettings: {
      name: projectName,
      runtime: "nodejs",
    },
  });

  const stacks: ResourceItem[] = await workspace.listStacks();
  return stacks;
};

export const removeStack = async (
  projectName: ResourceType,
  stackName: string
): Promise<void> => {
  const stack = await LocalWorkspace.selectStack({
    stackName,
    projectName,
    program: async () => {},
  });
  const ws = stack.workspace;
  await stack.destroy();
  await ws.removeStack(stackName);
};

export const getProgress = (progressId: ProgressId): Progress => {
  return progressLookup[progressId];
};
