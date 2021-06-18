import React from 'react';
import { getIn } from 'formik';
import classnames from 'classnames';

export const RenderField = props => {
  // Use label if provided, otherwise default on OPTIONS label
  const { field, form, options, placeholder, type, addBlank } = props;
  const label = props.label || options.label;
  const touched = getIn(form.touched, field.name);
  const error = getIn(form.errors, field.name);
  const formControlClasses = classnames('form-control', { 'is-invalid': touched && error });

  return (
    <div className="form-group">
      <label className="control-label" htmlFor={field.name}>
        {label}
      </label>

      {type === 'choice' && (
        <select {...field} className={formControlClasses} id={field.name}>
          {/* Add blank to compulsory fields (requiring the user to make a selection) */}
          {addBlank && <option default value={''} />}
          {options.choices.map(option => (
            <option value={option.value} key={option.value}>
              {option.display_name}
            </option>
          ))}
        </select>
      )}

      {type === 'textarea' && (
        <textarea
          {...field}
          placeholder={placeholder}
          className={formControlClasses}
          id={field.name}
        />
      )}

      {type !== 'choice' && type !== 'textarea' && (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className={formControlClasses}
          id={field.name}
        />
      )}

      {touched && error && <span className="invalid-feedback">{error}</span>}
    </div>
  );
};
