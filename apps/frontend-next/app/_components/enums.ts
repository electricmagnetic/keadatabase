import * as z from "zod";

/* Manually added, must correspond with those in the backend */

export const SightingTypeEnum = z.enum(["sighted", "distant", "heard"]);
export const StatusType = z.enum([
  "new",
  "public",
  "private",
  "bad",
  "fwf",
  "kct",
  "nztf",
  "captive",
  "radio",
  "camera",
]);
export const PrecisionEnum = z.enum(["10", "50", "200", "1000", "5000"]);
export const SexEnum = z.enum(["", "female", "male"]);
export const BandedEnum = z.enum([
  "unknown",
  "unreadable",
  "readable",
  "unbanded",
]);
export const LifeStageEnum = z.enum([
  "",
  "fledgling",
  "juvenile",
  "sub-adult",
  "adult",
]);
