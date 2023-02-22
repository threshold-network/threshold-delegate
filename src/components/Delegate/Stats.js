import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { NULL_ADDRESS } from '../../data/constants';

/**
 * @name Stats
 * @description Stats component that displays the user's votes and allows them to delegate them.
 * @dev This component is used in the Delegate component.
 * @param {object} data - The user's data.
 * @param {number} data.balance - The user's balance.
 * @param {number} data.votes - The user's votes.
 * @param {string} data.delegates - The user's delegates.
 * @author Jesús Sánchez Fernández
 * @version 1.0.0
 */
const Stats = ({ data }) => {
	const bgColorTop = useColorModeValue('blackAlpha.200', '#7D00FF');
	return (
		<Box bgColor={bgColorTop} p={4} borderTopRadius="md">
			{data.delegates === NULL_ADDRESS ? (
				<>
					<Text>
						You have {data.balance} <strong>votes</strong>
					</Text>
					{/* 
					<Center>
						<Select size="sm" mt={2} w="20%">
							<option value="option1">All</option>
							<option value="option2">Stake 1</option>
							<option value="option3">Stake 2</option>
						</Select>
					</Center>
					*/}
				</>
			) : (
				<Text>
					You have <strong>{data.balance}</strong> votes to <br />
					<strong>{data.delegates}</strong>
				</Text>
			)}
		</Box>
	);
};

export default Stats;
