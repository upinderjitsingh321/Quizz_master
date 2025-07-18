import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AuthProvider, { Authcontext } from "./context_API/index.jsx";
import QuizMasterHomepage from "./Pages/Home_Page/Index.jsx";
import { useContext } from "react";

const Main = () => {
  const { token } = useContext(Authcontext);

  return (
    <>
      <App />
    </>
  );
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Router>
  </StrictMode>
);
