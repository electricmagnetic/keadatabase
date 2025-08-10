import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers } from "formik";

interface PageSizeFilter {
  pageSize?: string;
}

const pageSizeFilterInitialValues = {
  pageSize: "",
};

export const PageSizeFilter = () => {
  const router = useRouter();
  const initialValues = Object.assign(
    {},
    pageSizeFilterInitialValues,
    router.query?.pageSize && { pageSize: router.query.pageSize },
  );

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values,
          { setSubmitting }: FormikHelpers<PageSizeFilter>,
        ) => {
          if (values.pageSize) {
            router.push({
              query: Object.assign({}, router.query, {
                pageSize: values.pageSize,
              }),
            });
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="row">
            <div className="col-9">
              <label htmlFor="pageSize" className="visually-hidden">
                Page Size
              </label>
              <Field
                name="pageSize"
                id="pageSize"
                className="form-control"
                placeholder="Page Size"
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
