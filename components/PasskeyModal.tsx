'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { decryptKey, encryptKey } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PasskeyModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const path = usePathname();

  const encryptedKey = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('accessKey='))
    ?.split('=')[1];

  useEffect(() => {
    if (!path) return;

    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setIsOpen(false);
      router.push('/admin');
    } else {
      setIsOpen(true);
    }
  }, [encryptedKey, path, router]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      document.cookie = `accessKey=${encryptedKey}; path=/; max-age=432000000`;
      setIsOpen(false);
    } else {
      setError('Chave de acesso inválida. Tente novamente.');
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    router.push('/');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Verificação de acesso
            <Image
              src="/assets/icons/close.svg"
              alt="Fechar"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Para acessar o painel administrativo, insira sua chave de acesso.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="shad-primary-btn w-full"
          >
            Acessar painel administrativo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
