import { SearchParamProps } from '@/@types';
import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';
import { getUser } from '@/lib/actions/patient.actions';

const SuccessPage = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);
  const user = await getUser(userId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment?.primaryPhysician
  );

  Sentry.metrics.set('user_view_appointment-success', user.name);

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            width={1000}
            height={1000}
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="Sucesso"
            unoptimized
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            A{' '}
            <span className="text-green-500">solicitação da sua consulta</span>{' '}
            foi realizada com sucesso!
          </h2>

          <p>Você receberá uma confirmação em breve.</p>
        </section>

        <section className="request-details">
          <p>Detalhes da solicitação:</p>
          <div className="flex items-center gap-3">
            {doctor && (
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={100}
                height={100}
                className="size-6"
              />
            )}

            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>

          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="Calendário"
              width={24}
              height={24}
            />
            <p>{`${formatDateTime(appointment.schedule).dateOnly} às ${
              formatDateTime(appointment.schedule).timeOnly
            }`}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Nova consulta
          </Link>
        </Button>

        <p className="copyright">© {new Date().getFullYear()} HealthSync</p>
      </div>
    </div>
  );
};

export default SuccessPage;
