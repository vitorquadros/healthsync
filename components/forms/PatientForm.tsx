'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import { FormFieldType } from '@/@types/formTypes';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';

export function PatientForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Olá 👋</h1>
          <p className="text-dark-700">Agende sua primeira consulta.</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Nome completo"
          placeholder="João da Silva"
          iconSrc="/assets/icons/user.svg"
          iconAlt="Usuário"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="E-mail"
          placeholder="joaodasilva@me.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="E-mail"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Telefone"
          placeholder="(99) 99999-9999"
        />

        <SubmitButton isLoading={isLoading}>Comece já</SubmitButton>
      </form>
    </Form>
  );
}

export default PatientForm;
