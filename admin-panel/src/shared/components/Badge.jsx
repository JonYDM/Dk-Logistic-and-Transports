import { cn } from '@/lib/utils';

const colorVariants = {
  primary: 'bg-yellow-600 text-white',
  secondary: 'bg-gray-900 text-white',
  neutral: 'bg-gray-200 text-gray-700',
  success: 'bg-gray-700 text-white',
  warning: 'bg-yellow-600 text-white',
  danger: 'bg-red-600 text-white',
  info: 'bg-gray-400 text-white',
  // Estados de servicios
  'en_transito': 'bg-yellow-600 text-white',
  'completado': 'bg-gray-900 text-white',
  'cancelado': 'bg-gray-400 text-white',
  'asignado': 'bg-gray-700 text-white',
  'solicitado': 'bg-gray-200 text-gray-700',
};

const sizeVariants = {
  xs: 'px-2 py-0.5 text-xs',
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

const Badge = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-wide',
        colorVariants[variant] || colorVariants.neutral,
        sizeVariants[size] || sizeVariants.sm,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
