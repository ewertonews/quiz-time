import React from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

interface QuestionBoardProps {
    onSquareClick: (number: number) => void;
    completedQuestions: number[];
}

const QuestionBoard: React.FC<QuestionBoardProps> = ({ onSquareClick, completedQuestions }) => {
    const grid = Array.from({ length: 20 }, (_, i) => i + 1); // 5x4 grid

    return (
        <SimpleGrid columns={5} spacing={6}>
            {grid.map((number) => (
                <Box
                    key={number}
                    width="200px"
                    height="140px"
                    backgroundColor="#00FA9A"
                    border="4px"
                    borderColor="#BA55D3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#BA55D3"
                    fontSize="95"
                    fontWeight="bold"
                    cursor="pointer"
                    borderRadius="md"
                    _hover={{ backgroundColor: '#b3ffe2' }}
                    onClick={() => !completedQuestions.includes(number) && onSquareClick(number)}
                    opacity={completedQuestions.includes(number) ? 0.3 : 1}
                >
                    <Text>{number}</Text>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default QuestionBoard;
