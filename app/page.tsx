import { SearchParamProps } from '@/@types';
import PasskeyModal from '@/components/PasskeyModal';
import PatientForm from '@/components/forms/PatientForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            priority
            height={1000}
            width={1000}
            alt="Logo"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © {new Date().getFullYear()} HealthSync
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.jpg"
        height={1000}
        width={1000}
        unoptimized
        alt="Capa"
        className="side-img max-w-[50%]"
        priority
      />
    </div>
  );
}
