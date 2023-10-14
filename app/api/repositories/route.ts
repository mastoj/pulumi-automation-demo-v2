import { newRepositorySchema } from "@/components/repositories/schema";
import { getStacks, startUp } from "@/lib/pulumi-client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const stacks = await getStacks("repositories");
  return NextResponse.json(stacks);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const result = newRepositorySchema.safeParse(data);
  if (result.success) {
    const safeData = result.data;
    const progress = await startUp(
      "repositories",
      safeData.repositoryName,
      data
    );
    return NextResponse.json(progress);
  }
  return NextResponse.json(result.error);
};
