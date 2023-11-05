"use server";
import {
  ComponentResource,
  Output,
  ResourceOptions,
  output,
  secret,
} from "@pulumi/pulumi";
import { NewResourceGroupType } from "./schema";
import * as azure from "@pulumi/azure-native";
import * as azuread from "@pulumi/azuread";
import { RandomUuid } from "@pulumi/random";

type DemoResourceGroupArgs = {
  resourceGroupName: string;
  subscriptionId: string;
  tenantId: string;
};

type DemoResourceGroupOptions = ResourceOptions & {
  azureAdProvider: azuread.Provider;
  azureProvider: azure.Provider;
};

class DemoResourceGroup extends ComponentResource {
  resourceGroupName: Output<string>;
  clientId: Output<string>;
  clientSecret: Output<string>;
  tenantId: Output<string>;
  subscriptionId: Output<string>;

  constructor(
    name: string,
    args: DemoResourceGroupArgs,
    opts: DemoResourceGroupOptions
  ) {
    super("oredev:demo-resource-group", name, args, {});
    const { resourceGroupName, subscriptionId, tenantId } = args;
    const azureOptions = {
      ...opts,
      provider: opts.azureProvider,
      parent: this,
    };
    const azureAdOptions = {
      ...opts,
      provider: opts.azureAdProvider,
      parent: this,
    };

    const resourceGroup = new azure.resources.ResourceGroup(
      args.resourceGroupName,
      {
        resourceGroupName: resourceGroupName,
        location: "westeurope",
      },
      azureOptions
    );

    const adApp = new azuread.Application(
      "app",
      {
        displayName: resourceGroup.name,
      },
      azureAdOptions
    );
    const adSp = new azuread.ServicePrincipal(
      "sp",
      {
        applicationId: adApp.applicationId,
      },
      azureAdOptions
    );
    const adSpPassword = new azuread.ServicePrincipalPassword(
      "spPassword",
      {
        servicePrincipalId: adSp.id,
      },
      azureAdOptions
    );
    const resourceGroupNameUrn = resourceGroup.name.apply((name) => {
      return `/subscriptions/${subscriptionId}/resourcegroups/${name}`;
    });
    const contributorRoleDefinitionId = `/subscriptions/${subscriptionId}/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c`;
    const spRoleAssignmentId = new RandomUuid("spRoleAssignmentId", undefined);
    const spRoleAssignment = new azure.authorization.RoleAssignment(
      "spRoleAssignment",
      {
        principalType: "ServicePrincipal",
        roleAssignmentName: spRoleAssignmentId.result,
        principalId: adSp.id,
        roleDefinitionId: contributorRoleDefinitionId,
        scope: resourceGroupNameUrn,
      },
      { ...azureOptions, dependsOn: [adSp] }
    );

    this.resourceGroupName = resourceGroup.name;
    this.clientId = adApp.applicationId;
    this.clientSecret = secret(adSpPassword.value);
    this.tenantId = output(tenantId);
    this.subscriptionId = output(subscriptionId);
  }
}

export const createResourceGroup = (data: NewResourceGroupType) => async () => {
  const subscriptionId = process.env.ARM_SUBSCRIPTION_ID!;
  const tenantId = process.env.ARM_TENANT_ID!;
  const azureProvider = new azure.Provider("azure", {
    clientId: process.env.ARM_CLIENT_ID,
    clientSecret: process.env.ARM_CLIENT_SECRET,
    subscriptionId: subscriptionId,
    tenantId: process.env.ARM_TENANT_ID,
  });
  const azureAdProvider = new azuread.Provider("azuread", {
    metadataHost: "",
    clientId: process.env.ARM_CLIENT_ID,
    clientSecret: process.env.ARM_CLIENT_SECRET,
    tenantId: process.env.ARM_TENANT_ID,
  });
  const options = {
    azureProvider: azureProvider,
    azureAdProvider: azureAdProvider,
  };
  const rg = new DemoResourceGroup(
    "demo",
    { resourceGroupName: data.resourceGroupName, subscriptionId, tenantId },
    options
  );

  return {
    resourceGroupName: rg.resourceGroupName,
    clientId: rg.clientId,
    clientSecret: rg.clientSecret,
    tenantId: rg.tenantId,
    subscriptionId: rg.subscriptionId,
  };
};
