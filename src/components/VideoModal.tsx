import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Flex,
} from '@chakra-ui/react';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
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
                <ModalCloseButton />
                <ModalBody>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <video width="35%" controls autoPlay>
                            <source src="./../../assets/video-surpresa.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default VideoModal;
