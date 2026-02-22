import type { Metadata } from "next";
import { AuthGate } from "../_components/AuthGate";

export const metadata: Metadata = {
  title: "Member Service Portal — Home",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <AuthGate>{children}</AuthGate>;
}
