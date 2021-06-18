import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import moment from 'moment';
import * as yup from 'yup';
import { withRouter } from 'react-router-dom';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';
import ObservationDetailsFieldset from './fieldset/ObservationDetailsFieldset';
import ObservationBirdsFieldset from './fieldset/ObservationBirdsFieldset';
import ContributorFieldset from './fieldset/ContributorFieldset';
import FurtherInformationFieldset from './fieldset/FurtherInformationFieldset';
import SubmitFieldset from './fieldset/SubmitFieldset';
import {
  getReportObservationOptions,
  postReportObservation,
} from '../../actions/reportObservation';

const initialValues = {
  date_sighted: moment().format('YYYY-MM-DD'),
  time_sighted: moment().format('HH:mm'),
  precision: '200',
  longitude: '',
  latitude: '',
  location_details: '',
  sighting_type: '',
  birds: [],
  number: 1,
  behaviour: '',
  contributor: {
    name: '',
    email: '',
    phone: '',
    activity: '',
    heard: '',
    communications: false,
  },
  comments: '',
};

const requiredMessage = 'This field is required.';
const notNumber = 'This field must be a number.';
const validationSchema = yup.object().shape({
  date_sighted: yup.string().required(requiredMessage),
  time_sighted: yup.string().required(requiredMessage),
  precision: yup.string().required(requiredMessage),
  longitude: yup.number().min(-180).max(180).required(requiredMessage).typeError(notNumber),
  latitude: yup.number().min(-90).max(90).required(requiredMessage).typeError(notNumber),
  sighting_type: yup.string().required(requiredMessage),
  birds: yup.array().of(
    yup.object().shape({
      banded: yup.string().required(requiredMessage),
    })
  ),
  number: yup.number().required(requiredMessage),
  contributor: yup.object().shape({
    name: yup.string().required(requiredMessage),
    email: yup.string().email('Invalid email address.').required(requiredMessage),
  }),
});

class ReportObservation extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getReportObservationOptions());
  }

  handleSubmit(values, formikBag) {
    const { dispatch, history } = this.props;
    dispatch(postReportObservation(values, Object.assign({}, formikBag, { history: history })));
  }

  render() {
    const { reportObservationOptions, reportObservationPost } = this.props;

    if (reportObservationOptions.pending) return <Loader />;
    else if (reportObservationOptions.rejected)
      return <Error reason={reportObservationOptions.value.message} />;
    else if (reportObservationOptions.fulfilled) {
      const options = reportObservationOptions.value.actions.POST;
      return (
        <div>
          <p>All fields are required, except where indicated.</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}
          >
            {props => (
              <Form>
                <ObservationDetailsFieldset {...props} options={options} />
                <ObservationBirdsFieldset {...props} options={options} />
                <ContributorFieldset {...props} options={options} />
                <FurtherInformationFieldset {...props} options={options} />
                <SubmitFieldset {...props} response={reportObservationPost} />
              </Form>
            )}
          </Formik>
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = state => ({
  reportObservationOptions: state.reportObservationOptions,
  reportObservationPost: state.reportObservationPost,
});

export default compose(withRouter, connect(mapStateToProps))(ReportObservation);
