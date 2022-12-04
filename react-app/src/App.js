import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {loaded && currentUser ? (
        <ProtectedRoute>
          <Route path="/">
            <HomePage />
          </Route>
        </ProtectedRoute>
      ) : (
        <Route>
          <LandingPage path="/" />
        </Route>
      )}
    </BrowserRouter>
  );
}

export default App;
