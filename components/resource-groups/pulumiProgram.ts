"use server";
import { NewResourceGroupType } from "./schema";
import * as azure from "@pulumi/azure-native";

export const createResourceGroup = (data: NewResourceGroupType) => async () => {
  // Create resource group using azure-native
  // const rg = new azure.
  // const azureProvider = new azure.Provider("azure", {
  //   clientId: process.env.ARM_CLIENT_ID,
  //   clientSecret: process.env.ARM_CLIENT_SECRET,
  //   subscriptionId: process.env.ARM_SUBSCRIPTION_ID,
  //   tenantId: process.env.ARM_TENANT_ID,
  // });
  // const options = { provider: azureProvider };
  // const resourceGroup = new azure.resources.ResourceGroup(
  //   data.resourceGroupName,
  //   {
  //     resourceGroupName: data.resourceGroupName,
  //     location: "westeurope",
  //   },
  //   options
  // );

  return {
    resourceGroupName: "", //resourceGroup.name,
  };
};
