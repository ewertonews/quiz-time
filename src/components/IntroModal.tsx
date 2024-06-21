import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Image,
    Flex
} from '@chakra-ui/react';

interface IntroModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
            <ModalOverlay />
            <ModalContent bgGradient="repeating-linear-gradient(
                45deg,
                rgba(0, 250, 154, 0.1),
                rgba(0, 250, 154, 0.1) 150px,
                rgba(211, 115, 235, 0.1) 150px,
                rgba(211, 115, 235, 0.1) 300px
              )" maxHeight="unset" overflow="unset">
                <ModalBody p={0}>
                    <Flex justifyContent={"center"} maxHeight="unset" overflow="unset">
                        <Image src="./../../assets/LeviOuSara.png" alt="Chá Revelação - Levi ou Sara?" objectFit="cover" width="100%" height="auto" />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default IntroModal;