import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Title = forwardRef(({
  children,
  variant = 'h1',
  className = '',
  responsive = false,
  ...props
}, ref) => {
  const variants = {
    h1: 'text-5xl font-black tracking-tight text-gray-900',
    h2: 'text-4xl font-black tracking-tight text-gray-900',
    h3: 'text-3xl font-black text-gray-900',
    h4: 'text-2xl font-black text-gray-900',
    h5: 'text-xl font-bold text-gray-900',
    h6: 'text-lg font-bold text-gray-900',
    // Variantes específicas para diferentes contextos
    'page-title': 'text-5xl font-black tracking-tight text-gray-900',
    'section-title': 'text-3xl font-black text-gray-900',
    'card-title': 'text-2xl font-black text-gray-900',
    'modal-title': 'text-xl font-bold text-gray-900',
    'subtitle': 'text-xl text-gray-500 font-light',
    // Variantes responsive
    'page-title-responsive': 'text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900',
    'section-title-responsive': 'text-2xl sm:text-3xl font-black text-gray-900',
  };

  const responsiveVariants = {
    h1: 'text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900',
    h2: 'text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900',
    h3: 'text-xl sm:text-2xl md:text-3xl font-black text-gray-900',
    h4: 'text-lg sm:text-xl md:text-2xl font-black text-gray-900',
    h5: 'text-base sm:text-lg md:text-xl font-bold text-gray-900',
    h6: 'text-sm sm:text-base md:text-lg font-bold text-gray-900',
    'page-title': 'text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900',
    'section-title': 'text-2xl sm:text-3xl font-black text-gray-900',
    'card-title': 'text-lg sm:text-xl md:text-2xl font-black text-gray-900',
    'modal-title': 'text-base sm:text-lg md:text-xl font-bold text-gray-900',
    'subtitle': 'text-base sm:text-lg md:text-xl text-gray-500 font-light',
  };

  const selectedVariant = responsive && responsiveVariants[variant]
    ? responsiveVariants[variant]
    : variants[variant];

  const Component = variant.startsWith('h') && variant.length === 2 ? variant : 'div';

  return (
    <Component
      ref={ref}
      className={cn(selectedVariant, className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Title.displayName = 'Title';

export default Title;
