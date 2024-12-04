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
import { REMOVE_CARD } from "../../utils/mutations";
import { QUERY_CARDS } from "../../utils/queries";

export default function DeleteCard({ cardId, deckId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [removeCard] = useMutation(REMOVE_CARD, {
    refetchQueries: [{ query: QUERY_CARDS, variables: { deckId } }],
    onCompleted: () => {
      onClose();
    },
  });

  const handleDeleteCard = (cardId) => {
    console.log(cardId);
    removeCard({
      variables: {
        cardId: cardId,
      },
    });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" ml={3}>
        Delete
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
            Delete the Card?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this card?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => handleDeleteCard(cardId)}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
