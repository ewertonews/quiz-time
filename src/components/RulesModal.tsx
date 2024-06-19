import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    VStack,
    Box
} from '@chakra-ui/react';

interface RulesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
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
                <ModalHeader textAlign="center" fontSize="80" fontWeight="bold" color="purple.700">
                    Regras do Jogo
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} align="center">
                        <Box textAlign="left" ml={10}>
                            <Text fontSize="40" color="teal.600">
                                1. Uma pessoa é sorteada na roleta digital;
                            </Text>
                            <Text fontSize="40" color="teal.600" fontWeight="bold">
                                2. A pessoa sorteada escolhe um número de 1 a 20 e clica na caixa correspondente;
                            </Text>
                            <Text fontSize="40" color="teal.600" fontWeight="bold">
                                3. O participante tem 10 segundos pra responder a pergunta escolhida;
                            </Text>
                            <Text fontSize="40" color="teal.600" fontWeight="bold">
                                4. A responta deve ser dada pelo(a) próprio(a) participante clicando na letra da alternativa;
                            </Text>
                            <Text fontSize="40" color="teal.600" fontWeight="bold">
                                5. Se a resposta correta for escolhida, o(a) participante ganha o cartão do número da pergunta escolhida;
                            </Text>
                            <Text fontSize="40" color="teal.600" fontWeight="bold">
                                6. O(a) participante que acertar a resposta terá direito de girar a Roda da Revelação;
                            </Text>
                            <Text fontSize="40" color="teal.600" fontWeight="bold">
                                7. Quando a roda parar, o(a) participante deve executar a tarefa indicada (explicações de cada tarefa serão dadas durante o jogo).
                                <Box as="span" fontWeight="extrabold" backgroundColor={"yellow"}>
                                    {' '}Você pode ser a pessoa que revelará se é Levi ou Sara!
                                </Box>
                            </Text>
                            <Text fontSize="40" color="teal.600" fontWeight="bold">
                                8. Uma pessoa que já foi sorteada pra responder a pergunta pode ser sorteada novamente;
                            </Text>
                            <Text fontSize="40" color="teal.600" fontWeight="bold">
                                9. O giro da roda só será válido se no mínimo 7 fatias forem percorridas (7 sons de "tac");
                            </Text>
                            <Text fontSize="40" color="teal.600" fontWeight="bold">
                                10. Caso a roda pare numa atividade que já se esgotou, o(a) participante jogará um dado para definir quantas fatias a roda irá avançar. Se o dado cair em "?", o(a) participante pode escolher qualquer fatia.
                            </Text>
                            {/* Add more rules as needed */}
                        </Box>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RulesModal;
