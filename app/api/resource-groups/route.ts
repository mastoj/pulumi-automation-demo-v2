import { createResourceGroup } from "@/components/resource-groups/pulumiProgram";
import { newResourceGroupSchema } from "@/components/resource-groups/schema";
import { getStacks, startUp } from "@/lib/pulumi-client";
// import * as azure from "@pulumi/azure-native";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const stacks = await getStacks("resource-groups");
  return NextResponse.json(stacks);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const result = newResourceGroupSchema.safeParse(data);
  if (result.success) {
    const progress = await startUp(
      "resource-groups",
      data.resourceGroupName,
      data
    );
    return NextResponse.json(progress);
  }
  return NextResponse.json(result.error);
};
