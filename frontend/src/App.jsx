import { useContext, useState } from "react";
import "./App.css";
import All_Routes from "./All_Routes";
import Layout from "./Admin_Pages/Layout";
import { ToastContainer } from "react-toastify";
import Public_Navbar from "./Navbars/Public_Navbar";
import User_Navbar from "./Navbars/Users_Navbar";
import { Authcontext } from "./context_API";
function App() {
  const { role } = useContext(Authcontext);

  console.log(role, "checking rolelelele");
  return (
    <>
      <ToastContainer />

      {role === null || undefined ? (
        <>
          <Public_Navbar />
          <All_Routes />

        </>
      ) : role === "student" ? (
        <>
          <User_Navbar />
          <All_Routes />
        </>
      ) : role === "admin" ? (
        <Layout>
          <All_Routes />
        </Layout>
      ) : null}
    </>
  );
}

export default App;
