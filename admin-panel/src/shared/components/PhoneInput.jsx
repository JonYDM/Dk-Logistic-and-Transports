import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PhoneInput = ({
  value = '',
  onChange,
  placeholder = 'Ej: 123 456 7890',
  className = '',
  error = false,
  required = false,
  disabled = false
}) => {
  const [countryCode, setCountryCode] = useState('+52');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Parsear el valor inicial si existe
  useEffect(() => {
    if (value) {
      // Si el valor empieza con +52, extraer el código y el número
      if (value.startsWith('+52')) {
        setCountryCode('+52');
        setPhoneNumber(value.substring(3).trim());
      } else if (value.startsWith('+1')) {
        setCountryCode('+1');
        setPhoneNumber(value.substring(2).trim());
      } else if (value.startsWith('+57')) {
        setCountryCode('+57');
        setPhoneNumber(value.substring(3).trim());
      } else {
        // Si no reconoce el código, usar +52 por defecto
        setCountryCode('+52');
        setPhoneNumber(value);
      }
    }
  }, [value]);

  const handleCountryCodeChange = (newCountryCode) => {
    setCountryCode(newCountryCode);
    const fullNumber = newCountryCode + phoneNumber;
    onChange(fullNumber);
  };

  const handlePhoneNumberChange = (newPhoneNumber) => {
    // Solo permitir números y espacios
    const cleanedNumber = newPhoneNumber.replace(/[^\d\s]/g, '');
    setPhoneNumber(cleanedNumber);
    const fullNumber = countryCode + cleanedNumber;
    onChange(fullNumber);
  };

  const countries = [
    { code: '+52', name: 'México', flag: '🇲🇽' },
    { code: '+1', name: 'Estados Unidos', flag: '🇺🇸' },
    { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  ];

  return (
    <div className={`flex gap-3 ${className}`}>
      {/* Selector de código de país */}
      <div className="w-32">
        <Select
          value={countryCode}
          onValueChange={handleCountryCodeChange}
          disabled={disabled}
        >
          <SelectTrigger className={error ? 'border-red-400' : ''}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span className="text-sm">{country.code}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Input del número de teléfono */}
      <div className="flex-1">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full px-6 py-4 border rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900 ${
            error ? 'border-red-400' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
