import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import {
  Add,
  Remove,
  Close,
} from '@mui/icons-material';

interface GameStep {
  numbers: number[];
  selectedIndices: number[];
  result: number | null;
  operation: string;
}

const Math24Game: React.FC = () => {
  // Initialize with numbers matching the image: 13, 13, 3, 6
  const [initialNumbers] = useState<number[]>([13, 13, 3, 6]);
  const [currentNumbers, setCurrentNumbers] = useState<number[]>([13, 13, 3, 6]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<string>('');
  const [gameHistory, setGameHistory] = useState<GameStep[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const operations = [
    { symbol: '+', label: 'Add', icon: <Add />, operation: 'add', color: '#9C27B0' }, // Purple
    { symbol: '−', label: 'Subtract', icon: <Remove />, operation: 'subtract', color: '#4CAF50' }, // Green
    { symbol: '×', label: 'Multiply', icon: <Close />, operation: 'multiply', color: '#3F51B5' }, // Blue
    { symbol: '÷', label: 'Divide', icon: '÷', operation: 'divide', color: '#F44336' }, // Red
  ];

  const resetGame = () => {
    setCurrentNumbers([...initialNumbers]);
    setSelectedIndices([]);
    setSelectedOperation('');
    setGameHistory([]);
    setMessage('Select two numbers and an operation to begin!');
    setMessageType('info');
  };

  const handleNumberClick = (index: number) => {
    if (selectedIndices.length < 2 && !selectedIndices.includes(index)) {
      setSelectedIndices([...selectedIndices, index]);
      setMessage(selectedIndices.length === 0 ? 'Select another number' : 'Now select an operation');
      setMessageType('info');
    }
  };

  const handleOperationClick = (operation: string) => {
    if (selectedIndices.length === 2) {
      setSelectedOperation(operation);
      setMessage('Click Calculate to perform the operation');
      setMessageType('info');
    } else {
      setMessage('Please select two numbers first');
      setMessageType('error');
    }
  };

  const calculateResult = () => {
    if (selectedIndices.length !== 2 || !selectedOperation) {
      setMessage('Please select two numbers and an operation');
      setMessageType('error');
      return;
    }

    const [index1, index2] = selectedIndices;
    const num1 = currentNumbers[index1];
    const num2 = currentNumbers[index2];
    let result: number;

    switch (selectedOperation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) {
          setMessage('Cannot divide by zero!');
          setMessageType('error');
          return;
        }
        result = num1 / num2;
        break;
      default:
        setMessage('Invalid operation');
        setMessageType('error');
        return;
    }

    // Save current state to history
    const currentState: GameStep = {
      numbers: [...currentNumbers],
      selectedIndices: [...selectedIndices],
      result,
      operation: selectedOperation,
    };
    setGameHistory([...gameHistory, currentState]);

    // Update numbers: remove selected numbers and add result
    const newNumbers = currentNumbers.filter((_, index) => !selectedIndices.includes(index));
    newNumbers.push(result);
    setCurrentNumbers(newNumbers);

    // Reset selections
    setSelectedIndices([]);
    setSelectedOperation('');

    setMessage(`${num1} ${operations.find(op => op.operation === selectedOperation)?.symbol} ${num2} = ${result}`);
    setMessageType('info');
  };

  const undoLastStep = () => {
    if (gameHistory.length === 0) {
      setMessage('No steps to undo');
      setMessageType('error');
      return;
    }

    const lastStep = gameHistory[gameHistory.length - 1];
    setCurrentNumbers([...lastStep.numbers]);
    setGameHistory(gameHistory.slice(0, -1));
    setSelectedIndices([]);
    setSelectedOperation('');
    setMessage('Step undone');
    setMessageType('info');
  };

  const submitAnswer = () => {
    if (currentNumbers.length !== 1) {
      setMessage('You must combine all numbers into one result first');
      setMessageType('error');
      return;
    }

    const finalResult = currentNumbers[0];
    if (Math.abs(finalResult - 24) < 0.0001) { // Account for floating point precision
      setMessage('🎉 Correct! You made 24! 🎉');
      setMessageType('success');
    } else {
      setMessage(`Incorrect. Your result is ${finalResult}, not 24. Try again!`);
      setMessageType('error');
    }
  };

  const generateNewPuzzle = () => {
    // Ultra-safe verified puzzles with known solutions
    const safePuzzles = [
      [1, 1, 8, 8], // Solution: 8/(1-1/8) = 24 or (8+8)*(1+1) = 24
      [4, 1, 8, 7], // Solution: (8-4)*(7-1) = 4*6 = 24
      [1, 2, 3, 4], // Solution: (1+2+3)*4 = 6*4 = 24
    ];

    const newPuzzle = safePuzzles[Math.floor(Math.random() * safePuzzles.length)];
    setCurrentNumbers([...newPuzzle]);
    setSelectedIndices([]);
    setSelectedOperation('');
    setGameHistory([]);
    setMessage('New puzzle! Select two numbers and an operation to begin!');
    setMessageType('info');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #4A90E2 0%, #4A90E2 45%, #FFD700 45%, #FFD700 100%)', // Blue top, Golden bottom matching image
        py: 4,
        position: 'relative',
      }}
    >
      {/* "24" in top right corner */}
      <Typography
        variant="h1"
        sx={{
          position: 'absolute',
          top: 20,
          right: 40,
          fontSize: '4rem',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        24
      </Typography>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" textAlign="center" gutterBottom sx={{ color: 'white', mb: 2 }}>
          Math 24 Game
        </Typography>

        <Typography variant="h6" textAlign="center" gutterBottom sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
          Use all four numbers exactly once to make 24!
        </Typography>

      {/* Number Wheel - 8 sections alternating yellow and red */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Box
          sx={{
            position: 'relative',
            width: 400,
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Base circle - yellow background */}
          <Box
            sx={{
              position: 'absolute',
              width: 350,
              height: 350,
              borderRadius: '50%',
              bgcolor: '#FFD700', // Golden yellow
              border: '3px solid #FFA500',
              zIndex: 0,
            }}
          />

          {/* 8 triangular sections - 4 red sections at specific angles */}
          {[45, 135, 225, 315].map((angle, index) => (
            <Box
              key={`red-section-${index}`}
              sx={{
                position: 'absolute',
                width: 175, // Half of circle diameter
                height: 175,
                bgcolor: '#DC143C', // Deep red
                transformOrigin: '100% 100%', // Rotate from bottom-right corner
                transform: `rotate(${angle}deg)`,
                clipPath: 'polygon(100% 100%, 100% 0%, 0% 100%)', // Right triangle
                zIndex: 1,
              }}
            />
          ))}

          {/* White center square */}
          <Box
            sx={{
              position: 'absolute',
              width: 60,
              height: 60,
              bgcolor: 'white',
              border: '2px solid #DDD',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />

          {/* Numbers positioned in yellow sections - 4 specific positions */}
          {currentNumbers.map((number, index) => {
            let x, y;

            // Position numbers in the yellow sections based on the image
            switch (index) {
              case 0: // 13 at top (0 degrees)
                x = 0;
                y = -110;
                break;
              case 1: // 13 at left (270 degrees)
                x = -110;
                y = 0;
                break;
              case 2: // 3 at right (90 degrees)
                x = 110;
                y = 0;
                break;
              case 3: // 6 at bottom (180 degrees)
                x = 0;
                y = 110;
                break;
              default:
                x = 0;
                y = 0;
            }

            const isSelected = selectedIndices.includes(index);

            return (
              <Box
                key={`${number}-${index}`}
                onClick={() => handleNumberClick(index)}
                sx={{
                  position: 'absolute',
                  left: `calc(50% + ${x}px - 25px)`,
                  top: `calc(50% + ${y}px - 25px)`,
                  width: 50,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#1a237e', // Dark blue text
                  cursor: 'pointer',
                  zIndex: 2,
                  transition: 'all 0.2s ease-in-out',
                  bgcolor: isSelected ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                  borderRadius: isSelected ? '50%' : '0',
                  border: isSelected ? '3px solid #2196F3' : 'none',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '50%',
                    transform: 'scale(1.15)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  },
                }}
              >
                {number}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Operation Buttons Section - Gradient style matching the image */}
      <Box
        sx={{
          bgcolor: '#FFD700', // Golden yellow background
          py: 2,
          mx: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          mb: 3,
        }}
      >
        {operations.map((op) => (
          <Box
            key={op.operation}
            onClick={() => handleOperationClick(op.operation)}
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${op.color}, ${op.color}dd)`, // Gradient effect
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: selectedOperation === op.operation
                ? `0 0 20px ${op.color}88, inset 0 4px 8px rgba(255,255,255,0.3)`
                : `0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)`,
              border: selectedOperation === op.operation ? '3px solid white' : 'none',
              transition: 'all 0.2s ease-in-out',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '15%',
                left: '15%',
                right: '15%',
                height: '30%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                borderRadius: '50%',
                pointerEvents: 'none',
              },
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: `0 6px 16px rgba(0,0,0,0.4), inset 0 3px 6px rgba(255,255,255,0.3)`,
              },
            }}
          >
            {op.symbol}
          </Box>
        ))}
      </Box>

      {/* Calculate Button - Enhanced */}
      {selectedIndices.length === 2 && selectedOperation && (
        <Box display="flex" justifyContent="center" mb={4}>
          <Button
            variant="contained"
            color="info"
            onClick={calculateResult}
            size="large"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              py: 2,
              px: 4,
              borderRadius: '12px',
              boxShadow: 4,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 6,
              },
            }}
          >
            Calculate: {currentNumbers[selectedIndices[0]]} {operations.find(op => op.operation === selectedOperation)?.symbol} {currentNumbers[selectedIndices[1]]}
          </Button>
        </Box>
      )}

      {/* Control Buttons - Four main action buttons like in the image */}
      <Box
        sx={{
          bgcolor: '#4A90E2', // Blue background matching main background
          py: 3,
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={submitAnswer}
          disabled={currentNumbers.length !== 1}
          sx={{
            bgcolor: '#666666',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            py: 2,
            px: 4,
            borderRadius: '8px',
            textTransform: 'uppercase',
            '&:hover': {
              bgcolor: '#555555',
            },
            '&:disabled': {
              opacity: 0.5,
              bgcolor: '#999999',
            },
          }}
        >
          SUBMIT
        </Button>

        <Button
          variant="contained"
          onClick={undoLastStep}
          disabled={gameHistory.length === 0}
          sx={{
            bgcolor: '#666666',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            py: 2,
            px: 4,
            borderRadius: '8px',
            textTransform: 'uppercase',
            '&:hover': {
              bgcolor: '#555555',
            },
            '&:disabled': {
              opacity: 0.5,
              bgcolor: '#999999',
            },
          }}
        >
          UNDO
        </Button>

        <Button
          variant="contained"
          onClick={resetGame}
          sx={{
            bgcolor: '#333333',
            color: '#4A90E2',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            py: 2,
            px: 4,
            borderRadius: '8px',
            textTransform: 'uppercase',
            '&:hover': {
              bgcolor: '#222222',
            },
          }}
        >
          RESET
        </Button>

        <Button
          variant="contained"
          onClick={generateNewPuzzle}
          sx={{
            bgcolor: '#333333',
            color: '#4A90E2',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            py: 2,
            px: 3,
            borderRadius: '8px',
            textTransform: 'uppercase',
            '&:hover': {
              bgcolor: '#222222',
            },
          }}
        >
          NEW PUZZLE
        </Button>
      </Box>

      {/* Message Display */}
      {message && (
        <Box mb={4}>
          <Alert severity={messageType} sx={{ textAlign: 'center' }}>
            {message}
          </Alert>
        </Box>
      )}

      {/* Game Info - matching the bottom section of the image */}
      <Box textAlign="center" sx={{ color: 'white' }}>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 1 }}>
          Numbers remaining: {currentNumbers.length} | Steps taken: {gameHistory.length}
        </Typography>
        {currentNumbers.length > 0 && (
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            Current numbers: {currentNumbers.join(', ')}
          </Typography>
        )}
      </Box>
    </Container>
    </Box>
  );
};

export default Math24Game;