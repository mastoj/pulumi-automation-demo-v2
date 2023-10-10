import { getProgress } from "@/lib/pulumi-client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { progressId: string } }
) => {
  const { progressId } = params;
  const progress = getProgress(progressId);
  return NextResponse.json(progress);
};
