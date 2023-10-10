import { removeStack } from "@/lib/pulumi-client";
import { NextRequest, NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({});
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { stackName: string } }
) => {
  const { stackName } = params;
  console.log("Deleting rg: ", stackName);
  await removeStack("resource-groups", stackName);
  return NextResponse.json({});
};
