import React, { useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import moment from "moment";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";

import { optionsFn, postMutationFn } from "../api";
import Loader from "../helpers/Loader";
import Error from "../helpers/Error";

import ObservationDetailsFieldset from "./fieldset/ObservationDetailsFieldset";
import ObservationBirdsFieldset from "./fieldset/ObservationBirdsFieldset";
import ContributorFieldset from "./fieldset/ContributorFieldset";
import FurtherInformationFieldset from "./fieldset/FurtherInformationFieldset";
import SubmitFieldset from "./fieldset/SubmitFieldset";

const initialValues = {
  date_sighted: moment().format("YYYY-MM-DD"),
  time_sighted: moment().format("HH:mm"),
  precision: "200",
  longitude: "",
  latitude: "",
  location_details: "",
  sighting_type: "",
  birds: [],
  number: 1,
  behaviour: "",
  contributor: {
    name: "",
    email: "",
    phone: "",
    activity: "",
    heard: "",
    communications: false,
  },
  comments: "",
};

const requiredMessage = "This field is required.";
const notNumber = "This field must be a number.";
const validationSchema = yup.object().shape({
  date_sighted: yup.string().required(requiredMessage),
  time_sighted: yup.string().required(requiredMessage),
  precision: yup.string().required(requiredMessage),
  longitude: yup
    .number()
    .min(-180)
    .max(180)
    .required(requiredMessage)
    .typeError(notNumber),
  latitude: yup
    .number()
    .min(-90)
    .max(90)
    .required(requiredMessage)
    .typeError(notNumber),
  sighting_type: yup.string().required(requiredMessage),
  birds: yup.array().of(
    yup.object().shape({
      banded: yup.string().required(requiredMessage),
    }),
  ),
  number: yup.number().required(requiredMessage),
  contributor: yup.object().shape({
    name: yup.string().required(requiredMessage),
    email: yup
      .string()
      .trim()
      .email("Invalid email address.")
      .required(requiredMessage),
  }),
});

const API_PATH = "report/observation";

const formatObservation = (values = {}) => {
  const observation = {};

  // Add challenge (basic spam prevention)
  observation.challenge = "kea";

  // Format coordinates into numbers with 'Point' type
  if (values.longitude && values.latitude) {
    observation.point_location = {
      type: "Point",
      coordinates: [parseFloat(values.longitude), parseFloat(values.latitude)],
    };
  }

  // Copy only defined values
  if (values.birds && values.birds.length > 0) {
    observation.birds = [];
    values.birds.forEach((bird, i) => {
      const formattedBird = {};
      Object.keys(bird).forEach((key) => {
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
    if (values.sighting_type === "sighted") {
      observation.number = observation.birds.length;
    } else {
      observation.number = values.number;
    }
  }

  if (values.contributor) {
    observation.contributor = {};
    Object.keys(values.contributor).forEach((key) => {
      if (values.contributor[key])
        observation.contributor[key] = values.contributor[key];
    });
  }

  // Copy other parameters if exist
  [
    "date_sighted",
    "time_sighted",
    "precision",
    "location_details",
    "sighting_type",
    "behaviour",
    "comments",
  ].forEach((key) => {
    if (values[key]) {
      observation[key] = values[key];
    }
  });

  return JSON.stringify(observation);
};

const ReportObservation = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const formikRef = useRef(null);
  const { isLoading, data, error } = useQuery([`${API_PATH}/`], optionsFn, {
    retry: false,
    cacheTime: 60 * 60 * 24 * 1000,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const mutation = useMutation(postMutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries("observations");
    },
  });

  useEffect(() => {
    // Redirect on success

    if (mutation.data?.results)
      history.push(`/report/success/${mutation.data.results.id}`);
  }, [mutation.data, history]);

  useEffect(() => {
    // Process errors received from API

    if (mutation.error) {
      const errors = mutation.error.response.data;

      if (errors.point_location && errors.point_location[0]) {
        errors.longitude = errors.point_location[0];
        errors.latitude = errors.point_location[0];
      }

      formikRef.current.setErrors(errors);
    }
  }, [mutation.error]);

  if (isLoading || !data) {
    return <Loader />;
  } else if (error) {
    return <Error />;
  } else if (data) {
    // An OPTIONS request to the API will provide dropdown values
    const options = data.results.actions.POST;

    return (
      <div>
        <p>All fields are required, except where indicated.</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          innerRef={formikRef}
          onSubmit={(values, { setSubmitting, isSubmitting }) => {
            const processedValues = formatObservation(values);

            if (!isSubmitting) {
              try {
                mutation.mutate({
                  mutationPath: `${API_PATH}/`,
                  values: processedValues,
                });
              } catch (error) {
                console.error(error);
              } finally {
                setSubmitting(false);
              }
            }
          }}
        >
          {(props) => (
            <Form>
              <ContributorFieldset {...props} options={options} />
              <ObservationDetailsFieldset {...props} options={options} />
              <ObservationBirdsFieldset {...props} options={options} />
              <FurtherInformationFieldset {...props} options={options} />
              <SubmitFieldset
                {...props}
                response={mutation}
                submissionPending={props.isSubmitting || mutation.isLoading}
              />
            </Form>
          )}
        </Formik>
      </div>
    );
  } else return null;
};

export default ReportObservation;
