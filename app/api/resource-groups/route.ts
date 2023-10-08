import { getStacks } from "@/lib/pulumi-client";
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
