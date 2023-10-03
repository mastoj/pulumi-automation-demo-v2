"use client";
import NewRepository from "@/components/repositories/new-repository";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const CreateRepositoryModal = (props: Props) => {
  const router = useRouter();
  return <NewRepository onOpenChange={router.back} />;
};

export default CreateRepositoryModal;
