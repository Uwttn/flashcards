import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  SimpleGrid,
  Heading,
  Button,
} from "@chakra-ui/react";
import { QUERY_DECKS } from "../utils/queries";
import Auth from "../utils/auth";

const DeckList = () => {
  const user = Auth.getProfile();
  const userId = user.data._id;
  console.log(userId);
  const { loading, data } = useQuery(QUERY_DECKS, {
    variables: { userId: userId },
  });

  const decks = data?.decks || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="deck-list">
      <SimpleGrid spacing={4} templateColumns="repeat(4, 1fr)">
        {decks.map((deck) => (
          <Link
            to={`/deck/${deck._id}`}
            state={{ deckName: deck.deckName }}
            key={deck._id}
          >
            <Card
              height="250px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <CardHeader>
                <Heading size="md"> {deck.deckName}</Heading>
              </CardHeader>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default DeckList;
