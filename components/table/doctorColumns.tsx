'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Doctor } from '@/@types/appwrite.types';

export const doctorColumns: ColumnDef<Doctor>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex items-center gap-3">
          <Image
            src={data.avatar}
            alt={data.name}
            width={100}
            height={100}
            className="size-8"
          />

          <p className="whitespace-nowrap">Dr. {data.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Ações</div>,
    cell: ({ row: { original: data } }) => {
      console.log(data);
      return (
        <div className="flex gap-1">
          {/* <AppointmentModal
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
          /> */}
        </div>
      );
    },
  },
];
