/**
  Specifies initial values for Observer object.
  See also: observerValidationSchema.
 */
export const initialObserverValues = {
  name: '',
  email: '',
};

/**
  Specifics initial values for initial form.
  See also: initialValidationSchema, gridTileValidationSchema.
  */
export const initialInitialValues = {
  observer: initialObserverValues,
  gridTiles: [],
};

/**
  Specifies initial hour values (nested object).
  grid_tile will always be an array of one due to the use of the typeahead field.
 */
export const initialHourValues = {
  hour: '',
  activity: '',
  kea: false,
  grid_tile: [],
};

/**
  Specifies initial values and shape for submission to API. Includes API challenge.
  See also: fullValidationSchema.
 */
export const initialFullValues = {
  observer: initialObserverValues,
  date: '',
  hours: [],
  max_flock_size: '',
  comments: '',
  purpose: '',
  challenge: 'kea',
};
