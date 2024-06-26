import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input,
    VStack,
    HStack,
    Text,
    Image,
    Flex,
    Box
} from '@chakra-ui/react';

interface SecretCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface HintsState {
    hintText: string;
    btnHint1Enabled: boolean;
    btnHint2Enabled: boolean;
    btnHint3Enabled: boolean;
}

const phrases = [
    "Processando",
    "Analisando dados",
    "Calculando nível de curiosidade dos participantes",
    "Executando algoritmos de revelação",
];

const TOTAL_DOTS = 3; // Number of dots to display

const SecretCodeModal: React.FC<SecretCodeModalProps> = ({ isOpen, onClose }) => {
    const [code, setCode] = useState('');
    const [showRoulette, setShowRoulette] = useState(false);
    const [currentPhrase, setCurrentPhrase] = useState<string | null>(null);
    const [dots, setDots] = useState('');
    const [wrongCode, setWrongCode] = useState(false);

    const initialHintsState: HintsState = {
        hintText: '',
        btnHint1Enabled: false,
        btnHint2Enabled: false,
        btnHint3Enabled: false
    }

    const [hintsState, setHintsState] = useState<HintsState>(initialHintsState)

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setHintsState(prev => ({
                    ...prev,
                    btnHint1Enabled: true
                }))
            }, 1000)
        }

    }, [isOpen])

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let dotTimer: NodeJS.Timeout;
        if (currentPhrase && !phrases.includes(currentPhrase)) {
            return;
        }
        if (currentPhrase !== null) {
            // Update dots
            dotTimer = setInterval(() => {
                setDots((prev) => (prev.length < TOTAL_DOTS ? prev + '.' : ''));
            }, 900);

            let waitTime = 3600;

            if (currentPhrase === phrases[3]) {
                waitTime = 10000;
            }
            // Move to the next phrase or show the roulette image
            timer = setTimeout(() => {
                const nextIndex = phrases.indexOf(currentPhrase) + 1;
                if (nextIndex < phrases.length) {
                    setCurrentPhrase(phrases[nextIndex]);
                } else {
                    setShowRoulette(true);
                    setCurrentPhrase(null);
                }
            }, waitTime);
        }

        return () => {
            clearTimeout(timer);
            clearInterval(dotTimer);
        };
    }, [currentPhrase]);

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
        setWrongCode(false);
    };

    const handleSubmit = () => {
        if (code === '7453198201117') {
            setCurrentPhrase('Aee! vocês são demais! conseguiram descobrir o código! \\o/');
            setTimeout(() => setCurrentPhrase('Querem saber se é Levi ou Sara agora???'), 5000)
            setTimeout(() => setCurrentPhrase('Vamos a revelação então!'), 10000)
            setTimeout(() => setCurrentPhrase(phrases[0]), 17000)
        } else {
            setWrongCode(true);
        }
    };

    const handleDica1click = () => {
        setHintsState(prev => ({
            ...prev,
            hintText: 'A resposta pode estar em suas mãos (ou no seu bolso).',
        }))

        setTimeout(() => {
            setHintsState(prev => ({
                ...prev,
                btnHint2Enabled: true
            }))
        }, 2000)
    }

    const handleDica2click = () => {
        setHintsState(prev => ({
            ...prev,
            hintText: 'O cartão com o número da pergunta pode dizer algo.',
        }))

        setTimeout(() => {
            setHintsState(prev => ({
                ...prev,
                btnHint3Enabled: true
            }))
        }, 3000)
    }

    const handleDica3click = () => {
        setHintsState(prev => ({
            ...prev,
            hintText: 'LEVI OU SARA revelará o código.',
        }))
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="full" closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent h="75vh">
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={1}>
                        <Box mb={120} mt={0} justifyContent={"center"} textAlign={"center"}>
                            <Text
                                color="red"
                                fontSize={70}
                            >
                                Erro! A roda não conseguiu efetuar a revelação. Necessário digitar o código secreto.
                            </Text>
                        </Box>
                        <Flex height="90%" justifyContent="center" alignItems="center">
                            {!showRoulette ? (
                                currentPhrase ? (
                                    <Flex justifyContent="center" alignItems="center" height="100%">
                                        <Text fontSize="50">{currentPhrase}{dots}</Text>
                                    </Flex>
                                ) : (
                                    <VStack spacing={3}>
                                        <HStack>
                                            <Input
                                                fontSize={40}
                                                type="number"
                                                autoComplete="off"
                                                value={code}
                                                onChange={handleCodeChange}
                                                placeholder="Digite o código secreto"
                                                size="lg" height={'59'} width={'39vw'}
                                                onKeyDown={handleKeyDown}
                                            />
                                            <Button onClick={handleSubmit} colorScheme="teal" size="lg" height={'59'} fontSize={35}>OK</Button>
                                        </HStack>
                                        <Box height={'1vh'}>{wrongCode && <Text color="red">Código incorreto</Text>}</Box>
                                        <HStack spacing={4} marginTop={10}>
                                            <Button colorScheme='yellow' size={'lg'} height={'59'} fontSize={35} onClick={handleDica1click} isDisabled={!hintsState.btnHint1Enabled}>Dica 1</Button>
                                            <Button colorScheme='yellow' size={'lg'} height={'59'} fontSize={35} onClick={handleDica2click} isDisabled={!hintsState.btnHint2Enabled}>Dica 2</Button>
                                            <Button colorScheme='yellow' size={'lg'} height={'59'} fontSize={35} onClick={handleDica3click} isDisabled={!hintsState.btnHint3Enabled}>Dica 3</Button>
                                        </HStack>
                                        <Box height={'10vh'} mt='30px'>
                                            <Text fontSize={'60'}>{hintsState.hintText}</Text>
                                        </Box>
                                    </VStack>
                                )
                            ) : (
                                <VStack>
                                    <Image h={530} src="./../../assets/Rouleta.png" alt="Roulette with number 9" />
                                </VStack>
                            )}
                        </Flex>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SecretCodeModal;
