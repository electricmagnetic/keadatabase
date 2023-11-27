import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

import ObservationPage from "./Observation/ObservationPage";
import ObservationCard from "./Observation/ObservationCard";

import Loader from "../helpers/Loader";
import Error from "../helpers/Error";

const API_PATH = `observations`;

const RenderObservation = ({ observation, type, ...others }) => {
  if (!observation) return <Error message="Invalid observation" />;

  switch (type) {
    case "card":
      return <ObservationCard observation={observation} {...others} />;
    default:
      return <ObservationPage observation={observation} {...others} />;
  }
};

/**
  Observation either:
  - Renders a given observation as a specified type (e.g. card, page)
  - Fetches a observation using the given id and renders as a specified type
  */
const Observation = ({ id, observation, ...others }) => {
  const { isLoading, data, error } = useQuery([`${API_PATH}/${id}/`], {
    enabled: !!id,
  });

  if (id) {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return <Error message="Error fetching observation" />;
    } else if (data) {
      return <RenderObservation observation={data.results} {...others} />;
    } else return null;
  } else if (observation) {
    return <RenderObservation observation={observation} {...others} />;
  } else return null;
};

Observation.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  observation: PropTypes.object,
};

Observation.defaultProps = {
  type: "page",
};

export default Observation;
