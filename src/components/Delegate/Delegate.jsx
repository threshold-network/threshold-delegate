// React
import { useEffect, useState } from "react";

// Chakra UI
import { Box, Button, Center, Heading, Spinner, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";

// Utils
import { ethers } from "ethers";

// Data
import { API_URL, NULL_ADDRESS, SC_ABI, SC_ADDRESS, SC_STAKING_ABI, SC_STAKING_ADDRESS } from "../../data/constants";
import post from "../../data/325.json";

// Components
import Delegates from "./Delegates";
import Stats from "./Stats";

// Modal
import DelegateModal from "../Modals/DelegateModal/DelegateModal";
import ManualDelegate from "../Modals/ManualDelegate/ManualDelegate";
import axios from "axios";
import { useContract } from "../../hooks/useContract";
import { useConnectWallet } from "@web3-onboard/react";

/**
 * @name Delegate
 * @description Delegate component that displays the user's votes and allows them to delegate them.
 * @dev This component is used in the Home component.
 * @param {string} address - The user's address.
 * @param {object} connector - The user's connector.
 */

const Delegate = ({ provider, address, signer, setAccount }) => {
    const [{ wallet }] = useConnectWallet();
    
    // ------------------ STATES -------------------
    const [selectedUser, setSelectedUser] = useState(null); // Selected user to delegate to
    const [loading, setLoading] = useState(false); // Loading state
    const [needReload, setNeedReload] = useState(true); // Need reload state
    const [firstLoad, setFirstLoad] = useState(true); // First load state
    const [selectedStake, setSelectedStake] = useState(null); // Selected stake to delegate to

    // ------------------ DATA ---------------------
    const [data, setData] = useState({
        balance: 0,
        stakedBalance: 0,
        votes: 0,
        delegates: "loading...",
        delegators: [],
    });

    // ------------------ MODALs -------------------
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenManual, onOpen: onOpenManual, onClose: onCloseManual } = useDisclosure();

    // ------------------ CONTRACTS ----------------
    const [signedTContract, setSignedTContract] = useState(null);
    const [signedTStaking, setSignedTStaking] = useState(null);

    const contract = useContract({
        contractAddress: SC_ADDRESS,
        contractAbi: SC_ABI,
        provider: provider
    })

    const stakingContract = useContract({
        contractAddress: SC_STAKING_ADDRESS,
        contractAbi: SC_STAKING_ABI,
        provider: provider
    });

    // ------------------ STAKING ------------------
    const [stakes, setStakes] = useState([]);
    const [stakedBalance, setStakedBalance] = useState(0);
    const [stakedLoaded, setStakedLoaded] = useState(false);

    // ------------------ GRAPHQL ------------------
    const lowerCaseAddress = address.toLowerCase();
    // 0x5cf1703a1c99a4b42eb056535840e93118177232
    const QUERY = `
        query {
            account(id: "${lowerCaseAddress}") {
                stakes {
                    totalStaked
                    id
                    delegatee {
                        id
                    }
                }
            }
        }
    `;

    // ------------------ HANDLERS ------------------
    // Handle click on a delegator
    const handleClick = (delegator) => {
        setSelectedUser(delegator);
        onOpen();
    };

    const handleManualDelegation = async () => {
        onOpenManual();
    };

    const handleDisconnectWallet = async () => {
        setAccount(undefined)
    }

    // ------------------ EFFECTS -------------------

    useEffect(() => {
        const calculateStaking = async () => {
            const response = await axios.post(API_URL, {
                query: QUERY
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const dataQuery = response.data.data

            if (dataQuery !== undefined && dataQuery.account && dataQuery.account.stakes.length > 0) {
                // Create new array with the stakes
                const stakes = dataQuery.account.stakes;
                // Sum all the stakes
                const totalStaked = stakes.reduce((acc, stake) => acc + Number(stake.totalStaked), 0);
                // Convert to BigInt
                const totalStakedBigInt = BigInt(totalStaked).toString();
                // Stake to ether
                const totalStakedEther = Number(ethers.utils.formatEther(totalStakedBigInt)).toFixed(0);
                // Convert foreach stake to ether
                const auxStakes = [];
                stakes.forEach((stake) => {
                    const stakeBigInt = BigInt(stake.totalStaked).toString();
                    const stakeEther = Number(ethers.utils.formatEther(stakeBigInt)).toFixed(0);
                    const delegatee = stake.delegatee?.id;
                    // Buscar 0x y coger los 42 siguientes
                    const delegateeAddress = delegatee?.match(/0x[a-fA-F0-9]{40}/g)[0] || NULL_ADDRESS;
                    auxStakes.push({ idStake: stake.id, totalStaked: stakeEther, delegatee: delegateeAddress });
                });

                setStakedBalance(totalStakedEther);
                setStakedLoaded(true);
                setStakes(auxStakes);
                console.log("🚀 ~ file: Delegate.js:131 ~ calculateStaking ~ auxStakes:", auxStakes);
            } else {
                setStakedBalance(0);
                setStakedLoaded(true);
            }
        };
        calculateStaking();
    }, [QUERY]);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            try {
                const signedTContract = contract.connect(signer);
                const signedTStaking = stakingContract.connect(signer);
                const [balance, delegates] = await Promise.all([
                    signedTContract.balanceOf(address),
                    signedTContract.delegates(address),
                ]);

                const totalPosts = post.post_stream.posts;
                const delegators = [];
                const votesPromises = [];

                const REGEX = /0x[a-fA-F0-9]{40}/g;
                for (const post of totalPosts) {
                    const { cooked } = post;
                    const found = cooked.match(REGEX);
                    if (found) {
                        const address = found[0];
                        delegators.push({ username: post.username, address, post_number: post.post_number });
                        // Get the votes from the staking contract and the token contract
                        votesPromises.push(
                            Promise.all([signedTContract.getVotes(address), signedTStaking.getVotes(address)])
                        );
                    }
                }

                // Iterate over the promises and get the votes
                // 2 promises per delegator
                const votes = await Promise.all(votesPromises);
                for (let i = 0; i < delegators.length; i++) {
                    // Convert the votes to BigInt
                    const TRawBalance = BigInt(votes[i][0]).toString();
                    const SRawBalance = BigInt(votes[i][1]).toString();
                    // Sum the votes from the staking contract and the token contract
                    const TBalance = ethers.utils.formatEther(TRawBalance);
                    const SBalance = ethers.utils.formatEther(SRawBalance);
                    // Sum the votes + fix the decimals
                    const totalVotes = Number(TBalance) + Number(SBalance);
                    delegators[i].votes = totalVotes.toFixed(0);
                }

                // Wei to Ether
                let balanceFixed = ethers.utils.formatEther(balance);
                balanceFixed = Number(balanceFixed).toFixed(2);

                // Convert to number
                const totalBalance = Number(balanceFixed);
                const totalStakedBalance = Number(stakedBalance);

                // Set the data
                setData({
                    balance: totalBalance,
                    stakedBalance: totalStakedBalance,
                    delegates,
                    delegators,
                });
                setSignedTContract(signedTContract);
                setSignedTStaking(signedTStaking);
            } catch (error) {
                console.error(error);
            } finally {
                if (firstLoad) setFirstLoad(false);
                setLoading(false);
                setNeedReload(false);
            }
        };

        needReload && stakedLoaded && !loading && getData();
    }, [address, contract, signer, loading, needReload, firstLoad, stakedLoaded, stakedBalance, stakingContract]);

    useEffect(() => {
        const reloadData = async () => {
            setNeedReload(true);
        };

        const interval = setInterval(reloadData, 5000);
        return () => clearInterval(interval);
    }, []);

    const borderColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

    return (
        <>
            <Center>
                <Box
                    textAlign="center"
                    border="1px"
                    borderColor={borderColor}
                    rounded="lg"
                    p={4}
                    px={8}
                    shadow="dark-lg">
                    <Heading my={2}>Change your delegate</Heading>
                    <Text>Select a community member to represent you. You can change this at any time.</Text>
                    {loading && firstLoad && (
                        <>
                            <Text textAlign="center" fontWeight="bold" my={4}>
                                Loading...
                            </Text>
                            <Center>
                                <Spinner size="lg" my={6} />
                            </Center>
                        </>
                    )}
                    {data && (
                        <Stack
                            direction="column"
                            spacing={4}
                            my={4}
                            border="1px"
                            borderColor={borderColor}
                            rounded="md"
                            shadow="sm">
                            <Stats data={data} stakes={stakes} setSelectedStake={setSelectedStake} />
                            {data.delegates !== "loading..." && (
                                <Delegates delegators={data.delegators} handleClick={handleClick} />
                            )}
                        </Stack>
                    )}

                    <Center>
                        <Stack direction="row" spacing={8}>
                            <Button variant="ghost" onClick={handleManualDelegation}>
                                Custom delegate
                            </Button>
                            <Button variant="ghost"  onClick={() => {
                                handleDisconnectWallet(wallet);
                            }}>
                                Disconnect
                            </Button>
                        </Stack>
                    </Center>
                </Box>
            </Center>
            {selectedUser && (
                <DelegateModal
                    isOpen={isOpen}
                    onClose={onClose}
                    address={address}
                    selectedUser={selectedUser}
                    balance={selectedStake ? selectedStake.totalStaked : data.balance}
                    tContract={selectedStake ? undefined : signedTContract}
                    stakedContract={selectedStake ? signedTStaking : undefined}
                />
            )}
            {isOpenManual && (
                <ManualDelegate
                    isOpen={isOpenManual}
                    onClose={onCloseManual}
                    address={address}
                    tContract={selectedStake ? undefined : signedTContract}
                    stakedContract={selectedStake ? signedTStaking : undefined}
                />
            )}
        </>
    );
};

export default Delegate;
