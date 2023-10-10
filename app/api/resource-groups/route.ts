import { createResourceGroup } from "@/components/resource-groups/pulumiProgram";
import { newResourceGroupSchema } from "@/components/resource-groups/schema";
import { getStacks, startUp } from "@/lib/pulumi-client";
// import * as azure from "@pulumi/azure-native";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("HELLO");
  const stacks = await getStacks("resource-groups");
  // const azureProvider = new azure.Provider("azure", {
  //   clientId: process.env.ARM_CLIENT_ID,
  //   clientSecret: process.env.ARM_CLIENT_SECRET,
  //   subscriptionId: process.env.ARM_SUBSCRIPTION_ID,
  //   tenantId: process.env.ARM_TENANT_ID,
  // });
  // const formData = req.body;
  console.log("==> Stacks: ", stacks);
  return NextResponse.json(stacks);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const result = newResourceGroupSchema.safeParse(data);
  if (result.success) {
    console.log("==> Data: ", data);
    const progress = await startUp(
      "resource-groups",
      data.resourceGroupName,
      data
    );
    return NextResponse.json(progress);
  }
  return NextResponse.json(result.error);
};
