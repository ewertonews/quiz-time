import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Flex, useDisclosure } from '@chakra-ui/react';
import QuestionBoard from '../components/QuestionBoard';
import QuestionModal from '../components/QuestionModal';
import { Question } from '../types';
import SecretCodeModal from '../components/SecretCodeModal';

const questions: Question[] = [
    {
        id: 1,
        text: 'Em que ano Ewerton e Beth chagaram em Blumenau?',
        time: 10,
        alternatives: [
            { key: 'A', text: '2021', isCorrect: false },
            { key: 'B', text: '2022', isCorrect: false },
            { key: 'C', text: '2020', isCorrect: true },
        ],
    },
    // Add more questions as needed
];

const QuestionBoardPage: React.FC = () => {
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
    const [clickCount, setClickCount] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (completedQuestions.length === questions.length) {
            const handleMouseClick = () => {
                setClickCount((prev) => prev + 1);
            };

            window.addEventListener('click', handleMouseClick);
            if (clickCount >= 3) {
                onOpen();
            }

            return () => {
                window.removeEventListener('click', handleMouseClick);
            };
        }
    }, [completedQuestions, clickCount, onOpen]);

    const handleSquareClick = (number: number) => {
        setSelectedNumber(number);
        setIsModalOpen(true);
    };

    const handleCloseModal = (wasCorrect: boolean) => {
        setIsModalOpen(false);
        if (wasCorrect && selectedNumber !== null) {
            setCompletedQuestions((prev) => [...prev, selectedNumber].sort((a, b) => a - b));
        }
    };

    const currentQuestion = questions.find((q) => q.id === selectedNumber);

    return (
        <Flex height="100vh" width="100vw" justifyContent="center" alignItems="center">
            <VStack spacing={6} align="center">
                <Heading mb={4} textAlign="center" color="teal.500">
                    Escolha um número
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
                <SecretCodeModal isOpen={isOpen} onClose={onClose} />
            </VStack>
        </Flex>
    );
};

export default QuestionBoardPage;
