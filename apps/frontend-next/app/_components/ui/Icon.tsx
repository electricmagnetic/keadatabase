import classNames from "classnames";

export default function Icon({ name }: { name: string }) {
  return <i aria-hidden="true" className={classNames(`bi-${name}`, `me-2`)} />;
}
