import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Authcontext = createContext();

function AuthProvider({ children }) {
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [check_Level, setCheck_Level] = useState([]);
  const [check_Category, setCheck_Category] = useState([]);
  const [check_status, setCheck_Status] = useState([]);
  const [user_id, setUser_id] = useState(() => localStorage.getItem("user_id"));
  const navigate = useNavigate();

  const login = (newtoken, newrole, newId) => {
    localStorage.setItem("token", newtoken);
    localStorage.setItem("role", newrole);
    localStorage.setItem("user_id", newId);
    setToken(newtoken);
    setRole(newrole);
    setUser_id(newId);
    navigate('/')

  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    setToken(null);
    setRole(null);
    setUser_id(null);
    navigate('/')
  };

  // const Check_User_Status = (level,category,status) => {
  //   setCheck_Level(level);
  //   setCheck_Category(category);
  //   setCheck_Status(status);

  //   console.log(level,category,status);

  // };

  return (
    <div>
      <Authcontext.Provider
        value={{
          token,
          role,
          login,
          logout,
          user_id,
          check_Level,
          check_Category,
          check_status,
        }}
      >
        {children}
      </Authcontext.Provider>
    </div>
  );
}

export default AuthProvider;
