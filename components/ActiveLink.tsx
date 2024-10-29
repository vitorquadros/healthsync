'use client';

// import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  label: string;
  className?: string;
}

const ActiveLink = ({ href, label, className }: Props) => {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <p className={className + ' ' + (pathname === href ? 'underline' : '')}>
        {label}
      </p>
    </Link>
  );
};

export default ActiveLink;
