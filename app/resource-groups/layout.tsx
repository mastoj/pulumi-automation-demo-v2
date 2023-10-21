import { PropsWithChildren } from "react";
import ResourcesPage from "@/components/resources/resources-page";

const ResourceGroupsPage = ({ children }: PropsWithChildren) => {
  return (
    <ResourcesPage title="Resource groups" resourceType="resource-groups">
      {children}
    </ResourcesPage>
  );
};

export default ResourceGroupsPage;
