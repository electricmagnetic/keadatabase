/**
 * Basic loading component
 */
export const Loader = () => (
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

/**
 * Basic error component
 */
export const Error = () => <span>Error</span>;
