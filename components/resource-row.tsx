import React, { PropsWithChildren } from "react";

type Props = {};

const ResourceRow = ({ children }: PropsWithChildren) => {
  return <div className="w-full border rounded px-4 py-2">{children}</div>;
};

export default ResourceRow;
