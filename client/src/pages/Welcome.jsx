import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import ModalForm from "../components/Modal/Modal";
// Define keyframes for animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const WelcomePage = () => {
  return (
    <main>
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#f7fafc"
        height="58vh"
      >
        <Box           
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          textAlign="center"
          animation={`${fadeIn} 1s ease`}
          >
        <Heading as='h1' color="gray.600">Welcome to the FlipIt!</Heading>
        <Text fontSize="lg" color="gray.600">
            Start creating and reviewing flashcards to boost your knowledge.
          </Text>
            <ModalForm />
    </Box>
    </Box>
    </main>
  );
};

export default WelcomePage;
