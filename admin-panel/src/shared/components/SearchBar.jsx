import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchBar = ({
  placeholder = "Buscar...",
  value,
  onChange,
  className = "",
  debounceMs = 300,
  showIcon = true,
  showClearButton = true
}) => {
  const [localValue, setLocalValue] = useState(value || '');

  // Debounced onChange callback
  const debouncedOnChange = useCallback(
    debounceMs > 0 ? debounce(onChange, debounceMs) : onChange,
    [onChange, debounceMs]
  );

  // Update local value when external value changes
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleInputChange = (newValue) => {
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="flex-1 relative">
      {showIcon && (
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className={cn(
          'w-full bg-white border border-gray-300 rounded-full font-medium text-gray-900 placeholder-gray-400 shadow-sm transition-all outline-none hover:border-gray-400 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-500/20',
          showIcon ? 'pl-14' : 'pl-6',
          showClearButton && localValue ? 'pr-12' : 'pr-6',
          'py-4',
          className
        )}
      />
      {showClearButton && localValue && (
        <button
          onClick={handleClear}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default SearchBar;
