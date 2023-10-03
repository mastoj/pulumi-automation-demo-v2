"use client";
import NewRepository from "@/components/repositories/new-repository";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const NewRepositoryPage = (props: Props) => {
  const router = useRouter();
  return <NewRepository onOpenChange={() => router.push("/repositories")} />;
};

export default NewRepositoryPage;
