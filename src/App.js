import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Router } from "./Components/Routes";
import { setUser } from "./redux/action";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (authUser) => {
  //     if (authUser) {
  //       dispatch(setUser(authUser));
  //     } else {
  //       dispatch(setUser(null));
  //     }
  //   });
  // }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
