import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

// Constants
import { ETHEREUM_CLIENT, projectId, theme, WAGMI_CLIENT } from './data/constants';

// Components
import Header from './components/Header/Header';
import Home from './components/Home/Home';

// Web3Modal
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig } from 'wagmi';

import './App.css';

function App() {
	return (
		<>
			<ChakraProvider theme={theme}>
				<WagmiConfig client={WAGMI_CLIENT}>
					<Header />
					<Home />
				</WagmiConfig>
			</ChakraProvider>
			<Web3Modal projectId={projectId} ethereumClient={ETHEREUM_CLIENT} />
		</>
	);
}

export default App;
