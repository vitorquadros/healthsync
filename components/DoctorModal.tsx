'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from './ui/button';
import { Doctor } from '@/@types/appwrite.types';
import DoctorForm from './forms/DoctorForm';

interface Props {
  doctor: Doctor;
  type: 'update' | 'delete';
}

const DoctorModal = ({ doctor, type }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const translatedType = type === 'update' ? 'Editar' : 'Excluir';
  const description =
    type === 'update'
      ? 'Por favor, preencha os seguintes detalhes para atualizar os dados do médico(a)'
      : 'Tem certeza que deseja excluir este médico(a) permanentemente?';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`${type === 'update' ? 'text-green-500' : 'text-red-500'}`}
        >
          {translatedType}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle>{translatedType} médico(a)</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DoctorForm type={type} doctor={doctor} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default DoctorModal;
