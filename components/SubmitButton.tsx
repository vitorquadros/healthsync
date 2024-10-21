import Image from 'next/image';
import { Button } from './ui/button';

interface Props {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = (props: Props) => {
  const { isLoading, className, children } = props;

  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? 'shad-primary-btn w-full'}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="Carregando..."
            width={24}
            height={24}
            className="animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
