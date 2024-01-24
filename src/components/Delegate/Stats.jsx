import { Box, Center, Select, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react";
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
 */
const Stats = ({ data, stakes, setSelectedStake }) => {
    // ------------------------------ Chakra UI ------------------------------ //
    const bgColorTop = useColorModeValue("blackAlpha.200", "#7D00FF");
    const [selectedOption, setSelectedOption] = useState("All");

    // -------------------------- Handle functions --------------------------- //
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        if (value === "Balance") setSelectedStake(null);
        else {
            const stake = stakes.find((stake) => stake.idStake === value);
            setSelectedStake(stake);
        }
    };

    const borderColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");
    const haveStakes = stakes.length > 0;

    // ------------------------------ Render --------------------------------- //
    return (
        <Box bgColor={bgColorTop} p={4} borderTopRadius="md">
            <Text>
                You have {data.balance} liquid T <strong>votes</strong> to delegate.
            </Text>
            {haveStakes &&
                <>
                    <Text>
                        You have {data.stakedBalance} staked T <strong>votes</strong> to delegate.
                    </Text>
                    <Center>
                        <Select
                            size="sm"
                            mt={2}
                            textAlign="center"
                            value={selectedOption}
                            onChange={handleChange}
                            w={["80%", "70%", "40%"]}
                            placeholder="-- Select to delegate --">
                            <option value="Balance">Liquid | Balance: {data.balance}</option>
                            {stakes.map((stake) => {
                                const address = stake.idStake;
                                const cutAddress = address.slice(0, 6) + "..." + address.slice(-4);
                                const totalStaked = stake.totalStaked;
                                return (
                                    <option key={address} value={address}>
                                        ID: {cutAddress} | Balance: {totalStaked}
                                    </option>
                                );
                            })}
                        </Select>
                    </Center>
                </>
            }
            <Center mt={2} w="100%">
                <SimpleGrid minChildWidth="125px" spacing={4} w="100%">
                    <Center>
                        <Stack
                            direction="column"
                            border="1px"
                            p={2}
                            rounded="lg"
                            borderColor={borderColor}
                            spacing={0}
                            w={haveStakes ? "auto" : "25vw"}>
                            <Box>
                                <Text fontWeight="bold">Liquid T</Text>
                                <Text>{data.balance}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold">Delegatee</Text>
                                {data.delegates === NULL_ADDRESS ? (
                                    <Text>Not delegated</Text>
                                ) : (
                                    <Text>{data.delegates}</Text>
                                )}
                            </Box>
                        </Stack>
                    </Center>
                    {stakes.map((stake, index) => {
                        const cutStakeAddress = stake.idStake.slice(0, 6) + "..." + stake.idStake.slice(-4);
                        const cutDelegateAddress = stake.delegatee.slice(0, 6) + "..." + stake.delegatee.slice(-4);
                        return (
                            <Stack
                                direction="column"
                                border="1px"
                                key={index}
                                p={2}
                                spacing={0}
                                rounded="lg"
                                borderColor={borderColor}>
                                <Box>
                                    <Text fontWeight="bold">Stake ID</Text>
                                    <Text>{cutStakeAddress}</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">Delegatee</Text>
                                    {stake.delegatee === NULL_ADDRESS ? (
                                        <Text>Not delegated</Text>
                                    ) : (
                                        <Text>{cutDelegateAddress}</Text>
                                    )}
                                </Box>
                            </Stack>
                        );
                    })}
                </SimpleGrid>
            </Center>
        </Box>
    );
};

export default Stats;
