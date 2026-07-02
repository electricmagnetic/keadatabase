import { type Metadata } from "next";
import { Step0Gate } from "./_components/Step0Gate";
import Page from "@/app/_components/ui/Page";

export const metadata: Metadata = {
  title: "Submit Survey | Kea Survey",
  description: "Submit your kea survey observations.",
};

export default function SubmitPage() {
  return (
    <Page.Container>
      <Page.Heading>Submit Survey</Page.Heading>
      <Step0Gate />
    </Page.Container>
  );
}
