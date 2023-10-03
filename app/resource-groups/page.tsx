import Link from "next/link";
import React from "react";

type Props = {};

const ResourceGroupsPage = (props: Props) => {
  return (
    <div>
      ResourceGroupsPage
      <Link href="/resource-groups/new">Create</Link>
    </div>
  );
};

export default ResourceGroupsPage;
