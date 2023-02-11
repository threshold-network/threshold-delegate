import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';

/**
 * @name DelegatorCard
 * @description DelegatorCard component that displays the delegator's data.
 * @dev This component is used in the Applicants component.
 * @param {object} delegator - The delegator.
 * @param {string} delegator.username - The delegator's username.
 * @param {string} delegator.address - The delegator's address.
 * @param {number} delegator.votes - The delegator's votes.
 * @param {function} handleClick - The handleClick function.
 * @author Jesús Sánchez Fernández
 * @version 1.0.0
 */
const DelegatorCard = ({ delegator, handleClick }) => {
	const { username, address, votes } = delegator;

	// Cut the address
	const cutAddress = address.slice(0, 6) + '...' + address.slice(-4);

	const bgColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
	const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
	const bgHoverColor = useColorModeValue('rgba(125,0,255,0.2)', 'whiteAlpha.200');
    const badgedColor = useColorModeValue('blackAlpha.200', '#7D00FF');

	return (
		<Stack
			direction="column"
			spacing={0}
			border="1px"
			borderColor={borderColor}
			rounded="md"
			m={2}
			p={4}
			minW="14rem"
			bgColor={bgColor}
			shadow="md"
			_hover={{ bgColor: bgHoverColor, transition: 'all 0.3s ease-in-out', cursor: 'pointer' }}
			onClick={() => handleClick(delegator)}
		>
			<Text fontWeight="bold" w="100%">
				{username}
			</Text>
			<Text fontSize="sm" pb={2}>{cutAddress}</Text>
			<Box bgColor={badgedColor} rounded="xl" py={1}>
				<Text fontSize="sm">
					<strong>Votes: </strong>
					{votes}
				</Text>
			</Box>
		</Stack>
	);
};

export default DelegatorCard;
