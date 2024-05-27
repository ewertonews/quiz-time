import React, { useState, useEffect } from 'react';
import { Button, VStack, Text, Progress, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, HStack } from '@chakra-ui/react';
import { Question } from '../types';

interface QuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    question: Question;
    onAnswer: (isCorrect: boolean) => void;
}

const TOTAL_TIME = 5; // Define the total time for the timer

const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, onClose, question, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [hideAlternatives, setHideAlternatives] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>();

    useEffect(() => {
        setSelectedAnswer(null);
        setFeedback(null);
        setTimeLeft(TOTAL_TIME);
        setHideAlternatives(false);

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        setTimer(timer);

        return () => clearInterval(timer);
    }, [isOpen]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleTimeout();
        }
    }, [timeLeft]);

    const handleTimeout = () => {
        setHideAlternatives(true);
        setFeedback("Time's up!");
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    const handleAnswerClick = (isCorrect: boolean) => {
        setHideAlternatives(true);
        clearTimeout(timer);
        if (isCorrect) {
            setFeedback('Correct!');
            setTimeout(() => {
                onAnswer(true);
            }, 2000);
        } else {
            setFeedback('Wrong answer!');
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
                    <VStack spacing={4}>
                        <Text fontSize="50" marginBottom={50}>{question.text}</Text>
                        <VStack spacing={2} width="100%" visibility={hideAlternatives ? 'hidden' : 'visible'}>
                            {question.alternatives.map((alt, index) => (
                                <HStack key={index} width="100%">
                                    <Button
                                        fontSize={'50'}
                                        width={'100px'}
                                        height={'70px'}
                                        onClick={() => handleAnswerClick(alt.isCorrect)}
                                        colorScheme={selectedAnswer === alt.key ? (alt.isCorrect ? 'green' : 'red') : 'blue'}
                                    >
                                        {alt.key}
                                    </Button>
                                    <Text fontSize="3xl">{alt.text}</Text>
                                </HStack>
                            ))}
                        </VStack>
                        <Progress value={(timeLeft / TOTAL_TIME) * 100} size="sm" colorScheme="blue" width="100%" />
                        {feedback && <Text fontSize="lg">{feedback}</Text>}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default QuestionModal;
