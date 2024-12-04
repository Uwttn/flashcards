import { useParams, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  Box,
  Heading,
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
import { ADD_CARD, UPDATE_CARD, UPDATE_DECK } from "../utils/mutations";
import DeleteCard from "../components/DeleteCard/DeleteCard";
import DeleteDeck from "../components/DeleteDeck/DeleteDeck";

const CardList = () => {
  const { deckId } = useParams();
  const location = useLocation();
  const deckName = location.state?.deckName;

  const { loading, data } = useQuery(QUERY_CARDS, {
    variables: { deckId },
  });

  const cards = data?.deck?.cards || [];

  const [editableCards, setEditableCards] = useState([]);
  const [newCard, setNewCard] = useState({ question: "", answers: "" });

  React.useEffect(() => {
    if (data?.deck?.cards) {
      setEditableCards([...data.deck.cards]);
    }
  }, [data]);

  const [updateDeck] = useMutation(UPDATE_DECK, {
    refetchQueries: [{ query: QUERY_CARDS, variables: { deckId } }],
  });
  const [updateCard] = useMutation(UPDATE_CARD, {
    refetchQueries: [{ query: QUERY_CARDS, variables: { deckId } }],
  });
  const [addCard] = useMutation(ADD_CARD, {
    refetchQueries: [{ query: QUERY_CARDS, variables: { deckId } }],
  });

  const handleCardChange = (e, index, field) => {
    const updatedCards = [...editableCards];
    updatedCards[index] = { ...updatedCards[index], [field]: e.target.value };
    setEditableCards(updatedCards);
  };

  const handleSaveCard = (index) => {
    const cardToUpdate = editableCards[index];
    console.log(cardToUpdate);
    updateCard({
      variables: {
        _id: cardToUpdate._id,
        question: cardToUpdate.question,
        answers: Array.isArray(cardToUpdate.answers)
          ? cardToUpdate.answers
          : [cardToUpdate.answers],
      },
    });
  };

  // Handle input change for new card
  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  // Handle form submission for adding a new card
  const handleAddCard = async (e) => {
    e.preventDefault();

    if (newCard.question && newCard.answers) {
      let cardId = [];
      const card = await addCard({
        variables: {
          deckId: deckId,
          question: newCard.question,
          answers: newCard.answers,
        },
      });
      console.log(card);
      cardId.push(card.data.addCard._id);
      console.log(cardId);
      updateDeck({
        variables: {
          deckId: deckId,
          cardIds: cardId,
        },
      });
      setNewCard({ question: "", answers: "" }); // Reset new card input fields
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box maxWidth="800px" mx="auto" p={4}>
      {/* Deck Title */}
      <Heading as="h1" mb={6} textAlign="center">
        {deckName}
      </Heading>
      {/* Card List */}
      <SimpleGrid columns={[1, 1]} spacing={4} mb={6}>
        {editableCards.map((card, index) => (
          <Card key={card._id}>
            <CardHeader>
              <Heading size="md">Card {index + 1}</Heading>
            </CardHeader>
            <CardBody>
              <FormControl mb={4}>
                <FormLabel>Question</FormLabel>
                <Input
                  value={card.question}
                  onChange={(e) => handleCardChange(e, index, "question")}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Answer</FormLabel>
                <Input
                  value={card.answers}
                  onChange={(e) => handleCardChange(e, index, "answers")}
                />
              </FormControl>
            </CardBody>
            <CardFooter>
              {/* Save Button */}
              <Button
                backgroundColor="rgb(99,182,195)"
                onClick={() => handleSaveCard(index)}
              >
                Save
              </Button>
              <DeleteCard cardId={card._id} deckId={deckId} />
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      {/* Add New Card */}
      <Box as="form" onSubmit={handleAddCard} mb={6}>
        <Heading as="h2" size="md" mb={4}>
          Add New Card
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Question</FormLabel>
          <Input
            name="question"
            value={newCard.question}
            onChange={handleNewCardChange}
            placeholder="Enter question"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Answer</FormLabel>
          <Input
            name="answers"
            value={newCard.answers}
            onChange={handleNewCardChange}
            placeholder="Enter answer"
          />
        </FormControl>
        <Button type="submit" backgroundColor="rgb(99,182,195)">
          Add Card
        </Button>
      </Box>
      <Box textAlign="center" mb={6}>
        <DeleteDeck deckId={deckId} />
      </Box>
    </Box>
  );
};

export default CardList;
