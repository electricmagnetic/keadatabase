import { type PropsWithChildren } from "react";

function PropertiesItem({
  name,
  children,
}: PropsWithChildren<{ name: string }>) {
  return (
    <div>
      <dt>{name}</dt>
      <dd>{children || "-"}</dd>
    </div>
  );
}

function Properties({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <dl className={className}>{children}</dl>;
}

Properties.Item = PropertiesItem;

export default Properties;
