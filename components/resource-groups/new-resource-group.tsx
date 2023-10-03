"use client";
import React from "react";
import NewResourceModal from "../new-resource-modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { checkForUpdates, startCreateResourceGroup } from "./actions";
import { NewResourceGroupType, newResourceGroupSchema } from "./schema";
import { Label } from "../ui/label";
import ConsoleWindow from "../console-window/console-window";
import { useConsoleWindow } from "../console-window/console-window-provider";

type NewResourceGroupProps = {
  onOpenChange: (open: boolean) => void;
};

const NewResourceGroup = ({ onOpenChange }: NewResourceGroupProps) => {
  const consoleWindow = useConsoleWindow();
  const form = useForm<NewResourceGroupType>({
    resolver: zodResolver(newResourceGroupSchema),
    defaultValues: {
      resourceGroupName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newResourceGroupSchema>) => {
    consoleWindow.setLines([]);
    consoleWindow.toggleOpen(true);
    console.log(values);
    let result = await startCreateResourceGroup(values);
    while (result.status === "in-progress") {
      consoleWindow.setLines(result.output);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      result = await checkForUpdates(result.id);
    }

    if (result.status === "failed") {
      console.log("==> Failed to create resource group: ", result);
      return;
    }
    form.reset();
    onOpenChange(false);
  };

  return (
    <NewResourceModal
      title="Create resource group"
      description="Create a new resource group to get started with your project."
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="resourceGroupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource group</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. my-awesome-rg"
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the name of your resource group. It must be globally
                    unique.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton isLoading={form.formState.isSubmitting} />
          </div>
        </form>
      </Form>
    </NewResourceModal>
  );
};

export default NewResourceGroup;
