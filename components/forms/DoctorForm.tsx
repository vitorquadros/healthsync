'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import { FormFieldType } from '@/@types/formTypes';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { DoctorFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import FileUploader from '../FileUploader';
import { createDoctor } from '@/lib/actions/doctor.actions';

export function DoctorForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: '',
      avatar: [],
    },
  });

  async function onSubmit({
    name,
    avatar,
  }: z.infer<typeof DoctorFormValidation>) {
    setIsLoading(true);

    const blobFile = new Blob([avatar[0]], {
      type: avatar[0].type,
    });

    const formData = new FormData();
    formData.append('blobFile', blobFile);
    formData.append('fileName', avatar[0].name);

    try {
      const doctorData = {
        name,
        avatar: formData,
      };

      const doctor = await createDoctor(doctorData);

      if (doctor) router.push('/admin/doctors');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Cadastro de médico(a)</h1>
          <p className="text-dark-700">
            Cadastre um novo profissional no HealthSync.
          </p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Nome completo"
          placeholder="Mauricio Costa"
          iconSrc="/assets/icons/user.svg"
          iconAlt="Usuário"
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="avatar"
          label="Foto de perfil"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <SubmitButton isLoading={isLoading}>Cadastrar</SubmitButton>
      </form>
    </Form>
  );
}

export default DoctorForm;
