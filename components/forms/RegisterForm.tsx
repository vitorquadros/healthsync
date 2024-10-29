'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import { FormFieldType } from '@/@types/formTypes';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { PatientFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { registerPatient } from '@/lib/actions/patient.actions';
import { User } from '@/@types';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from '@/constants';
import { Label } from '../ui/label';
import { SelectItem } from '../ui/select';
import Image from 'next/image';
import FileUploader from '../FileUploader';
import { Doctor } from '@/@types/appwrite.types';

interface Props {
  user: User;
  doctors: Doctor[];
}

export function RegisterForm({ user, doctors }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      // @ts-expect-error allergies is optional, ignore error
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const hasDoctors = doctors && doctors.length > 0;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Bem-vindo(a)!</h1>
          <p className="text-dark-700">Nos conte mais sobre você.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações pessoais</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          placeholder="João da Silva"
          label="Nome completo"
          iconSrc="/assets/icons/user.svg"
          iconAlt="Usuário"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Data de nascimento"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gênero"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex gap-6 flex-wrap"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((gender) => (
                    <div key={gender} className="radio-group">
                      <RadioGroupItem value={gender} id={gender} />
                      <Label htmlFor={gender} className="cursor-pointer">
                        {gender}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Endereço"
            placeholder="Rua dos lobos, 135, Centro, São Paulo - SP"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Ocupação"
            placeholder="Engenheiro de Software"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Nome do contato de emergência"
            placeholder="Nome da mãe"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Telefone do contato de emergência"
            placeholder="(99) 99999-9999"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações médicas</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Médico(a) principal"
          placeholder="Selecione um médico(a)"
        >
          {hasDoctors ? (
            doctors.map((doctor) => (
              <SelectItem
                key={doctor.name}
                value={doctor.name}
                className="cursor-pointer"
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.avatar}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))
          ) : (
            <p className="text-14-regular ml-2 py-2">
              Nenhum profissional encontrado. Por favor, entre em contato com a
              administração.
            </p>
          )}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Seguradora"
            placeholder="Cruz Azul Seguros"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="Número da apólice"
            placeholder="ABC123456789"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Alergias (se possuir)"
            placeholder="Amendoim, Penicilina, Pólen"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Tratamento atual (se possuir)"
            placeholder="Ibuprofeno 200mg, Paracetamol 500mg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Histórico médico familiar"
            placeholder="Mãe tinha diabetes, Pai teve depressão"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Histórico médico passado"
            placeholder="Apendicectomia, Endoscopia"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identificação e verificação</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Tipo de identificação"
          placeholder="Selecione um tipo de identificação"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type} className="cursor-pointer">
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="Número da identificação"
          placeholder="123456789"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Cópia escaneada do documento de identificação"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader
                files={field.value}
                onChange={field.onChange}
                multiple
              />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consentimento e privacidade</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="Eu concordo com o tratamento médico"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="Eu concordo com a divulgação de informações"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="Eu concordo com a politica de privacidade"
        />

        <SubmitButton isLoading={isLoading}>Comece já</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
