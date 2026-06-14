import Link from "next/link";
import DateTime from "shared/ui/DateTime";

interface SurveyHourData {
  id: number;
  hour: number;
  kea: boolean;
  activity: string;
  get_hour_display: string;
  get_activity_display: string;
  survey: number;
  survey__date: string;
  grid_tile: string | null;
}

interface SurveyHourItemProps {
  surveyHour: SurveyHourData;
  swapGridTileSurvey?: boolean;
}

/**
 * Activity icon mapper
 */
function ActivityIcon({ activity }: { activity: string }) {
  const icon = (() => {
    switch (activity) {
      case "W":
        return "walking";
      case "S":
        return "street-view";
      case "C":
        return "campground";
      case "H":
        return "home";
      case "X":
        return "ban";
      default:
        return "question-circle";
    }
  })();

  return <i className={`fas fa-${icon} me-2`}></i>;
}

/**
 * Kea presence icon
 */
function KeaIcon({ hasKea }: { hasKea: boolean }) {
  const icon = hasKea ? "feather-alt" : "times";
  return <i className={`fas fa-${icon} me-2`}></i>;
}

/**
 * Presents a nicely formatted list item for a given survey hour.
 * `swapGridTileSurvey` enables toggling between showing the grid tile or the survey ID.
 */
export function SurveyHourItem({
  surveyHour,
  swapGridTileSurvey = false,
}: SurveyHourItemProps) {
  const hasKea = surveyHour.kea;
  const notSurveying = surveyHour.activity === "X";
  const showSurvey = swapGridTileSurvey;
  const showGridTile = !swapGridTileSurvey;

  const classNames = [
    "data-table__row",
    hasKea && "hasKea",
    `survey-hour--activity-${surveyHour.activity}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      {showSurvey && (
        <div className="field-survey-date">
          <i className="fas fa-calendar"></i>
          <DateTime
            dateTime={new Date(surveyHour.survey__date)}
            format="date"
          />
        </div>
      )}
      <div className="field-hour">
        <i className="fas fa-clock"></i>
        {surveyHour.get_hour_display}
      </div>
      <div className="field-activity">
        <ActivityIcon activity={surveyHour.activity} />
        {surveyHour.get_activity_display}
      </div>
      {!notSurveying && (
        <>
          <div className="field-kea">
            <KeaIcon hasKea={hasKea} />
            {hasKea ? "Kea" : "No kea"}
          </div>
          {showGridTile && surveyHour.grid_tile && (
            <div className="field-marker">
              <i className="fas fa-map-marker-alt"></i>
              <Link href={`/grid/${surveyHour.grid_tile}`}>
                {surveyHour.grid_tile}
              </Link>
            </div>
          )}
        </>
      )}
      {showSurvey && (
        <div className="field-survey">
          <i className="fas fa-clipboard-list"></i>
          <Link href={`/surveys/${surveyHour.survey}`}>
            #{surveyHour.survey}
          </Link>
        </div>
      )}
    </div>
  );
}
