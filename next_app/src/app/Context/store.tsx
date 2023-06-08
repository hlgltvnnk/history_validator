'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { HistoryValidatorProgram } from '../../../lib';

import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'
import { Keypair } from "@solana/web3.js";
import { Reporter, UserType } from '@/common/types';

interface ISharedState {
  program?: HistoryValidatorProgram;
  wallet?: NodeWallet;
  associationName?: string;
  reporter?: Reporter;
  userType?: UserType;
  factFilter?: string;
}

interface IAppContext {
  sharedState: ISharedState;
  setSharedState: React.Dispatch<React.SetStateAction<ISharedState>>;
  appInit: boolean,
  setAppInit: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultSharedState = {
  program: undefined,
  wallet: undefined,
  associationName: undefined,
  reporter: undefined,
  factFilter: undefined,
};

const defaultContextState = {
  sharedState: defaultSharedState,
  setSharedState: () => undefined,
  appInit: false,
  setAppInit: () => undefined,
};

const AppContext = createContext<IAppContext>(defaultContextState);

export function AppProvider({ children }: PropsWithChildren) {
  const [sharedState, setSharedState] = useState<ISharedState>(defaultSharedState);
  const [appInit, setAppInit] = useState(false);

  useEffect(() => {
    const { program, wallet, reporter, associationName, userType } = sharedState;
    (!program || !wallet || !associationName || !userType || (userType === UserType.Reporter && !reporter)) ?
      setAppInit(false) : setAppInit(true);
  }, [sharedState]);

  return (
    <AppContext.Provider value={{ sharedState, setSharedState, appInit, setAppInit }}>
      {children}
    </AppContext.Provider>
  )
}

export const useDataContext = () => useContext(AppContext);
