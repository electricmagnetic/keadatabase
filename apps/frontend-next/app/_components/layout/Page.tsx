import classNames from "classnames";
import type { CSSProperties, PropsWithChildren } from "react";

type BackgroundTypes =
  | "primary"
  | "secondary"
  | "light"
  | "faded"
  | "lightest"
  | "dull"
  | "contours";

type SizeTypes = "tiny" | "small" | "medium" | "large" | "none";

const getStyle = (type?: BackgroundTypes) => {
  switch (type) {
    case "primary":
      return { backgroundColor: "var(--bs-primary)", color: "var(--bs-white)" };
    case "secondary":
      return {
        backgroundColor: "var(--bs-secondary)",
        color: "var(--bs-white)",
      };
    case "dull":
      return {
        backgroundColor: "var(--custom-brown-dull)",
      };
    case "lightest":
      return {
        backgroundColor: "var(--custom-brown-lightest)",
      };
    case "faded":
      return {
        backgroundColor: "var(--custom-brown-faded)",
      };
    case "contours":
      return {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "var(--custom-brown-dull)",
        backgroundImage: "url(/motifs/contours.svg)",
        backgroundPosition: "center bottom",
      };
    case "light":
      return { backgroundColor: "var(--bs-light)" };
    default:
      return { backgroundColor: "var(--bs-white)" };
  }
};

interface PageContainerProps {
  fullWidth?: boolean;
}

function PageContainer({
  fullWidth,
  children,
  ...others
}: PropsWithChildren<
  PageContainerProps & React.HTMLAttributes<HTMLDivElement>
>) {
  return (
    <div
      className={classNames(fullWidth ? "container-fluid" : "container")}
      {...others}
    >
      {children}
    </div>
  );
}

const pageSectionSize = {
  large: "py-8",
  medium: "py-5",
  small: "py-4",
  tiny: "py-2",
  none: "",
};

function PageSection({
  className,
  background,
  children,
  fullWidth,
  size = "medium",
  containerStyle,
}: PropsWithChildren<
  {
    className?: string;
    background?: BackgroundTypes;
    size?: SizeTypes;
    containerStyle?: CSSProperties;
  } & PageContainerProps
>) {
  return (
    <section
      className={classNames(
        "position-relative",
        pageSectionSize[size],
        className,
      )}
      style={getStyle(background)}
    >
      <PageContainer fullWidth={fullWidth} style={containerStyle}>
        {children}
      </PageContainer>
    </section>
  );
}

function PageHeading({ children }: PropsWithChildren) {
  return (
    <PageSection background="dull" size="small">
      <h1>{children}</h1>
    </PageSection>
  );
}

function Page({
  noConstrainer,
  children,
}: PropsWithChildren<{ noConstrainer?: boolean }>) {
  const main = <main className="d-flex flex-column">{children}</main>;

  return noConstrainer ? main : <div className="constrainer">{main}</div>;
}

Page.Container = PageContainer;
Page.Heading = PageHeading;
Page.Section = PageSection;

export default Page;
