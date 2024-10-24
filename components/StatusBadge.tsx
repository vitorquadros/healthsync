import { Status } from '@/@types';
import { StatusIcon } from '@/constants';
import clsx from 'clsx';
import Image from 'next/image';

const StatusBadge = ({ status }: { status: Status }) => {
  let translatedStatus;

  switch (status) {
    case 'scheduled':
      translatedStatus = 'Agendada';
      break;
    case 'pending':
      translatedStatus = 'Pendente';
      break;
    case 'cancelled':
      translatedStatus = 'Cancelada';
      break;
    default:
      break;
  }

  return (
    <div
      className={clsx('status-badge', {
        'bg-green-600': status === 'scheduled',
        'bg-blue-600': status === 'pending',
        'bg-red-600': status === 'cancelled',
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx('text-12-semibold capitalize', {
          'text-green-500': status === 'scheduled',
          'text-blue-500': status === 'pending',
          'text-red-500': status === 'cancelled',
        })}
      >
        {translatedStatus}
      </p>
    </div>
  );
};

export default StatusBadge;
