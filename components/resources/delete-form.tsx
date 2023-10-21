"use client";
import { ResourceType } from "@/lib/program-factory";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { useSWRConfig } from "swr";

type Props = {
  stackName: string;
  project: ResourceType;
  url: string;
};

const DeleteButton = ({ pending }: { pending: boolean }) => {
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
  const [pending, setPending] = useState(false);
  const { mutate } = useSWRConfig();

  const deleteResource = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const deleteResponse = await fetch(`/api/${project}/${stackName}`, {
      method: "DELETE",
    });
    if (deleteResponse.ok) {
      mutate("/api/" + project);
    }
  };
  return (
    <form onSubmit={deleteResource}>
      <DeleteButton pending={pending} />
    </form>
  );
};

export default DeleteForm;
