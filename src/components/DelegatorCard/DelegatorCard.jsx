import { Box, Stack, Text, useColorModeValue, Icon, Center, Tooltip } from '@chakra-ui/react';
import { BiMessageAltDetail } from 'react-icons/bi';

/**
 * @name DelegatorCard
 * @description DelegatorCard component that displays the delegator's data.
 * @dev This component is used in the Delegates component.
 * @param {object} delegator - The delegator.
 * @param {string} delegator.username - The delegator's username.
 * @param {string} delegator.address - The delegator's address.
 * @param {number} delegator.votes - The delegator's votes.
 * @param {function} handleClick - The handleClick function.
 */
const DelegatorCard = ({ delegator, handleClick }) => {
	const { username, address, votes } = delegator;

	// Cut the address
	const cutAddress = address.slice(0, 6) + '...' + address.slice(-4);

	const bgColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
	const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
	const bgHoverColor = useColorModeValue('rgba(125,0,255,0.2)', 'whiteAlpha.200');
	const badgedColor = useColorModeValue('blackAlpha.200', '#7D00FF');

	const FORUM_LINK = 'https://forum.threshold.network/t/threshold-dao-delegates/325/';

	return (
		<Stack
			direction="column"
			spacing={0}
			border="1px"
			borderColor={borderColor}
			rounded="md"
			m={1}
			p={2}
			minW="14rem"
			bgColor={bgColor}
			shadow="md"
			_hover={{ bgColor: bgHoverColor, transition: 'all 0.3s ease-in-out', cursor: 'pointer' }}
		>
			<Stack direction="column" spacing={0} w="100%" onClick={() => handleClick(delegator)}>
				<Box>
					<Text fontWeight="bold" w="100%">
						{username}
					</Text>
					<Text fontSize="sm" pb={2}>
						{cutAddress}
					</Text>
				</Box>

				<Box bgColor={badgedColor} rounded="xl" py={1}>
					<Text fontSize="sm">
						<strong>Votes: </strong>
						{votes}
					</Text>
				</Box>
			</Stack>
			<Box>
				<Tooltip label="Go to the forum post" fontSize="sm" hasArrow>
					<Center mt={2}>
						<a href={`${FORUM_LINK}${delegator.post_number}`} target="_blank" rel="noreferrer">
							<Icon as={BiMessageAltDetail} w={6} h={6} color="#7D00FF" />
						</a>
					</Center>
				</Tooltip>
			</Box>
		</Stack>
	);
};

/*
<a href={`${FORUM_LINK}${delegator.post_number}`} target="_blank" rel="noreferrer">
				<Icon as={BiMessageAltDetail} w={6} h={6} color="#7D00FF" />
			</a>
			*/

export default DelegatorCard;
