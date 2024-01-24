// React
import React from "react";

// Chakra UI
import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";

// React Icons
import { FaMoon, FaSun } from "react-icons/fa";

/**
 * @name ColorModeSwitcher
 * @description ColorModeSwitcher component that allows the user to switch between light and dark mode.
 * @dev This component is used in the Header component.
 */
const ColorModeSwitcher = (props) => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    return (
        <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            marginLeft="2"
            onClick={toggleColorMode}
            icon={<SwitchIcon />}
            {...props}
        />
    );
};

export default ColorModeSwitcher;
