import { type Metadata } from "next";
import { Step1Form } from "./_components/Step1Form";
import Page from "@/app/_components/ui/Page";

export const metadata: Metadata = {
  title: "Submit Survey | Kea Survey",
  description: "Submit your kea survey observations.",
};

export default function SubmitPage() {
  return (
    <Page.Container>
      <Page.Heading>Submit Survey</Page.Heading>
      <Step1Form />
    </Page.Container>
  );
}
