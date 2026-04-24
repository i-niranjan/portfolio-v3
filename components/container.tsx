import React from "react";

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-0">
      {children}
    </div>
  );
}
