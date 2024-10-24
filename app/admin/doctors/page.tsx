import Image from 'next/image';
import Link from 'next/link';
import ActiveLink from '@/components/ActiveLink';

const DoctorsPage = async () => {
  // const doctors = await getDoctors()

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            height={32}
            width={162}
            className="h-8 w-fit"
          />
        </Link>

        <div className="flex gap-12 items-center">
          <ActiveLink href="/admin/doctors" label="Médicos(as)" />
          <ActiveLink href="/admin" label="Admin Dashboard" />
        </div>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Médicos(as) cadastrados</h1>
          <p className="text-dark-700">Gerencie os profissionais cadastrados</p>
        </section>

        {/* <DataTable data={appointments.documents} columns={columns} /> */}
      </main>
    </div>
  );
};

export default DoctorsPage;
