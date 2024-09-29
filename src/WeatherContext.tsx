import React, { createContext, useContext, useState } from 'react';

interface WeatherContextProps {
  unit: string;
  toggleUnit: () => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error("useWeatherContext must be used within WeatherProvider");
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<string>('Celsius');

  const toggleUnit = () => {
    setUnit(unit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
  };

  return (
    <WeatherContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};
