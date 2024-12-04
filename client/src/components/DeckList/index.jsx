import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Deck from "../../../../server/models/Deck";
import User from "../../../../server/models/User";

const DeckList = ({ decks }) => {
  if (!decks.length) {
    return <h3>This user doesn't have any decks yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {decks &&
          decks.map((deck) => (
            <div key={deck} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {deck} <br />
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
<main>
<Box           
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          textAlign="center"
          >
  <Heading as='h2' size='2xl'>
    ${deckName}
  </Heading>

</Box> 
</main>

export default DeckList;