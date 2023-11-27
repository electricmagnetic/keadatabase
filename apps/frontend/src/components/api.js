import axios from "axios";
import { stringify } from "qs";

const makeRequest = async ({
  method,
  path,
  values,
  apiPath = `${process.env.REACT_APP_API_BASE}`,
}) => {
  const { data, ...others } = await axios({
    method: method,
    url: `${apiPath}/${path}`,
    ...(values && { data: values }),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });

  // Substitute 'data' with 'results' to avoid clashing with react-query 'data' variable
  const response = Object.assign(others, { results: data });

  return response;
};

// Read (queryKey[0] expects a path, optional queryKey[1] is additional parameters
export const getQueryFn = async ({ queryKey }) => {
  const [basePath, params, apiPath] = queryKey;
  const queryString = !!queryKey[1]
    ? stringify(params, { addQueryPrefix: true })
    : null;
  const path = [basePath, queryString].join("");

  return await makeRequest({
    method: "get",
    path: path,
    ...(apiPath && { apiPath: apiPath }),
  });
};

export const optionsFn = async ({ queryKey }) => {
  const [basePath] = queryKey;

  return await makeRequest({ method: "options", path: basePath });
};

// Create
export const postMutationFn = async ({ mutationPath, values }) => {
  return await makeRequest({
    method: "post",
    path: mutationPath,
    values: values,
  });
};
