import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";




interface WheelOfNamesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WheelOfNamesModal: React.FC<WheelOfNamesModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <iframe
                        src="https://wheelofnames.com/pt/" //https://wheelofnames.com/pt/pf6-kg2
                        width="98%"
                        height="950"
                        title="Sorteio"
                        style={{ border: 'none' }}
                    ></iframe>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default WheelOfNamesModal;