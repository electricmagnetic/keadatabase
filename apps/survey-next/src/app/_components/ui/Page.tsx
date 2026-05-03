function Heading({ children }: React.PropsWithChildren) {
  return <h1>{children}</h1>;
}

function Section({ children }: React.PropsWithChildren) {
  return <section>{children}</section>;
}

function Container({ children }: React.PropsWithChildren) {
  return <main>{children}</main>;
}

const Page = { Heading, Section, Container };

export default Page;
