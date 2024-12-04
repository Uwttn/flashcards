import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import CardList from "../components/CardList";
import CardForm from "../components/CardForm";
import UpdateCardForm from "../components/updateCardForm";
import { QUERY_SINGLE_CARD } from "../utils/queries";

const SingleCard = () => {
  const { cardId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_CARD, {
    variables: { cardId: cardId },
  });

  const card = data?.card || {};

  const [showUpdateCardModal, setShowUpdateCardModal] = useState(false);

  const handleCloseUpdateCardModal = () => setShowUpdateCardModal(false);
  const handleShowUpdateCardModal = () => setShowUpdateCardModal(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='my-3'>
        <div className='card-body bg-light p-2'>
          <h5>Question:</h5>
          <p>{card.question}</p>
          <h5>Answer:</h5>
          <ul>
            {card.answer.map((answer, i) => (
              <li key={i}>{answer}</li>
            ))}
          </ul>
          <Button onClick={handleShowUpdateCardModal}>Update Card</Button>
        </div>

        <div className='my-5'>
          <CardList questions={card.questions} cardId={card._id} />
        </div>
        <div className='m-3 p-4' style={{ border: "1px dotted #1a1a1a" }}>
          <CardForm cardId={card._id} />
        </div>
      </div>

      <Modal
        show={showUpdateCardModal}
        onHide={handleCloseUpdateCardModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pass initialCardData prop here */}
          <UpdateCardForm
            cardId={card._id}
            initialCardData={card}
            handleCloseUpdateCardModal={handleCloseUpdateCardModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseUpdateCardModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SingleCard;
