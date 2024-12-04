import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_CARD } from "../../utils/mutations";
import { QUERY_CARDS } from "../../utils/queries";

const CardForm = () => {
  const [formState, setFormState] = useState({
    question: "",
    answers: [],
  });
  const [answerInput, setAnswerInput] = useState("");
  const [addCard, { error }] = useMutation(ADD_CARD, {
    refetchQueries: [QUERY_CARDS, "getCards"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCard({
        variables: { ...formState },
      });
      console.log(data);
      setFormState({
        question: "",
        answers: [],
      });
      setAnswerInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const handleAnswerChange = (event) => {
    setAnswerInput(event.target.value);
  };
  const handleAddAnswer = () => {
    if (answerInput.trim() !== "") {
      setFormState({
        ...formState,
        answers: [...formState.answers, answerInput],
      });
      setAnswerInput("");
    }
  };

  const handleRemoveAnswer = (index) => {
    const updatedAnswers = formState.answer.filter((_, idx) => idx !== index);
    setFormState({ ...formState, answers: updatedAnswers });
  };

  return (
    <div>
      <h3>Add Card?</h3>

      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <textarea
            name="question"
            placeholder="Question"
            value={formState.question}
            className="form-input w-100"
            style={{ lineHeight: "1.5", resize: "vertical" }}
            onChange={handleChange}
          ></textarea>
          {/* insert an input for an array of strings */}
          <div>
            <input
              type="text"
              placeholder="Enter an answer"
              value={answerInput}
              onChange={handleAnswerChange}
            />
            <button type="button" onClick={handleAddAnswer}>
              Add Answer
            </button>
          </div>
          <div>
            <h4>Answers:</h4>
            <ul>
              {formState.answer.map((answer, index) => (
                <li key={index}>
                  {answer}
                  <button
                    type="button"
                    onClick={() => handleRemoveAnswer(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Card
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CardForm;
