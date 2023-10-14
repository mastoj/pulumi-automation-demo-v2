import React, { useMemo } from "react";
import { Input } from "../ui/input";
import NewResourceModal from "../new-resource-modal";
import * as z from "zod";
import { HiChevronUpDown, HiCheck } from "react-icons/hi2";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../SubmitButton";
import { newRepositorySchema } from "./schema";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/lib/swr-helpers";
import Spinner from "../spinner";
import { ResourceItem } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { createRepository } from "./apiClient";

type NewRepositoryProps = {
  onOpenChange: (open: boolean) => void;
};

const NewRepository = ({ onOpenChange }: NewRepositoryProps) => {
  const { mutate } = useSWRConfig();
  const [resourceGroupOpen, setResourceGroupOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof newRepositorySchema>>({
    resolver: zodResolver(newRepositorySchema),
    defaultValues: {
      resourceGroupName: "",
      repositoryName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newRepositorySchema>) => {
    console.log("==> Create repo: ", values);
    const createResult = await createRepository(values);
    console.log("==> Create result: ", createResult);
    if (createResult.error) {
      console.log("==> Failed to create resource group: ", createResult);
      return;
    }

    form.reset();
    mutate("/api/repositories");
    onOpenChange(false);

    form.reset();
    onOpenChange(false);
  };
  const { isLoading, data: resourceGroups } = useSWR<ResourceItem[]>(
    "/api/resource-groups",
    fetcher
  );

  const resourceGroupOptions = useMemo(
    () =>
      resourceGroups?.map((rg) => ({
        label: rg.name!,
        value: rg.name!,
      })) ?? [],
    [resourceGroups]
  );
  return (
    <NewResourceModal
      title="Create repository"
      description="Create a new repository to get started with your project."
      onOpenChange={onOpenChange}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="repositoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg. my-awesome-repo"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the name of your repository. It must be unique in
                      the organization.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resourceGroupName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Resource group</FormLabel>
                    <Popover
                      open={resourceGroupOpen}
                      onOpenChange={setResourceGroupOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            ref={buttonRef}
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={form.formState.isSubmitting}
                          >
                            {field.value
                              ? resourceGroupOptions.find(
                                  (resourceGroup) =>
                                    resourceGroup.value === field.value
                                )?.label
                              : "Select resource group"}
                            <HiChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="min-w-[200px] p-0"
                        style={{ width: buttonRef.current?.clientWidth + "px" }}
                      >
                        <Command>
                          <CommandInput
                            placeholder="Search resource group..."
                            className="h-9"
                          />
                          <CommandEmpty>No resource group found.</CommandEmpty>
                          <CommandGroup>
                            {resourceGroupOptions.map((resourceGroup) => (
                              <CommandItem
                                value={resourceGroup.label}
                                key={resourceGroup.value}
                                onChange={() => {
                                  alert("CHANGED: " + resourceGroup.value);
                                }}
                                onSelect={() => {
                                  form.setValue(
                                    "resourceGroupName",
                                    resourceGroup.value
                                  );
                                  setResourceGroupOpen(false);
                                }}
                              >
                                {resourceGroup.label}
                                <HiCheck
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    resourceGroup.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the resource group that will be connected to the
                      repo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton isLoading={form.formState.isSubmitting} />
            </div>
          </form>
        </Form>
      )}
    </NewResourceModal>
  );
};

export default NewRepository;
