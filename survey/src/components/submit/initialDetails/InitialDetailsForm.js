import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Form, withFormik } from 'formik';
import qs from 'qs';
import PropTypes from 'prop-types';

import Messages from './fieldsets/Messages';
import ObserverFieldset from './fieldsets/ObserverFieldset';
import GridTileFieldset from './fieldsets/GridTileFieldset';
import SubmitFieldset from './fieldsets/SubmitFieldset';
import SelectedGridTiles from './fieldsets/SelectedGridTiles';
import GridTileSelectMap from '../../map/GridTileSelectMap';

import { qsOptions } from '../schema/surveyParameters';
import { initialInitialValues } from '../schema/initialValues';
import { initialValidationSchema } from '../schema/validationSchemas';

/**
  Enables user to select a set of gridTiles as specified in `tiles.json`.
  Submission results in an appropriately formatted query string pushed to same URL.
 */
class InitialDetailsFormComponent extends Component {
  render() {
    return (
      <div className="InitialDetailsForm">
        <Helmet title="1. Observer and Trip Details | Submit Survey" />
        <section className="mb-5">
          <Form className="form mb-3">
            <div className="container">
              <h2 className="mt-0 mb-4">Step 1: Observer and Trip Details</h2>
              <Messages {...this.props} />
              <ObserverFieldset {...this.props} />
              <GridTileFieldset {...this.props} />
            </div>
            <div className="submit-bar fixed-bottom">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col">
                    <SubmitFieldset {...this.props} />
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row no-gutters">
                <div className="col-lg-9 mb-3">
                  <GridTileSelectMap {...this.props} />
                </div>
                <div className="col-lg-3 mb-3">
                  <SelectedGridTiles {...this.props} />
                </div>
              </div>
            </div>
          </Form>
        </section>
      </div>
    );
  }
}

const InitialDetailsForm = withFormik({
  mapPropsToValues: props => initialInitialValues,
  validationSchema: initialValidationSchema,
  handleSubmit: (values, actions) => {
    const queryString = `${qs.stringify(values, qsOptions)}`;
    actions.props.history.push(`${queryString}`);
  },
})(InitialDetailsFormComponent);

InitialDetailsForm.propTypes = {
  fieldOptions: PropTypes.object.isRequired,
};

export default withRouter(InitialDetailsForm);
