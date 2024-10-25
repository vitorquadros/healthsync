import DoctorForm from '@/components/forms/DoctorForm';
import Image from 'next/image';

export default async function NewDoctor() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="Paciente"
            className="mb-12 h-10 w-fit"
          />

          <DoctorForm />

          <p className="copyright mt-10 py-12">
            © {new Date().getFullYear()} HealthSync
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="Consulta"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
