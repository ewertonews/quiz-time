import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Flex,
    Text,
} from '@chakra-ui/react';

interface WheelModalProps {
    isOpen: boolean;
    onClose: () => void;
    number: number | null;
    text: string;
    color: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WheelModal: React.FC<WheelModalProps> = ({ isOpen, onClose, number, text, color }) => {
    const textColor = color === "#00FA9A" ? "#BA55D3" : "#00FA9A";
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
            <ModalOverlay />
            <ModalContent bg={color}>
                <ModalBody p={0}>
                    <Flex justifyContent="center" alignItems="center" height="100vh" width="100vw">
                        <Text fontSize="120" color={textColor} textAlign="center">
                            {text}
                        </Text>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default WheelModal;
