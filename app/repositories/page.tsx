import Link from "next/link";
import React from "react";

type Props = {};

const RepositoriesPage = (props: Props) => {
  return (
    <div>
      <Link href="/repositories/new">Create</Link>
    </div>
  );
};

export default RepositoriesPage;
