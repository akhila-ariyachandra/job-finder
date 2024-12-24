import Header from "@/components/header";
import type { ReactNode } from "react";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />

      <main>{children}</main>
    </>
  );
};

export default SiteLayout;
