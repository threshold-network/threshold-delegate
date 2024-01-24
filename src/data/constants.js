import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// Smart Contracts ABI
import T_TOKEN from '../data/t_token.json';
import T_STAKING from '../data/t_staking.json';

// --------------------------------------
// CONFIGURACIÓN DEL SMART CONTRACT
// --------------------------------------

export const API_URL = "https://api.studio.thegraph.com/query/24143/main-threshold-subgraph/0.0.7"

// Address del Smart Contract desplegado en la Blockchain
export const SC_ADDRESS = '0xCdF7028ceAB81fA0C6971208e83fa7872994beE5'; // T-TOKEN
export const SC_STAKING_ADDRESS = '0x01B67b1194C75264d06F808A921228a95C765dd7'; // T-STAKING

// ABI del Smart Contract
export const SC_ABI = T_TOKEN;
export const SC_STAKING_ABI = T_STAKING;

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
