import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'formik';

import RenderField from '../../../form/RenderField';

import { initialHourValues } from '../../schema/initialValues';
import { surveyHours } from '../../schema/surveyParameters';

import './SurveyHourFieldset.scss';

const isWinter = hour => surveyHours.winter.includes(hour);
const hasSingleGridTile = values => values.gridTiles && values.gridTiles.length === 1;
const isNotSurveying = surveyHour => surveyHour.activity === 'X';

class RenderHour extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.surveyHour !== prevProps.surveyHour) {
      if (isNotSurveying(this.props.surveyHour)) {
        const { form, index } = this.props;
        if (!hasSingleGridTile(form.values)) {
          form.setFieldValue(`hours.${index}.grid_tile`, '');
        }
        form.setFieldValue(`hours.${index}.kea`, false);
      }
    }
  }

  render() {
    const { surveyHour, index, fieldOptions, form } = this.props;
    const name = `hours.${index}`;

    const gridTileField = (() => {
      const { values } = form;
      const gridTileName = `${name}.grid_tile`;

      if (hasSingleGridTile(values)) {
        return (
          <Field
            component={RenderField}
            fieldOptions={fieldOptions.grid_tile}
            name={gridTileName}
            type="text"
            readOnly
            hideLabel
            tabIndex={-1}
          />
        );
      } else if (isNotSurveying(surveyHour)) {
        return (
          <Field
            component={RenderField}
            fieldOptions={fieldOptions.grid_tile}
            name={gridTileName}
            type="text"
            disabled
            hideLabel
            tabIndex={-1}
          />
        );
      } else {
        return (
          <Field
            component={RenderField}
            fieldOptions={fieldOptions.grid_tile}
            type="gridTileSelect"
            name={gridTileName}
            hideLabel
            selected={surveyHour.grid_tile}
            options={values.gridTiles}
            minLength={0}
            maxResults={15}
            paginate={false}
          />
        );
      }
    })();

    return (
      <tr key={index} className={isWinter(surveyHour.hour) ? 'winter' : 'summer'}>
        <td>
          <Field
            component={RenderField}
            fieldOptions={fieldOptions.hour}
            name={`${name}.hour`}
            type="number"
            readOnly
            hideLabel
            tabIndex={-1}
          />
          {!isWinter(surveyHour.hour) && <small>summer only</small>}
        </td>
        <td>
          <Field
            component={RenderField}
            fieldOptions={fieldOptions.activity}
            name={`${name}.activity`}
            type="choice"
            addBlank
            hideLabel
          />
        </td>
        <td>
          <Field
            component={RenderField}
            fieldOptions={fieldOptions.kea}
            name={`${name}.kea`}
            type="checkbox"
            hideLabel
            disabled={isNotSurveying(surveyHour)}
          />
        </td>
        <td>{gridTileField}</td>
      </tr>
    );
  }
}

class RenderHours extends Component {
  render() {
    const { values } = this.props.form;

    return (
      <div className="RenderHours">
        {hasSingleGridTile(values) && (
          <div className="alert alert-info">
            Only one grid tile has been selected, so this has been added to every hour.
          </div>
        )}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Hour</th>
              <th>Activity</th>
              <th>Kea?</th>
              <th>Grid Tile</th>
            </tr>
          </thead>
          <tbody>
            {values.hours &&
              values.hours.length > 0 &&
              values.hours.map((surveyHour, index) => (
                <RenderHour
                  surveyHour={surveyHour}
                  index={index}
                  {...this.props}
                  key={surveyHour.hour}
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const HourFieldset = ({ fieldOptions }) => {
  return (
    <fieldset className="mb-3">
      <legend>2. Hours</legend>
      <FieldArray
        initialValues={initialHourValues}
        name="hours"
        render={arrayHelpers => (
          <RenderHours fieldOptions={fieldOptions.hours.child.children} {...arrayHelpers} />
        )}
      />
    </fieldset>
  );
};

HourFieldset.propTypes = {
  fieldOptions: PropTypes.object.isRequired,
};

export default HourFieldset;
