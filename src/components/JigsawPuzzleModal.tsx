import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Image,
    Flex
} from '@chakra-ui/react';

interface JigsawPuzzleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const JigsawPuzzleModal: React.FC<JigsawPuzzleModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
            <ModalOverlay />
            <ModalContent bgGradient="repeating-linear-gradient(
                45deg,
                rgba(0, 250, 154, 0.1),
                rgba(0, 250, 154, 0.1) 150px,
                rgba(211, 115, 235, 0.1) 150px,
                rgba(211, 115, 235, 0.1) 300px
              )">
                <ModalBody p={5}>
                    <Flex justifyContent={"center"}>
                        <Image src="./../../assets/MENIN_2.png" alt="Jigsaw Puzzle" objectFit="cover" width="70%" />
                    </Flex>

                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default JigsawPuzzleModal;
