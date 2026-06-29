import { type Metadata } from "next";

import { ChangePasswordView } from "@/app/_components/auth/ChangePasswordView";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Change password",
};

export default function ChangePasswordPage() {
  return <ChangePasswordView />;
}
