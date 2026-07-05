import { type Metadata } from "next";

import { AccountDetailsView } from "@/app/_components/auth/AccountDetailsView";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Edit details",
};

export default function AccountDetailsPage() {
  return <AccountDetailsView />;
}
