import { type PropsWithChildren } from "react";

import Icon from "@/app/_components/ui/Icon";

function PropertiesItem({
  className,
  name,
  iconName,
  children,
}: PropsWithChildren<{ className?: string; iconName?: string; name: string }>) {
  return (
    <div className={className}>
      <dt>
        {iconName ? <Icon name={iconName} /> : null}
        {name}
      </dt>
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
