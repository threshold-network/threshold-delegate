import { Box, Center, Flex, Image, Spacer, useColorModeValue } from '@chakra-ui/react';
import ColorModeSwitcher from '../ColorModeSwitcher/ColorModeSwitcher';

const Header = () => {

	// Negativo de la imagen
	const filter = useColorModeValue('invert(1)', '');
	return (
		<Box>
			<Flex>
				<Spacer />
				<ColorModeSwitcher />
			</Flex>
			<Box mb={8}>
				<Center>
					<Image src="/images/logo.svg" width="30%" alt="logo" filter={filter} />
				</Center>
			</Box>
		</Box>
	);
};

export default Header;
