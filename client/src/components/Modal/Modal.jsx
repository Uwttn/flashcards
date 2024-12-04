import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useRadio,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";
import { ADD_CARD } from "../../utils/mutations";
import { ADD_DECK } from "../../utils/mutations";
import Auth from "../../utils/auth";

export default function ModalForm() {
  const [addCard] = useMutation(ADD_CARD);

  const [addDeck] = useMutation(ADD_DECK);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // State for Deck Name
  const [deckName, setDeckName] = useState("");

  // State for storing all flashcards
  const [flashcards, setFlashcards] = useState([]);

  // State for current flashcard values (front and back)
  const [currentFlashcard, setCurrentFlashcard] = useState({
    front: "",
    back: "",
  });

  // Handle input changes for current flashcard
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentFlashcard({
      ...currentFlashcard,
      [name]: value,
    });
  };

  // Add current flashcard to the array and reset inputs
  const addFlashcard = async () => {
    if (currentFlashcard.front && currentFlashcard.back) {
      setFlashcards([...flashcards, currentFlashcard]);
      setCurrentFlashcard({ front: "", back: "" });

      console.log("Flashcards Array:", flashcards);

    } else {
      alert("Please fill in both the front and back fields.");
    }
  };

  // Handle Save (collect all deck info)
  const handleSave = async () => {
    if (deckName) {

      console.log("Deck Name:", deckName);
      console.log("Flashcards:", flashcards);
      console.log(deckName)
      const user = Auth.getProfile();
      const userId = user.data._id;
      console.log(userId);

      console.log("Deck Name:", deckName);
      console.log("Flashcards:", flashcards);

      let cardId = []

      for (let i = 0; i < flashcards.length; i++) {
        const variable = {
          question: flashcards[i].front,
          answers: flashcards[i].back,
        };
        //console.log(variable);
        const { data } = await addCard({ variables: variable });
        //console.log(data.addCard._id);
        console.log(data)
        cardId.push(data.addCard._id) 



        setCurrentFlashcard({ front: "", back: "" });
      }
      console.log(cardId)
      const {storedDeck} = await addDeck({
        variables:{
          user: userId,
          deckName: deckName,
          cardIds: cardId
        }
      })
      console.log(storedDeck)
      //console.log(variable)
      // Close the modal after saving
      onClose();
      setFlashcards([]);
    } else {
      alert("Please enter a deck name.");
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<AddIcon />}
        colorScheme="teal"
        size="lg"
      >
        Create a Deck
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Deck</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={4}>
              <FormLabel>Name of Deck</FormLabel>
              <Input
                placeholder="Deck Name"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
              />
            </FormControl>

            {/* Current Flashcard - Front */}
            <FormControl mb={2}>
              <FormLabel>Front</FormLabel>
              <Input
                name="front"
                value={currentFlashcard.front}
                onChange={handleInputChange}
                placeholder="Front of flashcard"
              />
            </FormControl>

            {/* Current Flashcard - Back */}
            <FormControl mb={4}>
              <FormLabel>Back</FormLabel>
              <Input
                name="back"
                value={currentFlashcard.back}
                onChange={handleInputChange}
                placeholder="Back of flashcard"
              />
            </FormControl>

            {/* Button to save current flashcard */}
            <Button
              onClick={addFlashcard}
              colorScheme="teal"
              variant="outline"
              mb={4}
            >
              Add Card to Deck
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button backgroundColor="rgb(99,182,195)" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
