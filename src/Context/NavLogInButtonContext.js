import { createContext, useRef, useState } from "react";

const NavLoginButtonContext = createContext({
  isLoggedIn: Boolean,
  buttonText: "LOG IN",
  buttonRoute: "/login",
  handleLoggedInState: () => {},
});

export function NavLoginButtonContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buttonText, setButtonText] = useState("LOG IN");
  const [buttonRoute, setButtonRoute] = useState("/login");

  function handleLoggedInState() {
    setIsLoggedIn(!isLoggedIn);
    isLoggedIn ? setButtonText("LOG OUT") : setButtonText("LOG IN");

    isLoggedIn ? setButtonRoute("/") : setButtonRoute("/login");
  }

  const context = {
    isLoggedIn: isLoggedIn,
    buttonText: buttonText,
    buttonRoute: buttonRoute,
    handleLoggedInState: handleLoggedInState,
  };

  return (
    <NavLoginButtonContext.Provider value={context}>
      {props.children}
    </NavLoginButtonContext.Provider>
  );
}

export default NavLoginButtonContext;
