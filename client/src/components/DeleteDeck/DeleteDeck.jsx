import { useMutation, useQuery } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { REMOVE_DECK } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import { QUERY_DECKS } from "../../utils/queries";
import Auth from "../../utils/auth";

export default function DeleteDeck({ deckId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const user = Auth.getProfile();
  const userId = user.data._id;

  const [removeDeck] = useMutation(REMOVE_DECK, {
    refetchQueries: [{ query: QUERY_DECKS, variables: { userId } }],
    onCompleted: () => {
      onClose();
      navigate("/decks")
    },
  });

  const handleDeleteDeck = (deckId) => {
    console.log(deckId+"Deck has been deleted");
    removeDeck({
      variables: {
        deckId: deckId,
      },
    });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" ml={3}>
        Delete Entire Deck
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader bg="white" color="black">
            Delete the Deck?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this deck? All content will be lost.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => handleDeleteDeck(deckId)}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
