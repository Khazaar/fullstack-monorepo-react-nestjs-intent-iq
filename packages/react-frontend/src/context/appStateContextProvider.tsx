import React, { createContext, useContext } from 'react';
import { AppStateModel } from '../models/appStateModel';

const AppStateContextDefaultValue = new AppStateModel();
const AppStateContext = createContext<AppStateModel>(
  AppStateContextDefaultValue
);

interface IAppStateContextProvider {
  children: React.ReactNode;
}

export const AppStateContextProvider: React.FC<IAppStateContextProvider> = ({
  children,
}) => {
  return (
    <AppStateContext.Provider value={AppStateContextDefaultValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppStateContext);
};
