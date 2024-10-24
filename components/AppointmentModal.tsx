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
import AppointmentForm from './forms/AppointmentForm';
import { Appointment } from '@/@types/appwrite.types';

interface Props {
  type: 'schedule' | 'cancel';
  patientId: string;
  userId: string;
  appointment?: Appointment;
}

const AppointmentModal = (props: Props) => {
  const { type, patientId, userId, appointment } = props;

  const [isOpen, setIsOpen] = useState(false);

  const translatedType = type === 'schedule' ? 'Agendar' : 'Cancelar';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`${type === 'schedule' && 'text-green-500'}`}
        >
          {translatedType}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle>{translatedType} consulta</DialogTitle>
          <DialogDescription>
            Por favor, preencha os seguintes detalhes para{' '}
            {translatedType.toLowerCase()} a consulta
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
