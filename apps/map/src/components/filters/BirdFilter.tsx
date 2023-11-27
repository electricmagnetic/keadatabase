import { FC } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers } from "formik";

interface BirdFilter {
  birdId?: string;
}

const birdFilterInitialValues = {
  birdId: "",
};

export const BirdFilter: FC = () => {
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
          <Form>
            <label htmlFor="birdId">Bird</label>
            <Field name="birdId" id="birdId" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
