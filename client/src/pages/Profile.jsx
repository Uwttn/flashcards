import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CardForm from "../components/CardForm";
import CardList from "../components/CardList";

import { QUERY_USER, QUERY_ME, QUERY_CARDS } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const { loading: loadingCards, data: cardData } =
    useQuery(QUERY_CARDS);

  const user = data?.me || data?.user || {};
  const cards = cardData?.cards || [];

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/decks' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loadingCards) {
    return <div>Loading Cards...</div>;
  }

  if (!user) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (cards.length === 0) {
    return <h4>No cards to display</h4>;
  }

  return (
    <div>
      <div className='flex-row justify-center mb-3'>
        <h2 className='col-12 col-md-10 bg-dark text-light p-3 mb-5'>
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        <div className='col-12 col-md-10 mb-5'>
          <CardList cards={cards} title='Witcher Cards' />
        </div>
        <div
          className='col-12 col-md-10 mb-3 p-3'
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <CardForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
