import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation addCard($question: String!, $answers: [String]!) {
    addCard(question: $question, answers: $answers) {
      _id
      question
      answers
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation removeCard($cardId: ID!) {
    removeCard(_id: $cardId) {
      _id
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation updateCard($_id: ID!, $question: String, $answers: [String]) {
    updateCard(_id: $_id, question: $question, answers: $answers) {
      _id
      question
      answers
    }
  }
`;

export const ADD_DECK = gql`
  mutation addDeck($deckName: String!, $user: ID!, $cardIds: [ID]!) {
    addDeck(deckName: $deckName, user: $user, cardIds: $cardIds) {
      deckName
    }
  }
`;

export const UPDATE_DECK = gql`
  mutation updateDeck($deckId: ID!, $cardIds: [ID!]!) {
    updateDeck(_id: $deckId, cardIds: $cardIds) {
      cards {
        _id
      }
    }
  }
`;

export const REMOVE_DECK = gql`
  mutation removeDeck($deckId: ID!) {
    removeDeck(_id: $deckId) {
      _id
      deckName
    }
  }
`;
