import React from "react";
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
import useSWR from "swr";
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

type NewRepositoryProps = {
  onOpenChange: (open: boolean) => void;
};

const NewRepository = ({ onOpenChange }: NewRepositoryProps) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof newRepositorySchema>>({
    resolver: zodResolver(newRepositorySchema),
    defaultValues: {
      resourceGroupName: "",
      repositoryName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newRepositorySchema>) => {
    form.reset();
    onOpenChange(false);
  };
  const { isLoading, data: resourceGroups } = useSWR<ResourceItem[]>(
    "/api/resource-groups",
    fetcher
  );

  const resourceGroupOptions =
    resourceGroups?.map((rg) => ({
      label: rg.name!,
      value: rg.name!,
    })) ?? [];
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
                    <FormLabel>Resource group</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg. my-awesome-rg"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the name of your resource group. It must be
                      globally unique.
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
                    <Popover>
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
                          >
                            {field.value
                              ? resourceGroupOptions.find(
                                  (option) => option.value === field.value
                                )?.label
                              : "Select resource group"}
                            <HiChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="min-w-[200px] p-0"
                        style={{
                          width: buttonRef.current
                            ? `${buttonRef.current?.clientWidth}px`
                            : "auto",
                        }}
                      >
                        <Command>
                          <CommandInput
                            placeholder="Search resource groups..."
                            className="h-9"
                          />
                          <CommandEmpty>No resource groups found.</CommandEmpty>
                          <CommandGroup>
                            {resourceGroupOptions.map((option) => (
                              <CommandItem
                                value={option.label}
                                key={option.value}
                                onSelect={() => {
                                  console.log("HEEELLLLO");
                                  console.log("==> Selected: ", option);
                                  form.setValue(
                                    "resourceGroupName",
                                    option.value
                                  );
                                }}
                              >
                                {option.label}
                                <HiCheck
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    option.value === field.value
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
                      repository.
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
