import Link from "next/link";
import DateTime from "shared/ui/DateTime";

interface SurveyHourItemProps {
  surveyHour: {
    id: number;
    hour: number;
    kea: boolean;
    activity: string;
    get_hour_display: string;
    get_activity_display: string;
    survey: number;
    survey__date: Date;
    grid_tile: string | null;
  };
  swapGridTileSurvey?: boolean;
}

function ActivityIcon({ activity }: { activity: string }) {
  const icon = (function (activity) {
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
  })(activity);

  return <i className={`fa-fw fas fa-${icon}`}></i>;
}

function KeaIcon({ hasKea }: { hasKea: boolean }) {
  const icon = hasKea ? "feather-alt" : "times";

  return <i className={`fa-fw fas fa-${icon}`}></i>;
}

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
    `activity-${surveyHour.activity}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      {showSurvey && (
        <div className="field-survey-date">
          <i className="fa-fw fas fa-calendar"></i>
          <DateTime dateTime={surveyHour.survey__date} format="date" />
        </div>
      )}
      <div className="field-hour">
        <i className="fa-fw fas fa-clock"></i>
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
            <div className="field-gridTile">
              <i className="fa-fw fas fa-map-marker-alt"></i>
              <Link href={`/grid/${surveyHour.grid_tile}`}>
                {surveyHour.grid_tile}
              </Link>
            </div>
          )}
        </>
      )}
      {showSurvey && (
        <div className="field-survey">
          <i className="fa-fw fas fa-clipboard-list"></i>
          <Link href={`/surveys/${surveyHour.survey}`}>
            #{surveyHour.survey}
          </Link>
        </div>
      )}
    </div>
  );
}
