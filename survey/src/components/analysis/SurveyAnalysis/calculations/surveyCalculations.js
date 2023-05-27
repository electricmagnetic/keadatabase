/**
  Calculate number of kea encounters per total hours surveyed
 */
export const calculateEncounterRate = surveyAnalysis =>
  Math.round((surveyAnalysis.hours_total.with_kea / surveyAnalysis.hours_total.surveyed) * 100);
