"use server";
import { EngineEvent, LocalWorkspace, Stack } from "@pulumi/pulumi/automation";
import { ResourceItem } from "./types";
import { createResourceGroup } from "@/components/resource-groups/pulumiProgram";
import { ResourceType, programFactory } from "./program-factory";

export type Progress = {
  id: string;
  status: "in-progress" | "failed" | "success";
  output: string[];
  error?: {
    message?: string;
    stack?: string;
  };
};

type ProgressId = string;

export type PulumiClient = {
  workspace: LocalWorkspace;
  projectName: String;
  //  programFactory: ProgramFactory<TSpecification>;
  getStacks: () => Promise<ResourceItem[]>;
  removeStack: (stackName: string) => Promise<void>;
  // startUp: (
  //   stackName: string,
  //   specification: TSpecification
  // ) => Promise<Progress>;
  getProgress: (progressId: ProgressId) => Progress;
};

const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

const progressLookup: { [key: string]: Progress } = {};

const updateOutput = (id: string, output: any) => {
  console.log("==> updateOutput", id, output);
  if (progressLookup[id]) {
    progressLookup[id].output.push(output);
  }
};

const updateProcess = (id: string, event: EngineEvent) => {
  console.log("==> Event: ", event);
};

const startProvisioning = (id: string, stack: Stack) => {
  try {
    const upRes = stack
      .up({
        onOutput: (str) => updateOutput(id, str),
        onEvent: (e) => updateProcess(id, e),
      })
      .then((result) => {
        progressLookup[id].status = "success";
      })
      .catch((err) => {
        console.log("==> Error: ", err);
        progressLookup[id].status = "failed";
        progressLookup[id].error = {
          message: err?.message,
          stack: err?.stack,
        };
      });
    console.log("==> Up started: ", id);
  } catch (e: any) {
    console.log("==> Error: ", e);
    progressLookup[id].status = "failed";
    progressLookup[id].error = e.toString();
  }
};

export const startUp = async <TSpecification>(
  projectName: ResourceType,
  stackName: string,
  specification: TSpecification
): Promise<Progress> => {
  const id = generateId();
  try {
    const program = programFactory<TSpecification>(projectName);
    const stack = await LocalWorkspace.createOrSelectStack({
      stackName,
      projectName,
      program: program(specification),
    });
    startProvisioning(id, stack);
    progressLookup[id] = {
      id,
      status: "in-progress",
      output: [],
    };
  } catch {
    progressLookup[id] = {
      id,
      status: "failed",
      output: [],
      error: {
        message: "Failed to start up",
      },
    };
  }
  return progressLookup[id];
};

const getStacks = (ws: LocalWorkspace) => async (): Promise<ResourceItem[]> => {
  const stacks: ResourceItem[] = await ws.listStacks();
  return stacks;
};

const removeStack =
  (projectName: ResourceType) =>
  async (stackName: string): Promise<void> => {
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

export const createPulumiClient = async (
  projectName: ResourceType
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
    removeStack: removeStack(projectName),
    //startUp: startUp(projectName, programFactory),
    getProgress,
  };
};
