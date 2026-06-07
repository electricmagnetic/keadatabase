import {
  WordPressPage as BaseWordPressPage,
  WordPressPosts as BaseWordPressPosts,
} from "shared/cms/wordpress";

const WORDPRESS_BASE = process.env.NEXT_PUBLIC_WORDPRESS_BASE;
const MISSING_WORDPRESS_BASE_ERROR_MESSAGE =
  "NEXT_PUBLIC_WORDPRESS_BASE is not defined";

if (!WORDPRESS_BASE) {
  throw new Error(MISSING_WORDPRESS_BASE_ERROR_MESSAGE);
}

export function WordPressPage(
  props: Omit<React.ComponentProps<typeof BaseWordPressPage>, "baseUrl">,
) {
  return <BaseWordPressPage {...props} baseUrl={WORDPRESS_BASE} />;
}

export function WordPressPosts(
  props: Omit<React.ComponentProps<typeof BaseWordPressPosts>, "baseUrl">,
) {
  return <BaseWordPressPosts {...props} baseUrl={WORDPRESS_BASE} />;
}
