// FlashCards.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, Card } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CARDS } from "../utils/queries";
import ConfettiComponent from "../components/Confetti/ConfettiComponent";

const FlashCards = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [isExploding, setIsExploding] = useState(false); // Control confetti explosion

  const { loading, data } = useQuery(QUERY_CARDS, {
    variables: { deckId },
  });

  const [flashCard, setFlashCard] = useState(null);
  const [remainingCards, setRemainingCards] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [knownCards, setKnownCards] = useState([]);

  const cards = data?.deck?.cards || [];

  const handleConfetti = () => {
    setIsExploding(true);

    setTimeout(() => {
      setIsExploding(false);
      alert("🎉 You're done with all cards!");
      navigate("/study");
    }, 900);
  };

  useEffect(() => {
    console.log("cards:", cards);
    console.log("remainingCards:", remainingCards);
  }, [cards, remainingCards]);

  const randomCard = () => {
    if (remainingCards.length === 0 && savedForLater.length === 0) {
      handleConfetti();
      return;
    }

    if (remainingCards.length === 0 && savedForLater.length > 0) {
      setRemainingCards(savedForLater);
      setSavedForLater([]);
    }

    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    setFlashCard(remainingCards[randomIndex]);
  };

  const handleIKnowThis = (card) => {
    setKnownCards([...knownCards, card]);
    const newRemainingCards = remainingCards.filter(
      (c) => c.question !== card.question
    );
    setRemainingCards(newRemainingCards);
    if (newRemainingCards.length === 0 && savedForLater.length > 0) {
      setRemainingCards(savedForLater);
      setSavedForLater([]);
    } else if (newRemainingCards.length === 0 && savedForLater.length === 0) {
      handleConfetti();
    } else {
      setRemainingCards(newRemainingCards);
      randomCard();
    }
  };

  const handleSave = (card) => {
    setSavedForLater([...savedForLater, card]);
    const newRemainingCards = remainingCards.filter(
      (c) => c.question !== card.question
    );
    setRemainingCards(newRemainingCards);
    if (newRemainingCards.length === 0 && savedForLater.length > 0) {
      setRemainingCards(savedForLater);
      setSavedForLater([]);
    } else if (newRemainingCards.length === 0 && savedForLater.length === 0) {
      handleConfetti();
    } else {
      setRemainingCards(newRemainingCards);
      randomCard();
    }
  };

  useEffect(() => {
    if (cards.length > 0 && remainingCards.length === 0) {
      setRemainingCards(cards);
    }
  }, [data, cards]);

  useEffect(() => {
    if (remainingCards.length > 0) {
      randomCard();
    }
  }, [remainingCards]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!flashCard) {
    return <div>No flash card available.</div>;
  }

  return (
    <div
      className="flex-row justify-center"
      style={{ backgroundColor: "#f7fafc", minHeight: "64vh" }}
    >
      <Box maxWidth="800px" mx="auto" p={4}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Study Mode
        </h1>
        <h4 style={{ display: "flex", justifyContent: "center" }}>
          Click and hold to flip the card over
        </h4>

        {/* Display Confetti Explosion */}
        <ConfettiComponent isExploding={isExploding} />

        <Card
          width="600px"
          height="350px"
          mx="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>{flashCard.question}</h3>
              </div>
              <div className="flip-card-back">
                <h3>{flashCard.answers}</h3>
              </div>
            </div>
          </div>
          <div className="flex-row justify-center">
            <div>
              <Button
                width="150px"
                colorScheme="red"
                mr="30px"
                mb="20px"
                onClick={() => handleIKnowThis(flashCard)}
              >
                I know this one!
              </Button>

              <Button
                width="150px"
                colorScheme="green"
                mb="20px"
                onClick={() => handleSave(flashCard)}
              >
                Save for later!
              </Button>
            </div>
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default FlashCards;
