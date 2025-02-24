import type { Bird } from "./schema";

export const generateSummary = (
  bird: Partial<Bird>, // TODO partial is clumsy
) =>
  [
    (bird.get_life_stage !== null)
      ? `${bird.status} (${bird.get_life_stage})`
      : bird.status,
    bird.sex,
    bird.primary_band,
  ].join(", ");

export const generateAltText = (bird: Partial<Bird>) =>
  `Probably a ${bird.sex} ${bird.get_life_stage} kea`;
