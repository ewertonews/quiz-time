import React, { useState } from 'react';
import { Box, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import QuestionBoard from '../components/QuestionBoard';
import QuestionModal from '../components/QuestionModal';
import { Question } from '../types';

const questions: Question[] = [
    {
        id: 1,
        text: 'Em que ano Ewerton e Beth chagaram em Blumenau?',
        alternatives: [
            { key: 'A', text: '2021', isCorrect: false },
            { key: 'B', text: '2022', isCorrect: false },
            { key: 'C', text: '2020', isCorrect: true },
        ],
    },
    {
        id: 2,
        text: 'Question 2 text...',
        alternatives: [
            { key: 'A', text: 'Text of Option A', isCorrect: true },
            { key: 'B', text: 'Text of Option B', isCorrect: false },
            { key: 'C', text: 'Text of Option C', isCorrect: false },
        ],
    },
    // Add more questions as needed
];

const QuestionBoardPage: React.FC = () => {
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

    const handleSquareClick = (number: number) => {
        setSelectedNumber(number);
        setIsModalOpen(true);
    };

    const handleCloseModal = (wasCorrect: boolean) => {
        setIsModalOpen(false);
        if (wasCorrect && selectedNumber !== null) {
            setCompletedQuestions((prev) => [...prev, selectedNumber]);
        }
    };

    const currentQuestion = questions.find((q) => q.id === selectedNumber);

    return (
        <Flex height="100vh" width="100vw" justifyContent="center" alignItems="center">
            <VStack spacing={6} align="center">
                <Heading mb={4} textAlign="center" color="teal.500">
                    Escolha uma Pergunta
                </Heading>
                <Box>
                    <QuestionBoard onSquareClick={handleSquareClick} completedQuestions={completedQuestions} />
                </Box>
                {
                    completedQuestions.length > 0 && (
                        <Box mt={4} textAlign="center">
                            <Text fontSize="xl" color="teal.600">
                                Questions Respondidas: {completedQuestions.join(', ')}
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
            </VStack>
        </Flex>
    );
};

export default QuestionBoardPage;
