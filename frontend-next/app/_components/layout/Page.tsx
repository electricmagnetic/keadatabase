import type { PropsWithChildren } from "react";

type BackgroundTypes = "primary" | "secondary" | "light" | "faded";

const getStyle = (type?: BackgroundTypes) => {
  switch (type) {
    case "primary":
      return { backgroundColor: "var(--bs-primary)", color: "var(--bs-white)" };
    case "secondary":
      return {
        backgroundColor: "var(--bs-secondary)",
        color: "var(--bs-white)",
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
  type,
  children,
}: PropsWithChildren<{ type?: BackgroundTypes }>) {
  return (
    <section className="py-5" style={getStyle(type)}>
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
