import React, { useState, useEffect } from 'react';
import {
    Button,
    VStack,
    Text,
    Progress,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    HStack,
    Flex,
    Box
} from '@chakra-ui/react';
import { Question } from '../types';

interface QuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    question: Question;
    onAnswer: (isCorrect: boolean) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, onClose, question, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(question.time);
    const [hideAlternatives, setHideAlternatives] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [feedbackColor, setFeedbackColor] = useState<string>('black');

    useEffect(() => {
        setSelectedAnswer(null);
        setFeedback(null);
        setTimeLeft(question.time);
        setHideAlternatives(false);

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        setTimer(timer);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleTimeout();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft]);

    const handleTimeout = () => {
        if (timer) {
            clearTimeout(timer);
        }
        setHideAlternatives(true);
        setFeedbackColor('red')
        setFeedback("Tempo esgotado!");
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    const handleAnswerClick = (isCorrect: boolean) => {
        if (timer) {
            clearTimeout(timer);
        }
        setHideAlternatives(true);

        if (isCorrect) {
            setFeedbackColor('green')
            setFeedback('Resposta correta! \\o/');
            setTimeout(() => {
                onAnswer(true);
            }, 2500);
        } else {
            setFeedbackColor('red')
            setFeedback('Errrrrrrrrrrrrrrrrou!');
            setTimeout(() => {
                onAnswer(false);
            }, 2000);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pergunta {question.id}:</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex height="70vh" width="95vw" justifyContent="center" alignItems="center">
                        <VStack spacing={4}>
                            {feedback &&
                                <Box color={feedbackColor}>
                                    <Text fontSize="80">{feedback}</Text>
                                </Box>}
                            <VStack spacing={2} width="100%" visibility={hideAlternatives ? 'hidden' : 'visible'}>
                                <Text fontSize="60" marginBottom={50} color="#BA55D3">{question.text}</Text>
                                {question.alternatives.map((alt, index) => (
                                    <HStack key={index} width="100%">
                                        <Button
                                            backgroundColor="#00FA9A"
                                            border="4px"
                                            borderColor="#BA55D3"
                                            color="#BA55D3"
                                            fontSize={'50'}
                                            width={'100px'}
                                            height={'70px'}
                                            onClick={() => handleAnswerClick(alt.isCorrect)}
                                            colorScheme={selectedAnswer === alt.key ? (alt.isCorrect ? 'green' : 'red') : 'blue'}
                                        >
                                            {alt.key}
                                        </Button>
                                        <Text fontSize="4xl" color={"#00cc7e"}>{alt.text}</Text>
                                    </HStack>
                                ))}
                            </VStack>
                            {timeLeft > 0 && !hideAlternatives && <Progress
                                value={(timeLeft / question.time) * 100}
                                size="md"
                                width="100%"
                                sx={{
                                    '& > div:first-of-type': {
                                        backgroundColor: '#BA55D3',
                                    },
                                }}
                            />}
                        </VStack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default QuestionModal;
