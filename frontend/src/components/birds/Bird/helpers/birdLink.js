/**
  Generates appropriate link for a given bird (slug or id).
  */
const birdLink = bird => `/birds/${bird.slug || bird.id}`;

export default birdLink;
