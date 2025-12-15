import Link from "next/link";
import type { ReactNode } from "react";
import css from "./ButtonLink.module.css";

type BtnLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({ href, children, className }: BtnLinkProps) {
  return (
    <Link href={href} className={`${css.btn} ${className ?? ""}`}>
      {children}
    </Link>
  );
}
