import Header from "@/components/header";
import type { ReactNode } from "react";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      {children}
    </>
  );
};

export default SiteLayout;
