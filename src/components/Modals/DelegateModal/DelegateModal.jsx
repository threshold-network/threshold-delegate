import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { errorToast, infoToast, successToast } from '../../../utils/toastify';
import { useConnectWallet } from '@web3-onboard/react';

/**
 * @name DelegateModal
 * @description DelegateModal component that confirms the delegation of votes.
 * @dev This component is used in the Delegate component.
 * @param {function} onClose - The onClose function.
 * @param {boolean} isOpen - The isOpen boolean.
 * @param {object} selectedUser - The selectedUser object.
 * @param {string} selectedUser.address - The selectedUser's address.
 * @param {string} selectedUser.name - The selectedUser's name.
 * @param {number} balance - The user's balance.
 * @param {object} contract - The contract object.
 */
const DelegateModal = ({ onClose, isOpen, address, selectedUser, balance, tContract, stakedContract }) => {
	const lowerCaseAccountAddress = address.toLowerCase();
	
	const bgColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
	const toast = useToast();

	const handleDelegate = async () => {
		try {
			const tx = tContract 
				? await tContract.delegate(selectedUser.address) 
				: await stakedContract.delegateVoting(lowerCaseAccountAddress, selectedUser.address) 
			infoToast('Transaction sent', 'Please wait for the transaction', toast);
			onClose();
			await tx.wait();
			successToast('Transaction confirmed', 'Your votes has been delegated', toast);
		} catch (error) {
			errorToast('Transaction failed', 'Please try again', toast);
			console.log('🚀 ~ file: DelegateModal.js:26 ~ handleDelegate ~ error', error);
		}
	};
	return (
		<Modal size="xl" onClose={onClose} isOpen={isOpen} isCentered>
			<ModalOverlay bgColor="blackAlpha.900" />
			<ModalContent bgColor="#7D00FF" color="white">
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody>
					<Text textAlign="center" mb={4}>
						You will delegate <strong>{balance}</strong> votes to
					</Text>
					<Stack
						direction={{ base: 'column', md: 'row' }}
						spacing={4}
						align="center"
						border="1px"
						mt={4}
						rounded="xl"
						borderColor="whiteAlpha.400"
						shadow="dark-lg"
					>
						<Stack direction="column" spacing={2} w="100%">
							<Stack direction={{ base: "column", md: "row"}} spacing={2} align="center" p={4} w="100%">
								<Stack direction="column" align="center" w="100%">
									<Text align="center" fontWeight="bold">
										Username
									</Text>
									<Text align="center" fontSize="sm">
										{selectedUser.username}
									</Text>
								</Stack>
								<Stack direction="column" spacing={2} align="center" w="100%">
									<Text align="center" fontWeight="bold">
										Address
									</Text>
									<Text align="center" fontSize="sm">
										{selectedUser.address}
									</Text>
								</Stack>
							</Stack>
							<Box w="100%" py={2} bgColor={bgColor}>
								<Text align="center">
									<strong>Total votes</strong> {selectedUser.votes}
								</Text>
							</Box>
						</Stack>
					</Stack>
				</ModalBody>
				<ModalFooter>
					<SimpleGrid columns={2} w="100%" gap={2}>
						<Button py={6} w="100%" bgColor="red.400" color="white" onClick={onClose} _hover={{ fontWeight: 'bold' }}>
							CANCEL
						</Button>
						<Button
							py={6}
							w="100%"
                            color="white"
							bgColor="teal.400"
							onClick={handleDelegate}
							_hover={{ fontWeight: 'bold' }}
						>
							DELEGATE
						</Button>
					</SimpleGrid>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default DelegateModal;
