import { FC } from "react";

/**
 * Basic loading component
 */
export const Loader: FC = () => (
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

/**
 * Basic error component
 */
export const Error: FC = () => <span>Error</span>;
