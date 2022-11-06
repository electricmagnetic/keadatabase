import { FC } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

import keaZones from 'static/kea-zones_2022-10-31.json';
import { Filters, SetFilters } from './filters';

interface ZoneFilters extends Filters {
  zone?: string;
}

export const ZoneFilter: FC<{ filters: ZoneFilters, setFilters: SetFilters<ZoneFilters>, }> = ({ filters, setFilters }) => {
  const zoneOptions = keaZones.features.map(keaZone => Object.assign({}, { id: keaZone.id, name: keaZone.properties.name }));

  return (<div>
    <Formik
      initialValues={filters}
      onSubmit={(
        values,
        { setSubmitting }: FormikHelpers<ZoneFilters>
      ) => {
        setFilters(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) =>
        <Form>
          <label htmlFor="zone">Zone</label>
          <Field name="zone" id="zone" as="select">
            <option value=''></option>
            {zoneOptions.map(option => <option value={option.id} key={option.id}>{option.name}</option>)}
          </Field>

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      }
    </Formik>

  </div>);
}