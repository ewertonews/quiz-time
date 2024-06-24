import React, { useCallback, useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Flex, useDisclosure } from '@chakra-ui/react';
import QuestionBoard from '../components/QuestionBoard';
import QuestionModal from '../components/QuestionModal';
import { Question } from '../types';
import SecretCodeModal from '../components/SecretCodeModal';
import WheelOfNamesModal from '../components/WheelOfNamesModal';
import RulesModal from '../components/RulesModal';
import VideoModal from '../components/VideoModal';
import JigsawPuzzleModal from '../components/JigsawPuzzleModal';
import IntroModal from '../components/IntroModal';
import WheelModal from '../components/WheelModal';

interface WheelTaskType {
    text: string;
    color: string;
}

const wheelSliceDictionary: { [key: number]: WheelTaskType } = {
    1: { text: 'ESTOURE UM BALÃO', color: '#00FA9A' },
    2: { text: 'COLOQUE A MÃO NA CAIXA SUPRESA', color: '#BA55D3' },
    3: { text: 'IMITE MICHAEL JACKSON E VOLTE PRO SEU LUGAR', color: '#00FA9A' },
    4: { text: 'ABRA UMA PORTA DO GUARDA-ROUPA', color: '#BA55D3' },
    5: { text: 'ABRA UMA MALA', color: '#00FA9A' },
    6: { text: 'MONTE O QUEBRA-CABEÇA', color: '#BA55D3' },
    7: { text: 'ESTOURE UM BALÃO', color: '#00FA9A' },
    8: { text: 'DESENROLE O ROLO DE CORES', color: '#BA55D3' },
    9: { text: 'DISPARE UM LANÇA CONFETES', color: '#00FA9A' },
    10: { text: 'FAÇA 120 PONTOS JOGANDO DARDOS', color: '#BA55D3' },
    11: { text: 'COLOQUE A MÃO NA CAIXA SURPRESA', color: '#00FA9A' },
    12: { text: 'ASSISTA UM VÍDEO SURPRESA', color: '#BA55D3' },
    13: { text: 'DESENROLE O ROLO DE CORES', color: '#00FA9A' },
    14: { text: 'IMITE UMA GALINHA E VOLTE PRO SEU LUGAR', color: '#BA55D3' },
    15: { text: 'MONTE O QUEBRA-CABEÇA', color: '#00FA9A' },
    16: { text: 'ABRA UMA MALA', color: '#BA55D3' },
    17: { text: 'ABRA UMA PORTA DO GUARDA-ROUPA', color: '#00FA9A' },
    18: { text: 'DIPARE UM LANÇA CONFETES', color: '#BA55D3' },
    19: { text: 'FAÇA 100 PONTOS JOGANDO DARDOS', color: '#00FA9A' },
    20: { text: 'ASSISTA UM VÍDEO SURPRESA', color: '#BA55D3' },
};

const QuestionBoardPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
    const [totalQuestions, setTotalQuestions] = useState<number>(0);
    const [clickCount, setClickCount] = useState<number>(0);
    const { isOpen: isSecretCodeModalOpen, onOpen: openSecretCodeModal, onClose: onCloseSecretCode } = useDisclosure();
    const { isOpen: isWheelModalOpen, onOpen: openWheelModalOpen, onClose: onCloseWheel } = useDisclosure();
    const { isOpen: isRulesModalOpen, onOpen: onOpenRules, onClose: onCloseRules } = useDisclosure();
    const { isOpen: isVideoModalOpen, onOpen: onOpenVideo, onClose: onCloseVideo } = useDisclosure();
    const { isOpen: isJigsawModalOpen, onOpen: onOpenJigsaw, onClose: onCloseJigsaw } = useDisclosure();
    const { isOpen: isIntroModalOpen, onOpen: openIntroModal, onClose: onCloseIntro } = useDisclosure();
    const { isOpen: isWheelSliceOpen, onOpen: onOpenWheelSlice, onClose: onCloseWheelSlice } = useDisclosure();

    const [wheelNumber, setWheelNumber] = useState<number | null>(null);
    const [wheelText, setWheelText] = useState<string>('');
    const [wheelColor, setWheelColor] = useState<string>('');
    const [typedNumber, setTypedNumber] = useState<string>('');


    const handleVkeyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === 'v' || event.key === 'V') {
            onOpenVideo();
        }
    }, [onOpenVideo]);


    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 's' || event.key === 'S') {
                openWheelModalOpen();
            } else if (event.key === 'r' || event.key === 'R') {
                onOpenRules();
            } else if (event.key === 'x' || event.key === 'X') {
                const clearConfirm = confirm('Tem certeza que deseja resetar o jogo?');
                if (clearConfirm) {
                    localStorage.clear();
                    window.location.reload();
                }
            } else if (event.key === 'q' || event.key === 'Q') {
                onOpenJigsaw();
            } else if (event.key === 'i' || event.key === 'I') {
                openIntroModal();
            } else if (event.key === 'z' || event.key === 'Z') {
                openSecretCodeModal();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleVkeyPress, onOpenJigsaw, onOpenRules, openIntroModal, openWheelModalOpen]);

    useEffect(() => {
        window.addEventListener('keydown', handleVkeyPress);
        return () => {
            window.removeEventListener('keydown', handleVkeyPress);
        };
    }, [handleVkeyPress, isRulesModalOpen, isVideoModalOpen, onOpenVideo]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key >= '0' && event.key <= '9') {
                setTypedNumber(prev => (prev + event.key).slice(-2)); // Capture last two digits
            } else if (event.key === 'Enter') {
                const number = parseInt(typedNumber, 10);
                if (number >= 1 && number <= 20) {
                    setWheelNumber(number);
                    setWheelText(wheelSliceDictionary[number].text);
                    setWheelColor(wheelSliceDictionary[number].color);
                    onOpenWheelSlice();
                    setTypedNumber(''); // Reset typed number
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [typedNumber, onOpenWheelSlice]);

    useEffect(() => {
        const savedCompletedQuestions = JSON.parse(localStorage.getItem('completedQuestions') || '[]');
        setCompletedQuestions(savedCompletedQuestions);

        fetch('/src/questions.json')
            .then(response => response.json())
            .then(data => {
                setTotalQuestions(data.questions.length);
                const filteredQuestions = data.questions.filter(
                    (question: Question) => !savedCompletedQuestions.includes(question.id)
                );
                setQuestions(filteredQuestions);
            })
            .catch(error => console.error('Error loading questions:', error));
    }, []);

    useEffect(() => {
        if (completedQuestions.length === totalQuestions) {
            const handleMouseClick = () => {
                setClickCount((prev) => prev + 1);
            };

            window.addEventListener('click', handleMouseClick);

            if (clickCount >= 3) {
                window.removeEventListener('keydown', handleVkeyPress);
                openSecretCodeModal();
            }

            return () => {
                window.removeEventListener('click', handleMouseClick);
            };
        }
    }, [completedQuestions, clickCount, openSecretCodeModal, questions.length, totalQuestions, handleVkeyPress]);

    const handleSquareClick = (number: number) => {
        setSelectedNumber(number);
        setIsModalOpen(true);
    };

    const handleCloseModal = (wasCorrect: boolean) => {
        setIsModalOpen(false);
        if (wasCorrect && selectedNumber !== null) {
            const updatedCompletedQuestions = [...completedQuestions, selectedNumber]
            setCompletedQuestions(updatedCompletedQuestions.sort((a, b) => a - b));
            //setCompletedQuestions((prev) => [...prev, selectedNumber].sort((a, b) => a - b));
            localStorage.setItem('completedQuestions', JSON.stringify(updatedCompletedQuestions));
        }
    };

    const currentQuestion = questions.find((q) => q.id === selectedNumber);

    return (
        <Flex
            height="100vh"
            width="100vw"
            justifyContent="center"
            alignItems="center"
            bgGradient="repeating-linear-gradient(
                135deg,
                rgba(0, 250, 154, 0.15),
                rgba(0, 250, 154, 0.15) 150px,
                rgba(211, 115, 235, 0.15) 150px,
                rgba(211, 115, 235, 0.15) 300px
              )">
            <VStack spacing={6} align="center">
                <Heading mb={4} textAlign="center" color="teal.500">
                    Escolha um Número
                </Heading>
                <Box>
                    <QuestionBoard onSquareClick={handleSquareClick} completedQuestions={completedQuestions} />
                </Box>
                {
                    completedQuestions.length > 0 && (
                        <Box mt={4} textAlign="center">
                            <Text fontSize="xl" color="teal.600">
                                Respondidas: {completedQuestions.join(', ')}
                            </Text>
                        </Box>
                    )
                }
                {currentQuestion && (
                    <QuestionModal
                        isOpen={isModalOpen}
                        onClose={() => handleCloseModal(false)}
                        question={currentQuestion}
                        onAnswer={(isCorrect: boolean) => handleCloseModal(isCorrect)}
                    />
                )}
                <SecretCodeModal isOpen={isSecretCodeModalOpen} onClose={onCloseSecretCode} />
                <WheelOfNamesModal isOpen={isWheelModalOpen} onClose={onCloseWheel} />
                <RulesModal isOpen={isRulesModalOpen} onClose={onCloseRules} />
                <VideoModal isOpen={isVideoModalOpen} onClose={onCloseVideo} />
                <JigsawPuzzleModal isOpen={isJigsawModalOpen} onClose={onCloseJigsaw} />
                <IntroModal isOpen={isIntroModalOpen} onClose={onCloseIntro} />
                <WheelModal isOpen={isWheelSliceOpen} onClose={onCloseWheelSlice} number={wheelNumber} text={wheelText} color={wheelColor} />
            </VStack>
        </Flex>
    );
};

export default QuestionBoardPage;
