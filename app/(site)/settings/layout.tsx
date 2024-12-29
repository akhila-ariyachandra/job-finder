import { SITE_TITLE } from "@/lib/constants";
import type { Metadata } from "next";
import { type ReactNode } from "react";
import SettingsLayoutWrapper from "./settings-layout-wrapper";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | Settings | ${SITE_TITLE}`,
  },
};

const AccountLayout = ({ children }: { children: ReactNode }) => {
  return <SettingsLayoutWrapper>{children}</SettingsLayoutWrapper>;
};

export default AccountLayout;
