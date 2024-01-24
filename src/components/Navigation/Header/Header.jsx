// Chakra UI
import { Box, Center, Flex, Image, Spacer, useColorModeValue } from "@chakra-ui/react";

// Components
import ColorModeSwitcher from "../../ColorModeSwitcher/ColorModeSwitcher";

/**
 * @name Header
 * @description Header component that displays the header of the app.
 */
const Header = () => {
    // Needed to invert the logo when the color mode is dark
    const filter = useColorModeValue("invert(1)", "");
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
