import { DataTable } from '@/components/table/DataTable';
import StatCard from '@/components/StatCard';
import { columns } from '@/components/table/columns';
import { getRecentAppointmentsList } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import Link from 'next/link';
import ActiveLink from '@/components/ActiveLink';

const AdminPage = async () => {
  const appointments = await getRecentAppointmentsList();

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
          <h1 className="header">Bem-vindo(a)!</h1>
          <p className="text-dark-700">
            Comece o dia gerenciando novas consultas
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Consultas agendadas"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Consultas pendentes"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Consultas canceladas"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable data={appointments.documents} columns={columns} />
      </main>
    </div>
  );
};

export default AdminPage;
