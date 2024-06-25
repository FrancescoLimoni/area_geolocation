"use client";

import React, { createContext } from "react";

interface User {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
}

// REDUCER ACTIONS
type UserAction = { type: "SET_USER"; payload: User } | { type: "RESET_USER" };

// INITIAL STATE
const initialState: User = {
  id: 0,
  firstname: null,
  lastname: null,
  email: null,
};

// CREATE CONTEXT
const UserContext = createContext<{
  state: User;
  dispatch: React.Dispatch<UserAction>;
}>({ state: initialState, dispatch: () => null });

// REDUCER
function userReducer(state: User, action: UserAction): User {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "RESET_USER":
      return initialState;
    default:
      return state;
  }
}

// PROVIDER COMPONENT
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// USER HOOK
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
