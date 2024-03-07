import classNames from "classnames";
import Link from "next/link";

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb my-0">
        {breadcrumbs.map((breadcrumb, index, array) => {
          const isLast = Boolean(index === array.length - 1);

          return (
            <li
              aria-current={isLast ? "page" : undefined}
              className={classNames("breadcrumb-item", isLast && "active")}
              key={breadcrumb.name}
            >
              {breadcrumb.href ? (
                <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
              ) : (
                breadcrumb.name
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
