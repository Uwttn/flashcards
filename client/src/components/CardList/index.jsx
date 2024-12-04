import { Link } from "react-router-dom";

const CardList = ({ cards }) => {
  if (!cards.length) {
    return <h3>No Cards Yet</h3>;
  }
  console.log(cards);
  return (
    <div>
      {cards &&
        cards.map((card) => (
          <div key={card._id} className="card mb-3">
            <h4 className="card-header bg-dark text-light p-2 m-0">
              {card.cardName}
            </h4>
            <div className="card-body bg-light p-2">

              <h5>Type:</h5>
              <p>{card.type}</p>
              <h5>Question:</h5>
              <p>{card.question}</p>
              <h5>Answers:</h5>
              <p>{card.answer}</p>
              <ul>
                {card.answer.map((answer, i) => (
                  <li key={answer[i]}>{answer}</li>
                ))}
              </ul>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/cards/${card._id}`}
            >
              Join the discussion on this card.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default CardList;
