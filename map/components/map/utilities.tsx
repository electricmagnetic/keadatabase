import { CSSProperties, FC, PropsWithChildren } from "react";

import { Loader } from "components/utilities";

const controlStyle: CSSProperties = {
  backgroundColor: "#fff",
  padding: "0.5rem",
  fontSize: "1rem",
};

export const CustomControl: FC<PropsWithChildren<{ className: string }>> = ({
  className,
  children,
}) => (
  <div className={className}>
    <div className="leaflet-control leaflet-bar" style={controlStyle}>
      {children}
    </div>
  </div>
);

export const TitleControl: FC<PropsWithChildren> = ({ children }) => (
  <CustomControl className="leaflet-top leaflet-left avoidZoomControl">
    {children}
  </CustomControl>
);

/**
 * Basic map loading component
 */
export const MapLoader: FC = () => (
  <CustomControl className="leaflet-bottom leaflet-left">
    <Loader />
  </CustomControl>
);
