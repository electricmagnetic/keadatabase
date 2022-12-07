import { FC } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers } from "formik";

import keaZones from "public/geo/kea-zones_2022-10-31.json";

interface ZoneFilter {
  zoneId?: string;
}

const zoneFilterInitialValues = {
  zoneId: "",
};

export const ZoneFilter: FC = () => {
  const router = useRouter();
  const initialValues = Object.assign(
    {},
    zoneFilterInitialValues,
    router.query?.zone && { zoneId: router.query.zone }
  ); // TODO fix initialisation via router (doesn't work on prod)

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }: FormikHelpers<ZoneFilter>) => {
          if (values.zoneId) {
            router.push({
              query: Object.assign({}, router.query, { zone: values.zoneId }),
            });
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="zoneId">Zone</label>
            <Field name="zoneId" id="zoneId" as="select">
              <option value=""></option>
              {keaZones.features.map((feature) => (
                <option value={feature.id} key={feature.id}>
                  {feature.properties.name}
                </option>
              ))}
            </Field>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
