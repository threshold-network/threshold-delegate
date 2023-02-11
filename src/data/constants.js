import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';

import { configureChains, createClient } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import T_TOKEN from '../data/t_token.json';

// --------------------------------------
// CONFIGURACIÓN DEL SMART CONTRACT
// --------------------------------------

// Address del Smart Contract desplegado en la Blockchain
export const SC_ADDRESS = '0xCdF7028ceAB81fA0C6971208e83fa7872994beE5';

// ABI del Smart Contract
export const SC_ABI = T_TOKEN;

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

// ----------------------------------------------------------------
// ----------------------- Networks details -----------------------
// ----------------------------------------------------------------
export const NetworkDetails = {
	networkId: 1,
	blockScanTx: 'https://etherscan.io/tx/',
};

// ----------------------------------------------------------------
// --------------------- web3Modal Configuration ------------------
// ----------------------------------------------------------------

export const projectId = 'a6eab982737176333310b830422f0582';
const chains = [mainnet];

// Wagmi client
const { provider } = configureChains(chains, [walletConnectProvider({ projectId: projectId })]);

export const WAGMI_CLIENT = createClient({
	autoConnect: true,
	connectors: modalConnectors({ appName: 'Threshold delegate', chains }),
	provider,
});

export const ETHEREUM_CLIENT = new EthereumClient(WAGMI_CLIENT, chains);

export const WEB3MODAL_CONFIG = {
	theme: 'dark',
	accentColor: 'blackWhite',
};

// ----------------------------------------------------------------
// -----------------  Configuración de Chakra UI  -----------------
// ----------------------------------------------------------------
const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const styles = {
	global: props => ({
		body: {
			color: mode('gray.800', 'whiteAlpha.900')(props),
			bg: mode('white', 'black')(props),
		},
	}),
};

const components = {
	Drawer: {
		// setup light/dark mode component defaults
		baseStyle: props => ({
			dialog: {
				bg: mode('white', 'dark')(props),
			},
		}),
	},
};

export const theme = extendTheme({ config, components, styles });
