import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Flex, useDisclosure } from '@chakra-ui/react';
import QuestionBoard from '../components/QuestionBoard';
import QuestionModal from '../components/QuestionModal';
import { Question } from '../types';
import SecretCodeModal from '../components/SecretCodeModal';


const QuestionBoardPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
    const [totalQuestions, setTotalQuestions] = useState<number>(0);
    const [clickCount, setClickCount] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        console.log("useEffect [] called");
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
                console.log("finished setting questions");
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
                onOpen();
            }

            return () => {
                window.removeEventListener('click', handleMouseClick);
            };
        }
    }, [completedQuestions, clickCount, onOpen, questions.length, totalQuestions]);

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
