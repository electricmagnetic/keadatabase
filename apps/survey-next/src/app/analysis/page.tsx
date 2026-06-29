import { type Metadata } from "next";

import Error from "@/app/_components/ui/Error";
import { getGridTileAnalyses } from "./actions";
import { AnalysisMapClient } from "./AnalysisMapClient";
import Page from "@/app/_components/ui/Page";

export const metadata: Metadata = {
  title: "Analysis | Kea Survey",
  description:
    "Survey data analysis showing grid tiles surveyed with and without kea observations.",
};

export default async function AnalysisPage() {
  // fetch grid tile analyses from API
  const analysesFetch = await getGridTileAnalyses();

  // handle errors
  if (!analysesFetch.success) {
    if (analysesFetch.errorType === "NOT_FOUND") {
      return (
        <Page.Container>
          <Page.Heading>Error</Page.Heading>
          <Page.Section>Analysis data not found</Page.Section>
        </Page.Container>
      );
    }
    return (
      <Page.Container>
        <Page.Heading>Error</Page.Heading>
        <Page.Section>Error fetching analysis</Page.Section>
      </Page.Container>
    );
  }

  const analyses = analysesFetch.data;

  return (
    <Page.Container>
      <Page.Heading
        className="sub-heading--sm"
        subheading={
          <>
            <p>
              Orange tiles: surveyed, kea observed. Darker orange denotes higher
              proportion of kea to hours surveyed.
              <br />
              Grey tiles: surveyed, kea not observed. Darker grey denotes
              greater than ten hours surveyed.
            </p>
          </>
        }
      >
        Analysis
      </Page.Heading>
      <section>
        {analyses.length > 0 ? (
          <AnalysisMapClient analyses={analyses} />
        ) : (
          <div>
            <div>No analysis data available yet.</div>
          </div>
        )}
      </section>
    </Page.Container>
  );
}
