import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  SimpleGrid,
  Heading,
  Button,
} from "@chakra-ui/react";
import { QUERY_ME, QUERY_DECKS } from "../utils/queries";
import { keyframes } from "@emotion/react";
import Auth from "../utils/auth";

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

const DeckSelect = () => {
  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const user = Auth.getProfile();
  const userId = user.data._id;
  const { loading, data } = useQuery(QUERY_DECKS, {
    variables: { userId: userId },
  });

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query

  const decks = data?.decks || [];
  console.log(decks);
  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  // if (Auth.loggedIn()) {
  //   return <Navigate to="/study" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!decks) {
    return (
      <h4>
        You need to be logged in to study! Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div
      className="flex-row justify-center"
      style={{ backgroundColor: "#f7fafc", minHeight: "100vh" }}
    >
      <h1
        style={{ display: "flex", justifyContent: "center" }}
        className="col-12 "
      >
        Study Mode
      </h1>
      <h4
        style={{ display: "flex", justifyContent: "center" }}
        className="col-12 "
      >
        Select A Deck
      </h4>
      {decks?.length > 0 && (
        <div className="deck-list">
          <SimpleGrid spacing={4} templateColumns="repeat(4, 1fr)">
            {decks.map((deck) => (
              <Card
                height="250px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                animation={`${fadeIn} 1s ease`}
                key={deck._id}
              >
                <CardHeader>
                  <Heading size="md"> {deck.deckName}</Heading>
                </CardHeader>
                <CardFooter>
                  <Button backgroundColor="rgb(99,182,195)" as={Link} to={`/study/${deck._id}`}>
                    Let's Study!
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </div>
      )}
    </div>
  );
};

export default DeckSelect;
