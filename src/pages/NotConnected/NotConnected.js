import { Box, Button, Center, Text } from '@chakra-ui/react';
import { useWeb3Modal } from '@web3modal/react';
import Footer from '../../components/Navigation/Footer/Footer';

/**
 * @name NotConnected
 * @description Displays a message to the user to connect their wallet.
 * @dev This component is used in the Home component.
 * @author Jesús Sánchez Fernández
 * @version 1.0.0
 */
const NotConnected = () => {
	const { isOpen, open } = useWeb3Modal();

	// Handle login with useWeb3Modal
	const handleConnect = () => {
		open();
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
						{!isOpen ? 'Connect wallet' : 'Connecting...'}
					</Button>
				</Box>
			</Center>
			<Footer />
		</>
	);
};

export default NotConnected;
