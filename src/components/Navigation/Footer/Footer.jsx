import { Box, chakra, Container, Image, Stack, Text, useColorModeValue, VisuallyHidden } from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

/**
 * @name SocialButton
 * @description SocialButton component that displays a social button.
 * @dev This component is used in the Footer component.
 * @param {string} children - The children (Icon).
 * @param {string} label - The label (VisuallyHidden)
 * @param {string} href - The href - Destination URL.
 */
const SocialButton = ({ children, label, href }) => {
    return (
        <chakra.button
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={href}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
            _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

/**
 * @name Footer
 * @description Footer component that displays the footer of the app.
 * @dev This component is used in the Layout component.
 * @author Jesús Sánchez Fernández | WWW.JSANCHEZFDZ.ES
 * @version 1.0.0
 */
const Footer = () => {
    return (
        <Box
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            color={useColorModeValue("gray.700", "gray.200")}
            w="100%"
            position="absolute"
            bottom={0}>
            <Container
                as={Stack}
                maxW={"6xl"}
                py={4}
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justify={{ base: "center", md: "space-between" }}
                align={{ base: "center", md: "center" }}>
                <Image src="/images/logo.svg" width="10%" alt="logo" filter={useColorModeValue("invert(1)", "")} />
                <Text>© 2024 Threshold Network. All rights reserved</Text>
                <Stack direction={"row"} spacing={6}>
                    <SocialButton label={"Twitter"} href={"#"}>
                        <FaTwitter />
                    </SocialButton>
                    <SocialButton label={"YouTube"} href={"#"}>
                        <FaYoutube />
                    </SocialButton>
                    <SocialButton label={"Instagram"} href={"#"}>
                        <FaInstagram />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
