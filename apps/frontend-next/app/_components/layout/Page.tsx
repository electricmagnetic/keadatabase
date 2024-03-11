import classNames from "classnames";
import type { PropsWithChildren } from "react";

type BackgroundTypes =
  | "primary"
  | "secondary"
  | "light"
  | "faded"
  | "lightest"
  | "dull";
type SizeTypes = "tiny" | "small" | "medium" | "large";

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
    case "light":
      return { backgroundColor: "var(--bs-light)" };
    default:
      return { backgroundColor: "var(--bs-white)" };
  }
};

function PageContainer({
  fullWidth,
  children,
}: PropsWithChildren<{ fullWidth?: boolean }>) {
  return (
    <div className={classNames(fullWidth ? "container-fluid" : "container")}>
      {children}
    </div>
  );
}

function PageSection({
  background,
  children,
  size = "medium",
}: PropsWithChildren<{ background?: BackgroundTypes; size?: SizeTypes }>) {
  return (
    <section
      className={classNames(
        "position-relative",
        size === "large" && "py-8",
        size === "medium" && "py-5",
        size === "small" && "py-4",
        size === "tiny" && "py-2",
      )}
      style={getStyle(background)}
    >
      <PageContainer>{children}</PageContainer>
    </section>
  );
}

function PageHeading({ children }: PropsWithChildren) {
  return (
    <PageSection background="faded" size="small">
      <h1>{children}</h1>
    </PageSection>
  );
}

function Page({
  noConstrainer,
  children,
}: PropsWithChildren<{ noConstrainer?: boolean }>) {
  const main = <main>{children}</main>;

  return noConstrainer ? main : <div className="constrainer">{main}</div>;
}

Page.Container = PageContainer;
Page.Heading = PageHeading;
Page.Section = PageSection;

export default Page;
