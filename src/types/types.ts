import { LinkProps } from "next/link";

// BEGIN TYPES
/**
 * Object containign Next JS formatted values
 * for component.
 * @typedef {PageListProps} PageListProps
 * @property {string} href - The component path
 * @property {string} as - The in-browser URL to display
 *
 * ```jsx
 * <Link href="" as="" />
 * ```
 */
export interface PageListProps extends LinkProps {
  label?: string | undefined;
}
