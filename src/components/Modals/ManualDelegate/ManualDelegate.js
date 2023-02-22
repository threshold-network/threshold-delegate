import { useState } from "react";

// Utils
import { ethers } from "ethers";

// Chakra UI
import {
    Button,
    Center,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { errorToast, infoToast, successToast } from "../../../utils/toastify";

/**
 * @name ManualDelegate
 * @description DelegateModal component that confirms the delegation of votes.
 * @dev This component is used in the Delegate component.
 * @param {function} onClose - The onClose function.
 * @param {boolean} isOpen - The isOpen boolean.
 * @param {string} address - The user's address.
 * @param {object} contract - The contract object.
 * @author Jesús Sánchez Fernández | WWW.JSANCHEZFDZ.ES
 * @version 1.0.0
 */
const ManualDelegate = ({ onClose, isOpen, address, contract }) => {
    // ------------------------------ Chakra UI ------------------------------ //
    const bgColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
    const toast = useToast();

    // ------------------------------ States --------------------------------- //
    const [delegateAddress, setDelegateAddress] = useState("");
    const [isValidAddress, setIsValidAddress] = useState(false);

    // ---------------------------- Check address ---------------------------- //

    const checkAddress = (address) => {
        try {
            const check = ethers.utils.isAddress(address);
            setIsValidAddress(check);
        } catch (error) {
            setIsValidAddress(false);
        }
    };

    // -------------------------- Handle functions -------------------------- //
    const handleInput = (e) => {
        setDelegateAddress(e.target.value);
        checkAddress(e.target.value);
    };

    const handleDelegateMyself = () => {
        setDelegateAddress(address);
    };

    const handleClose = () => {
        setDelegateAddress("");
        setIsValidAddress(false);
        onClose();
    };

    const handleDelegate = async () => {
        if (!isValidAddress) return;
        try {
            const tx = await contract.delegate(delegateAddress);
            infoToast("Transaction sent", "Please wait for the transaction", toast);
            onClose();
            await tx.wait();
            successToast("Transaction confirmed", "Your votes has been delegated", toast);
        } catch (error) {
            errorToast("Transaction failed", "Please try again", toast);
            console.log("🚀 ~ file: DelegateModal.js:26 ~ handleDelegate ~ error", error);
        }
    };

    // ------------------------------ Render ------------------------------ //

    return (
        <Modal size="lg" onClose={handleClose} isOpen={isOpen} isCentered>
            <ModalOverlay bgColor="blackAlpha.900" />
            <ModalContent bgColor="#7D00FF" color="white">
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody>
                    <Heading size="md" textAlign="center">
                        Custom delegate
                    </Heading>
                    <Text textAlign="center">You can delegate to someone not listed, or to yourself</Text>
                    <Input
                        bgColor={bgColor}
                        my={4}
                        size="lg"
                        placeholder="Enter address"
                        onChange={handleInput}
                        value={delegateAddress}
                    />
                    <Center>
                        <Button
                            onClick={handleDelegateMyself}
                            size="sm"
                            variant="outline"
                            isDisabled={address === delegateAddress}>
                            Delegate to myself
                        </Button>
                    </Center>
                </ModalBody>
                <ModalFooter>
                    <SimpleGrid columns={2} w="100%" gap={2}>
                        <Button
                            py={6}
                            w="100%"
                            bgColor="red.400"
                            color="white"
                            onClick={handleClose}
                            _hover={{ fontWeight: "bold" }}>
                            CANCEL
                        </Button>
                        <Button
                            py={6}
                            w="100%"
                            color="white"
                            bgColor="teal.400"
                            onClick={handleDelegate}
                            isDisabled={!isValidAddress}
                            _hover={{ fontWeight: "bold" }}>
                            DELEGATE
                        </Button>
                    </SimpleGrid>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ManualDelegate;
