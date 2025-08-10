import { useRouter } from "next/router";
import { FeatureCollection } from "geojson";
import { Formik, Field, Form, FormikHelpers } from "formik";

const keaZones: FeatureCollection = require("@/geo/kea-zones_2025-08-10.json");

interface ZoneFilter {
  zoneId?: string;
}

const zoneFilterInitialValues = {
  zoneId: "",
};

export const ZoneFilter = () => {
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
          <Form className="row row-cols-lg-auto g-3 align-items-center">
            <div className="col-12">
              <label htmlFor="zoneId" className="form-label visually-hidden">
                Zone
              </label>
              <Field
                name="zoneId"
                id="zoneId"
                as="select"
                className="form-control"
              >
                <option value=""></option>
                {keaZones.features.map((feature) => (
                  <option value={feature.id} key={feature.id}>
                    {feature.properties?.name}
                  </option>
                ))}
              </Field>
            </div>
            <div className="col-12">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
