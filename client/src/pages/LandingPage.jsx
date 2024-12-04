import React from "react";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main>
      <Box
        bg="#63b6c3"
        height="95vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Flex direction="column" align="center" justify="center" color="white">
          <img className="logo" src="FlipIt Logo.png" alt="FlipIt Logo" />
          <Heading mb={8} className="flip-animation">
            Welcome to FlipIt
          </Heading>
          <Flex>
            <Link to="/login">
              <Button colorScheme="teal" mr={4}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="teal">Signup</Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </main>
  );
};

export default LandingPage;
