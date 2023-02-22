import { useEffect, useState } from 'react';
import { Box, Button, Center, Heading, Spinner, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useContract } from 'wagmi';

// Utils
import { ethers } from 'ethers';
import { useDisconnect } from 'wagmi';

// Data
import { SC_ABI, SC_ADDRESS } from '../../data/constants';
import post from '../../data/325.json';

// Components
import Applicants from './Applicants';
import Stats from './Stats';

// Modal
import DelegateModal from '../DelegateModal/DelegateModal';

/**
 * @name Delegate
 * @description Delegate component that displays the user's votes and allows them to delegate them.
 * @dev This component is used in the Home component.
 * @param {string} address - The user's address.
 * @param {object} connector - The user's connector.
 * @author Jesús Sánchez Fernández
 * @version 1.0.0
 */
const Delegate = ({ address, connector }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedUser, setSelectedUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [needReload, setNeedReload] = useState(true);
	const [firstLoad, setFirstLoad] = useState(true);
	const [signedContract, setSignedContract] = useState(null);
	const { disconnect } = useDisconnect();

	const [data, setData] = useState({
		balance: 0,
		votes: 0,
		delegates: 'loading...',
		delegators: [],
	});

	const contract = useContract({
		address: SC_ADDRESS,
		abi: SC_ABI,
	});

	const handleClick = delegator => {
		setSelectedUser(delegator);
		onOpen();
	};

	useEffect(() => {
		const getData = async () => {
			setLoading(true);

			try {
				const signer = await connector.getSigner();
				const signedContract = contract.connect(signer);
				const [balance, delegates] = await Promise.all([
					signedContract.balanceOf(address),
					signedContract.delegates(address),
				]);

				const totalPosts = post.post_stream.posts;
				const delegators = [];
				const votesPromises = [];

				const regex = /0x[a-fA-F0-9]{40}/g;
				for (const post of totalPosts) {
					const { cooked } = post;
					const found = cooked.match(regex);
					if (found) {
						const address = found[0];
						delegators.push({ username: post.username, address });
						votesPromises.push(signedContract.getVotes(address));
					}
				}

				const votes = await Promise.all(votesPromises);
				for (let i = 0; i < delegators.length; i++) {
					delegators[i].votes = Number(ethers.utils.formatEther(votes[i])).toFixed(2);
				}

				// Wei to Ether
				let balanceFixed = ethers.utils.formatEther(balance);

				setData({
					balance: Number(balanceFixed),
					delegates,
					delegators,
				});
				setSignedContract(signedContract);
				if (firstLoad) setFirstLoad(false);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
				setNeedReload(false);
			}
		};

		needReload && !loading && connector && getData();
	}, [address, connector, contract, loading, needReload, firstLoad]);

	useEffect(() => {
		const reloadData = async () => {
			setNeedReload(true);
		};

		const interval = setInterval(reloadData, 5000);
		return () => clearInterval(interval);
	}, []);

	const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');

	return (
		<>
			<Center>
				<Box
					textAlign="center"
					border="1px"
					borderColor={borderColor}
					rounded="lg"
					p={4}
					px={8}
					shadow="dark-lg"
				>
					<Heading my={2}>Change your delegate</Heading>
					<Text>Select a community member to represent you. You can change this at any time.</Text>
					{loading && firstLoad && (
						<>
							<Text textAlign="center" fontWeight="bold" my={4}>
								Loading...
							</Text>
							<Center>
								<Spinner size="lg" my={6} />
							</Center>
						</>
					)}
					{data && (
						<Stack
							direction="column"
							spacing={4}
							my={4}
							border="1px"
							borderColor={borderColor}
							rounded="md"
							shadow="sm"
						>
							<Stats data={data} />
							<Applicants delegators={data.delegators} handleClick={handleClick} />
						</Stack>
					)}

					<Button variant="ghost" onClick={() => disconnect()}>
						Disconnect
					</Button>
				</Box>
			</Center>
			{selectedUser && (
				<DelegateModal
					isOpen={isOpen}
					onClose={onClose}
					selectedUser={selectedUser}
					balance={data.balance}
					contract={signedContract}
				/>
			)}
		</>
	);
};

export default Delegate;
