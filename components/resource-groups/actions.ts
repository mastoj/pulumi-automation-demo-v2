"use server";
import * as pulumi from "@pulumi/pulumi";
import {
  EngineEvent,
  InlineProgramArgs,
  LocalWorkspace,
  Stack,
} from "@pulumi/pulumi/automation";
import { NewResourceGroupType } from "./schema";

const createStack = async (data: NewResourceGroupType) => {
  return {
    resourceGroupName: data.resourceGroupName,
  };
};

const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

type Progress = {
  id: string;
  status: "in-progress" | "failed" | "success";
  output: string[];
  error?: string;
};

const processes: { [key: string]: Progress } = {};

const updateOutput = (id: string, output: any) => {
  console.log("==> updateOutput", id, output);
  if (processes[id]) {
    processes[id].output.push(output);
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
        console.log("==> Result: ", result);
        processes[id].status = "success";
      })
      .catch((err) => {
        console.log("==> Error: ", err);
        processes[id].status = "failed";
        processes[id].error = err;
      });
  } catch (e: any) {
    console.log("==> Error: ", e);
    processes[id].status = "failed";
    processes[id].error = e.toString();
  }
};

export const startCreateResourceGroup = async (
  data: NewResourceGroupType
): Promise<Progress> => {
  const id = generateId();
  const program = async () => {
    createStack(data);
  };
  const args: InlineProgramArgs = {
    program,
    stackName: `rg-${data.resourceGroupName}`,
    projectName: "resource-groups",
  };
  try {
    console.log("==> Creating stack: ", args);
    const stack = await LocalWorkspace.createOrSelectStack(args);
    console.log("==> Stack created: ", stack);
    startProvisioning(id, stack);
    processes[id] = {
      id,
      status: "in-progress",
      output: [],
    };
  } catch {
    processes[id] = {
      id,
      status: "failed",
      output: [],
      error: "Failed to create stack",
    };
  }

  // save data to server
  console.log(data);
  return processes[id];
};

export const checkForUpdates = async (id: string) => {
  return processes[id];
};
