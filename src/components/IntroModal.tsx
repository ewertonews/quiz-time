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
              )" height="100vh" maxHeight="100vh" overflow="hidden">
                <ModalBody p={0} height="100vh">
                    <Flex justifyContent="center" alignItems="center" height="100vh" width="100vw">
                        <Image src="./../../assets/LeviOuSara.png" alt="Chá Revelação - Levi ou Sara?" objectFit="cover" width="100%" height="100%" />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default IntroModal;
