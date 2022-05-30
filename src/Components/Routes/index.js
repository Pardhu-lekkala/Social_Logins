import { useRoutes } from "react-router";
import Login from "../../pages/initial/Login";
import Register from "../../pages/initial/Register";
import ForgotPassword from "../../pages/initial/ForgotPassword";
import Home from "../../pages/initial/Home";
import FirestoreData from "../fireStoreData";
import DetailsScreen from "../../pages/initial/detailsPage";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import LinkedInPage from "../LinkedIn";

export function Router() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  //var bookDetails = localStorage.getItem("detailsObject");
  // var parsedDetails = JSON.parse(bookDetails);

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
    // if (bookDetails) {
    //   navigate("/detailsScreen");
    // }
  }, [currentUser]);

  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/detailsScreen",
      element: <DetailsScreen />,
    },
    {
      path: "/linkedin",
      element: <LinkedInCallback />,
    },
    // {
    //   path: "/",
    //   element: <LinkedInPage />,
    // },
  ]);
}
