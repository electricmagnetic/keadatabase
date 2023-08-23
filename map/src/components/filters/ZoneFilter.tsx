import { FC } from "react";
import { useRouter } from "next/router";
import { FeatureCollection } from "geojson";
import { Formik, Field, Form, FormikHelpers } from "formik";

const keaZones: FeatureCollection = require("public/geo/kea-zones_2023-05-02.json");

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
    router.query?.zone && { zoneId: router.query.zone },
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
                  {feature.properties?.name}
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
