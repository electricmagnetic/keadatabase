/**
 * Pulsing grey placeholder for content that is still loading.
 *
 * Size it with `width` / `height` (any CSS length) so it reserves the same
 * space the real content will take, avoiding layout jump on load.
 */
export function Skeleton({
  width,
  height,
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={className ? `skeleton ${className}` : "skeleton"}
      style={{ width, height }}
    />
  );
}
