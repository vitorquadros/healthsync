'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import { FormFieldType } from '@/@types/formTypes';
import SubmitButton from '../SubmitButton';
import { useEffect, useState } from 'react';
import { DoctorFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import FileUploader from '../FileUploader';
import { createDoctor, updateDoctor } from '@/lib/actions/doctor.actions';
import { Doctor } from '@/@types/appwrite.types';

interface Props {
  type?: 'create' | 'update';
  doctor?: Doctor;
  setIsOpen?: (state: boolean) => void;
}

export function DoctorForm({ type = 'create', doctor, setIsOpen }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      name: doctor?.name ?? '',
      avatar: [],
    },
  });

  async function createFileFromUrl(url: string, filename: string) {
    const response = await fetch(url);

    const blob = await response.blob();

    const file = new File([blob], filename, { type: blob.type });

    return file;
  }

  useEffect(() => {
    if (!doctor) return;
    createFileFromUrl(doctor.avatar, 'avatar').then((file) => {
      form.setValue('avatar', [file]);
    });
  }, [doctor, form]);

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
      let doctorData;
      if (type === 'create') {
        doctorData = {
          name,
          avatar: formData,
        };

        const doctor = await createDoctor(doctorData);

        if (doctor) router.push('/admin/doctors');
      } else if (type === 'update' && doctor) {
        doctorData = {
          doctorId: doctor.$id,
          avatarId: doctor.avatarId,
          doctor: {
            name,
            avatar: formData,
          },
        };

        const updatedDoctor = await updateDoctor(doctorData);

        if (updatedDoctor) {
          if (setIsOpen) setIsOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const translatedAction = type === 'create' ? 'Cadastrar' : 'Atualizar';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === 'create' && (
          <section className="mb-12 space-y-4">
            <h1 className="header">Cadastro de médico(a)</h1>
            <p className="text-dark-700">
              Cadastre um novo profissional no HealthSync.
            </p>
          </section>
        )}

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

        <SubmitButton isLoading={isLoading}>{translatedAction}</SubmitButton>
      </form>
    </Form>
  );
}

export default DoctorForm;
