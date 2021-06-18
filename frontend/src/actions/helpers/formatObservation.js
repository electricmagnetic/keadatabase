export function formatObservation(values = {}) {
  const observation = {};

  // Add challenge (basic spam prevention)
  observation.challenge = 'kea';

  // Format coordinates into numbers with 'Point' type
  if (values.longitude && values.latitude) {
    observation.point_location = {
      type: 'Point',
      coordinates: [parseFloat(values.longitude), parseFloat(values.latitude)],
    };
  }

  // Copy only defined values
  if (values.birds && values.birds.length > 0) {
    observation.birds = [];
    values.birds.forEach((bird, i) => {
      const formattedBird = {};
      Object.keys(bird).forEach(key => {
        if (bird[key]) formattedBird[key] = bird[key];
      });
      observation.birds.push(formattedBird);
    });
  } else {
    // Add empty observation.birds if none defined as back-end requires it to be at least defined
    observation.birds = [];
  }

  // For 'sighted' sighting_type only (where number field is not defined), get length of array for number
  if (values.sighting_type) {
    if (values.sighting_type === 'sighted') {
      observation.number = observation.birds.length;
    } else {
      observation.number = values.number;
    }
  }

  if (values.contributor) {
    observation.contributor = {};
    Object.keys(values.contributor).forEach(key => {
      if (values.contributor[key]) observation.contributor[key] = values.contributor[key];
    });
  }

  // Copy other parameters if exist
  [
    'date_sighted',
    'time_sighted',
    'precision',
    'location_details',
    'sighting_type',
    'behaviour',
    'comments',
  ].forEach(key => {
    if (values[key]) {
      observation[key] = values[key];
    }
  });

  return JSON.stringify(observation);
}
