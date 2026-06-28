import { type Metadata } from "next";

import { AccountView } from "@/app/_components/auth/AccountView";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Your account",
};

export default function AccountPage() {
  return <AccountView />;
}
