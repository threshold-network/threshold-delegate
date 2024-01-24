import { Box, Button, Center, Text } from '@chakra-ui/react';
import Footer from '../../components/Navigation/Footer/Footer';
import { useConnectWallet } from '@web3-onboard/react';

const NotConnected = ({ setAccount }) => {
	const [{ wallet, connecting }, connect ] = useConnectWallet();

	const { name, avatar } = wallet?.accounts[0].ens ?? {}
	const account = {
		chainId: 1,
		address: wallet?.accounts[0].address,
		ens: { name, avatar: avatar?.url }
	}

	// Handle login with useWeb3Modal
	const handleConnect = () => {
		connect()

		if (account) {
			setAccount(account)
		}
	};

	return (
		<>
			<Center mt={12} transform="translateY(50%)">
				<Box textAlign="center" border="1px" rounded="lg" p={6} borderColor="whiteAlpha.400" shadow="dark-lg">
					<Text mt={4}>Please connect your wallet to delegate your vote.</Text>
					<Button
						color="white"
						bgColor="#7D00FF"
						_hover={{ bgColor: 'rgba(125,0,255,0.8)' }}
						mt={4}
						onClick={handleConnect}
					>
						{!connecting ? 'Connect wallet' : 'Connecting...'}
					</Button>
				</Box>
			</Center>
			<Footer />
		</>
	);
};

export default NotConnected;
