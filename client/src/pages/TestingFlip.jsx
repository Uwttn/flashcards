import { useParams, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Input,
  FormControl,
  FormLabel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { QUERY_CARDS } from "../utils/queries";
import { ADD_CARD, UPDATE_CARD } from "../utils/mutations";
import "../App.css";

const TestingFlip = () => {
  const cards = [
    { question: "q1", answers: ["a1"] },
    { question: "q2", answers: ["a2"] },
  ];

  return (
    <Box maxWidth="800px" mx="auto" p={4}>
      {/* Card List */}
      <SimpleGrid columns={[1, 1]} spacing={4} mb={6}>
        <Card>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h1>{cards[0].question}</h1>
              </div>
              <div className="flip-card-back">
                <h1>John Doe</h1>
                <p>Architect & Engineer</p>
                <p>We love that guy</p>
              </div>
            </div>
          </div>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default TestingFlip;
