import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Welcome from "./pages/Welcome.jsx";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SingleCard from "./pages/SingleCard";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import MyDecks from "./pages/MyDecks.jsx";
import DeckSelect from "./pages/DeckSelect.jsx";
import CardList from "./pages/CardList.jsx";
import StudyMode from "./pages/StudyMode.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import PrivateRoute from "./utils/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/welcome",
        element: (
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profiles/:username",
        element: <Profile />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/cards/:cardId",
        element: <SingleCard />,
      },
      {
        path: "/decks",
        element: (
          <PrivateRoute>
            <MyDecks />
          </PrivateRoute>
        ),
      },
      {
        path: "/deck/:deckId",
        element: (
          <PrivateRoute>
            <CardList />
          </PrivateRoute>
        ),
      },
      {
        path: "/study",
        element: (
          <PrivateRoute>
            <DeckSelect />
          </PrivateRoute>
        ),
      },
      {
        path: "/study/:deckId",
        element: (
          <PrivateRoute>
            <StudyMode />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/404" />,
      },
      {
        path: "/404",
        element: <PageNotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
