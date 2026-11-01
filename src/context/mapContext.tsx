import React, { createContext, useCallback, useMemo, useState } from "react";
import { Car, Driver, Step } from "../screens/map/BottomSheetLocation/types";

export type MapContextState = {
  car: Car | null;
  step: Step;
  driver: Driver | null;
  setCar: (car: Car | null) => void;
  setDriver: (driver: Driver | null) => void;
  setStep: (step: Step) => void;
  clear: () => void;
};

export const MapContext = createContext<MapContextState>({
  car: null,
  step: Step.Waypoint,
  driver: null,
  setCar: () => {},
  setDriver: () => {},
  setStep: () => {},
  clear: () => {},
});

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [car, setCar] = useState<Car | null>(null);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [step, setStep] = useState<Step>(Step.Waypoint);

  const clear = useCallback(() => {
    setCar(null);
    setDriver(null);
    setStep(Step.Waypoint);
  }, []);

  const contextValue = useMemo<MapContextState>(
    () => ({
      car,
      driver,
      step,
      setCar,
      setDriver,
      setStep,
      clear,
    }),
    [car, step, driver, clear],
  );

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};
