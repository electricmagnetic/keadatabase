function Heading({ children, subheading, className }: React.PropsWithChildren<{ subheading?: React.ReactNode; className?: string }>) {
  return (
    <div className={`page__heading${className ? ` ${className}` : ""}`}>
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
