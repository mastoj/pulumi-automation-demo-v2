import React from "react";
import { Input } from "./ui/input";
import NewResourceModal from "./new-resource-modal";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "./SubmitButton";

const newRepositorySchema = z.object({
  repositoryName: z.string().min(2).max(50),
});

type NewRepositoryProps = {
  onOpenChange: (open: boolean) => void;
};

const NewRepository = ({ onOpenChange }: NewRepositoryProps) => {
  const form = useForm<z.infer<typeof newRepositorySchema>>({
    resolver: zodResolver(newRepositorySchema),
    defaultValues: {
      repositoryName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newRepositorySchema>) => {
    console.log("==> Creating repository: ", values);
    // Sleep for 10 seconds to simulate a long-running operation.
    await new Promise((resolve) => setTimeout(resolve, 10000));
    form.reset();
    onOpenChange(false);
  };

  return (
    <NewResourceModal
      title="Create repository"
      description="Create a new repository to get started with your project."
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="repositoryName"
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

export default NewRepository;
