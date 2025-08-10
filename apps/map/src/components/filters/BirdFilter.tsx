import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers } from "formik";

interface BirdFilter {
  birdId?: string;
}

const birdFilterInitialValues = {
  birdId: "",
};

export const BirdFilter = () => {
  const router = useRouter();
  const initialValues = Object.assign(
    {},
    birdFilterInitialValues,
    router.query?.bird && { birdId: router.query.bird },
  );

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }: FormikHelpers<BirdFilter>) => {
          if (values.birdId) {
            router.push({
              query: Object.assign({}, router.query, { bird: values.birdId }),
            });
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="row">
            <div className="col-9">
              <label
                htmlFor="birdId"
                className="form-label-col col-3 visually-hidden"
              >
                Bird
              </label>
              <Field
                name="birdId"
                id="birdId"
                className="form-control"
                placeholder="Bird"
              />
            </div>
            <div className="col-md-3">
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
