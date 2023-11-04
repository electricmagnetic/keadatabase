import classNames from "classnames";
import type { PropsWithChildren } from "react";

type BackgroundTypes = "primary" | "secondary" | "light" | "faded" | "lightest";
type SizeTypes = "small" | "medium" | "large";

const getStyle = (type?: BackgroundTypes) => {
  switch (type) {
    case "primary":
      return { backgroundColor: "var(--bs-primary)", color: "var(--bs-white)" };
    case "secondary":
      return {
        backgroundColor: "var(--bs-secondary)",
        color: "var(--bs-white)",
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
      )}
      style={getStyle(background)}
    >
      <div className="container">{children}</div>
    </section>
  );
}

function PageContainer({ children }: PropsWithChildren) {
  return <div className="container">{children}</div>;
}

function PageHeading({ children }: PropsWithChildren) {
  return <h1>{children}</h1>;
}

function Page({ children }: PropsWithChildren) {
  return <main>{children}</main>;
}

Page.Container = PageContainer;
Page.Heading = PageHeading;
Page.Section = PageSection;

export default Page;
