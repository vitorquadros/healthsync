import { decryptKey } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const encryptedKey = req.cookies.get('accessKey');

  if (!encryptedKey) return NextResponse.redirect(new URL('/', req.url));

  const accessKey = encryptedKey && decryptKey(encryptedKey.value);

  if (accessKey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY)
    return NextResponse.redirect(new URL('/', req.url));

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
