"use server";
import {
  ComponentResource,
  Input,
  ResourceOptions,
  StackReference,
} from "@pulumi/pulumi";
import { NewRepositoryType } from "./schema";
import * as github from "@pulumi/github";
import * as pulumi from "@pulumi/pulumi";

type DemoRepositoryArgs = {
  repositoryName: string;
  resourceGroupName: string;
  resourceGroupSettings: Input<{
    clientId: string;
    clientSecret: string;
    subscriptionId: string;
    tenantId: string;
  }>;
};

type DemoRepositoryOptions = ResourceOptions & {
  githubProvider: github.Provider;
};

class DemoRepository extends ComponentResource {
  constructor(
    name: string,
    args: DemoRepositoryArgs,
    opts: DemoRepositoryOptions
  ) {
    super("oredev:demo-repository", name, args, {});
    const { resourceGroupName, repositoryName, resourceGroupSettings } = args;
    const options = { provider: opts.githubProvider, parent: this };
    const repository = new github.Repository(
      repositoryName,
      {
        name: repositoryName,
        visibility: "public",
      },
      options
    );

    const secretString = pulumi.output(resourceGroupSettings).apply((rgs) => {
      const secretJson = {
        clientId: rgs.clientId,
        clientSecret: rgs.clientSecret,
        resourceGroupName: resourceGroupName,
        subscriptionId: rgs.subscriptionId,
        tenantId: rgs.tenantId,
      };
      return JSON.stringify(secretJson);
    });

    const createSecretName = (name: string) =>
      name.toUpperCase().replace(/-/g, "_");
    const secretName = createSecretName(
      `RG_${resourceGroupName.toUpperCase()}`
    );

    const resourceGroupSecret = new github.ActionsSecret(
      `${resourceGroupName}-action-secret`,
      {
        secretName: secretName,
        plaintextValue: secretString,
        repository: repository.name,
      },
      { ...options, deleteBeforeReplace: true }
    );
  }
}

export const createRepository = (data: NewRepositoryType) => async () => {
  const { resourceGroupName, repositoryName } = data;
  const githubToken = process.env.GITHUB_TOKEN!;
  const githubProvider = new github.Provider("github", {
    token: githubToken,
    owner: "mastoj",
  });
  const options = {
    githubProvider,
  };

  const resourceGroupStackRef = new StackReference(
    `tomasja/resource-groups/${resourceGroupName}`
  );
  const clientId = await resourceGroupStackRef.requireOutput("clientId");
  const clientSecret = await resourceGroupStackRef.requireOutput(
    "clientSecret"
  );
  const subscriptionId = await resourceGroupStackRef.requireOutput(
    "subscriptionId"
  );
  const tenantId = await resourceGroupStackRef.requireOutput("tenantId");

  const resourceGroupSettings = pulumi
    .all([clientId, clientSecret, subscriptionId, tenantId])
    .apply(([clientId, clientSecret, subscriptionId, tenantId]: string[]) => ({
      clientId,
      clientSecret,
      subscriptionId,
      tenantId,
    }));
  const rg = new DemoRepository(
    "demo",
    {
      resourceGroupName: resourceGroupName,
      repositoryName: repositoryName,
      resourceGroupSettings: resourceGroupSettings,
    },
    options
  );

  return {};
};
