"use client";

import React, { createContext, useContext, useReducer } from "react";

// Define the shape of your context state
interface Filters {
  city: string | null;
  region: string | null;
  udos: Udo[];
  specialities: Speciality[];
  descrittori: Descrittore[];
  discipline: boolean;
  branche: boolean;
}

// Define the actions for your reducer
type FiltersAction =
  | { type: "SET_CITY"; payload: string | null }
  | { type: "SET_REGION"; payload: string | null }
  | { type: "SET_UDO"; payload: Udo[] }
  | { type: "SET_SPECIALITIES"; payload: Speciality[] }
  | { type: "SET_DESCRITTORI"; payload: Descrittore[] }
  | { type: "SET_DISCIPLINE"; payload: boolean }
  | { type: "SET_BRANCHE"; payload: boolean }
  | { type: "RESET_FILTERS" };

// Define the initial state
const initialState: Filters = {
  city: null,
  region: null,
  udos: [],
  specialities: [],
  descrittori: [],
  discipline: false,
  branche: false,
};

// Create the context
const FiltersContext = createContext<{
  state: Filters;
  dispatch: React.Dispatch<FiltersAction>;
}>({ state: initialState, dispatch: () => null });

// Define the reducer function
function filtersReducer(state: Filters, action: FiltersAction): Filters {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_REGION":
      return { ...state, region: action.payload };
    case "SET_UDO":
      return { ...state, udos: action.payload };
    case "SET_SPECIALITIES":
      return { ...state, specialities: action.payload };
    case "SET_DESCRITTORI":
      return { ...state, descrittori: action.payload };
    case "SET_DISCIPLINE":
      return { ...state, discipline: action.payload };
    case "SET_BRANCHE":
      return { ...state, branche: action.payload };
    case "RESET_FILTERS":
      return initialState;
    default:
      return state;
  }
}

// CREATE PROVIDER COMPONENT
export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  return (
    <FiltersContext.Provider value={{ state, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
};

// Hook to use the filters context
export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};

// Compare the current state with the initial state
export function hasFilterChanges(currentState: Filters): boolean {
  console.info(hasFilterChanges.name);

  console.log("Current state:", currentState);
  console.log("Initial state:", initialState);

  if (currentState == initialState) return false;
  return true;
}
