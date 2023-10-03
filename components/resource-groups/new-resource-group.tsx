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
import { createResourceGroup } from "./actions";
import { NewResourceGroupType, newResourceGroupSchema } from "./schema";

type NewResourceGroupProps = {
  onOpenChange: (open: boolean) => void;
};

const NewResourceGroup = ({ onOpenChange }: NewResourceGroupProps) => {
  const form = useForm<NewResourceGroupType>({
    resolver: zodResolver(newResourceGroupSchema),
    defaultValues: {
      resourceGroupName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newResourceGroupSchema>) => {
    console.log(values);
    const result = await createResourceGroup(values);
    console.log("==> Created resource group: ", result);
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
