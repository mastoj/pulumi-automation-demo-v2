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
  console.log("Deleting repository: ", stackName);
  await removeStack("repositories", stackName);
  return NextResponse.json({});
};
