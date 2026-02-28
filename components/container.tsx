import React from "react";

export default function Container({ children }: React.PropsWithChildren) {
  return <div className="max-w-7xl mx-auto  relative">{children}</div>;
}
