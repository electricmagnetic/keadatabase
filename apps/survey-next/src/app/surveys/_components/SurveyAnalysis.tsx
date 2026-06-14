import { getSurveyAnalysis } from "../actions";
import Error from "@/app/_components/ui/Error";

interface SurveyAnalysisProps {
  id: number;
}

function calculateEncounterRate(surveyAnalysis: {
  hours_total: { with_kea: number; surveyed: number };
}): number {
  return Math.round(
    (surveyAnalysis.hours_total.with_kea /
      surveyAnalysis.hours_total.surveyed) *
      100,
  );
}

export async function SurveyAnalysis({ id }: SurveyAnalysisProps) {
  const analysisFetch = await getSurveyAnalysis(id);

  if (!analysisFetch.success) {
    return <Error message="Error fetching survey analysis" />;
  }

  const surveyAnalysis = analysisFetch.data;
  const encounterRate = calculateEncounterRate(surveyAnalysis);

  return (
    <div>
      <dl className="survey-details">
        <div>
          <dt>Hours with kea</dt>
          <dd>{surveyAnalysis.hours_total.with_kea}</dd>
        </div>
        <div>
          <dt>Hours surveyed</dt>
          <dd>{surveyAnalysis.hours_total.surveyed}</dd>
        </div>
        <div>
          <dt>Encounter rate</dt>
          <dd>{encounterRate}%</dd>
        </div>
      </dl>
    </div>
  );
}
