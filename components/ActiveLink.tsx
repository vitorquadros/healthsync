'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  label: string;
}

const ActiveLink = ({ href, label }: Props) => {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <p
        className={clsx('text-16-semibold', {
          underline: pathname === href,
        })}
      >
        {label}
      </p>
    </Link>
  );
};

export default ActiveLink;
