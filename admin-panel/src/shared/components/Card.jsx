import { cn } from '@/lib/utils';

const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10',
    xl: 'p-12',
  };

  const hoverClasses = hover
    ? 'hover:bg-white/80 hover:shadow-xl transition-all duration-300 cursor-pointer'
    : '';

  return (
    <div
      className={cn(
        'bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-200',
        paddingClasses[padding],
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
