'use client';

import { useState } from 'react';
import { Button, Link, Container, Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'
import { Wallet } from '@project-serum/anchor';
import { Keypair, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';

import { homePageBoxStyle } from './styles'
import { useDataContext } from './Context/store';
import { HistoryValidatorProgram } from "../../lib"
import { UserType } from '@/common/types';
import { createAssociation, getReporter, getUserType } from '@/common/programUtils';

const targetUrl = 'http://localhost:8899';
const programId = 'GQweAcDro4jXn1BLPjq6hjbi6YyZjL3aBThN8UFuBP5X';

enum AssociationVar {
  NONE,
  NEW = 'СТВОРИТИ',
  JOIN = 'ПІД\'ЄДАТИСЬ',
};

const Home: React.FC = () => {
  const { sharedState, setSharedState, appInit } = useDataContext();
  const { wallet, reporter } = sharedState;

  const [associationActive, setAssociationActive] = useState(Boolean(sharedState.associationName));
  const [walletActive, setWalletActive] = useState(Boolean(sharedState.wallet));

  const [associationId, setAssociationId] = useState('');
  const [assocStatus, setAssocStatus] = useState(AssociationVar.NONE);
  const [assocText, setAssocText] = useState('');
  const [assocLabel, setAssocLabel] = useState('');

  const onWalletConnectHandle = () => {

    const wallet = new PhantomWalletAdapter();
    const program = new HistoryValidatorProgram(programId, targetUrl, wallet);
    setSharedState({ program, wallet });
    setWalletActive(true);
  }

  const createNewAssociation = (name: string) => {
    const { program } = sharedState;
    if (!program)
      throw new Error("Program not initialized");

    createAssociation(program, name).then(() => {
      localStorage.setItem("association", name);
      setAssociationActive(true);
      setSharedState({ ...sharedState, userType: UserType.Admin, associationName: name });
    });
  };

  const fetchAssociation = (name: string) => {
    const { program } = sharedState;
    if (!program)
      throw new Error("Program not initialized");

    let association: PublicKey;
    try {
      association = program.findAssociationAddress(name)[0];
    }
    catch (e) {
      console.log(e);
      throw new Error("Cannot fetch association");
    }

    program.program.account.association.fetch(association).then(() => {
      setAssociationActive(true);
      localStorage.setItem("association", name);
    }, (e) => {
      console.log(e)
    });

    return true;
  };

  const onAssociationHandle = () => {
    const name = associationId;
    const { program, wallet, } = sharedState;
    if (!program || !wallet)
      throw new Error("Program not initialized");

    if (assocStatus === AssociationVar.NEW) {
      createNewAssociation(name);
    }
    else {
      fetchAssociation(name);
      getUserType(program, wallet, name).then((type) => {
        if (type !== UserType.Reporter) {
          setSharedState({ ...sharedState, userType: type, associationName: name });
          return;
        }
        getReporter(program, name, wallet.publicKey).then((reporter) => {
          setSharedState({ ...sharedState, associationName: name, reporter, userType: type });
        }, (e) => {
          console.log(e);
        });
      }, (e) => console.log(e));
    }

  };

  const associationButHandle = (v: AssociationVar) => {
    setAssocText(v as string);
    setAssocStatus(v);
    setAssocLabel(v as string);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={ homePageBoxStyle }>
        { !walletActive &&
          <Button variant="contained" onClick={ onWalletConnectHandle }>Connect to PhantomWallet</Button>
        }
      </Box>
      <Box
        sx={ homePageBoxStyle }>
        { walletActive &&
          <div>
            <Typography style={ { display: 'flex', fontWeight: 600, fontSize: 25, justifyContent: 'center' } }>
              Welcome to History Validator
            </Typography>
            <Typography style={ { fontWeight: 600, fontSize: 20, display: 'flex', justifyContent: 'center', paddingTop: 10 } }>
              Wallet: { wallet?.publicKey.toString() }
            </Typography>
          </div>
        }
      </Box>
      <Box>
        { appInit && reporter &&
          <div>
            <Typography
              style={ { display: 'flex', fontWeight: 600, fontSize: 25, justifyContent: 'center', paddingBottom: 15 } }
            >
              Reporter: { reporter.name }
            </Typography>
            <Typography
              style={ { display: 'flex', fontWeight: 600, fontSize: 25, justifyContent: 'center', paddingBottom: 15 } }
            >
              Type: { reporter.type as string }
            </Typography>
            <Typography
              style={ { display: 'flex', fontWeight: 600, fontSize: 25, justifyContent: 'center', paddingBottom: 15 } }
            >
              Status: { reporter.state as string }
            </Typography>
          </div>
        }
      </Box>
      <Box
        sx={ homePageBoxStyle }>
        { walletActive && !associationActive &&
          <Container>
            <Box
              sx={ { display: 'flex', justifyContent: 'center' } }
            >
              <Typography style={ { fontWeight: 600, fontSize: 20, paddingBottom: 15, paddingTop: 20 } }>
                Оберіть асоціацію
              </Typography>
            </Box>
            <Box sx={ { display: 'flex', justifyContent: 'center' } }>
              <Button
                sx={ { marginRight: 30, minWidth: 245 } }
                variant='contained'
                onClick={ () => associationButHandle(AssociationVar.NEW) }
              >
                Створити нову
              </Button>
              <Button
                sx={ { minWidth: 245 } }
                variant='contained'
                onClick={ () => associationButHandle(AssociationVar.JOIN) }
              >
                Під'єднатись до існуючої
              </Button>
            </Box>
            <Box sx={ { my: 4, display: 'flex', alignItem: 'center' } }>
              { assocStatus != AssociationVar.NONE &&
                <TextField sx={ { width: '100%', paddingRight: 1 } }
                  id="outlined-Association-name"
                  label={ assocLabel }
                  value={ associationId }
                  onChange={ (e) => setAssociationId(e.target.value) }
                />
              }
              { assocStatus != AssociationVar.NONE &&
                <Button variant='contained' onClick={ onAssociationHandle } sx={ { minWidth: 90 } }>
                  { assocText }
                </Button>
              }
            </Box>
          </Container>
        }
      </Box>
    </Container>
  );
};

export default Home;