"use client";
/// <reference types="react-dom/experimental" />
import { ResourceType } from "@/lib/program-factory";
import { cn } from "@/lib/utils";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { deleteResource } from "./commonActions";

const initialState = {
  message: null,
};

type Props = {
  stackName: string;
  project: ResourceType;
  url: string;
};

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={cn(
        "h-8 w-8 text-red-500 cursor-pointer",
        pending ? "animate-spin" : ""
      )}
      disabled={pending}
    >
      <HiOutlineTrash />
    </button>
  );
};

const DeleteForm = ({ stackName, project, url }: Props) => {
  return (
    <form action={deleteResource}>
      <input type="hidden" name="stackName" value={stackName} />
      <input type="hidden" name="project" value={project} />
      <input type="hidden" name="url" value={url} />
      <DeleteButton />
    </form>
  );
};

export default DeleteForm;
