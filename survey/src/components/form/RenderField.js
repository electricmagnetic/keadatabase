import React from 'react';
import { getIn } from 'formik';
import classnames from 'classnames';

import GridTileSelectTypeahead from './GridTileSelectTypeahead';

/**
  Principal method for rendering all fields. Handles logic for displaying checkboxes, select field,
  typeahead and regular input fields.

  Also handles `error` messages (from yup) and `status` messages (from back-end).
*/
const RenderField = props => {
  const { field, form, fieldOptions, type, addBlank, hideLabel, helpText, ...others } = props;

  // Use label if provided, otherwise default on OPTIONS (fieldOptions) label
  const label = props.label || fieldOptions.label;
  const choices = props.choices || fieldOptions.choices;

  const touched = getIn(form.touched, field.name);
  const error = getIn(form.errors, field.name);
  const status = getIn(form.status, field.name);
  const value = getIn(form.values, field.name);

  const isInvalid = (touched && error) || status ? true : false;

  // Adjusts classes on form control depending on type, validity and readOnly status
  const formControlClasses = (type => {
    const baseClasses = classnames({
      'is-invalid': isInvalid,
    });
    switch (type) {
      case 'checkbox':
        return classnames(baseClasses, 'form-check-input');
      case 'choice':
        return classnames(baseClasses, 'custom-select');
      case 'gridTileSelect':
        return classnames(baseClasses);
      default:
        return classnames(
          baseClasses,
          { 'form-control': !props.readOnly },
          { 'form-control-plaintext': props.readOnly }
        );
    }
  })(type);

  // Adjusts classes on label depending on type and hideLabel status
  const formLabelClasses = (type => {
    const baseClasses = classnames({
      'sr-only': hideLabel,
    });
    switch (type) {
      case 'checkbox':
        return classnames(baseClasses, 'form-check-label');
      default:
        return classnames(baseClasses, 'control-label');
    }
  })(type);

  // Only if help text provided, create appropriate aria attribute
  const helpTextElementId = `${field.name}-helpText`;
  const helpTextAttribute = helpText ? { 'aria-describedby': helpTextElementId } : null;

  // Creates input attributes to be applied
  const inputAttributes = {
    ...field,
    id: field.name,
    className: formControlClasses,
    ...helpTextAttribute,
    ...others,
  };

  // Creates field element based on field type
  const fieldElement = (type => {
    switch (type) {
      case 'choice':
        return (
          <select {...inputAttributes}>
            {/* Add blank to compulsory fields (requiring the user to make a selection) */}
            {addBlank && <option default value={''} />}
            {choices.map(option => (
              <option value={option.value} key={option.value}>
                {option.display_name}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return <textarea {...inputAttributes} />;
      case 'gridTileSelect':
        return <GridTileSelectTypeahead {...inputAttributes} form={form} isInvalid={isInvalid} />;
      case 'checkbox':
        return <input {...inputAttributes} type={type} checked={value} />;
      default:
        return <input {...inputAttributes} type={type} />;
    }
  })(type);

  // Creates label element for given field
  const labelElement = (
    <label className={formLabelClasses} htmlFor={field.name}>
      {label}
    </label>
  );

  // Optional help text element (hence the presence of the conditional)
  const helpTextElement = helpText ? (
    <small id={helpTextElementId} className="form-text text-muted">
      {helpText}
    </small>
  ) : null;

  // Creates error element
  const errorElement = (
    <>
      {/* `d-inline` is used to force visibility due to incompatibility of Typeahead with BS4 */}
      {isInvalid && error && <span className="invalid-feedback d-inline">{error}</span>}
      {isInvalid && status && <span className="invalid-feedback d-inline">{status}</span>}
    </>
  );

  // Creates element grouping above elements, with special ordering for check boxes
  const groupElement = (type => {
    switch (type) {
      case 'checkbox':
        return (
          <div className="form-check">
            {fieldElement}
            {labelElement}
            {helpTextElement}
            {errorElement}
          </div>
        );
      default:
        return (
          <div className="form-group">
            {labelElement}
            {fieldElement}
            {helpTextElement}
            {errorElement}
          </div>
        );
    }
  })(type);

  return groupElement;
};

RenderField.defaultProps = {
  fieldOptions: {},
  addBlank: false,
  readOnly: false,
  disabled: false,
  hideLabel: false,
};

export default RenderField;
