"use client";
import NewRepository from "@/components/repositories/new-repository";
import NewResourceGroup from "@/components/resource-groups/new-resource-group";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const CreateResourceGroupModal = (props: Props) => {
  const router = useRouter();
  return <NewResourceGroup onOpenChange={router.back} />;
};

export default CreateResourceGroupModal;
