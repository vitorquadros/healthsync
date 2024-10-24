'use client';

import { ColumnDef } from '@tanstack/react-table';
import StatusBadge from '../StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { Doctors } from '@/constants';
import Image from 'next/image';
import AppointmentModal from '../AppointmentModal';
import { Appointment } from '@/@types/appwrite.types';

export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: 'patient',
    header: 'Paciente',
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: 'Consulta',
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {`${formatDateTime(row.original.schedule).dateDay} às ${
          formatDateTime(row.original.schedule).timeOnly
        }`}
      </p>
    ),
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Médico(a)',
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );

      if (!doctor) return;

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={100}
            height={100}
            className="size-8"
          />

          <p className="whitespace-nowrap">Dr. {doctor.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Ações</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>
      );
    },
  },
];
