import axios, { Method } from "axios";
import { QueryFunction } from "react-query";
import { stringify } from "qs";

const makeRequest = async (
  method: Method,
  path: string,
  values?: any
) => {
  const { data, ...others } = await axios({
    method: method,
    url: `${process.env.NEXT_PUBLIC_API_URL}/${path}`,
    ...(values && { data: values }),
  });

  // Substitute 'data' with 'results' to avoid clashing with react-query 'data' variable
  const response = Object.assign(others, { results: data });

  return response;
};


// Read (queryKey[0] expects a path, optional queryKey[1] contains additional parameters)
export const getQueryFn: QueryFunction = async ({ queryKey }) => {
  const [basePath, params] = queryKey;
  const queryString = !!queryKey[1]
    ? stringify(params, { addQueryPrefix: true })
    : null;
  const path = [basePath as string, queryString].join("");

  return await makeRequest("get", path);
};