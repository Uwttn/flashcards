import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CARD } from "../../utils/mutations";
import { QUERY_CARDS } from "../../utils/queries";

const UpdateCardForm = ({
  cardId,
  initialCardData,
  handleCloseUpdateCardModal,
}) => {
  const [formState, setFormState] = useState({
    question: initialCardData.question,
    answer: initialCardData.answer,
  });

  useEffect(() => {
    setFormState({
      question: initialCardData.question,
      answer: initialCardData.answer,
    });
  }, [initialCardData]);

  const [updateCard, { error }] = useMutation(UPDATE_CARD, {
    refetchQueries: [{ query: QUERY_CARDS }],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCard({ variables: { cardId, ...formState } });
      setFormState({
        question: "",
        answer: "",
      });
      handleCloseUpdateCardModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleAnswerChange = (event, index) => {
    const newAnswers = [...formState.answer];
    newAnswers[index] = event.target.value;
    setFormState({ ...formState, answer: newAnswers });
  };

  const handleRemoveAnswer = (index) => {
    const newAnswers = [...formState.answer];
    newAnswers.splice(index, 1);
    setFormState({ ...formState, answer: newAnswers });
  };

  const addAnswer = () => {
    setFormState({ ...formState, answer: [...formState.answer, ""] });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        name='question'
        value={formState.question}
        onChange={handleChange}
        placeholder='Question'
      />
      {formState.answer.map((answer, index) => (
        <div key={index}>
          <input
            value={answer}
            onChange={(event) => handleAnswerChange(event, index)}
            placeholder='Answer'
          />
          <button type='button' onClick={() => handleRemoveAnswer(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type='button' onClick={addAnswer}>
        Add Answer
      </button>
      <button type='submit'>Update Card</button>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
};

export default UpdateCardForm;
