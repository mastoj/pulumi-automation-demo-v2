import { PropsWithChildren } from "react";
import ResourcesPage from "@/components/resources-page";

const ResourceGroupsPage = ({ children }: PropsWithChildren) => {
  return (
    <ResourcesPage title="Repositories" resourceType="repositories">
      {children}
    </ResourcesPage>
  );
};

export default ResourceGroupsPage;
