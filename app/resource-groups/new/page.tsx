"use client";
import NewResourceGroup from "@/components/new-resource-group";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const NewResourceGroupPage = (props: Props) => {
  const router = useRouter();
  return (
    <NewResourceGroup onOpenChange={() => router.push("/resource-groups")} />
  );
};

export default NewResourceGroupPage;
