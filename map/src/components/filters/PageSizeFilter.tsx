import { FC } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, FormikHelpers } from "formik";

interface PageSizeFilter {
  pageSize?: string;
}

const pageSizeFilterInitialValues = {
  pageSize: "",
};

export const PageSizeFilter: FC = () => {
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
          <Form>
            <label htmlFor="pageSize">Page Size</label>
            <Field name="pageSize" id="pageSize" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
