import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import DelegatorCard from '../DelegatorCard/DelegatorCard';

/**
 * @name Applicants
 * @description Applicants component that displays the applicants to the delegate.
 * @dev This component is used in the Delegate component.
 * @param {object} delegators - The delegators.
 * @param {function} handleClick - The handleClick function.
 * @author Jesús Sánchez Fernández
 * @version 1.0.0
 */
const Applicants = ({ delegators, handleClick }) => {
	return (
		<Box>
			<Heading size="md" mb={2}>
				Delegates
			</Heading>
			<SimpleGrid columns={[1, 2, 3, 4, 5]} maxH="25rem" overflowY="auto" px={6} mb={4}>
				{delegators.map((delegator, index) => (
					<DelegatorCard key={index} delegator={delegator} handleClick={handleClick} />
				))}
			</SimpleGrid>
		</Box>
	);
};

export default Applicants;
