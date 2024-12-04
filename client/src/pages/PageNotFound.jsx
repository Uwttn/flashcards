import React from "react";

import { Link } from "react-router-dom";

import { Button, Flex } from "@chakra-ui/react";

const PageNotFound = () => {
  return (
    <main>
      <Flex
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="lg"
        boxShadow="lg"
        direction="column"
        align="center"
      >
        <img src="notFound.gif" alt="page found" />
        <Link to="/welcome">
          <Button bg="#63b6c3" mb={6}>
            Go Home
          </Button>
        </Link>
      </Flex>
    </main>
  );
};

export default PageNotFound;
