import { FC } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

import keaZones from 'public/geo/kea-zones_2022-10-31.json';
import { Filters, SetFilters } from './filters';

interface ZoneForm {
  zoneId?: string;
}

export const ZoneFilter: FC<{ filters: Filters, setFilters: SetFilters<Filters>, }> = ({ filters, setFilters }) => {
  return (<div>
    <Formik
      initialValues={filters}
      onSubmit={(
        values,
        { setSubmitting }: FormikHelpers<ZoneForm>
      ) => {
        const zone = keaZones.features.filter(keaZone => keaZone.id === values.zoneId)[0];
        if(zone) setFilters({ zone: zone });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) =>
        <Form>
          <label htmlFor="zoneId">Zone</label>
          <Field name="zoneId" id="zoneId" as="select">
            <option value=''></option>
            {keaZones.features.map(feature => <option value={feature.id} key={feature.id}>{feature.properties.name}</option>)}
          </Field>

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      }
    </Formik>

  </div>);
}