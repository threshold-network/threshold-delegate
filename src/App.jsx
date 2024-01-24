// React
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

// Constants
import { theme } from './data/constants';

// Components
import Header from './components/Navigation/Header/Header';
import Home from './pages/Home/Home';

// Web3Modal
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import tahoModule from '@web3-onboard/taho'

// Styles
import './App.css';

const wcV2InitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: process.env.REACT_APP_WALLETCONNECT_ID,
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1],
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with WalletConnect
   */
  dappUrl: 'http://delegates.threshold.network'
}

const injected = injectedModule();
const coinbase = coinbaseModule();
const walletConnect = walletConnectModule(wcV2InitOptions)
const taho = tahoModule();

const wallets = [
  injected,
  taho,
  coinbase,
  walletConnect
]

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://cloudflare-eth.com/',
  },
]

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: '<svg>My App Icon</svg>',
  description: 'Example showcasing how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
}

const accountCenter = {
  enabled: false
}

const accountCenterOptions = {
  desktop: accountCenter,
  mobile: accountCenter
}

const web3Onboard = init({
  wallets,
  chains,
  appMetadata,
  accountCenter: accountCenterOptions
})

const OnboardProvider= ({ children }) => {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  );
};

/**
 * @description Renders the whole app.
*/
function App() {
	return (
		<>
      <OnboardProvider>
        <ChakraProvider theme={theme}>
          <Header />
          <Home />
        </ChakraProvider>
      </OnboardProvider>
		</>
	);
}

export default App;
