function Heading({ children, subheading }: React.PropsWithChildren<{ subheading?: React.ReactNode }>) {
  return (
    <div className="page__heading">
      <div className="holder holder--sm">
        <h1>{children}</h1>
        {subheading}
      </div>
    </div>
  );
}

function Section({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`page__section${className ? ` ${className}` : ""}`}>
      <div className="holder holder--sm">{children}</div>
    </section>
  );
}

function Container({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

const Page = { Heading, Section, Container };

export default Page;
