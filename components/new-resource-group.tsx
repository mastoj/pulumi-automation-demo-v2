import React from "react";
import NewResourceModal from "./new-resource-modal";
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
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import SubmitButton from "./SubmitButton";

const newResourceGroupSchema = z.object({
  resourceGroupName: z
    .string()
    .min(2)
    .max(50)
    .refine((value) => {
      return /^[a-z0-9-]*$/.test(value);
    }, "Resource group name can only contain lowercase letters, numbers, and dashes."),
});

type NewResourceGroupProps = {
  onOpenChange: (open: boolean) => void;
};

const NewResourceGroup = ({ onOpenChange }: NewResourceGroupProps) => {
  const form = useForm<z.infer<typeof newResourceGroupSchema>>({
    resolver: zodResolver(newResourceGroupSchema),
    defaultValues: {
      resourceGroupName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newResourceGroupSchema>) => {
    console.log(values);
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
