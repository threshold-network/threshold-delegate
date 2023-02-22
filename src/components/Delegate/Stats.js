import { Box, Center, Select, Text, useColorModeValue } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import { NULL_ADDRESS } from "../../data/constants";

/**
 * @name Stats
 * @description Stats component that displays the user's votes and allows them to delegate them.
 * @dev This component is used in the Delegate component.
 * @param {object} data - The user's data.
 * @param {number} data.balance - The user's balance.
 * @param {number} data.votes - The user's votes.
 * @param {string} data.delegates - The user's delegates.
 * @author Jesús Sánchez Fernández | WWW.JSANCHEZFDZ.ES
 * @version 1.0.0
 */
const Stats = ({ data, stakes }) => {
    const bgColorTop = useColorModeValue("blackAlpha.200", "#7D00FF");
    const [displayBalance, setDisplayBalance] = useState(data.balance);
    const [selectedOption, setSelectedOption] = useState("All");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        if (e.target.value === "All") {
            setDisplayBalance(data.balance);
        } else {
            const stake = stakes.find((stake) => stake.id === e.target.value);
            const parseBalance = BigInt(stake.totalStaked).toString();
            // Wei to Ether
            const etherBalance = Number(ethers.utils.formatEther(parseBalance)).toFixed(0);
            setDisplayBalance(etherBalance);
        }
    };

    return (
        <Box bgColor={bgColorTop} p={4} borderTopRadius="md">
            {data.delegates === NULL_ADDRESS ? (
                <>
                    <Text>
                        You have {displayBalance} <strong>votes</strong>
                    </Text>
                    {stakes.length > 0 && (
                        <Center>
                            <Select
                                size="sm"
                                mt={2}
                                w="20%"
                                textAlign="center"
                                value={selectedOption}
                                onChange={handleChange}>
                                <option value="All">All</option>
                                {stakes.map((stake) => {
                                    const address = stake.id;
                                    const cutAddress = address.slice(0, 10) + "..." + address.slice(-10);
                                    return (
                                        <option key={address} value={address}>
                                            {cutAddress}
                                        </option>
                                    );
                                })}
                            </Select>
                        </Center>
                    )}
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
