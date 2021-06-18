/**
  Generates a summary string from a given sighting.
  */
const generateSummary = observation => {
  return `${observation.get_sighting_type_display} ${observation.number} ${
    observation.number === 1 ? 'bird' : 'birds'
  }`;
};

export default generateSummary;
