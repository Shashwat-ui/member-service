import type { Metadata } from "next";
import { AuthGate } from "../_components/AuthGate";

export const metadata: Metadata = {
  title: "Member Service Portal — Upload",
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGate>{children}</AuthGate>;
}
